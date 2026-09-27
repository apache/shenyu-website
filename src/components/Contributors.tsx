import React, { useEffect, useState } from 'react';

const DEFAULT_REPOSITORY = 'apache/shenyu';
const CONTRIBUTORS_PER_PAGE = 100;
const CONTRIBUTORS_PER_ROW = 5;

function getNextPageUrl(linkHeader) {
    if (!linkHeader) {
        return null;
    }

    const nextLink = linkHeader
        .split(',')
        .find((link) => link.includes('rel="next"'));
    return nextLink?.match(/<([^>]+)>/)?.[1] ?? null;
}

async function fetchAllContributors(repo, signal) {
    const contributors = [];
    let nextPageUrl = `https://api.github.com/repos/${repo}/contributors?per_page=${CONTRIBUTORS_PER_PAGE}`;

    while (nextPageUrl) {
        const response = await fetch(nextPageUrl, { signal });
        if (!response.ok) {
            throw new Error(`Unable to load contributors for ${repo}: ${response.status}`);
        }

        const page = await response.json();
        if (!Array.isArray(page)) {
            throw new Error(`Unexpected contributors response for ${repo}`);
        }

        contributors.push(...page);
        nextPageUrl = getNextPageUrl(response.headers.get('Link'));
    }

    return contributors;
}

export default function Contributors({ repo = DEFAULT_REPOSITORY }) {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        setContributors([]);
        fetchAllContributors(repo, controller.signal)
            .then(setContributors)
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error(error);
                }
            });

        return () => controller.abort();
    }, [repo]);

    const rows = [];
    for (let index = 0; index < contributors.length; index += CONTRIBUTORS_PER_ROW) {
        rows.push(contributors.slice(index, index + CONTRIBUTORS_PER_ROW));
    }

    return (
        <table>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((contributor) => (
                            <td key={contributor.id}>
                                <a href={contributor.html_url} rel="noopener noreferrer" target="_blank">
                                    <img src={contributor.avatar_url} height="20" alt="" />{' '}
                                    <span style={{ whiteSpace: 'nowrap' }}>@{contributor.login}</span>
                                </a>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
