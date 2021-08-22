import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

import clsx from 'clsx';

import styles from './styles.module.css';

function Home() {
  const {
    siteConfig: {
      customFields: {description},
      tagline,
    },
  } = useDocusaurusContext();
  return (
    <Layout title={tagline} description={description as string}>
      <main>
        <div className={styles.hero}>
          <div className="row"  style={{alignItems:"center"}}>
            <div className="col col--5  col--offset-1">
              <h1 className={styles.heroProjectTitle}>
                Apache ShenYu <span className={styles.heroProjectSubTitle}>Incubating</span>
              </h1>
              <h3 className={styles.heroProjectTagline}>
                <span
                  className={styles.heroTitleTextHtml}
                  dangerouslySetInnerHTML={{
                    __html: translate({
                      id: 'homepage.hero.title',
                      message:
                        'High-performance,<b>multi-protocol</b>,extensible,<b>responsive</b> API Gateway',
                      description:
                        'Home page hero title, can contain simple html tags',
                    }),
                  }}
                />
              </h3>
              <span
                  className={styles.heroDesc}
                  dangerouslySetInnerHTML={{
                    __html: translate({
                      id: 'homepage.hero.desc',
                      message:
                        'Compatible with a variety of mainstream framework systems, support hot plug, users can customize the development, meet the current situation and future needs of users in a variety of scenarios, experienced the temper of large-scale scenes',
                      description:
                        'Home page hero title, can contain simple html tags',
                    }),
                  }}
                />
              <div className={styles.indexCtas}>
                <Link className="button button--primary" to="/docs/intro">
                  <Translate>Get Started</Translate>
                </Link>
                <Link className="button button--info" to="https://github.com/apache/incubator-shenyu/releases">
                  <Translate>Download</Translate>
                </Link>
                <span className={styles.indexCtasGitHubButtonWrapper}>
                  <iframe
                    className={styles.indexCtasGitHubButton}
                    src="https://ghbtns.com/github-btn.html?user=apache&amp;repo=incubator-shenyu&amp;type=star&amp;count=true&amp;size=large"
                    width={160}
                    height={30}
                    title="GitHub Stars"
                  />
                </span>
              </div>
            </div>
            <div className="col col--5 ">
              <img  alt={translate({message: 'Docusaurus with Keytar'})}
                className={styles.heroLogo}
                src={useBaseUrl('/img/shenyu-framework.png')}
              /> 
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className="container text--center margin-bottom--xl">
            <div className="row">
              <div className="col">
                <img
                  className={styles.featureImage}
                  alt="Powered by MDX"
                  src={useBaseUrl('/img/undraw_typewriter.svg')}
                />
                <h2 className={clsx(styles.featureHeading)}>
                  <Translate>Powered by Markdown</Translate>
                </h2>
                <p className="padding-horiz--md">
                  <Translate>
                    Save time and focus on your project's documentation. Simply
                    write docs and blog posts with Markdown/MDX and Docusaurus
                    will publish a set of static HTML files ready to serve. You
                    can even embed JSX components into your Markdown thanks to
                    MDX.
                  </Translate>
                </p>
              </div>
              <div className="col">
                <img
                  alt="Built Using React"
                  className={styles.featureImage}
                  src={useBaseUrl('/img/undraw_react.svg')}
                />
                <h2 className={clsx(styles.featureHeading)}>
                  <Translate>Built Using React</Translate>
                </h2>
                <p className="padding-horiz--md">
                  <Translate>
                    Extend or customize your project's layout by reusing React.
                    Docusaurus can be extended while reusing the same header and
                    footer.
                  </Translate>
                </p>
              </div>
              <div className="col">
                <img
                  alt="Ready for Translations"
                  className={styles.featureImage}
                  src={useBaseUrl('/img/undraw_around_the_world.svg')}
                />
                <h2 className={clsx(styles.featureHeading)}>
                  <Translate>Ready for Translations</Translate>
                </h2>
                <p className="padding-horiz--md">
                  <Translate>
                    Localization comes pre-configured. Use Crowdin to translate
                    your docs into over 70 languages.
                  </Translate>
                </p>
              </div>
            </div>
          </div>
          <div className="container text--center">
            <div className="row">
              <div className="col col--4 col--offset-2">
                <img
                  alt="Document Versioning"
                  className={styles.featureImage}
                  src={useBaseUrl('/img/undraw_version_control.svg')}
                />
                <h2 className={clsx(styles.featureHeading)}>
                  <Translate>Document Versioning</Translate>
                </h2>
                <p className="padding-horiz--md">
                  <Translate>
                    Support users on all versions of your project. Document
                    versioning helps you keep documentation in sync with project
                    releases.
                  </Translate>
                </p>
              </div>
              <div className="col col--4">
                <img
                  alt="Document Search"
                  className={styles.featureImage}
                  src={useBaseUrl('/img/undraw_algolia.svg')}
                />
                <h2 className={clsx(styles.featureHeading)}>
                  <Translate>Content Search</Translate>
                </h2>
                <p className="padding-horiz--md">
                  <Translate>
                    Make it easy for your community to find what they need in
                    your documentation. We proudly support Algolia documentation
                    search.
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
