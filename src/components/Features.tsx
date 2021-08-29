import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Link } from '@docusaurus/router';
import FeatureCard from './FeatureCard';

import styles from './Features.module.css';

const FEATURES = [
  {
    image: '/img/home/rich-protocol.svg',
    title: translate({ message: 'Rich protocols' }),
    subtitle: translate({
      message:
        'Supports Dubbo, Tars, Spring-Cloud, gRPC.',
    }),
  },
  {
    image: '/img/home/extended.svg',
    title: translate({ message: 'Pluggable' }),
    subtitle: translate({
      message:
        'Plug-in design idea, plug-in hot plug, easy to expand.',
    }),
  },
  {
    image: '/img/home/flow.svg',
    title: translate({ message: 'Flow Control' }),
    subtitle: translate({
      message:
        'Flexible flow filtering to meet various flow control.',
    }),
  },
  {
    image: '/img/home/multi-plugins.svg',
    title: translate({ message: 'Built-in Plug-ins' }),
    subtitle: translate({
      message:
        'Built-in rich plugin support, authentication, limiting, fuse, firewall, etc.',
    }),
  },
  {
    image: '/img/home/performance.svg',
    title: translate({ message: 'High Performance' }),
    subtitle: translate({
      message:
        'Dynamic flow configuration, high performance, gateway consumption is 1~2ms.',
    }),
  },
  {
    image: '/img/home/clusters.svg',
    title: translate({ message: 'Cluster Deployment' }),
    subtitle: translate({
      message:
        'Support cluster deployment, A/B Test, blue-green release.',
    }),
  },
];

const Features = (): React.ReactElement => (
  <section className={styles.features}>
    <div className={styles['features--wrap']}>
      {FEATURES.map(({ image, title, subtitle }) => (
        <FeatureCard key={title} image={useBaseUrl(image)} title={title} subtitle={subtitle} />
      ))}
    </div>
  </section>
);

export default Features;