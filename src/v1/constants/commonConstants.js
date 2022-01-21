exports.monthsInWords = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

exports.moviePopulateFields =
  "ottplay_id name backdrops permalink release_date release_year posters imdb_rating ottplay_rating primary_language other_langauges content_type where_to_watch seo_url status genres run_time videos_trailers";

exports.showPopulateFields =
  "ottplay_id name backdrops permalink release_date release_year posters imdb_rating ottplay_rating primary_language other_langauges seasons content_type where_to_watch seo_url status genres run_time videos_trailers";

exports.castPopulateFields =
  "ottplay_id name headshot gender born_on content_type permalink profession seo_url status";

exports.crewPopulateFields =
  "ottplay_id name headshot gender born_on content_type permalink profession seo_url status";

exports.providerPopulateFields =
  "ottplay_id name logo_url icon_url status seo_url total_movies total_shows total_documentaries total_all total_all_published total_movies_published total_shows_published total_short_films_published total_documentaries_published";

exports.languagePopulateFields =
  "ottplay_id name icon_text logo_text status total_movies total_shows total_documentaries total_all total_all_published total_movies_published total_shows_published total_short_films_published total_documentaries_published";

exports.countryPopulateFields = "ottplay_id name flag_url status";

exports.genrePopulateFields = "ottplay_id name slug status";

exports.tagPopulateFields = "ottplay_id name slug status";

exports.newsPopulateFields =
  "source cover_image status is_crawlable ottplay_id published_on last_updated_on category seo_url permalink content_type headline canonical_url is_open_in_webview";

exports.criticReviewBodyTypeEnum = ["paragraph", "heading", "image", "video"];

exports.status = "published";

exports.isOnboarding = "true";

exports.errorMessage = "Please provide correct input";

exports.languageListPopulate = {
  order: 1,
  name: 1,
  icon_text: 1,
  status: 1,
  is_onboarding: 1,
  ottplay_id: 1,
};

exports.providerListPopulate = {
  order: 1,
  name: 1,
  logo_url: 1,
  icon_url: 1,
  status: 1,
  is_onboarding: 1,
  ottplay_id: 1,
};

exports.genreListPopulate = {
  name: 1,
  ottplay_id: 1,
  logo_url: 1,
  icon_url: 1,
  total_movies: 1,
  total_shows: 1,
  total_documentaries: 1,
  total_all: 1,
  total_all_published: 1,
  total_movies_published: 1,
  total_shows_published: 1,
  total_short_films_published: 1,
  total_documentaries_published: 1,
};

exports.notAuthorizedMessage = "Not Authorized";

exports.movieLikeEvent = "movie_like";

exports.showLikeEvent = "show_like";

exports.movieDislikeEvent = "movie_dislike";

exports.showDislikeEvent = "show_dislike";

exports.movieAddToWatchListEvent = "movie_addtowatchlist";

exports.showAddToWatchListEvent = "show_addtowatchlist";

exports.movieWatchNowEvent = "movie_watchnow";

exports.limit = 5;

exports.titleClickEvent = "title_click";

exports.baseURL = "/api/v1";

exports.subscriptionTypeEnum = ["buy", "subscription", "rent", "free", "ads"];

exports.aggregatedReviewContentType = "aggregated";

exports.syndicatedReviewContentType = "critics";

exports.languageModuleName = "Languages";

exports.providerModuleName = "Providers";

exports.castModuleName = "Onboarding";

exports.castSectionName = "Cast";

exports.crewModuleName = "Onboarding";

exports.crewSectionName = "Crew";

exports.newsBodyTypeEnum = [
  "paragraph",
  "heading",
  "image",
  "video",
  "facebook",
  "twitter",
  "instagram",
];

exports.serverError = "Internal Server Error";

exports.providerContent = "name logo_url icon_url content_type type order";

exports.imageContent = "image_url";

exports.planContent = "email_id user_id product_id";

// Time to live cache
exports.time = 900;

// populate field for listcles listing
exports.listiclesPopulateFields =
  "source is_crawlable status ottplay_id name permalink cannonical_url seo_type published_on meta_title meta_description category seo_url content_type images";

// populate fields for watchlist movie
exports.movieWatchlistPopulate =
  "genres name where_to_watch ottplay_rating posters status permalink content_type seo_url ottplay_id";

// populate fields for watchlist show
exports.showWatchlistPopulate =
  "genres name where_to_watch ottplay_rating posters status permalink content_type seo_url ottplay_id";

// message for 404 status code
exports.notFound = "Data not found";

exports.userStatusEnum = ["active", "inactive", "deleted"];

exports.authorPopulate =
  "name city country profileImg urlTwitter urlFacebook urlInstagram urlLinkdin bio urlGitHub";
