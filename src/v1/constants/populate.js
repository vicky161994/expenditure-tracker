const {
  moviePopulateFields,
  showPopulateFields,
  providerPopulateFields,
  castPopulateFields,
  crewPopulateFields,
  reviewPopulateFields,
  newsPopulateFieldsInList,
  newsPopulateFields,
  listiclesPopulateFields,
  movieWatchlistPopulate,
  showWatchlistPopulate,
  providerContent,
} = require("./commonconstants");
const {
  movie,
  show,
  provider,
  cast,
  crew,
  critic_review,
  news,
  language,
  genre,
} = require("./collections");

const moviePopulate = {
  path: "movies",
  populate: {
    path: "movie",
    model: movie.model,
    select: moviePopulateFields,
  },
};
const showPopulate = {
  path: "shows",
  populate: {
    path: "show",
    model: show.model,
    select: showPopulateFields,
  },
};

const popularForMoviePopulate = {
  path: "popular_for",
  populate: {
    path: "movie",
    model: movie.model,
    select: moviePopulateFields,
  },
};

const popularForShowPopulate = {
  path: "popular_for",
  populate: {
    path: "show",
    model: show.model,
    select: showPopulateFields,
  },
};

const movieAwardNominationPopulate = {
  path: "awards_nominations",
  populate: {
    path: "movie",
    model: movie.model,
    select: moviePopulateFields,
  },
};

const showAwardNominationPopulate = {
  path: "awards_nominations",
  populate: {
    path: "show",
    model: show.model,
    select: showPopulateFields,
  },
};

const whereToWatchPopulate = {
  path: "where_to_watch",
  populate: {
    path: "provider",
    model: provider.model,
    select: providerPopulateFields,
  },
};

const castPopulate = {
  path: "casts",
  populate: {
    path: "cast",
    model: cast.model,
    select: castPopulateFields,
  },
};

const crewPopulate = {
  path: "crews",
  populate: {
    path: "crew",
    model: crew.model,
    select: crewPopulateFields,
  },
};

const widgetMoviePopulate = {
  path: "widgets",
  populate: {
    path: "movie",
    model: "movie",
    select: moviePopulateFields,
  },
};

const widgetShowPopulate = {
  path: "widgets",
  populate: {
    path: "show",
    model: "show",
    select: showPopulateFields,
  },
};

const episodePopulate = {
  path: "episodes",
  populate: {
    path: "episode",
    model: "episode",
  },
};

const widgetCastPopulate = {
  path: "widgets",
  populate: {
    path: "cast",
    model: "cast",
    select: castPopulateFields,
  },
};

const widgetCrewPopulate = {
  path: "widgets",
  populate: {
    path: "crew",
    model: crew.model,
    select: crewPopulateFields,
  },
};

const criticReviewPopulate = {
  path: "reviews",
  populate: {
    path: "critic_review",
    model: critic_review.model,
    select: reviewPopulateFields,
  },
};

const newsPopulate = {
  path: "news",
  populate: {
    path: "news",
    model: news.model,
    select: newsPopulateFieldsInList,
  },
};

// Adding populate object to populate movies and cast of that movies in news details API response
const newsMovieAndCastPopulate = {
  path: "movies",
  populate: {
    path: "casts",
    populate: {
      path: "cast",
    },
  },
};

// Adding populate object to populate movies and crew of that movies in news details API response
const newsMovieAndCrewPopulate = {
  path: "movies",
  populate: {
    path: "crews",
    populate: {
      path: "crew",
    },
  },
};

// Adding populate object to populate movies and cast of that movies in news details API response
const newsShowAndCastPopulate = {
  path: "shows",
  populate: {
    path: "casts",
    populate: {
      path: "cast",
    },
  },
};

// Adding populate object to populate movies and cast of that movies in news details API response
const newsShowAndCrewPopulate = {
  path: "shows",
  populate: {
    path: "crews",
    populate: {
      path: "crew",
    },
  },
};

const listiclesGenrePopulate = {
  path: "content_rules",
  populate: {
    path: "genres",
    select: "name",
  },
};

const listiclesProviderPopulate = {
  path: "content_rules",
  populate: {
    path: "providers",
    select: "name",
  },
};

// populate cast field for listicles details
const listiclesCastPopulate = {
  path: "content",
  populate: {
    path: "cast",
  },
};

// populate movie fields for listicles details
const listiclesMoviePopulate = {
  path: "content",
  populate: {
    path: "movie",
  },
};

// populate show fileds for listicles details
const listiclesShowPopulate = {
  path: "content",
  populate: {
    path: "show",
  },
};

// populate crew fields for listicles details
const listiclesCrewPopulate = {
  path: "content",
  populate: {
    path: "crew",
  },
};

// Populate movie and show review from CMS ranking module
const reviewRankingPopulate = {
  path: "widgets",
  populate: {
    path: "review",
    populate: {
      path: "movies",
      select: "primary_language where_to_watch",
    },
    populate: {
      path: "shows",
      select: "primary_language where_to_watch",
    },
    select:
      "source movies shows is_open_in_webview status is_crawlable ottplay_id content_type headline rating published_on seo_url permalink canonical_url",
  },
};

// Populate news from CMS ranking module
const newsRankingPopulate = {
  path: "widgets",
  populate: {
    path: "news",
    select: newsPopulateFields,
  },
};

// Populate listicls from CMS ranking module
const listicleReviewPopulate = {
  path: "widgets",
  populate: {
    path: "listicle",
    select: listiclesPopulateFields,
  },
};

// provider populate field for movies and shows
const providerPopulate = {
  path: "where_to_watch",
  populate: {
    path: "provider",
    model: provider.model,
    select: "name logo_url icon_url ottplay_id status",
    options: { lean: true },
  },
  options: { lean: true },
};

// primary language populate field for movies and shows
const languagePopulate = {
  path: "primary_language",
  model: language.model,
  select: "name icon_text logo_text status ottplay_id",
};

// genres populate field for movies and shows
const genrePopulate = {
  path: "genres",
  model: genre.model,
  select: "status name ottplay_id",
};

// populate watchlist movie
const watchlistMoviePopulate = {
  path: "movie_pref",
  model: movie.model,
  select: movieWatchlistPopulate,
};

// populate watchlist show
const watchlistShowPopulate = {
  path: "show_pref",
  model: show.model,
  select: showWatchlistPopulate,
};
const providersPopulate = {
  path: "providers",
  model: provider.model,
  select: providerContent,
};

module.exports = {
  moviePopulate,
  showPopulate,
  popularForMoviePopulate,
  popularForShowPopulate,
  movieAwardNominationPopulate,
  showAwardNominationPopulate,
  whereToWatchPopulate,
  castPopulate,
  crewPopulate,
  widgetMoviePopulate,
  widgetShowPopulate,
  episodePopulate,
  widgetCastPopulate,
  widgetCrewPopulate,
  criticReviewPopulate,
  newsPopulate,
  newsMovieAndCastPopulate,
  newsMovieAndCrewPopulate,
  newsShowAndCastPopulate,
  newsShowAndCrewPopulate,
  listiclesGenrePopulate,
  listiclesProviderPopulate,
  listiclesCastPopulate,
  listiclesMoviePopulate,
  listiclesShowPopulate,
  listiclesCrewPopulate,
  reviewRankingPopulate,
  newsRankingPopulate,
  listicleReviewPopulate,
  providerPopulate,
  languagePopulate,
  genrePopulate,
  watchlistMoviePopulate,
  watchlistShowPopulate,
  providersPopulate,
};
