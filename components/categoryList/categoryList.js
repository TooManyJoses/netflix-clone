import Link from 'next/link';
import Card from '../card/card';
import styles from './categoryList.module.css';

const CategoryList = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.length > 0 &&
          videos.map((video, index) => (
            <Link key={index} href={`/video/${video.id}`}>
              <a>
                <Card id={video.id} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CategoryList;
