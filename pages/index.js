import Head from 'next/head';
import NavBar from '../components/navbar/navbar';
import Banner from '../components/banner/banner';
import styles from '../styles/Home.module.css';
import CategoryList from '../components/categoryList/categoryList';
import { getPopularVideos, getVideosBySearchParam } from '../lib/videos';

export async function getServerSideProps() {
  const disneyVideos = await getVideosBySearchParam('Disney preview');
  const travelVideos = await getVideosBySearchParam('Travel');
  const cookingVideos = await getVideosBySearchParam('Cooking');
  const popularVideos = await getPopularVideos('US');

  return {
    props: { disneyVideos, travelVideos, cookingVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  cookingVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NetTube</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="c2-LdSfXo14"
          title="Empire Records"
          subtitle="Damn the man, save the empire!"
          imgUrl="/static/empire-records.jpg"
        />
        <div className={styles.sectionWrapper}>
          <CategoryList title="Disney" videos={disneyVideos} size="large" />
          <CategoryList title="Travel" videos={travelVideos} size="small" />
          <CategoryList title="Cooking" videos={cookingVideos} size="medium" />
          <CategoryList title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
