
import React from 'react';
import Layout from '@theme/Layout';
import styles from './news.module.css';
import newsInfo from '../data/newsInfo';


function News() {
  return (
    <Layout title="News">
      <div className={styles.top}>Recent Posts</div>
      <div className={styles.content}>
        <div className={styles.newsList}>
          {newsInfo.map((newsItem, i) => {
            return (
              <div key={i} className={styles.cardItem} >
                <img className={styles.cardImage} src={newsItem.cover} alt={'Apache Shenyu'} ></img>
                <div className={styles.cardInfo}>
                  <div className={styles.cardDate}>{newsItem.date}</div>
                  <div className={styles.cardTitle}>{newsItem.title}</div>
                  <div className={styles.cardDesc}>{newsItem.description}</div>
                  <button className={styles.readMore} onClick={() => window.location.href = 'https://shenyu.apache.org/news/' + newsItem.src}> >>Read More </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
}

export default News;