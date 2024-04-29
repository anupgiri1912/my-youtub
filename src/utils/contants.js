const GOOGLE_API_KEY = "AIzaSyD9hGMXLH5ijimm9eY-4M3ziC1mS8QKzEM";
console.log("Anup", process.env.REACT_APP_GOOGLE_API_KEY);
export const LIVE_CHAT_COUNT = 20;
export const YOUTUBE_VIDEOS_API =
  " https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key= " +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
