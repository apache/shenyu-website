import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import users from '../data/user'

export default () => {
  return <>
  {users.map(user=><a href={user.link} target="_blank" style={{margin:5}}><img src={user.src&&(user.src.startsWith("http")?user.src:useBaseUrl(user.src))} alt={user.name} width="150" height="60" /></a>)}
  </>;
}