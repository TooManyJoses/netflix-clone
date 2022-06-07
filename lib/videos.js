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
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails?.high?.url,
        id: item?.id?.videoId || item.id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        stats: item.statistics
          ? item.statistics
          : { viewCount: 0, likeCount: 0 },
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

export const getVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  //
  return getVideos(URL);
};

export const getVideosBySearchParam = (searchParam) => {
  const URL = `search?part=snippet&q=${searchParam}`;
  return getVideos(URL);
};
