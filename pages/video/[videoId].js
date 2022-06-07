import { useRouter } from 'next/router';
import NavBar from '../../components/navbar/navbar';
import Modal from 'react-modal';
import { getVideoById } from '../../lib/videos';
import styles from '../../styles/video.module.css';
import clsx from 'classnames';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const video = await getVideoById(videoId);
  return {
    props: {
      video: video.length > 0 ? video[0] : {},
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['c2-LdSfXo14', 'GokKUqLcvD8', 'hL6R3HmQfPc'];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: 'blocking' };
}

const VideoPage = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;

  const { title, publishTime, description, channelTitle, stats } = video;
  const { viewCount, likeCount } = stats;

  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&rel=0&controls=0&modestbranding=1`;

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Example Modal"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={videoSrc}
          className={styles.videoPlayer}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Views: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Likes: </span>
                <span className={styles.channelTitle}>{likeCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPage;
