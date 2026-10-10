import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {BlogPostMetadata} from '@docusaurus/plugin-content-blog';
import styles from './Blog.module.css';

export default function BlogCard({post, featured = false}: {post: BlogPostMetadata; featured?: boolean}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const date = new Date(post.date);
  const tags = post.tags.filter(tag => tag.label !== 'Apache ShenYu').slice(0, 2);

  return (
    <article className={featured ? styles.featured : styles.card}>
      {featured && <div className={styles.featureLabel}>
        <span className={styles.eyebrow}>FROM THE COMMUNITY</span>
        <span className={styles.latest}><Translate id="blog.latest">Latest article</Translate></span>
        <span className={styles.featureMark} aria-hidden="true">↗</span>
      </div>}
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat(currentLocale, {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}).format(date)}</time>
          {post.readingTime != null && <><span aria-hidden="true">·</span><span><Translate id="blog.readingTime" values={{minutes: Math.ceil(post.readingTime)}}>{'{minutes} min read'}</Translate></span></>}
        </div>
        <h2><Link to={post.permalink}>{post.title}</Link></h2>
        <p className={styles.excerpt}>{post.description}</p>
        <div className={styles.tags}>{tags.map(tag => <Link key={tag.permalink} to={tag.permalink}>{tag.label}</Link>)}</div>
        <div className={styles.cardFooter}>
          <span className={styles.authors}>{post.authors.map((author, index) => <React.Fragment key={index}>
            {index > 0 && ', '}{author.url ? <Link href={author.url}>{author.name}</Link> : author.name}
          </React.Fragment>)}</span>
          <Link className={styles.readMore} to={post.permalink} aria-label={translate({id: 'blog.readArticleLabel', message: 'Read article: {title}'}, {title: post.title})}>
            <Translate id="blog.readArticle">Read article</Translate><span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
