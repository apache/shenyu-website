import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getHomepageContent } from '../data/homepage';
import styles from './Footer.module.css';
export default function Footer(): React.ReactElement {
  const copy = getHomepageContent();
  const logo = useBaseUrl('/img/logo-light.svg');
  const supportApacheLogo = useBaseUrl('/img/logo/support-apache.png');
  const foundationLogo = useBaseUrl('/img/logo/asf_logo.svg');
  const groups = [{
    title: copy.footerProject,
    links: [[copy.docs, '/document'], [copy.download, '/download'], [copy.blog, '/blog'], ['GitHub', 'https://github.com/apache/shenyu']]
  }, {
    title: copy.footerCommunity,
    links: [[copy.contribute, '/community/contributor-guide'], [copy.events, '/event'], [copy.mailingList, 'https://lists.apache.org/list.html?dev@shenyu.apache.org']]
  }, {
    title: copy.footerFoundation,
    links: [[copy.foundation, 'https://www.apache.org/'], [copy.license, 'https://www.apache.org/licenses/'], [copy.security, 'https://www.apache.org/security/'], [copy.privacy, 'https://privacy.apache.org/policies/privacy-policy-public.html'], [copy.sponsor, 'https://www.apache.org/foundation/sponsorship.html']]
  }];
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link to="/"><img src={logo} alt="Apache ShenYu" width="200" height="40" /></Link>
          <p>{copy.footerTagline}</p><span>Open source. Apache 2.0.</span>
          <div className={styles.apacheLogos}>
            <a href="https://www.apache.org/">
              <img src={supportApacheLogo} alt="Support Apache" width="64" height="64" />
            </a>
            <a className={styles.foundationLogo} href="https://www.apache.org/">
              <img src={foundationLogo} alt="The Apache Software Foundation" width="120" height="63" />
            </a>
          </div>
        </div>
        {groups.map(group => <div className={styles.group} key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label, to]) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul></div>)}
      </div>
      <div className={styles.legal}>
        <p>Copyright © {new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0.</p>
        <p>Apache ShenYu, Apache, the Apache feather logo, and the Apache ShenYu logo are trademarks of The Apache Software Foundation.</p>
      </div>
    </div>
  </footer>;
}
