import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './document.module.css';
import Translate from "@docusaurus/Translate";

const data = [
  {
    'docsTitle': <Translate>Apache ShenYu Docs</Translate>,
    'projectName': 'Apache ShenYu',
    'description': <Translate>The document for Apache ShenYu</Translate>,
    'latestVersion': './docs/index',
    'nextVersion': './docs/next/index',
    'versionsList': [
      { 'next': './docs/next/index' },
      { '2.5.0': './docs/index' },
      { '2.4.3': './docs/2.4.3/index' },
      { '2.4.2': './docs/2.4.2/index' },
      { '2.4.1': './docs/2.4.1/index' },
      { '2.4.0': './docs/2.4.0/index' },
      { '2.3.0-Legacy': './docs/2.3.0-Legacy/index' },
    ]
  },
  {
    'docsTitle': <Translate>ShenYu Nginx Docs</Translate>,
    'projectName': 'ShenYu Nginx',
    'description': <Translate>This module provided SDK to watch available ShenYu instance list as upstream nodes by Service Register Center for OpenResty.</Translate>,
    'latestVersion': './shenyuNginx/index',
    'nextVersion': './shenyuNginx/next/index',
    'versionsList': [
      { 'current': './shenyuNginx/index' }
    ]
  }
]

function Event() {
  const defaultState = Array(data.length).fill(false)
  const [showItem, setShowItem] = useState(defaultState);

  const closeList = useCallback(
    e => {
      const { target } = e;
      const value = target.getAttributeNode('id')?.value;
      if (value && value === 'dropDownButton') {
        return
      } else {
        setShowItem(defaultState);
      }
    },
    [])

  useEffect(
    () => {
      document.addEventListener('click', (e) => { closeList(e) });
      return document.removeEventListener('click', (e) => { closeList(e) });
    },
    []
  );

  const showList = useCallback(
    index => {
      const newShowItem = showItem.map((item, key) => {
        if (key === index) {
          return !item;
        } else {
          return false;
        }
      })
      setShowItem([...newShowItem]);
    },
    [showItem]
  );

  return (
    <Layout title="Document">
      <div className={styles.top}>
        <div className={styles.title}><Translate>Document List</Translate></div>
        <div className={styles.description}>
          <p className={styles.descriptionLine}><Translate>This directory presents the official Apache ShenYu repositories and some ecosystem projects developed by community.</Translate></p>
          <p className={styles.descriptionLine}><Translate>The downloadable releases can be find in the</Translate><a className={styles.descriptionLineHref} href='./download'><Translate>download page</Translate></a></p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.documentList}>
          {data.map((item, i) => {
            const { versionsList } = item;
            return (
              <div key={i} className={styles.docItem} >
                <div className={styles.docsTitle}>{item.docsTitle}</div>
                <div className={styles.cardItem}>
                  <div className={styles.descriptionCardTitle}>{item.projectName}</div>
                  <div className={styles.descriptionCardDescription}>{item.description}</div>
                  <div className={styles.descriptionCardLinks}>
                    <a href={item.latestVersion}><Translate>Latest Version</Translate></a>
                    <span className={styles.descriptionCardLinksSpan}> | </span>
                    <a href={item.nextVersion}><Translate>Next Version</Translate></a>
                    <span className={styles.descriptionCardLinksSpan}> | </span>
                    <div>
                      <button id='dropDownButton' className={styles.downloadCardButton} onClick={() => { showList(i) }}><Translate>All Versions</Translate></button>
                      {
                        showItem[i] &&
                        (
                          <div className={styles.dropDownContainer}>
                            {
                              versionsList.map((item2, index2) => {
                                const listArr = Object.keys(item2).map(list => {
                                  return {
                                    title: list,
                                    link: item2[list],
                                  }
                                })
                                return (
                                  <div key={listArr[0].title} className={styles.linkItem} onClick={()=>{ window.location.href=listArr[0].link }} >
                                    <div className={styles.linkItemA}>{listArr[0].title}</div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      }
                    </div>
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