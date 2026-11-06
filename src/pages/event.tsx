import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import releases from '../data/event';
import shared from '../components/Blog.module.css';
import styles from './event.module.css';

const productNames = {
  gateway: 'Apache ShenYu',
  wasm: 'ShenYu WASM',
  nginx: 'ShenYu Nginx',
  dotnet: 'ShenYu .NET Client',
  golang: 'ShenYu Go Client',
};
const gatewayReleases = releases.filter(release => release.product === 'gateway');
const ecosystem = releases.filter(release => release.product !== 'gateway');

type Release = typeof releases[number];

function ReleaseCard({release, latest = false}: {release: Release; latest?: boolean}) {
  const name = productNames[release.product];
  return <li>
    <article className={`${styles.card} ${latest ? styles.latestCard : ''}`}>
      <div className={styles.cardMeta}>
        <span className={styles.version}>v{release.version}</span>
        {latest && <span className={styles.latestBadge}><Translate id="releases.latest">Latest gateway release</Translate></span>}
      </div>
      <h3><Link to={`/event/${release.src}`}>{name} {release.version}</Link></h3>
      <p className={styles.description}>{release.description}</p>
      <div className={styles.cardFooter}>
        <span>{name}</span>
        <Link to={`/event/${release.src}`} aria-label={translate({id: 'releases.notesLabel', message: 'Release notes: {name} {version}'}, {name, version: release.version})}>
          <Translate id="releases.notes">Release notes</Translate><span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  </li>;
}

export default function Event() {
  return <Layout title={translate({id: 'releases.title', message: 'Release notes'})} description={translate({id: 'releases.description', message: 'Explore new features, improvements, and fixes across the Apache ShenYu gateway and ecosystem.'})}>
    <main className={shared.page}>
      <header className={styles.hero}><div className={shared.container}>
        <p className={shared.eyebrow}>APACHE SHENYU / RELEASES</p>
        <h1><Translate id="releases.title">Release notes</Translate></h1>
        <p className={styles.intro}><Translate id="releases.description">Explore new features, improvements, and fixes across the Apache ShenYu gateway and ecosystem.</Translate></p>
        <nav className={styles.actions} aria-label={translate({id: 'releases.browse', message: 'Browse releases'})}>
          <Link to="/download"><Translate id="releases.download">Download ShenYu</Translate><span aria-hidden="true"> ↓</span></Link>
          <a href="#ecosystem-releases"><Translate id="releases.ecosystem">Ecosystem</Translate><span aria-hidden="true"> ↓</span></a>
        </nav>
      </div></header>
      <div className={`${shared.container} ${styles.content}`}>
        <section aria-labelledby="gateway-releases">
          <div className={styles.sectionHeading}><h2 id="gateway-releases"><Translate id="releases.gateway">Gateway releases</Translate></h2><span aria-hidden="true" /></div>
          <ul className={styles.grid}>{gatewayReleases.map((release, index) => <ReleaseCard key={release.src} release={release} latest={index === 0} />)}</ul>
        </section>
        <section className={styles.ecosystem} aria-labelledby="ecosystem-releases">
          <div className={styles.sectionHeading}><h2 id="ecosystem-releases"><Translate id="releases.ecosystem">Ecosystem</Translate></h2><span aria-hidden="true" /></div>
          <p className={styles.sectionIntro}><Translate id="releases.ecosystemDescription">Release notes for WASM, Nginx, and multi-language clients.</Translate></p>
          <ul className={styles.grid}>{ecosystem.map(release => <ReleaseCard key={release.src} release={release} />)}</ul>
        </section>
      </div>
    </main>
  </Layout>;
}
