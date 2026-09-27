/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
        {Object.keys(categoryMap).map((category) => {
          return <React.Fragment key={category}>
            {category.length > 0 && <h4 className={styles.categoryHeader}>{category}</h4>}
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
          </React.Fragment>
        })}
      </ul>
    </nav>
  );
}
