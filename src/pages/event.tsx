
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './event.module.css';
import event from '../data/event';
import Translate from "@docusaurus/Translate";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function CustomLink({url, href, child}) {
    return url ? <Link className={styles.link} to={'event/' + href}>{child}</Link> : <Link className={styles.link} to={href}>{child}</Link>
}

function Event() {
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
    <Layout title="Event">
      <div className={styles.top}><Translate>Version List</Translate></div>
      <div className={styles.content}>
        <div className={styles.eventList}>
          {event.map((eventItem, i) => {
            return (
              <div key={i} className={styles.cardItem} >
                <div className={styles.cardInfo}>
                  <CustomLink url={url} href={eventItem.src} child={(<div className={styles.cardTitle}>{eventItem.title}</div>)}/>
                  <div className={styles.cardDesc}>{eventItem.description}</div>
                  <div className={styles.readMore}>
                    <CustomLink url={url} href={eventItem.src} child={(<> >> <Translate>Read More</Translate></>)}/>
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

export default Event;
