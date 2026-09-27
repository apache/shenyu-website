
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './event.module.css';
import event from '../data/event';
import Translate from "@docusaurus/Translate";

function CustomLink({href, child}) {
    return <Link className={styles.link} to={`/event/${href}`}>{child}</Link>
}

function Event() {
  return (
    <Layout title="Event">
      <div className={styles.top}><Translate>Version List</Translate></div>
      <div className={styles.content}>
        <div className={styles.eventList}>
          {event.map((eventItem, i) => {
            return (
              <div key={i} className={styles.cardItem} >
                <div className={styles.cardInfo}>
                  <CustomLink href={eventItem.src} child={(<div className={styles.cardTitle}>{eventItem.title}</div>)}/>
                  <div className={styles.cardDesc}>{eventItem.description}</div>
                  <div className={styles.readMore}>
                    <CustomLink href={eventItem.src} child={(<> >> <Translate>Read More</Translate></>)}/>
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
