import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import FeatureCard from './FeatureCard';

import styles from './Features.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  Navigation
} from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FEATURES = [
  {
    image: '/img/home/proxy.svg',
    title: translate({ message: 'Proxy' }),
    subtitle: translate({
      message:
        'Support for Apache® Dubbo™, Spring Cloud, gRPC, Motan, SOFA, TARS, WebSocket, MQTT.',
    }),
  },
  {
    image: '/img/home/security.svg',
    title: translate({ message: 'Security' }),
    subtitle: translate({
      message:
        'Sign, OAuth 2.0, JSON Web Tokens, WAF plugin.',
    }),
  },
  {
    image: '/img/home/apiGovernance.svg',
    title: translate({ message: 'API governance' }),
    subtitle: translate({
      message:
        'Request, response, parameter mapping, Hystrix, RateLimiter plugin.',
    }),
  },
  {
    image: '/img/home/observability.svg',
    title: translate({ message: 'Observability' }),
    subtitle: translate({
      message:
        'Tracing, metrics, logging plugin',
    }),
  },
  {
    image: '/img/home/dashboard.svg',
    title: translate({ message: 'Dashboard' }),
    subtitle: translate({
      message:
        'Dynamic traffic control, visual backend for user menu permissions',
    }),
  },
  {
    image: '/img/home/extensions.svg',
    title: translate({ message: 'Extensions' }),
    subtitle: translate({
      message:
        'Plugin hot-swapping, dynamic loading',
    }),
  },
  {
    image: '/img/home/clusters.svg',
    title: translate({ message: 'Cluster' }),
    subtitle: translate({
      message:
        'NGINX, Docker, Kubernetes',
    }),
  },
  {
    image: '/img/home/language.svg',
    title: translate({ message: 'Language' }),
    subtitle: translate({
      message:
        'provides .NET, Python, Go, Java client for API register',
    }),
  },
];

const Features = (): React.ReactElement => (
  <section className={styles.features}>
    <h1 className={styles.blockTitle}><Translate>Feature List</Translate></h1>
    <div className={styles['features--wrap']}>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        navigation={{
          nextEl: '.user-swiper-button-nextPage',
          prevEl: '.user-swiper-button-previous',
        }}
        watchSlidesProgress={true}
        slidesPerView={3.3}
        centeredSlides={true}
        slideToClickedSlide={true}
        loop={true}
        loopedSlides={3}
        autoplay={{
          delay: 2000,
        }}
        effect={"coverflow"}
        grabCursor
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {FEATURES.map(({ image, title, subtitle }, index) => (
          <SwiperSlide className={styles.swiperSlide} key={index}>
            <FeatureCard key={title} image={useBaseUrl(image)} title={title} subtitle={subtitle} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev user-swiper-button-previous" style={{ top:"1545px", left: "50px", color:'#000033'}}></div>
      <div className="swiper-button-next user-swiper-button-nextPage" style={{ top:"1545px", right: "50px", color:'#000033' }}></div>
    </div>
  </section>
);

export default Features;
