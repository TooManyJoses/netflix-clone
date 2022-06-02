import { useRouter } from 'next/router';

const VideoPage = () => {
  const router = useRouter();
  const { videoId } = router.query;

  return <div>Video {videoId}</div>;
};

export default VideoPage;
