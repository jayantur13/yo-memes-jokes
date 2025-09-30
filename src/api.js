const axios = require("axios");

const onlyAllowed = require("./subredditList").getSubredditList();
const onlyType = ["hot", "new", "top", "rising"];
const onlyFreq = ["hour", "day", "week", "month", "year", "all", "now"];

// ✅ Clamp limit
function clampLimit(limit) {
  let num = parseInt(limit, 10);
  if (isNaN(num) || num <= 0) return 10; // default
  if (num > 100) return 100; // Reddit max
  return num;
}

/**
 * f1 - subreddit listing (default .json)
 */
const f1 = async (subreddit, limit, after, before, count) => {
  if (!subreddit || typeof subreddit !== "string" || subreddit.trim() === "")
    return "Subreddit name can't be empty";
  if (!onlyAllowed.find((el) => el.name === subreddit)) return "Not Allowed";

  limit = clampLimit(limit);

  let url = `${process.env.URL}${subreddit}/.json?limit=${limit}`;
  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;
  if (count) url += `&count=${count}`;
  return axios.get(url);
};

/**
 * f2 - subreddit posts by type (hot/new/top/rising)
 */
const f2 = async (subreddit, memesare, limit, after, before) => {
  if (!subreddit || !memesare) return "Subreddit & memesare can't be empty";

  if (
    !onlyAllowed.find((el) => el.name === subreddit) ||
    !onlyType.includes(memesare)
  ) {
    return "Check subreddit name and/or memesare";
  }

  limit = clampLimit(limit);

  let url = `${process.env.URL}${subreddit}/${memesare}.json?limit=${limit}`;
  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;
  if (count) url += `&count=${count}`;

  return axios.get(url);
};

/**
 * f3 - subreddit posts by type + frequency
 */
const f3 = async (subreddit, memesare, freq, limit, after, before) => {
  if (!subreddit || !memesare || !freq)
    return "Subreddit, memesare and freq can't be empty";

  if (
    !onlyAllowed.find((el) => el.name === subreddit) ||
    !onlyType.includes(memesare) ||
    !onlyFreq.includes(freq)
  ) {
    return "Check subreddit name and/or memesare and/or freq";
  }

  limit = clampLimit(limit);

  let url = `${process.env.URL}${subreddit}/${memesare}.json?t=${freq}&limit=${limit}`;
  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;
  if (count) url += `&count=${count}`;

  return axios.get(url);
};

module.exports = { f1, f2, f3 };
