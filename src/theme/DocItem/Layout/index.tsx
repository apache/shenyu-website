import React from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/DocItem/Layout';
import styles from '../../../pages/event.module.css';

export default function DocItemLayout(props: Props) {
  const {metadata} = useDoc();
  const eventPath = metadata.permalink.match(/^(.*?)\/event\//);
  if (!eventPath) return <OriginalDocItemLayout {...props} />;
  return <div className={styles.releaseDoc}>
    <Link className={styles.backLink} to={`${eventPath[1]}/event`}><span aria-hidden="true">← </span><Translate id="releases.back">Back to releases</Translate></Link>
    <OriginalDocItemLayout {...props} />
  </div>;
}
