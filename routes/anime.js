const express = require("express");
const router = express.Router();
const Jikan = require("jikan-node");
const anime = new Jikan();

router.get("/", async (req, res, next) => {
  try {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let season = "";
    if (month == 2 || month == 3 || month == 4) {
      season = "spring";
    } else if (month == 5 || month == 6 || month == 7) {
      season = "summer";
    } else if (month == 8 || month == 9 || month == 10) {
      season = "fall";
    } else {
      season = "winter";
    }
    //Get 10 anime by current season
    const seasonalAnime = await anime.findSeason(season, year);
    const newAnime = seasonalAnime.anime.slice(0, 5);

    //Get 10 anime my top rated
    const findTopAnime = await anime.findTop("anime", 1);
    const topAnime = findTopAnime.top;
    res.json({
      newAnime: newAnime,
      topAnime: topAnime,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:title", async (req, res, next) => {
  try {
    //Find anime by search
    const title = req.params.title;
    const value = await anime.search("anime", title);
    res.json(value.results);
  } catch (error) {
    next(error);
  }
});

router.get("/genre/:genre", async (req, res, next) => {
  try {
    const genre = [
      "action",
      "adventure",
      "cars",
      "comedy",
      "dementia",
      "demons",
      "drama",
      "ecchi",
      "fantasy",
      "game",
      "harem",
      "hentai",
      "historical",
      "horror",
      "josei",
      "kids",
      "magic",
      "martial arts",
      "mecha",
      "millitary",
      "music",
      "mystery",
      "parody",
      "police",
      "psychological",
      "romance",
      "samurai",
      "school",
      "sci-fi",
      "seinin",
      "shoujo",
      "shoujo ai",
      "shounen",
      "shounen ai",
      "slice of life",
      "space",
      "sports",
      "super power",
      "supernatural",
      "thriller",
      "vampire",
      "yaoi",
      "yuri",
    ];
    res.json(genre.length);
    // const value = await anime.findGenre("anime", 1);
    // res.json(value.anime);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
