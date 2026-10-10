import React, {useState} from 'react';
import {FaDocker} from 'react-icons/fa';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {gatewayVersions, gatewayDistribution, ecosystemDownloads, distribution, signingKeys, releaseArchive} from '../data/downloads';
import shared from '../components/Blog.module.css';
import styles from './download.module.css';

function Checks({files}: {files: ReturnType<typeof distribution>}) {
  return <span className={styles.checks}>
    <a href={files.asc} aria-label={`PGP (ASC): ${files.filename}`}>ASC</a>
    <span aria-hidden="true">·</span>
    <a href={files.sha512} aria-label={`SHA-512: ${files.filename}`}>SHA-512</a>
  </span>;
}

export default function Download() {
  const [version, setVersion] = useState(gatewayVersions[0]);
  const source = gatewayDistribution(version, 'source');
  const packages = [
    {kind: 'source' as const, title: translate({id: 'download.source', message: 'Source code'}), label: 'SOURCE / ZIP', description: translate({id: 'download.sourceDescription', message: 'The complete Apache ShenYu source. Build, customize, and contribute.'})},
    {kind: 'admin' as const, title: 'ShenYu Admin', label: 'BINARY / TAR.GZ', description: translate({id: 'download.adminDescription', message: 'The management console for configuring plugins, rules, and gateway traffic.'})},
    {kind: 'bootstrap' as const, title: 'ShenYu Bootstrap', label: 'BINARY / TAR.GZ', description: translate({id: 'download.bootstrapDescription', message: 'The gateway runtime. Start your gateway with a ready-to-run distribution.'})},
  ];
  return <Layout title={translate({id: 'download.title', message: 'Download Apache ShenYu'})} description={translate({id: 'download.description', message: 'Get the Apache ShenYu source code, gateway distributions, and ecosystem packages.'})}>
    <main className={`${shared.page} ${styles.page}`}>
      <header className={shared.hero}><div className={shared.container}>
        <p className={shared.eyebrow}>APACHE SHENYU / DOWNLOAD</p>
        <h1><Translate id="download.title">Download Apache ShenYu</Translate></h1>
        <p className={shared.intro}><Translate id="download.description">Get the Apache ShenYu source code, gateway distributions, and ecosystem packages.</Translate></p>
      </div></header>
      <div className={`${shared.container} ${styles.content}`}>
        <section aria-labelledby="gateway-downloads">
          <div className={styles.heading}>
            <div><h2 id="gateway-downloads"><Translate id="download.gateway">Gateway distributions</Translate></h2><p><Translate id="download.gatewayDescription">Official source releases, with binary packages provided for convenience.</Translate></p></div>
            <div className={styles.versionPicker}><label htmlFor="gateway-version"><Translate id="download.version">Version</Translate></label>
              <select id="gateway-version" value={version} onChange={event => setVersion(event.target.value)}>{gatewayVersions.map((value, index) => <option key={value} value={value}>{value}{index === 0 ? ` · ${translate({id: 'download.latest', message: 'Latest'})}` : ''}</option>)}</select>
            </div>
          </div>
          <div className={styles.packages}>{packages.map(pkg => {
            const files = gatewayDistribution(version, pkg.kind);
            return <article className={`${styles.card} ${pkg.kind === 'source' ? styles.sourceCard : ''}`} key={pkg.kind}>
              <p className={styles.packageLabel}>{pkg.label}</p><h3>{pkg.title}</h3><p className={styles.packageDescription}>{pkg.description}</p>
              <p className={styles.filename}>{files.filename}</p>
              <a className={styles.downloadButton} href={files.download} aria-label={translate({id: 'download.packageLabel', message: 'Download {name} {version}'}, {name: pkg.title, version})}><Translate id="download.action">Download</Translate><span aria-hidden="true"> ↓</span></a>
              <div className={styles.cardFooter}>
                <a href="#verify"><Translate id="download.verifyFiles">Verify</Translate></a>
                <span className={styles.cardLinks}>
                  {pkg.kind !== 'source' && <a className={styles.dockerLink} href={`https://hub.docker.com/r/apache/shenyu-${pkg.kind}`} aria-label={`Docker Hub: ${pkg.title}`} title={`Docker Hub: ${pkg.title}`}><FaDocker aria-hidden="true" focusable="false" /></a>}
                  <Checks files={files} />
                </span>
              </div>
            </article>;
          })}</div>
          <nav className={styles.gatewayLinks} aria-label={translate({id: 'download.resources', message: 'Release resources'})}>
            <Link to={`/event/${version}-release`}><Translate id="download.releaseNotes">Release notes</Translate> →</Link>
            <a href="#verify"><Translate id="download.howToVerify">How to verify</Translate> ↓</a>
            <a href={releaseArchive}><Translate id="download.allReleases">All releases</Translate> ↗</a>
          </nav>
        </section>
        <section className={styles.section} aria-labelledby="ecosystem-downloads">
          <div className={styles.heading}><div><h2 id="ecosystem-downloads"><Translate id="download.ecosystem">Clients & extensions</Translate></h2><p><Translate id="download.ecosystemDescription">Source releases for multi-language clients, Nginx, and WebAssembly.</Translate></p></div></div>
          <ul className={styles.ecosystemList}>{ecosystemDownloads.map(pkg => {
            const files = distribution(pkg.path);
            return <li key={pkg.name}><div className={styles.ecosystemName}><h3>ShenYu {pkg.name}</h3><span>v{pkg.version}</span></div><span className={styles.format}>{pkg.path.endsWith('.zip') ? 'ZIP' : 'TAR.GZ'}</span><div className={styles.ecosystemActions}><a href={files.download} aria-label={translate({id: 'download.packageLabel', message: 'Download {name} {version}'}, {name: `ShenYu ${pkg.name}`, version: pkg.version})}><Translate id="download.action">Download</Translate> ↓</a><Checks files={files} /></div></li>;
          })}</ul>
        </section>
        <section id="verify" className={`${styles.section} ${styles.verification}`} aria-labelledby="verify-title">
          <div><p className={shared.eyebrow}>VERIFY YOUR DOWNLOAD</p><h2 id="verify-title"><Translate id="download.verifyTitle">Verify your download</Translate></h2><p><Translate id="download.verifyDescription">Verify the signature and checksum before using a release. Download KEYS and the matching ASC and SHA-512 files from Apache.</Translate></p><a className={styles.keysLink} href={signingKeys}><Translate id="download.keys">Download signing keys (KEYS)</Translate> ↗</a></div>
          <div className={styles.instructions}>
            <h3><span>01</span><Translate id="download.signature">Verify the PGP signature</Translate></h3>
            <p><Translate id="download.signatureHelp">Example for the selected source release. Save the package, its ASC signature, and KEYS in the same directory, then run:</Translate></p>
            <CodeBlock language="bash">{`gpg --import KEYS\ngpg --verify ${source.filename}.asc ${source.filename}`}</CodeBlock>
            <h3><span>02</span><Translate id="download.checksum">Compare the SHA-512 checksum</Translate></h3>
            <p><Translate id="download.checksumHelp">Run the command for your system and compare the output with the downloaded SHA-512 file.</Translate></p>
            <CodeBlock language="bash">{`# Linux\nsha512sum ${source.filename}\n\n# macOS\nshasum -a 512 ${source.filename}`}</CodeBlock>
          </div>
        </section>
        <section className={styles.resources} aria-label={translate({id: 'download.moreResources', message: 'More resources'})}>
          <div><h2><Translate id="download.archiveTitle">Looking for an older release?</Translate></h2><p><Translate id="download.archiveDescription">Browse the full Apache ShenYu release archive.</Translate></p><a href={releaseArchive}><Translate id="download.openArchive">Browse archive</Translate> ↗</a></div>
          <div><h2><Translate id="download.pdfTitle">Documentation to go</Translate></h2><p><Translate id="download.pdfDescription">Read the ShenYu documentation offline as a PDF.</Translate></p><div className={styles.pdfLinks}><a href="https://shenyu.apache.org/pdf/apache_shenyu_docs_en.pdf">English PDF ↗</a><a href="https://shenyu.apache.org/pdf/apache_shenyu_docs_zh.pdf">中文 PDF ↗</a></div></div>
        </section>
      </div>
    </main>
  </Layout>;
}
