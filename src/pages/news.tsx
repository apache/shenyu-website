
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './news.module.css';
import newsInfo from '../data/newsInfo';
import Translate from "@docusaurus/Translate";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


function News() {
  const [url, setUrl] = useState(true)

  useEffect(() => {
    let baseUrl = window.location.href
    if (baseUrl[baseUrl.length - 1] == '/') {
      setUrl(false)
    } else {
      setUrl(true)
    }
  }, []);

  return (
    <Layout title="News">
      <div className={styles.top}><Translate>Recent Posts</Translate></div>
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
                  <div className={styles.readMore}>
                    {
                      url ? <Link className={styles.link} to={'news/' + newsItem.src}> >> <Translate>Read More</Translate></Link> : <Link className={styles.link} to={newsItem.src}> >> <Translate>Read More</Translate></Link>
                    }
                  </div>
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