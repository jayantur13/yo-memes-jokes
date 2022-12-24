<p align="center">
  <img alt="Logo" src="https://i.redd.it/9p9stjv9sfa51.png">
  <p align="center">
    <h4 align="center">yo-memes-jokes</h4>
    <h3 align="center"><b>Get json data (gifs, images, videos) from subreddit's from reddit.</b></h3>
  </p>
  <p align="center"><a href="#installation">Install</a> • <a href="#api-reference">API Reference</a> • <a href="#usageexamples">Usage</a> • <a href="#methods-for-node-package">Node Package</a> • <a href="#contributing">Contributing</a></p>
</p>

> Logo by u/RamenFish195
>> Available as node package,api on RapidAPI

## Installation

Install using npm or yarn

```bash
  npm install reddit-memes-api

  yarn add reddit-memes-api
```
    
## API Reference

#### Type 1 - data

```http
  GET /${subreddit}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subreddit` | `string` | **Required**. Need valid subreddit name |

#### Type 2 - Get data

```http
  GET /${subreddit}/${memesare}?limit=${limit}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `subreddit`      | `string` | **Required**. Need valid subreddit name |
| `memesare`       | `string` | **Required**. Need valid memesare type  |
| `limit`          | `int`    | **Optional**. Number of results to display               | 

#### Type 3 - Get data

```http
  GET /${subreddit}/${memesare}/${freq}?limit=${limit}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `subreddit`      | `string` | **Required**. Need valid subreddit name |
| `memesare`       | `string` | **Required**. Need valid memesare type  |
| `freq`           | `string` | **Required**. Need valid frequency
| `limit`          | `int`    | **Optional**. Number of results to display |

#### Paramaters information

| Parameter | Type     | Valid Paramaters           |
| :-------- | :------- | :------------------------- |
| `subreddit` | `string` | meme, memes, joke, jokes |
| `memesare`  | `string` | hot, new, top, rising    |
| `freq`      | `string` | now, hour, day, week, month, year, all |
| `limit`     | `int`    | provide according to no. of contents exists in subreddit |

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


## Contributing

Contributions are always welcome!

See [Contributing.md](https://github.com/jayantur13/yo-memes-jokes/blob/master/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code Of Conduct](https://github.com/jayantur13/yo-memes-jokes/blob/master/CODE_OF_CONDUCT.md).


## Issues

Not yet discovered
## Support

Need support ? Create a new issue.Support the project, Sponsor!


## License

This project is licensed under [MIT License](https://github.com/jayantur13/yo-memes-jokes/blob/master/LICENSE)

