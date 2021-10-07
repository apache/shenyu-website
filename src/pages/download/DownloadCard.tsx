import React, { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { GoStar, GoIssueOpened, GoRepoForked } from 'react-icons/go';
import { RiDownload2Fill } from 'react-icons/ri';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './downloadCard.module.css';

// interface DownloadCardProps {
//     name?: string,
//     description?: string,
//     githubRepo?: string,
//     version?: string,
//     releaseDate?: string,
//     url?: string
// }

interface DownloadCardProps {
    name?: string;
    description?: string;
    githubRepo?: string;
    content?: Array<IContentAttribute>;
}

interface IContentAttribute {
    name: string;
    version?: string;
    releaseDate?: string;
    zip?: string;
    tar?: string;
    asc: string;
    sha512: string;
}

interface IRepoAttribute {
    stars: number;
    issues: number;
    forks: number;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ ...props }) => {

    const [repo, setRepo] = useState<IRepoAttribute>({
        stars: 0,
        issues: 0,
        forks: 0
    });

    useEffect(() => {
        console.log(props);
        getGitHubRepoStats(props.githubRepo).then((repo) => {
            setRepo({
                stars: repo.stargazers_count,
                issues: repo.open_issues_count,
                forks: repo.forks_count
            });
        });
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.githubDetail}>
                <a target="_blank" href={`https://github.com/apache/incubator-shenyu/${props.githubRepo}`}>
                    <h1>
                        {props.name}
                    </h1>
                </a>
                <p className={styles.githubMessage}>
                    {props.description}
                </p>
                <div className={styles.githubRepo}>
                    <div className={styles.githubRepoDetail}>
                        <GoStar/>
                        <span style={{ marginLeft: '4px' }}>{repo.stars}</span>
                    </div>
                    <div className={styles.githubRepoDetail} style={{ marginLeft: '20px' }}>
                        <GoIssueOpened/>
                        <span style={{ marginLeft: '4px' }}>{repo.issues}</span>
                    </div>
                    <div className={styles.githubRepoDetail} style={{ marginLeft: '20px' }}>
                        <GoRepoForked/>
                        <span style={{ marginLeft: '4px' }}>{repo.forks}</span>
                    </div>

                    <Popover className={styles.downloadPopover}>
                        <Popover.Button className={styles.downloadBtn}>Download</Popover.Button>
                        <Popover.Panel className={styles.downloadPanel}>
                            {
                                props.content instanceof Array && props.content.map((value, index) =>
                                    <div key={index}>
                                        <div className={styles.downloadPanelTitle}>
                                            <span>v{value.version} for {value.name}</span>
                                            <span className={styles.downloadPanelTitleDate}>
                                                &nbsp;|&nbsp;{value.releaseDate}
                                            </span>
                                        </div>
                                        <div className={styles.downloadPanelUrl}>
                                            {
                                                value.zip &&
                                                <div>[<a href={value.zip}>zip</a>]</div>
                                            }
                                            {
                                                value.tar &&
                                                <div>[<a href={value.tar}>tar</a>]</div>
                                            }
                                            {
                                                value.asc &&
                                                <div>[<a href={value.asc}>asc</a>]</div>
                                            }
                                            {
                                                value.sha512 &&
                                                <div>[<a href={value.sha512}>sha512</a>]</div>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </Popover.Panel>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

const getGitHubRepoStats = (repo) => {
    return fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
            'content-type': 'application/json',
            Accept: 'application / vnd.github.v3 + json'
        }
    }).then((response) => response.json());
};

export default DownloadCard;
