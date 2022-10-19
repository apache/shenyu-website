import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './DownloadCompoent.module.css';

const data = [
    [{
        title: translate({ message: 'ShenYu Source Codes' }),
        index: 0,
        versions: [
            {
                versionTitle: '2.5.0',
                targets: {
                    'zip': 'https://www.apache.org/dyn/closer.lua/shenyu/2.5.0/apache-shenyu-2.5.0-src.zip',
                    'asc': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-src.zip.asc',
                    'sha512': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-src.zip.sha512',
                }
            },
            {
                versionTitle: '2.4.3',
                targets: {
                    'zip': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-src.zip',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-src.zip.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-src.zip.sha512',
                }
            },
            {
                versionTitle: '2.4.2',
                targets: {
                    'zip': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-src.zip',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-src.zip.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-src.zip.sha512',
                }
            }
        ],
    },
    {
        title: translate({ message: 'ShenYu-Admin Binary Distribution' }),
        index: 1,
        versions: [
            {
                versionTitle: '2.5.0',
                targets: {
                    'tar': 'https://www.apache.org/dyn/closer.lua/shenyu/2.5.0/apache-shenyu-2.5.0-admin-bin.tar.gz',
                    'asc': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-admin-bin.tar.gz.asc',
                    'sha512': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-admin-bin.tar.gz.sha512',
                }
            },
            {
                versionTitle: '2.4.3',
                targets: {
                    'tar': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-admin-bin.tar.gz',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-admin-bin.tar.gz.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-admin-bin.tar.gz.sha512',
                }
            },
            {
                versionTitle: '2.4.2',
                targets: {
                    'tar': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-admin-bin.tar.gz',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-admin-bin.tar.gz.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-admin-bin.tar.gz.sha512',
                }
            }
        ],
    },
    {
        title: translate({ message: 'ShenYu-Bootstrap Binary Distribution' }),
        index: 2,
        versions: [
            {
                versionTitle: '2.5.0',
                targets: {
                    'tar': 'https://www.apache.org/dyn/closer.lua/shenyu/2.5.0/apache-shenyu-2.5.0-bootstrap-bin.tar.gz',
                    'asc': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-bootstrap-bin.tar.gz.asc',
                    'sha512': 'https://downloads.apache.org/shenyu/2.5.0/apache-shenyu-2.5.0-bootstrap-bin.tar.gz.sha512',
                }
            },
            {
                versionTitle: '2.4.3',
                targets: {
                    'tar': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-bootstrap-bin.tar.gz',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-bootstrap-bin.tar.gz.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.3/apache-shenyu-incubating-2.4.3-bootstrap-bin.tar.gz.sha512',
                }
            },
            {
                versionTitle: '2.4.2',
                targets: {
                    'tar': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz',
                    'asc': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz.asc',
                    'sha512': 'https://archive.apache.org/dist/shenyu/2.4.2/apache-shenyu-incubating-2.4.2-bootstrap-bin.tar.gz.sha512',
                }
            }
        ],
    }],
    [{
        title: translate({ message: 'ShenYu client golang Source Codes' }),
        index: 3,
        versions: [
            {
                versionTitle: '1.0.0',
                targets: {
                    'tar': 'https://www.apache.org/dyn/closer.lua/shenyu/shenyu-client-golang/v1.0.0/shenyu-client-golang-v1.0.0-src.tar.gz',
                    'asc': 'https://downloads.apache.org/shenyu/shenyu-client-golang/v1.0.0/shenyu-client-golang-v1.0.0-src.tar.gz.asc',
                    'sha512': 'https://downloads.apache.org/shenyu/shenyu-client-golang/v1.0.0/shenyu-client-golang-v1.0.0-src.tar.gz.sha512',
                }
            }
        ],
    }],
    [{
        title: translate({ message: 'ShenYu client .NET Source Codes' }),
        index: 4,
        versions: [
            {
                versionTitle: '1.0.0',
                targets: {
                    'tar': 'https://www.apache.org/dyn/closer.lua/shenyu/shenyu-client-dotnet/v1.0.0/shenyu-client-dotnet-v1.0.0-src.tar.gz',
                    'asc': 'https://downloads.apache.org/shenyu/shenyu-client-dotnet/v1.0.0/shenyu-client-dotnet-v1.0.0-src.tar.gz.asc',
                    'sha512': 'https://downloads.apache.org/shenyu/shenyu-client-dotnet/v1.0.0/shenyu-client-dotnet-v1.0.0-src.tar.gz.sha512',
                }
            }
        ],
    }]
]

function DownloadCompoent() {
    const [showItem, setShowItem] = useState([false, false, false, false, false]);

    const closeList = useCallback((e) => {
        const { target } = e;
        const value = target.getAttributeNode('id')?.value;
        if (value && value === 'dropDownButton') {
            return
        } else {
            setShowItem([false, false, false, false, false]);
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', (e) => { closeList(e) });
        return document.removeEventListener('click', (e) => { closeList(e) });
    }, []);

    const showList = useCallback(index => {
        const newShowItem = showItem.map((item, key) => {
            if (key === index) {
                return !item;
            } else {
                return false;
            }
        })
        setShowItem([...newShowItem]);
    }, [showItem]);

    return (
        <div className={styles.downloadContainer}>
            {data.map((project, index) => {
                return (
                    <div key={index} className={styles.downloadRowContainer}>
                        {project.map((item, index) => {
                            const { versions, title } = item;
                            return (
                                <div key={item.index} className={styles.downloadCard}>
                                    <div className={styles.downloadCardTitle}>{title}</div>
                                    <button id='dropDownButton' className={styles.downloadCardButton} onClick={() => { showList(item.index) }}><Translate>Source</Translate></button>
                                    {
                                        showItem[item.index] &&
                                        (
                                            <div className={styles.dropDownContainer}>
                                                {
                                                    versions.map((item2, index2) => {
                                                        const { versionTitle, targets } = item2;
                                                        const listArr = Object.keys(targets).map(list => {
                                                            return {
                                                                title: list,
                                                                link: targets[list],
                                                            }
                                                        })
                                                        return (
                                                            <div key={index2}>
                                                                <div className={styles.versionTitle}>{versionTitle}</div>
                                                                <div className={styles.downloadLinks}>
                                                                    {listArr.map((url, ind3) => {
                                                                        const title = '[' + url.title + ']'
                                                                        return (
                                                                            <a key={ind3} href={url.link}>{title}</a>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })}
                    </div>)
            })}
        </div>
    )
};

export default DownloadCompoent;