import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import users from '../data/user'

function User({ user }) {
  const localImageUrl = useBaseUrl(user.src || '');
  const imageUrl = user.src?.startsWith('http') ? user.src : localImageUrl;
  const image = <img src={imageUrl} alt={user.name} width="150" height="60" />;

  return user.link ? (
    <a href={user.link} rel="noopener noreferrer" target="_blank" style={{margin:5}}>
      {image}
    </a>
  ) : <span style={{margin:5}}>{image}</span>;
}

export default () => {
  return <>
  {users.map(user => <User key={user.name} user={user} />)}
  </>;
}
