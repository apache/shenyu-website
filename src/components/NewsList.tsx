import React from 'react';
import Layout from '@theme/Layout';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/BlogListPage';
import {getPublication} from '../utils/publication';
import NewsItem from './NewsItem';
import styles from './Blog.module.css';

export default function NewsList(props: Props) {
  const {items, metadata} = props;
  const featured = !metadata.previousPage ? items[0] : undefined;
  const articles = featured ? items.slice(1) : items;
  const {root} = getPublication(metadata.permalink)!;

  return <HtmlClassNameProvider className={`${ThemeClassNames.wrapper.blogPages} ${ThemeClassNames.page.blogListPage}`}>
    <SearchMetadata tag="blog_posts_list" />
    <BlogListPageStructuredData {...props} />
    <Layout title={translate({id: 'news.title', message: 'ShenYu News'})} description={translate({id: 'news.description', message: 'Release announcements, community stories, and the latest from Apache ShenYu.'})}>
      <main className={styles.page}>
        <header className={styles.hero}><div className={styles.container}>
          <p className={styles.eyebrow}>APACHE SHENYU / NEWS</p>
          <h1 className={styles.newsHeading}><Translate id="news.heading">News from the community.</Translate></h1>
          <p className={styles.intro}><Translate id="news.description">Release announcements, community stories, and the latest from Apache ShenYu.</Translate></p>
        </div></header>
        <div className={`${styles.container} ${styles.listContent}`}>
          {featured && <NewsItem post={featured.content.metadata} featured />}
          <div className={styles.sectionHeader}>
            <h2><Translate id="news.updates">Community updates</Translate></h2>
            <nav aria-label={translate({id: 'news.browse', message: 'Browse news'})}>
              <Link to={`${root}/tags`}><Translate id="blog.topics">All topics</Translate><span aria-hidden="true"> ↗</span></Link>
              <Link to={`${root}/archive`}><Translate id="news.archive">News archive</Translate><span aria-hidden="true"> ↗</span></Link>
            </nav>
          </div>
          <div className={styles.newsList}>{articles.map(({content}) => <NewsItem key={content.metadata.permalink} post={content.metadata} />)}</div>
          <div className={styles.pagination}><BlogListPaginator metadata={metadata} /></div>
        </div>
      </main>
    </Layout>
  </HtmlClassNameProvider>;
}
