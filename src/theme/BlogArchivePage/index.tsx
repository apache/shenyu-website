import React from 'react';
import Layout from '@theme/Layout';
import OriginalBlogArchivePage from '@theme-original/BlogArchivePage';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import type {Props, ArchiveBlogPost} from '@theme/BlogArchivePage';
import {getPublication} from '../../utils/publication';
import styles from '../../components/Blog.module.css';

export default function BlogArchivePage(props: Props) {
  const {pathname} = useLocation();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const publication = getPublication(pathname);
  if (!publication) return <OriginalBlogArchivePage {...props} />;
  const {root, isNews} = publication;
  const years = new Map<string, ArchiveBlogPost[]>();
  [...props.archive.blogPosts].sort((a, b) => b.metadata.date.localeCompare(a.metadata.date)).forEach(post => {
    const year = post.metadata.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  });
  const dateFormat = new Intl.DateTimeFormat(currentLocale, {month: 'short', day: 'numeric', timeZone: 'UTC'});
  const title = isNews ? translate({id: 'news.archive', message: 'News archive'}) : translate({id: 'blog.archive', message: 'Archive'});
  return <Layout title={title}>
    <main className={styles.page}>
      <header className={styles.hero}><div className={styles.container}>
        <p className={styles.eyebrow}>APACHE SHENYU / {isNews ? 'NEWS' : 'BLOG'}</p>
        <h1>{title}</h1>
      </div></header>
      <div className={`${styles.container} ${styles.readingLayout}`}>
        <Link className={styles.backLink} to={root}><span aria-hidden="true">← </span>{isNews ? <Translate id="news.back">Back to news</Translate> : <Translate id="blog.back">Back to blog</Translate>}</Link>
        {[...years].map(([year, posts]) => <section key={year} className={styles.archiveYear}>
          <h2>{year}</h2><ul>{posts.map(({metadata}) => <li key={metadata.permalink}>
            <time dateTime={metadata.date}>{dateFormat.format(new Date(metadata.date))}</time>
            <Link to={metadata.permalink}>{metadata.title}</Link>
          </li>)}</ul>
        </section>)}
      </div>
    </main>
  </Layout>;
}
