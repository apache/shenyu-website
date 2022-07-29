import React from 'react';
import styles from './Footer.module.css';
import Translate, { translate } from "@docusaurus/Translate";

const Footer = (): React.ReactElement => (
    <section className={styles.footer}>
        <div className={styles.containerContent}>
            <div className={styles.copyRight}>
                <div>
                    <div className={styles.logos}>
                        <a href=''>< img src='/img/logo/support-apache.png' alt="Apache Support Logo" /></a>
                        <a href=''>< img src='/img/logo/asf_logo.svg' alt="The Apache Software Foundation" /></a>
                    </div>
                    <span className={styles.text}>Copyright  2022 The Apache Software Foundation, Licensed under the Apache License, Version 2.0. Apache ShenYu, Apache, the Apache feather logo, the Apache ShenYu logo are trademarks of The Apache Software Foundation.</span>
                </div>
            </div>
            <div className={styles.footerLinks}>
                <nav className={styles.footerNav}>
                    <div className={styles.item}>
                        <span className={styles.linkSpan}><Translate>Events</Translate></span>
                        <div className={styles.link}>
                            <div className={styles.linkItem}><a className={styles.linkA} href='https://www.apachecon.com'>ApacheCon</a></div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.linkSpan}>Shenyu</span>
                        <div className={styles.link}>
                            <div className={styles.linkItem}><a className={styles.linkA} href='/download'><Translate>Download</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='/docs/index/'><Translate>Document</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='/news'><Translate>News</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='/blog'><Translate>Blog</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='https://github.com/apache/shenyu/releases'><Translate>Release</Translate></a></div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.linkSpan}><Translate>Community</Translate></span>
                        <div className={styles.link}>
                            <div className={styles.linkItem}><a className={styles.linkA} href='/community/contributor-guide'><Translate>Community</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='https://github.com/apache/shenyu'>Github</a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='https://github.com/apache/shenyu/issues'>Issue Tracker</a></div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.linkSpan}><Translate>Subscribe mailing list</Translate></span>
                        <div className={styles.link}>
                            <div className={styles.linkItem}><a className={styles.linkA} href='./community/contributor-guide#join-the-discussion'><Translate>How to subscribe</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='mailto://dev-subscribe@shenyu.apache.org'><Translate>Subscribe Mail</Translate></a></div>
                            <div className={styles.linkItem}><a className={styles.linkA} href='https://lists.apache.org/list.html?dev@shenyu.apache.org'><Translate>Mail Archive</Translate></a></div>                            
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </section>
);

export default Footer;