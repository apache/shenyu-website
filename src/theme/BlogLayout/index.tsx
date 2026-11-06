import React from 'react';
import Layout from '@theme/Layout';
import OriginalBlogLayout from '@theme-original/BlogLayout';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/BlogLayout';
import {getPublication} from '../../utils/publication';
import styles from '../../components/Blog.module.css';

export default function BlogLayout(props: Props) {
  const {pathname} = useLocation();
  const publication = getPublication(pathname);
  if (!publication) return <OriginalBlogLayout {...props} />;
  const {root, isNews} = publication;
  const {children, toc, sidebar, ...layoutProps} = props;
  const article = !/^\/(tags|archive|page)(\/|$)/.test(pathname.slice(root.length)) && pathname.replace(/\/$/, '') !== root;
  return <Layout {...layoutProps}>
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.readingLayout}`}>
        <Link className={styles.backLink} to={root}><span aria-hidden="true">← </span>{isNews ? <Translate id="news.back">Back to news</Translate> : <Translate id="blog.back">Back to blog</Translate>}</Link>
        <div className={article ? styles.articleLayout : undefined}>
          <main className={article ? styles.article : styles.collection}>{children}</main>
          {toc && <aside className={styles.toc}><p><Translate id="blog.onThisPage">On this page</Translate></p>{toc}</aside>}
        </div>
      </div>
    </div>
  </Layout>;
}
