
import React from 'react';
import Layout from '@theme/Layout';
import styles from './news.module.css';
import newsInfo from '../data/newsInfo'

function pageRoute(src){
  var newSrc = "https://shenyu.apache.org/news/" + src
  window.location.href = newSrc
}

function News() {
  return (
    <Layout title="News">
      <div className={styles.top}>Recent Posts</div>
      <div className={styles.content}>
        <div className={styles.newsList}>
          {newsInfo.map((newsItem, key) => {
            return (
              <div className={styles.cardItem} onClick={() => window.location.href = "http://localhost:3000/news/" + newsItem.src}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardDate}>{newsItem.date}</div>
                  <div className={styles.cardTitle}>{newsItem.title}</div>
                  <div className={styles.cardDesc}>{newsItem.description}</div>
                </div>
                <img className={styles.cardImage} src={newsItem.cover}  width={210} height={160}></img>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
}

export default News;