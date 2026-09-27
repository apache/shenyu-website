import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import users from '../data/user';
import styles from './users.module.css';

const websiteRepository = 'https://github.com/apache/shenyu-website';
const registrationUrl = `${websiteRepository}/blob/main/src/data/user.js`;
const editUsersUrl = `${websiteRepository}/edit/main/src/data/user.js`;
const logosUrl = `${websiteRepository}/tree/main/static/img/users`;
const userRows = Array.from({ length: 5 }, (_, row) => users.filter((_, index) => index % 5 === row));

function UserCard({ user, duplicate = false }: { user: (typeof users)[number]; duplicate?: boolean }) {
  const imageUrl = useBaseUrl(user.src);
  const logo = <img src={imageUrl} alt={user.name} loading="eager" width="104" height="36" />;
  return <li aria-hidden={duplicate || undefined}>
    {user.link
      ? <a className={styles.card} href={user.link} title={user.name} tabIndex={duplicate ? -1 : undefined} target="_blank" rel="noopener noreferrer">{logo}<span className={styles.srOnly}> — {translate({ id: 'users.refresh.external', message: 'Visit website (opens in a new tab)' })}</span></a>
      : <div className={styles.card} title={user.name}>{logo}</div>}
  </li>;
}

export default function Users() {
  const copy = {
    title: translate({ id: 'users.refresh.title', message: 'Our users' }),
    eyebrow: translate({ id: 'users.refresh.eyebrow', message: 'APACHE SHENYU / COMMUNITY' }),
    headline: translate({ id: 'users.refresh.headline', message: 'Built in the open.' }),
    accent: translate({ id: 'users.refresh.accent', message: 'Used in the real world.' }),
    intro: translate({ id: 'users.refresh.intro', message: 'Meet the teams and organizations using Apache ShenYu to connect their services. Different businesses, one open-source community.' }),
    register: translate({ id: 'users.refresh.register', message: 'Add your organization' }),
    start: translate({ id: 'users.refresh.start', message: 'Get started with ShenYu' }),
    directory: translate({ id: 'users.refresh.directory', message: 'Our community in production' }),
    note: translate({ id: 'users.refresh.note', message: 'Known users of all or part of Apache ShenYu in production. Listed in no particular order.' }),
    joinTitle: translate({ id: 'users.refresh.joinTitle', message: 'Your team belongs here, too.' }),
    editUsers: translate({ id: 'users.refresh.editUsers', message: 'Edit the user list' }),
    joinNote: translate({ id: 'users.refresh.joinNote', message: 'Fork the website repository and submit your changes to the main branch.' }),
  };

  return <Layout title={copy.title} description={copy.intro}>
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="users-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="users-title">{copy.headline}<br /><span>{copy.accent}</span></h1>
            <p className={styles.intro}>{copy.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href={registrationUrl} target="_blank" rel="noopener noreferrer">{copy.register}<span aria-hidden="true">↗</span></a>
              <Link className={styles.textLink} to="/docs/deployment/deployment-quick">{copy.start}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.directory}`} aria-labelledby="directory-title">
        <div className={styles.directoryHeader}>
          <div><h2 id="directory-title">{copy.directory}</h2><p>{copy.note}</p></div>
        </div>
        <div className={styles.marquee} id="user-directory">
          {userRows.map((row, index) => <div className={styles.marqueeRow} key={index}>
            <div className={`${styles.track} ${index % 2 ? styles.reverse : ''}`} style={{ '--row-duration': `${row.length * 4}s` } as React.CSSProperties}>
              <ul className={styles.logoGroup}>{row.map(user => <UserCard user={user} key={user.name} />)}</ul>
              <ul className={`${styles.logoGroup} ${styles.duplicate}`} aria-hidden="true">{row.map(user => <UserCard user={user} key={user.name} duplicate />)}</ul>
            </div>
          </div>)}
        </div>
      </section>

      <section className={`${styles.container} ${styles.join}`} aria-labelledby="join-title">
        <div><p className={styles.eyebrow}>GROW WITH SHENYU</p><h2 id="join-title">{copy.joinTitle}</h2>
          <p><Translate id="users.refresh.joinInstructions" values={{
            logos: <a href={logosUrl} target="_blank" rel="noopener noreferrer"><code>static/img/users/</code></a>,
            users: <a href={registrationUrl} target="_blank" rel="noopener noreferrer"><code>src/data/user.js</code></a>,
            repository: <a href={websiteRepository} target="_blank" rel="noopener noreferrer">apache/shenyu-website</a>,
          }}>{'Using Apache ShenYu? Add your logo to {logos}, add your company name, logo path and website to {users}, then submit a pull request to {repository}.'}</Translate></p>
        </div>
        <div className={styles.joinAction}><a className={styles.primaryButton} href={editUsersUrl} target="_blank" rel="noopener noreferrer">{copy.editUsers}<span aria-hidden="true">↗</span></a><span>{copy.joinNote}</span></div>
      </section>
    </main>
  </Layout>;
}
