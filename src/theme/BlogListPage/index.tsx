import React from 'react';
import Layout from '@theme/Layout';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/BlogListPage';
import BlogCard from '../../components/BlogCard';
import NewsList from '../../components/NewsList';
import {getPublication} from '../../utils/publication';
import styles from '../../components/Blog.module.css';

export default function BlogListPage(props: Props) {
  const {items, metadata} = props;
  if (getPublication(metadata.permalink)?.isNews) return <NewsList {...props} />;
  if (!/(^|\/)blog(\/|$)/.test(metadata.permalink)) return <OriginalBlogListPage {...props} />;
  const firstPage = !metadata.previousPage;
  const featured = firstPage ? items[0] : undefined;
  const articles = featured ? items.slice(1) : items;
  const blogRoot = metadata.permalink.split('/blog')[0] + '/blog';

  return <HtmlClassNameProvider className={`${ThemeClassNames.wrapper.blogPages} ${ThemeClassNames.page.blogListPage}`}>
    <SearchMetadata tag="blog_posts_list" />
    <BlogListPageStructuredData {...props} />
    <Layout title={translate({id: 'blog.title', message: 'ShenYu Blog'})} description={translate({id: 'blog.description', message: 'Engineering insights, source code deep dives, and practical guides from the Apache ShenYu community.'})}>
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>APACHE SHENYU / BLOG</p>
            <h1><Translate id="blog.heading">Inside ShenYu.</Translate></h1>
            <p className={styles.intro}><Translate id="blog.description">Engineering insights, source code deep dives, and practical guides from the Apache ShenYu community.</Translate></p>
          </div>
        </header>
        <div className={`${styles.container} ${styles.listContent}`}>
          {featured && <BlogCard post={featured.content.metadata} featured />}
          <div className={styles.sectionHeader}>
            <h2><Translate id="blog.articles">Explore the articles</Translate></h2>
            <nav aria-label={translate({id: 'blog.browse', message: 'Browse blog'})}>
              <Link to={`${blogRoot}/tags`}><Translate id="blog.topics">All topics</Translate><span aria-hidden="true"> ↗</span></Link>
              <Link to={`${blogRoot}/archive`}><Translate id="blog.archive">Archive</Translate><span aria-hidden="true"> ↗</span></Link>
            </nav>
          </div>
          <div className={styles.grid}>{articles.map(({content}) => <BlogCard key={content.metadata.permalink} post={content.metadata} />)}</div>
          <div className={styles.pagination}><BlogListPaginator metadata={metadata} /></div>
          <aside className={styles.contribute}>
            <div><h2><Translate id="blog.shareTitle">Have a ShenYu story to share?</Translate></h2><p><Translate id="blog.shareDescription">Share what you have built, learned, or discovered with the community.</Translate></p></div>
            <Link to="/community/contributor-guide"><Translate id="blog.contribute">Contribution guide</Translate><span aria-hidden="true"> ↗</span></Link>
          </aside>
        </div>
      </main>
    </Layout>
  </HtmlClassNameProvider>;
}
