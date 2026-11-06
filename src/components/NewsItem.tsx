import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {BlogPostMetadata} from '@docusaurus/plugin-content-blog';
import styles from './Blog.module.css';

export default function NewsItem({post, featured = false}: {post: BlogPostMetadata; featured?: boolean}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const date = new Date(post.date);
  const dateLabel = new Intl.DateTimeFormat(currentLocale, {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}).format(date);
  const title = post.title.replace(/^[【\[](.+)[】\]]$/, '$1');
  const description = post.description?.trim();
  const showDescription = description && description !== title && description !== post.title;
  const tags = post.tags.filter(tag => tag.label !== 'Apache ShenYu').slice(0, 2);

  return <article className={featured ? `${styles.featured} ${styles.newsFeatured}` : styles.newsItem}>
    {featured ? <div className={styles.featureLabel}>
      <span className={styles.eyebrow}>SHENYU UPDATES</span>
      <span className={styles.latest}><Translate id="news.latest">Latest update</Translate></span>
      <span className={styles.featureMark} aria-hidden="true">↗</span>
    </div> : <time className={styles.newsDate} dateTime={date.toISOString()}>{dateLabel}</time>}
    <div className={styles.cardBody}>
      {featured && <div className={styles.meta}><time dateTime={date.toISOString()}>{dateLabel}</time></div>}
      <h2><Link to={post.permalink}>{title}</Link></h2>
      {showDescription && <p className={styles.excerpt}>{description}</p>}
      {(tags.length > 0 || post.authors.length > 0) && <div className={styles.newsDetails}>
        {post.authors.length > 0 && <span className={styles.authors}>{post.authors.map(author => author.name).filter(Boolean).join(', ')}</span>}
        {tags.length > 0 && <div className={styles.tags}>{tags.map(tag => <Link key={tag.permalink} to={tag.permalink}>{tag.label}</Link>)}</div>}
      </div>}
      {featured && <Link className={styles.readMore} to={post.permalink} aria-label={translate({id: 'news.readLabel', message: 'Read update: {title}'}, {title})}>
        <Translate id="news.read">Read update</Translate><span aria-hidden="true">↗</span>
      </Link>}
    </div>
    {!featured && <Link className={styles.newsArrow} to={post.permalink} aria-label={translate({id: 'news.readLabel', message: 'Read update: {title}'}, {title})}><span aria-hidden="true">↗</span></Link>}
  </article>;
}
