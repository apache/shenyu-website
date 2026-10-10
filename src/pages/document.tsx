import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {useLatestVersion, useVersions} from '@docusaurus/plugin-content-docs/client';
import projects from '../data/docsInfo';
import shared from '../components/Blog.module.css';
import styles from './document.module.css';

export default function Document() {
  const latest = useLatestVersion('default');
  const versions = useVersions('default');
  const availableVersions = [latest, ...versions.filter(version => version.name !== latest.name && version.name !== latest.label && version.label !== latest.label)];
  const [selectedName, setSelectedName] = useState(latest.name);
  const selected = availableVersions.find(version => version.name === selectedName) ?? latest;
  const guides = [
    {to: '/docs/deployment/deployment-quick', title: translate({id: 'document.deploy', message: 'Start your gateway'}), description: translate({id: 'document.deployDescription', message: 'Get Admin and Bootstrap up and running.'})},
    {to: '/docs/quick-start/quick-start-http', title: translate({id: 'document.connect', message: 'Connect your first service'}), description: translate({id: 'document.connectDescription', message: 'Route an HTTP service through ShenYu.'})},
    {to: '/docs/user-guide/admin-usage/plugin-handle-explanation', title: translate({id: 'document.plugins', message: 'Configure plugins & rules'}), description: translate({id: 'document.pluginsDescription', message: 'Understand plugins, selectors, and rules.'})},
  ];

  return <Layout title={translate({id: 'document.title', message: 'Documentation'})} description={translate({id: 'document.description', message: 'Learn to deploy Apache ShenYu, connect your services, and build on the gateway ecosystem.'})}>
    <main className={shared.page}>
      <header className={shared.hero}><div className={shared.container}>
        <p className={shared.eyebrow}>APACHE SHENYU / DOCUMENTATION</p>
        <h1><Translate id="document.title">Documentation</Translate></h1>
        <p className={shared.intro}><Translate id="document.description">Learn to deploy Apache ShenYu, connect your services, and build on the gateway ecosystem.</Translate></p>
      </div></header>
      <div className={`${shared.container} ${styles.content}`}>
        <section className={styles.gateway} aria-labelledby="gateway-docs">
          <div className={styles.overview}>
            <span className={styles.badge}><Translate id="document.latest">Latest release</Translate> · {latest.label}</span>
            <h2 id="gateway-docs">Apache ShenYu</h2>
            <p className={styles.description}><Translate id="document.gatewayDescription">Everything you need to run your gateway: deployment, service integration, traffic management, and custom development.</Translate></p>
            <div className={styles.versionPicker}>
              <label htmlFor="documentation-version"><Translate id="document.version">Documentation version</Translate></label>
              <select id="documentation-version" value={selected.name} onChange={event => setSelectedName(event.target.value)}>
                {availableVersions.map(version => <option key={version.name} value={version.name}>{version.label}{version.name === latest.name ? ` · ${translate({id: 'document.current', message: 'Latest'})}` : ''}</option>)}
              </select>
            </div>
            <div className={styles.primaryActions}>
              <Link className={styles.primaryLink} to={selected.path} aria-label={translate({id: 'document.readVersion', message: 'Read documentation for {version}'}, {version: selected.label})}><Translate id="document.read">Read documentation</Translate><span aria-hidden="true"> →</span></Link>
              <Link to="/download"><Translate id="document.download">Download ShenYu</Translate><span aria-hidden="true"> ↓</span></Link>
            </div>
          </div>
          <div className={styles.guides}>
            <h3><Translate id="document.startHere">Start here</Translate><span>v{latest.label}</span></h3>
            <ul>{guides.map((guide, index) => <li key={guide.to}>
              <Link to={guide.to}><span className={styles.step} aria-hidden="true">0{index + 1}</span><div><h4>{guide.title}</h4><p>{guide.description}</p></div><span className={styles.arrow} aria-hidden="true">→</span></Link>
            </li>)}</ul>
          </div>
        </section>
        <section className={styles.ecosystem} aria-labelledby="ecosystem-docs">
          <div className={styles.sectionHeading}><h2 id="ecosystem-docs"><Translate id="document.ecosystem">Clients & deployment tools</Translate></h2><p><Translate id="document.ecosystemDescription">Find the guide for your language and deployment environment.</Translate></p></div>
          <ul className={styles.grid}>{projects.map(project => <li key={project.id}>
            <article className={styles.card}>
              <p className={styles.category}>{project.category}</p><h3>{project.projectName}</h3><p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.cardLinks}>
                <Link to={project.latestVersion} aria-label={translate({id: 'document.projectLabel', message: '{project} documentation'}, {project: project.projectName})}><Translate id="document.read">Read documentation</Translate><span aria-hidden="true"> →</span></Link>
                {project.nextVersion && <Link className={styles.next} to={project.nextVersion}><Translate id="document.next">Next version</Translate><span aria-hidden="true"> ↗</span></Link>}
              </div>
            </article>
          </li>)}</ul>
        </section>
        <aside className={styles.contribute}>
          <div><h2><Translate id="document.contributeTitle">Make the docs better</Translate></h2><p><Translate id="document.contributeDescription">Found a missing step or an unclear example? Help improve the documentation.</Translate></p></div>
          <Link to="/community/contributor-guide"><Translate id="document.contribute">Contribution guide</Translate><span aria-hidden="true"> →</span></Link>
        </aside>
      </div>
    </main>
  </Layout>;
}
