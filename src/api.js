const axios = require("axios");

const onlyAllowed = ["meme", "memes", "joke", "jokes"];
const onlyType = ["hot", "new", "top", "rising"];
const onlyFreq = ["hour", "day", "week", "month", "year", "all", "now"];

const f1 = async (subreddit) => {
  if (subreddit !== "") {
    if (onlyAllowed.find((el) => el === subreddit)) {
      let data = await axios.get(process.env.URL + `${subreddit}/.json`);
      return data;
    } else {
      return "Not Allowed";
    }
  } else {
    return "Subreddit name can't be empty";
  }
};

const f2 = async (subreddit, memesare, limit) => {
  if (subreddit !== "" && memesare !== "") {
    if (
      !onlyAllowed.find((el) => el === subreddit) &&
      !onlyType.find((el) => el === memesare)
    ) {
      return "Provide valid subreddit & memesare";
    } else {
       if(limit){
        let data = await axios.get(
          process.env.URL + `${subreddit}/${memesare}.json?limit=${limit}`
        );
        return data;
       }else {
        let data = await axios.get(
          process.env.URL + `${subreddit}/${memesare}/.json`
        );
        return data;
       }
    }
  } else {
    return "Subreddit & memesare can't be empty";
  }
};

const f3 = async (subreddit, memesare, freq, limit) => {
  if (subreddit !== "" && memesare !== "" && freq !== "") {
    if (
      !onlyAllowed.find((el) => el === subreddit) &&
      !onlyType.find((el) => el === memesare) &&
      !onlyType.find((el) => el === freq)
    ) {
      return "Provide valid subreddit, memesare and freq";
    } else {
      if (limit) {
        let data = await axios.get(
          process.env.URL +
            `${subreddit}/${memesare}.json?t=${freq}&limit=${limit}`
        );
        return data;
      } else {
        let data = await axios.get(
          process.env.URL + `${subreddit}/${memesare}.json?t=${freq}`
        );
        return data;
      }
    }
  } else {
    return "Subreddit, memesare and freq can't be empty";
  }
};

module.exports = { f1, f2, f3 };
