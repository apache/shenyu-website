import React, { useEffect, useState } from 'react';
import { GoStar, GoIssueOpened, GoRepoForked } from 'react-icons/go';
import { RiDownload2Fill } from 'react-icons/ri';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './downloadCard.module.css';

interface DownloadCardProps {
    name?: string,
    description?: string,
    githubRepo?: string,
    version?: string,
    releaseDate?: string,
    url?: string
}

interface RepoAttribute {
    stars: number;
    issues: number;
    forks: number;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ ...props }) => {

    const [repo, setRepo] = useState<RepoAttribute>({
        stars: 0,
        issues: 0,
        forks: 0
    });

    useEffect(() => {
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
                </div>
            </div>
            <div className={styles.downloadMessage}>
                <div style={{ textAlign: 'right' }}>
                    <span>Version: {props.version}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span>Release Date: {props.releaseDate}</span>
                </div>
                <a className={styles.downloadBtn} target="_blank" href={props.url}>
                    <RiDownload2Fill/>
                    <span style={{ marginLeft: '6px' }}>Download</span>
                </a>
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
