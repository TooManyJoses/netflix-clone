import Card from '../card/card';
import styles from './categoryList.module.css';

const CategoryList = ({ title, videos }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.length > 0 && videos.map((video, index) =>  <Card key={index} id={index} imgUrl={video.imgUrl} size="large" />)}
      </div>
    </section>
  );
};

export default CategoryList;
