import React from 'react';
import Layout from '@theme/Layout';
import OriginalBlogTagsListPage from '@theme-original/BlogTagsListPage';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/BlogTagsListPage';
import {getPublication} from '../../utils/publication';
import styles from '../../components/Blog.module.css';

export default function BlogTagsListPage(props: Props) {
  const {pathname} = useLocation();
  const publication = getPublication(pathname);
  if (!publication) return <OriginalBlogTagsListPage {...props} />;
  const {root, isNews} = publication;
  const tags = [...props.tags].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'en', {sensitivity: 'base'}));
  const description = isNews ? translate({id: 'news.topicsDescription', message: 'Explore release announcements and community stories by topic.'}) : translate({id: 'blog.topicsDescription', message: 'Explore source code, plugins, and engineering practices by topic.'});

  return <HtmlClassNameProvider className={`${ThemeClassNames.wrapper.blogPages} ${ThemeClassNames.page.blogTagsListPage}`}>
    <SearchMetadata tag="blog_tags_list" />
    <Layout title={translate({id: 'blog.topics', message: 'All topics'})} description={description}>
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>APACHE SHENYU / {isNews ? 'NEWS' : 'BLOG'}</p>
            <h1><Translate id="blog.topics">All topics</Translate></h1>
            <p className={styles.intro}>{description}</p>
          </div>
        </header>
        <div className={`${styles.container} ${styles.topicsContent}`}>
          <div className={styles.topicsToolbar}>
            <Link to={root}><span aria-hidden="true">← </span>{isNews ? <Translate id="news.back">Back to news</Translate> : <Translate id="blog.back">Back to blog</Translate>}</Link>
            <Link to={`${root}/archive`}>{isNews ? <Translate id="news.archive">News archive</Translate> : <Translate id="blog.archive">Archive</Translate>}<span aria-hidden="true"> ↗</span></Link>
          </div>
          <ul className={styles.topicList}>
            {tags.map(tag => <li key={tag.permalink}>
              <Link className={styles.topicLink} to={tag.permalink}>
                <span className={styles.topicName}>{tag.label}</span>
                <span className={styles.topicCount}>{tag.count}</span>
              </Link>
            </li>)}
          </ul>
        </div>
      </main>
    </Layout>
  </HtmlClassNameProvider>;
}
