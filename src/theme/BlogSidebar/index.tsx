/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogSidebar';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

export default function BlogSidebar({ sidebar }: Props): JSX.Element | null {
  if (sidebar.items.length === 0) {
    return null;
  }
  let categoryMap = {};
  if (sidebar.items[0].permalink.indexOf("/blog/") > -1) {

    // blog page
    sidebar.items.forEach(item => {
      if (item.permalink.indexOf("-") > -1) {
        let category = item.permalink.split("-")[0].split("/blog/")[1];
        if (categoryMap[category]) {
          categoryMap[category].push(item);
        } else {
          categoryMap[category] = [item];
        }
      }
    })
  } else {
    // news page
    categoryMap = { "": sidebar.items }
  }

  // console.log(categoryMap)
  return (
    <nav
      className={clsx(styles.sidebar, 'thin-scrollbar')}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: 'Blog recent posts navigation',
        description: 'The ARIA label for recent posts in the blog sidebar',
      })}>
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
        {sidebar.title}
      </div>
      <ul className={styles.sidebarItemList}>
        {Object.keys(categoryMap).map((category,index) => {
          return <>
            {category.length > 0 && <h4  key={index} className={styles.categoryHeader}>{category}</h4>}
            {categoryMap[category].map((item) => {
              return (
                <li key={item.permalink} className={styles.sidebarItem}>
                  <Link
                    isNavLink
                    to={item.permalink}
                    className={styles.sidebarItemLink}
                    activeClassName={styles.sidebarItemLinkActive}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </>
        })}
      </ul>
    </nav>
  );
}
