import * as React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import VersionCard from './VersionCard';

const Download: React.FC = () => {

    const { siteConfig } = useDocusaurusContext();

    if (!(siteConfig.customFields.downloads || []).length) {
        return null;
    }

    const projects = siteConfig.customFields.downloads.map((project) => {
        return <VersionCard key={project.name} {...project} />;
    });

    return (
        <Layout>
            <main className={styles.mainWrapper}>
                <article className={styles.articleWrapper}>
                    <h1 className={styles.h1Wrapper}>
                        <Translate>
                            Download
                        </Translate>
                    </h1>
                    <div className={styles.moduleWrapper}>
                        {projects}
                    </div>
                    <div className={styles.moduleWrapper}>
                        <h2 className={styles.h2Wrapper}>
                            <Translate>
                                Verify the Releases
                            </Translate>
                        </h2>
                        <a href="https://downloads.apache.org/incubator/shenyu/KEYS">PGP signatures KEYS</a>
                        <p>
                            It is essential that you verify the integrity of the downloaded files using the PGP or SHA
                            signatures.
                            The PGP signatures can be verified using GPG or PGP.
                            Please download the KEYS as well as the asc signature files for relevant distribution.
                            It is recommended to get these files from the main distribution directory and not from the
                            mirrors.
                        </p>
                        <CodeBlock>
                            gpg -i KEYS
                        </CodeBlock>
                        <p>
                            or
                        </p>
                        <CodeBlock>
                            pgpk -a KEYS
                        </CodeBlock>
                        <p>
                            or
                        </p>
                        <CodeBlock>
                            pgp -ka KEYS
                        </CodeBlock>
                        <p>
                            To verify the binaries/sources you can download the relevant asc files for it from main
                            distribution directory and follow the below guide.
                        </p>
                        <CodeBlock>
                            gpg --verify apache-shenyu-********.asc apache-shenyu-*********
                        </CodeBlock>
                        <p>
                            or
                        </p>
                        <CodeBlock>
                            pgpv apache-shenyu-********.asc
                        </CodeBlock>
                        <p>
                            or
                        </p>
                        <CodeBlock>
                            pgp apache-shenyu-********.asc
                        </CodeBlock>
                    </div>
                    <div className={styles.moduleWrapper}>
                        <h2 className={styles.h2Wrapper}>
                            PDF
                        </h2>
                        <p>
                            <b>Apache ShenYu (incubating)</b> provides a packaged and
                            downloaded <b>PDF</b> of the docs
                            for users and developers to use.
                        </p>
                    </div>
                </article>
            </main>
        </Layout>
    );
};

export default Download;
