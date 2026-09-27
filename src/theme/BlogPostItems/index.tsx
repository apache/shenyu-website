import React from 'react';
import OriginalBlogPostItems from '@theme-original/BlogPostItems';
import type {Props} from '@theme/BlogPostItems';
import BlogCard from '../../components/BlogCard';
import NewsItem from '../../components/NewsItem';
import {getPublication} from '../../utils/publication';
import styles from '../../components/Blog.module.css';

export default function BlogPostItems(props: Props) {
  if (!props.component && props.items.length > 0 && props.items.every(({content}) => getPublication(content.metadata.permalink)?.isNews)) {
    return <div className={styles.newsList}>{props.items.map(({content}) => <NewsItem key={content.metadata.permalink} post={content.metadata} />)}</div>;
  }
  if (props.component || !props.items.every(({content}) => /(^|\/)blog\//.test(content.metadata.permalink))) {
    return <OriginalBlogPostItems {...props} />;
  }
  return <div className={styles.grid}>{props.items.map(({content}) => <BlogCard key={content.metadata.permalink} post={content.metadata} />)}</div>;
}
