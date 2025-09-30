<p align="center">
  <img alt="Logo" src="https://i.redd.it/9p9stjv9sfa51.png">
  <p align="center">
    <h4 align="center">reddit-memes-api</h4>
    <h3 align="center"><b>Get json data (gifs, images, videos) from Reddit.</b></h3>
  </p>
  <p align="center"><a href="#installation">Install</a> • <a href="#api-reference">API Reference</a> • <a href="#usageexamples">Usage</a> • <a href="#methods-for-node-package">Node Package</a> • <a href="#contributing">Contributing</a></p>
</p>

> Logo by u/RamenFish195

## Installation

Install using npm or yarn

```bash
  npm install reddit-memes-api

  yarn add reddit-memes-api
```

## API Reference

#### Type 1 - Get data

```http
  GET /${subreddit}
```

| Parameter   | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `subreddit` | `string` | **Required**. Need valid subreddit name |
| `after`     | `int`    | **Optional**. To go to next page        |
| `before`    | `int`    | **Optional**. To go to previous page    |

#### Type 2 - Get data

```http
  GET /${subreddit}/${memesare}?limit=${limit}
```

| Parameter   | Type     | Description                                |
| :---------- | :------- | :----------------------------------------- |
| `subreddit` | `string` | **Required**. Need valid subreddit name    |
| `memesare`  | `string` | **Required**. Need valid memesare type     |
| `limit`     | `int`    | **Optional**. Number of results to display |
| `after`     | `int`    | **Optional**. To go to next page           |
| `before`    | `int`    | **Optional**. To go to previous page       |

#### Type 3 - Get data

```http
  GET /${subreddit}/${memesare}/${freq}?limit=${limit}
```

| Parameter   | Type     | Description                                |
| :---------- | :------- | :----------------------------------------- |
| `subreddit` | `string` | **Required**. Need valid subreddit name    |
| `memesare`  | `string` | **Required**. Need valid memesare type     |
| `freq`      | `string` | **Required**. Need valid frequency         |
| `limit`     | `int`    | **Optional**. Number of results to display |
| `after`     | `int`    | **Optional**. To go to next page           |
| `before`    | `int`    | **Optional**. To go to previous page       |

#### Paramaters information

| Parameter   | Type     | Valid Paramaters                                         |
| :---------- | :------- | :------------------------------------------------------- |
| `subreddit` | `string` | meme, memes, joke, jokes                                 |
| `memesare`  | `string` | hot, new, top, rising                                    |
| `freq`      | `string` | now, hour, day, week, month, year, all                   |
| `limit`     | `int`    | provide according to no. of contents exists in subreddit |
| `after`     | `int`    | go to the next page                                      |
| `before`    | `int`    | go to the previous page                                  |

## Usage/Examples

```http
https://....../memes
https://....../memes/hot
https://....../memes/hot?limit=100
https://....../memes/top/all
https://....../memes/top/all?limit=100
```

Remove .... with actual url

## Methods for node package

```
f1(subreddit)

f2(subreddit,memesare,limit)

f3(subreddit,memesare,freq,limit)
```

## env example

```
URL=https://reddit.com/r/
PORT=3000

# Rate Limiting
RATE_LIMIT_WINDOW=60000     # 1 minute (in ms)
RATE_LIMIT_MAX=60           # 60 requests per window per IP

# Caching
CACHE_TTL=30                # 30 seconds
```

## Changelog

Read the project changes in [Changelog.md](https://github.com/jayantur13/yo-memes-jokes/blob/main/Changelog.md)

## Contributing

Contributions are always welcome!

See [Contributing.md](https://github.com/jayantur13/yo-memes-jokes/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code Of Conduct](https://github.com/jayantur13/yo-memes-jokes/blob/main/CODE_OF_CONDUCT.md).

## Support

Support the project using Github sponsor. For issues/features or anything else visit Github repo and open a new issue.

## License

This project is licensed under [MIT License](https://github.com/jayantur13/yo-memes-jokes/blob/main/LICENSE)
