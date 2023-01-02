const express = require("express");
const app = express();
const { f1, f2, f3 } = require("./src/api");
const ifEmpty = require("./src/utils");
require("dotenv").config();

app.get("/", (req, res) => {
  return res.status(400).json({
    error: false,
    code: 200,
    type: "Success",
    data: "Please refer the readme",
  });
});

app.get("/:subreddit", async (req, res) => {
  let f1res = await f1(req.params.subreddit);
  if (f1res === "Not Allowed") {
    return res.status(400).json({
      error: true,
      code: 400,
      type: "Bad Request",
      data: "This subreddit not allowed",
    });
  }
  if (f1res === "Subreddit name can't be empty") {
    return res.status(400).json({
      error: true,
      code: 400,
      type: "Bad Request",
      data: "Subreddit name can't be empty",
    });
  } else {
    if (ifEmpty(f1res.data)) {
      return res.status(204).json({
        error: true,
        code: 204,
        type: "No Content",
        data: "No response or response empty",
      });
    } else {
      try {
        let f1data = f1res.data.data;
        const data = [];
        f1data.children.forEach((el) => {
          let author = el.data.author;
          let title = el.data.title;
          let post_hint = el.data.post_hint;
          let url = el.data.url_overridden_by_dest;
          data.push({
            "author": author,
            "title": title,
            "post_hint": post_hint,
            "url": url,
          });
        });
        let error = false;
        let code = 200;
        let type = "Succcess";
        res.status(200).json({ error, code, type, data });
      } catch (e) {
        if (e.response) {
          return res.status(400).json({
            error: true,
            code: 400,
            type: "Bad Request",
            data: e.response.status + e.response.data,
          });
        }
      }
    }
  }
});

app.get("/:subreddit/:memesare", async (req, res) => {
  let = { subreddit, memesare } = req.params;
  let limit = req.query.limit;
  if (subreddit !== "" && memesare !== "") {
    let f2res = await f2(subreddit, memesare, limit);
    if (f2res === "Check subreddit name and/or memesare") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "Bad Request",
        data: "Check subreddit name and/or memesare",
      });
    }
    if (f2res === "Subreddit & memesare can't be empty") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "Bad Request",
        data: "Subreddit & memesare can't be empty",
      });
    } else {
      if (ifEmpty(f2res.data)) {
        return res.status(204).json({
          error: true,
          code: 204,
          type: "No Content",
          data: "No response or response empty",
        });
      } else {
        try {
          let f2data = f2res.data.data;
          const data = [];
          f2data.children.forEach((el) => {
            let author = el.data.author;
            let title = el.data.title;
            let post_hint = el.data.post_hint;
            let url = el.data.url_overridden_by_dest;
            data.push({
              "author": author,
              "title": title,
              "post_hint": post_hint,
              "url": url,
            });
          });
          let error = false;
          let code = 200;
          let type = "Succcess";
          res.status(200).json({ error, code, type, data });
        } catch (e) {
          if (e.response) {
            return res.status(400).json({
              error: true,
              code: 400,
              type: "Bad Request",
              data: e.response.status + e.response.data,
            });
          }
        }
      }
    }
  }
});

app.get("/:subreddit/:memesare/:freq/", async (req, res) => {
  let { subreddit, memesare, freq } = req.params;
  let limit = req.query.limit;
  if (subreddit !== "" && memesare !== "" && freq !== "") {
    let f3res = await f3(subreddit, memesare, freq, limit);
    if (f3res === "Check subreddit name and/or memesare and/or freq") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "Bad Request",
        data: "Check subreddit name and/or memesare and/or freq",
      });
    }
    if (f3res === "Subreddit, memesare, freq can't be empty") {
      return res.status(400).json({
        error: true,
        code: 400,
        type: "Bad Request",
        data: "Subreddit, memesare, freq can't be empty",
      });
    } else {
      if (ifEmpty(f3res.data)) {
        return res.status(204).json({
          error: true,
          code: 204,
          type: "No Content",
          data: "No response or response empty",
        });
      } else {
        try {
          let f3data = f3res.data.data;
          const data = [];
          f3data.children.forEach((el) => {
            let author = el.data.author;
            let title = el.data.title;
            let post_hint = el.data.post_hint;
            let url = el.data.url_overridden_by_dest;
            data.push({
              "author": author,
              "title": title,
              "post_hint": post_hint,
              "url": url,
            });
          });
          let error = false;
          let code = 200;
          let type = "Succcess";
          res.status(200).json({ error, code, type, data });
        } catch (e) {
          if (e.response) {
            return res.status(400).json({
              error: true,
              code: 400,
              type: "Bad Request",
              data: e.response.status + e.response.data,
            });
          }
        }
      }
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
