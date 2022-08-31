import React from "react";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { Swiper, SwiperSlide } from "swiper/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import SwiperCore, {
  EffectFade,
  Navigation,
  Autoplay
} from 'swiper';

import clsx from "clsx";
import styles from "./index.module.css";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const {
    siteConfig: {
      customFields: { description },
      tagline,
    },
  } = useDocusaurusContext();
  return (
    <Layout title={tagline} description={description as string}>
      <main>
        <div className={styles.hero}>
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col col--5  col--offset-1">
              <h1 className={styles.heroProjectTitle}>
                <img
                  src="/img/logo.svg"
                  className={styles.heroProjectLogo}
                ></img>
              </h1>
              <h3 className={styles.heroProjectTagline}>
                <span
                  className={styles.heroTitleTextHtml}
                  dangerouslySetInnerHTML={{
                    __html: translate({
                      id: "homepage.hero.title",
                      message:
                        "Java native API Gateway for <b> service proxy, protocol conversion and API governance.</b>",
                      description:
                        "Home page hero title, can contain simple html tags",
                    }),
                  }}
                />
              </h3>
              <div className={styles.indexCtas}>
                <Link className={styles.buttonGetStarted} to="/docs/index">
                  <Translate>Get Started</Translate>
                </Link>
                <Link
                  className={styles.buttonGithub}
                  to="https://github.com/apache/shenyu"
                >
                  <Translate>Github</Translate>
                </Link>
              </div>
            </div>
            <div className="col col--5 col--offset-1">
              <div className={styles.logoContainer}>
                <img
                  alt={translate({ message: "Docusaurus with Keytar" })}
                  className={styles.heroLogo}
                  src={useBaseUrl("/img/architecture/shenyu-architecture-3d.png")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionDashboard}>
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            watchSlidesProgress={true}
            navigation={{
              nextEl: '.user-swiper-button-next',
              prevEl: '.user-swiper-button-prev',
            }}
            grabCursor
            // 轮播下用这个效果会失效
            // effect={'fade'}
            // fadeEffect={{
            //   crossFade: true
            // }}
            // slidesPerView={1}
            // 自动轮播
            loop={true}
            speed={0}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false,
            }}
          >
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_1.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_2.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_3.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_4.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_5.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_6.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_7.jpg")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.contentImg}
                src={useBaseUrl("/img/home/2_8.jpg")}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="swiper-button-prev user-swiper-button-prev" style={{ top:"880px", left: "50px" }}></div>
        <div className="swiper-button-next user-swiper-button-next" style={{ top:"880px", right: "50px" }}></div>
        <div className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Features />
          </div>
        </div>
        <div><Footer></Footer></div>
      </main>
    </Layout>
  );
}

export default Home;
