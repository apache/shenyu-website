import React from 'react';
import Translate from '@docusaurus/Translate';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Pagination,
  Navigation
} from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import clsx from 'clsx';
import styles from './index.module.css';
import users from '../data/user'

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

function Users() {
  const {
    siteConfig: {
      customFields: { description },
      tagline,
    },
  } = useDocusaurusContext();
  const userGroups = group(users, (users.length) / 3);
  return (
    <Layout title={tagline} description={description as string}>
      <main>
        <div className={clsx(styles.section, styles.userSwiperContainer)}>
          <div className="container">
            <h1 className={styles.blockTitle}><Translate>Our Users</Translate></h1>
            <p className={styles.blockDescription}>
              <Translate>Here is a list of companies or organizations that we know have used all or some of Apache ShenYu’s components in production.This list is in no particular order.</Translate>
            </p >
            <div className={styles.userPart}>
              <div className={styles.scrollView}>
                <div className={styles.scrollLine1}>
                  {
                    userGroups[0].map((user, i) => {
                      return (
                        <div className={styles.scrollItem} key={i}>
                          <a href="noopener noreferrer" target="_blank">
                            <img className={styles.scrollImage} src={user.src && (user.src.startsWith("http") ? user.src : useBaseUrl(user.src))} alt={user.name} />
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.scrollLine2}>
                  {
                    userGroups[1].map((user, i) => {
                      return (
                        <div className={styles.scrollItem} key={i}>
                          <a href={user.link} rel="noopener noreferrer" target="_blank">
                            <img className={styles.scrollImage} src={user.src && (user.src.startsWith("http") ? user.src : useBaseUrl(user.src))} alt={user.name} />
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.scrollLine3}>
                  {
                    userGroups[2].map((user, i) => {
                      return (
                        <div className={styles.scrollItem} key={i}>
                          <a href={user.link} rel="noopener noreferrer" target="_blank">
                            <img className={styles.scrollImage} src={user.src && (user.src.startsWith("http") ? user.src : useBaseUrl(user.src))} alt={user.name} />
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.scrollItemLeft}>
                <div className={styles.scrollItemLeftInner}></div>
              </div>
              <div className={styles.scrollItemRight}>
                <div className={styles.scrollItemRightInner}></div>
              </div>
            </div>
            {/* <Swiper navigation={{
              nextEl: '.user-swiper-button-next',
              prevEl: '.user-swiper-button-prev',
            }}
              modules={[Navigation, Pagination]}
              slidesPerView={7}
              spaceBetween={20} pagination={{
                "clickable": true
              }}
              className={styles.userSwiperContent}>
              {
                userGroups.map((userList, i) => {
                  return <SwiperSlide key={i} >
                    {
                      userList.map((user, j) => {
                        return <div key={j} className={styles["swiper-slide"]}>
                          < a href={user.link} rel="noopener noreferrer" target="_blank">
                            < img src={user.src&&(user.src.startsWith("http")?user.src:useBaseUrl(user.src))} alt={user.name} />
                          </ a>
                        </div>
                      })
                    }
                  </SwiperSlide>
                })
              }
            </Swiper> */}
            <p><Translate>To better serve you, please register</Translate><a target="_blank" href="https://github.com/apacheshenyu/issues/68"><Translate>[Here].</Translate></ a></p >
          </div>
          {/* <div className="swiper-button-prev user-swiper-button-prev" style={{ left: "50px" }}></div>
          <div className="swiper-button-next user-swiper-button-next" style={{ right: "50px" }}></div> */}
        </div>
      </main>
    </Layout>
  );
}

export default Users;