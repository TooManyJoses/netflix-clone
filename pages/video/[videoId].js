import { useRouter } from 'next/router';
import NavBar from '../../components/navbar/navbar';
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import clsx from 'classnames';

Modal.setAppElement('#__next');

const VideoPage = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const video = {
    title: 'Empire Records',
    publishTime: '1996-01-01',
    description:
      'Empire Records is a 1995 American coming-of-age comedy-drama film directed by Allan Moyle, starring Anthony LaPaglia, Maxwell Caulfield, Debi Mazar, Rory Cochrane, Johnny Whitworth, Robin Tunney, Renée Zellweger, and Liv Tyler. The film follows a group of record store employees over the course of one exceptional day.',
    channelTitle: 'Classic Previews',
    viewCount: '435786',
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&rel=0&controls=0&modestbranding=1`;

  return (
    <div classname={styles.container}>
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
          frameborder="0"
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
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPage;
