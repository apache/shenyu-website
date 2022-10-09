import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './document.module.css';
import Translate from "@docusaurus/Translate";
import Link from '@docusaurus/Link';
import data from '../data/docsInfo';

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
          <p className={styles.descriptionLine}><Translate>The downloadable releases can be find in the</Translate><Link className={styles.descriptionLineHref} to="./download"><Translate>download page</Translate></Link></p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.documentList}>
          {data.map((item, i) => {
            const { latestVersion, nextVersion, versionsList } = item;
            return (
              <div key={i} className={styles.docItem} >
                <div className={styles.docsTitle}>{item.docsTitle}</div>
                <div className={styles.cardItem}>
                  <div className={styles.descriptionCardTitle}>{item.projectName}</div>
                  <div className={styles.descriptionCardDescription}>{item.description}</div>
                  <div className={styles.descriptionCardLinks}>
                    <Link to={latestVersion}><Translate>Latest Version</Translate></Link>
                    {nextVersion && <span className={styles.descriptionCardLinksSpan}> | </span>}
                    {nextVersion && <Link to={nextVersion}><Translate>Next Version</Translate></Link>}
                    {versionsList && <span className={styles.descriptionCardLinksSpan}> | </span>}
                    <div>
                      {
                        versionsList &&
                        (
                          <>
                            <button id='dropDownButton' className={styles.downloadCardButton} onClick={() => { showList(i) }}><Translate>All Versions</Translate></button>
                            {
                              showItem[i] &&
                              (
                                <div className={styles.dropDownContainer}>
                                  {
                                    versionsList?.map((item2, index2) => {
                                      const listArr = Object.keys(item2).map(list => {
                                        return {
                                          title: list,
                                          link: item2[list],
                                        }
                                      })
                                      return (
                                        <div className={styles.linkItem} >
                                          <Link className={styles.linkItemA} to={listArr[0].link}>{listArr[0].title}</Link>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          </>
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