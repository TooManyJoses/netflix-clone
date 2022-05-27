import videoData from '../mock-data/videos.json';

export const getVideos = async (URL) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BaseURL = 'youtube.googleapis.com/youtube/v3';
    const response = await fetch(
      `https://${BaseURL}/${URL}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error('YouTube API error', data.error);
      return [];
    }

    return data.items.map((item) => {
      return {
        title: item?.snippet?.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        id: item?.id?.videoId || item.id,
      };
    });
  } catch (error) {
    console.error('Something went wrong fetching videos', error);
    return [];
  }
};

export const getPopularVideos = (region = 'US') => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${region}`;
  return getVideos(URL);
};

export const getVideosBySearchParam = (searchParam) => {
  const URL = `search?part=snippet&q=${searchParam}`;
  return getVideos(URL);
};
