import React from 'react';
import styles from './versionCard.module.css';

interface VersionCardProps {
    name?: string;
    description?: string;
    githubRepo?: string;
    version?: string;
    releaseDate?: string;
    content?: Array<ContentAttribute>;
}

interface ContentAttribute {
    name: string;
    zip?: string;
    tar?: string;
    asc: string;
    sha512: string;
}

const VersionCard: React.FC<VersionCardProps> = ({ ...props }) => {

    return (
        <div className={styles.main}>
            <div>
                <span
                    className={styles.name}>{props.name} - Version: {props.version} ( Release Date: {props.releaseDate} )
                </span>
            </div>
            <ul className={styles.downloadDetail}>
                {
                    props.content.map((value) => {
                        return (
                            <li key={value.name}>
                             <span>
                                {value.name} :
                            </span>
                            {value.zip &&
                                <a href={value.zip}>
                                    ZIP
                                </a>
                            }
                            {value.tar &&
                                <a href={value.tar}>
                                    TAR
                                </a>
                            }
                            <a href={value.asc}>
                                ASC
                            </a>
                            <a href={value.sha512}>
                                SHA512
                            </a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default VersionCard;
