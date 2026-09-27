import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {FaGithub, FaTwitter} from 'react-icons/fa';
import GitHubAvatar from '../components/GitHubAvatar';
import {members, contributorRepositories, type TeamMember} from '../data/team';
import shared from '../components/Blog.module.css';
import styles from './team.module.css';

function MemberCard({member}: {member: TeamMember}) {
  return <li className={styles.member}>
    <span className={styles.avatar} aria-hidden="true"><GitHubAvatar username={member.github} size={52} /></span>
    <div className={styles.memberInfo}>
      <h3><a href={`https://github.com/${member.github}`}>{member.name}</a></h3>
      <a className={styles.apacheId} href={`https://people.apache.org/committer-index.html#${member.apacheId}`} aria-label={`Apache ID: ${member.apacheId}`}>{member.apacheId}</a>
      <div className={styles.profileLinks}>
        <a href={`https://github.com/${member.github}`} aria-label={`${member.name} · GitHub`}><FaGithub aria-hidden="true" /> GitHub<span aria-hidden="true"> ↗</span></a>
        {member.socialUrl && <a href={member.socialUrl} aria-label={`${member.name} · Twitter`}><FaTwitter aria-hidden="true" /></a>}
      </div>
      {member.founder && <span className={styles.role}><Translate id="team.founder">Founder · V.P. & PMC Chair</Translate></span>}
    </div>
  </li>;
}

export default function Team() {
  return <Layout title={translate({id: 'team.title', message: 'Team'})} description={translate({id: 'team.description', message: 'Meet the people building Apache ShenYu. A community of maintainers and contributors, working together in the open.'})}>
    <main className={`${shared.page} ${styles.page}`}>
      <header className={shared.hero}><div className={shared.container}>
        <p className={shared.eyebrow}>APACHE SHENYU / TEAM</p>
        <h1><Translate id="team.heading">The people behind ShenYu</Translate></h1>
        <p className={shared.intro}><Translate id="team.description">Meet the people building Apache ShenYu. A community of maintainers and contributors, working together in the open.</Translate></p>
        <nav className={styles.sectionNav} aria-label={translate({id: 'team.navigation', message: 'Team sections'})}>
          <a href="#pmc">PMC<span aria-hidden="true"> ↓</span></a>
          <a href="#committers">Committers<span aria-hidden="true"> ↓</span></a>
          <a href="#contributors"><Translate id="team.contributors">Contributors</Translate><span aria-hidden="true"> ↓</span></a>
        </nav>
      </div></header>
      <div className={`${shared.container} ${styles.content}`}>
        <section className={styles.section} aria-labelledby="pmc">
          <div className={styles.sectionHeading}>
            <h2 id="pmc"><Translate id="team.pmc">Project Management Committee</Translate></h2>
            <p><Translate id="team.pmcDescription">The PMC oversees the project, guides its direction, and supports the community.</Translate></p>
          </div>
          <ul className={styles.members}>{members.filter(member => member.role === 'pmc').map(member => <MemberCard key={member.apacheId} member={member} />)}</ul>
        </section>
        <section className={styles.section} aria-labelledby="committers">
          <div className={styles.sectionHeading}>
            <h2 id="committers">Committers</h2>
            <p><Translate id="team.committersDescription">Committers maintain the codebase, review contributions, and help the project evolve.</Translate></p>
          </div>
          <ul className={styles.members}>{members.filter(member => member.role === 'committer').map(member => <MemberCard key={member.apacheId} member={member} />)}</ul>
        </section>
        <section className={styles.section} aria-labelledby="contributors">
          <div className={styles.sectionHeading}>
            <h2 id="contributors"><Translate id="team.contributors">Contributors</Translate></h2>
            <p><Translate id="team.contributorsDescription">Every patch, bug report, and documentation improvement makes ShenYu better. Explore the people contributing across our repositories.</Translate></p>
          </div>
          <ul className={styles.repositories}>{contributorRepositories.map(project => <li key={project.repository}>
            <a className={styles.repository} href={`https://github.com/apache/${project.repository}/graphs/contributors`}>
              <FaGithub className={styles.repositoryIcon} aria-hidden="true" />
              <span className={styles.repositoryInfo}><span className={styles.repositoryName}>{project.name}</span><span className={styles.repositoryPath}>apache/{project.repository}</span></span>
              <span className={styles.repositoryAction}><Translate id="team.viewContributors">View contributors</Translate><span aria-hidden="true"> ↗</span></span>
            </a>
          </li>)}</ul>
        </section>
        <aside className={styles.join}>
          <div><p className={shared.eyebrow}>COMMUNITY OVER CODE</p><h2><Translate id="team.joinTitle">There is a place for you here.</Translate></h2><p><Translate id="team.joinDescription">Write code, improve the docs, share ideas, or help another user. Every contribution counts.</Translate></p></div>
          <Link to="/community/contributor-guide"><Translate id="team.join">Start contributing</Translate><span aria-hidden="true"> →</span></Link>
        </aside>
      </div>
    </main>
  </Layout>;
}
