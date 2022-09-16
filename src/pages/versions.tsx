
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import {useVersions, useLatestVersion} from '@theme/hooks/useDocs';

function Version() {
  const {
    siteConfig: {organizationName, projectName},
  } = useDocusaurusContext();
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const currentVersion = versions.find((version) => version.name === 'current');
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  );
  const repoUrl = `https://github.com/${organizationName}/${projectName}`;

  return (
    <Layout
      title="Versions"
      description="Apache ShenYu Versions page listing all documented site versions">
      <main className="container margin-vert--lg">
        <h1>Apache ShenYu documentation versions</h1>

        {latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Current version (Stable)</h3>
            <p>
              Here you can find the documentation for current released version.
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{latestVersion.label}</th>
                  <td>
                    <Link to={latestVersion.path+"/index"}>Documentation</Link>
                  </td>
                  <td>
                    <a href={`${repoUrl}/releases/tag/v${latestVersion.name}`}>
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="latest">Next version (Unreleased)</h3>
            <p>
              Here you can find the documentation for work-in-process unreleased
              version.
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path+"/index"}>Documentation</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {pastVersions.length > 0  && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past versions (Not maintained anymore)</h3>
            <p>
              Here you can find documentation for previous versions of
              Apache ShenYu(Incubating).
            </p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path+"/index"}>Documentation</Link>
                    </td>
                    <td>
                      <a href={`${repoUrl}/releases/tag/v${version.name}`}>
                        Release Notes
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
       {/*  <div className="margin-bottom--lg">
          <h3 id="legacy">Apache ShenYu(Incubating) v1 (Legacy)</h3>
          <p>
            Here you can find documentation for legacy version of Apache ShenYu(Incubating).
          </p>
          <table>
            <tbody>
              <tr>
                <th>1.x</th>
                <td>
                  <a href={`https://v1.Apache ShenYu(Incubating).io/docs/en/installation`}>
                    Documentation
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </main>
    </Layout>
  );
}

export default Version;
