import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {A11y} from 'swiper';
import 'swiper/css';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { getHomepageContent } from '../data/homepage';
import users from '../data/user';
import styles from './index.module.css';
const quickStart = '/docs/deployment/deployment-quick';
function Arrow({
  diagonal = false
}: {
  diagonal?: boolean;
}) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}
function FeatureIcon({
  type
}: {
  type: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    proxy: <><path d="M4 7h6m4 0h6M4 17h6m4 0h6M7 4v6m10 4v6M10 7l4 10" /><circle cx="17" cy="7" r="3" /><circle cx="7" cy="17" r="3" /></>,
    security: <><path d="M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" /><path d="m8 12 3 3 5-6" /></>,
    governance: <><path d="M4 6h16M4 12h16M4 18h16" /><path d="M8 3v6m8 0v6m-6 0v6" /></>,
    observe: <path d="M3 17h3l3-9 4 12 3-15 3 9h3" />,
    extend: <path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18" />,
    deploy: <path d="m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}
function RequestFlow({
  copy
}: {
  copy: ReturnType<typeof getHomepageContent>;
}) {
  const mark = useBaseUrl('/img/favicon.svg');
  return <div className={styles.flow}>
      <div className={styles.flowTop}><span className={styles.statusDot} />{copy.flowLabel}<span className={styles.flowIndex}>01 — 03</span></div>
      <div className={styles.flowBody}>
        <div className={styles.flowHeading}><span>01</span>{copy.incoming}</div>
        <div className={styles.protocols}>{['HTTP / REST', 'Dubbo', 'gRPC', 'WebSocket'].map(protocol => <span key={protocol}>{protocol}</span>)}</div>
        <div className={styles.flowConnector} aria-hidden="true"><span>↓</span></div>
        <div className={styles.gateway}>
          <div className={styles.gatewayName}><img src={mark} alt="" width="27" height="36" /><div><strong>Apache ShenYu</strong><span>{copy.gateway}</span></div><span className={styles.gatewayNumber}>02</span></div>
          <div className={styles.pipeline}>{[copy.auth, copy.route, copy.observe].map((step, index) => <React.Fragment key={step}>{index > 0 && <Arrow />}<span>{step}</span></React.Fragment>)}</div>
        </div>
        <div className={styles.flowConnector} aria-hidden="true"><span>↓</span></div>
        <div className={styles.flowHeading}><span>03</span>{copy.upstream}</div>
        <div className={styles.services}><span>Spring Cloud</span><span>Dubbo</span><span>gRPC</span></div>
      </div>
      <div className={styles.flowBottom}><span aria-hidden="true">↳</span>{copy.flowNote}</div>
    </div>;
}
function DiagramDeck({copy}: {copy: ReturnType<typeof getHomepageContent>}) {
  const [active, setActive] = useState<'flow' | 'architecture'>('architecture');
  const architecture = useBaseUrl('/img/architecture/shenyu-readme-architecture.png');
  return <div className={styles.diagramDeck} role="group" aria-label={copy.diagramSwitcher}>
    <div className={styles.deckStage}>
      <div className={`${styles.deckCard} ${active === 'flow' ? styles.frontCard : styles.backCard}`}>
        <div aria-hidden={active !== 'flow'} className={styles.cardContent}><RequestFlow copy={copy} /></div>
        {active !== 'flow' && <button type="button" className={styles.revealCard} aria-label={copy.showFlow} title={copy.showFlow} onClick={() => setActive('flow')} />}
      </div>
      <div className={`${styles.deckCard} ${active === 'architecture' ? styles.frontCard : styles.backCard}`}>
        <div aria-hidden={active !== 'architecture'} className={styles.cardContent}>
          <div className={`${styles.flow} ${styles.architectureCard}`}>
            <div className={styles.flowTop}><span className={styles.statusDot} />{copy.architectureTitle}<span className={styles.flowIndex}>01 / 02</span></div>
            <a className={styles.architectureImage} href={architecture} target="_blank" rel="noopener noreferrer" tabIndex={active === 'architecture' ? 0 : -1} aria-label={copy.architectureEnlarge}>
              <img src={architecture} alt={copy.architectureAlt} width="3360" height="2016" />
            </a>
            <div className={styles.architectureCaption}><p>{copy.architectureDescription}</p><a href={architecture} target="_blank" rel="noopener noreferrer" tabIndex={active === 'architecture' ? 0 : -1}>{copy.architectureEnlarge}<Arrow diagonal /></a></div>
          </div>
        </div>
        {active !== 'architecture' && <button type="button" className={styles.revealCard} aria-label={copy.showArchitecture} title={copy.showArchitecture} onClick={() => setActive('architecture')} />}
      </div>
    </div>
    <div className={styles.deckControls}>
      <button type="button" aria-pressed={active === 'architecture'} onClick={() => setActive('architecture')}>01<span>{copy.architectureTab}</span></button>
      <button type="button" aria-pressed={active === 'flow'} onClick={() => setActive('flow')}>02<span>{copy.flowTab}</span></button>
    </div>
  </div>;
}
function AdminGallery({copy}: {copy: ReturnType<typeof getHomepageContent>}) {
  const swiper = useRef<SwiperCore | null>(null);
  const [active, setActive] = useState(0);
  const imageBase = useBaseUrl('/img/home/');
  const screenshots = [1, 2, 3, 4, 5, 6, 7, 8];
  return <figure className={styles.dashboard} role="region" aria-label={copy.adminCaption} aria-roledescription={copy.adminGalleryRole} onKeyDown={event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); swiper.current?.slidePrev(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); swiper.current?.slideNext(); }
  }}>
    <Swiper className={styles.adminSwiper} modules={[A11y]} loop grabCursor resizeObserver={false} onSwiper={instance => {swiper.current = instance;}} onSlideChange={instance => setActive(instance.realIndex)} a11y={{slideLabelMessage: '{{index}} / {{slidesLength}}'}}>
      {screenshots.map(number => <SwiperSlide key={number}><img src={`${imageBase}2_${number}.jpg`} alt={`${copy.adminAlt} (${number} / ${screenshots.length})`} loading="lazy" width="1920" height="1023" /></SwiperSlide>)}
    </Swiper>
    <figcaption><span className={styles.statusDot} /><span>{copy.adminCaption}</span><span className={styles.adminCount} aria-live="polite" aria-atomic="true">{active + 1} / {screenshots.length}</span></figcaption>
    <div className={styles.adminControls}>
      <button type="button" className={styles.adminArrow} aria-label={copy.adminPrevious} onClick={() => swiper.current?.slidePrev()}><span aria-hidden="true">←</span></button>
      <div className={styles.adminDots}>{screenshots.map((number, index) => <button key={number} type="button" aria-label={`${copy.adminShowSlide} ${number}`} aria-pressed={active === index} onClick={() => swiper.current?.slideToLoop(index)}><span /></button>)}</div>
      <button type="button" className={styles.adminArrow} aria-label={copy.adminNext} onClick={() => swiper.current?.slideNext()}><span aria-hidden="true">→</span></button>
    </div>
  </figure>;
}
export default function Home() {
  const copy = getHomepageContent();
  const {
    i18n: {
      currentLocale
    }
  } = useDocusaurusContext();
  const baseUrl = useBaseUrl('/');
  const features = [{
    type: 'proxy',
    title: copy.proxyTitle,
    body: copy.proxyBody,
    to: '/docs/quick-start/quick-start-http'
  }, {
    type: 'security',
    title: copy.securityTitle,
    body: copy.securityBody,
    to: '/docs/plugin-center/security/jwt-plugin'
  }, {
    type: 'governance',
    title: copy.governanceTitle,
    body: copy.governanceBody,
    to: '/docs/plugin-center/fault-tolerance/rate-limiter-plugin'
  }, {
    type: 'observe',
    title: copy.observeTitle,
    body: copy.observeBody,
    to: '/docs/plugin-center/observability/metrics-plugin'
  }, {
    type: 'extend',
    title: copy.extendTitle,
    body: copy.extendBody,
    to: '/docs/developer/custom-plugin'
  }, {
    type: 'deploy',
    title: copy.deployTitle,
    body: copy.deployBody,
    to: '/docs/deployment/deployment-docker-compose'
  }];
  return <Layout title={currentLocale === 'zh' ? 'Java 原生多协议 API 网关' : 'Java-native, multi-protocol API Gateway'} description={copy.intro}>
      <main className={styles.home}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1 id="hero-title">{copy.headline}<br /><span>{copy.headlineAccent}</span></h1>
                <p className={styles.heroDescription}>{copy.intro}</p>
                <div className={styles.actions}>
                  <Link className={styles.primaryButton} to={quickStart}>{copy.getStarted}<Arrow /></Link>
                  <Link className={styles.secondaryButton} to="https://github.com/apache/shenyu">{copy.github}<Arrow diagonal /></Link>
                </div>
                <p className={styles.openSource}><span aria-hidden="true">◈</span>{copy.openSource}</p>
              </div>
              <DiagramDeck copy={copy} />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="features-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>{copy.featuresEyebrow}</p><h2 id="features-title">{copy.featuresTitle}</h2></div><p>{copy.featuresIntro}</p></div>
          <div className={styles.featureGrid}>
            {features.map(feature => <Link key={feature.type} to={feature.to} className={styles.featureCard}>
              <div className={styles.featureIcon}><FeatureIcon type={feature.type} /></div>
              <h3>{feature.title}</h3><p>{feature.body}</p>
              <span className={styles.featureLink}>{copy.learnMore}<Arrow /></span>
            </Link>)}
          </div>
        </section>

        <section className={styles.adminSection} aria-labelledby="admin-title">
          <div className={`${styles.container} ${styles.adminGrid}`}>
            <div><p className={styles.eyebrow}>{copy.adminEyebrow}</p><h2 id="admin-title">{copy.adminTitle}</h2><p className={styles.bodyCopy}>{copy.adminBody}</p>
              <ul className={styles.checklist}>{[copy.adminPoint1, copy.adminPoint2, copy.adminPoint3].map(point => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
              <Link className={styles.textLink} to="/docs/user-guide/admin-usage/selector-and-rule">{copy.adminLink}<Arrow /></Link>
            </div>
            <AdminGallery copy={copy} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.container} ${styles.usersSection}`} aria-labelledby="users-title">
          <p className={styles.eyebrow}>{copy.usersEyebrow}</p><h2 id="users-title">{copy.usersTitle}</h2>
          <div className={styles.userLogos}>{users.slice(0, 5).map(user => <Link to="/users" key={user.name} className={styles.userLogo}><img src={`${baseUrl}${user.src.replace(/^\//, '')}`} alt={user.name} loading="lazy" width="140" height="56" /></Link>)}</div>
          <Link className={styles.textLink} to="/users">{copy.usersLink}<Arrow /></Link>
        </section>

        <section className={`${styles.container} ${styles.communitySection}`} aria-labelledby="community-title">
          <div className={styles.communityMain}><p className={styles.eyebrow}>{copy.communityEyebrow}</p><h2 id="community-title">{copy.communityTitle}</h2><p>{copy.communityBody}</p><Link className={styles.primaryButton} to="/community/contributor-guide">{copy.communityLink}<Arrow /></Link></div>
          <div className={styles.communityResources}>
            <Link to="/news"><span className={styles.resourceNumber}>01 / NEWS</span><h3>{copy.newsTitle}<Arrow diagonal /></h3><p>{copy.newsBody}</p></Link>
            <Link to="/blog"><span className={styles.resourceNumber}>02 / BLOG</span><h3>{copy.blogTitle}<Arrow diagonal /></h3><p>{copy.blogBody}</p></Link>
          </div>
        </section>
      </main>
    </Layout>;
}
