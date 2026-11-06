// Keep locale prefixes when linking within the blog or news publication.
export function getPublication(pathname: string) {
  const match = pathname.match(/^(.*?)\/(blog|news)(?:\/|$)/);
  return match ? {root: `${match[1]}/${match[2]}`, isNews: match[2] === 'news'} : null;
}
