const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
const { f1, f2, f3 } = require("./src/api");
const { formatResponse, throwError, asyncHandler } = require("./src/utils"); 

// ----------------- Rate Limiter -----------------
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000, // default 1 min
  max: parseInt(process.env.RATE_LIMIT_MAX) || 60, // default 60 req/min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: true,
    code: 429,
    type: "TooManyRequests",
    data: "Too many requests, please try again later.",
  },
});

app.use(limiter);

// ----------------- Cache -----------------
const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL) || 30, // default 30s
  checkperiod: 60,
});

// Middleware for caching (FIXED to handle structured response with 'data' and 'pagination')
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedData = cache.get(key);
  if (cachedData) {
    // If returning from cache, restore the full structured response
    return res.json({
      error: false,
      code: 200,
      type: "Success (cached)",
      pagination: cachedData.pagination, // Include cached pagination object
      data: cachedData.data, // Include cached post data array
    });
  }

  // Override res.json to save the *full* structured response to cache
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // We save the structured response body (data and pagination) only if no error occurred
    if (data && !data.error && data.data && data.pagination) {
      // Save { data: postsArray, pagination: paginationObject }
      cache.set(key, { data: data.data, pagination: data.pagination });
    }
    return originalJson(data);
  };

  next();
}

// Function to calculate count for Reddit pagination
function getCountParam(limitQuery, afterQuery, beforeQuery) {
  const effectiveLimit = parseInt(limitQuery) || 25;
  
  if (afterQuery || beforeQuery) {
    // Reddit needs 'count' to reliably calculate the 'before' token.
    // 'count' must be the number of items *already seen* or *being skipped*.
    // For simple after/before navigation, passing the current limit usually fixes the issue.
    // NOTE: If you are tracking the page number (not shown here), count should be (page_num - 1) * limit.
    return effectiveLimit;
  }
  return undefined;
}


// Route 1: /:subreddit
app.get(
  "/:subreddit",
  cacheMiddleware,
  asyncHandler(async (req, res) => {
    const { subreddit } = req.params;
    const { limit, after, before } = req.query;

    const count = getCountParam(limit, after, before);
    
    // Pass count to the API function (assuming f1 accepts it as the 4th argument)
    let f1res = await f1(subreddit, limit, after, before, count); 
    
    if (typeof f1res === "string") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "BadRequest",
        data: f1res,
      });
    }

    res.json(formatResponse(f1res.data.data));
  })
);

// Route 2: /:subreddit/:memesare
app.get(
  "/:subreddit/:memesare",
  cacheMiddleware,
  asyncHandler(async (req, res) => {
    const { subreddit, memesare } = req.params;
    const { limit, after, before } = req.query;

    const count = getCountParam(limit, after, before);

    // Pass count to the API function
    let f2res = await f2(subreddit, memesare, limit, after, before, count);
    
    if (typeof f2res === "string") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "BadRequest",
        data: f2res,
      });
    }

    res.json(formatResponse(f2res.data.data));
  })
);

// Route 3: /:subreddit/:memesare/:freq
app.get(
  "/:subreddit/:memesare/:freq",
  cacheMiddleware,
  asyncHandler(async (req, res) => {
    const { subreddit, memesare, freq } = req.params;
    const { limit, after, before } = req.query;

    const count = getCountParam(limit, after, before);

    // Pass count to the API function
    let f3res = await f3(subreddit, memesare, freq, limit, after, before, count);
    
    if (typeof f3res === "string") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "BadRequest",
        data: f3res,
      });
    }

    res.json(formatResponse(f3res.data.data));
  })
);


// Global error handler
app.use((err, req, res, next) => {
  if (err) { 
    console.error("🔥 UNEXPECTED SERVER ERROR caught:", err); 

    if (res.headersSent) {
      return next(err);
    }
    
    res.status(err.status || 500).json({
      error: true,
      code: err.status || 500,
      type: err.type || "ServerError",
      data: err.message || "Internal Server Error",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});


module.exports = {
  cacheMiddleware,
  f1,
  f2,
  f3,
  formatResponse,
  asyncHandler,
};