import videoData from '../mock-data/videos.json';

export const getVideos = async (searchParam) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParam}&key=${YOUTUBE_API_KEY}`
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
