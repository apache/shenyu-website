import React, { useState } from 'react';

interface Props {
  username: string;
  size?: number;
}

export default function GitHubAvatar({ username, size = 64 }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <img
        width={size}
        height={size}
        src="/img/team/default-avatar.svg"
        alt={`${username}'s avatar`}
      />
    );
  }

  return (
    <img
      width={size}
      height={size}
      src={`https://github.com/${username}.png`}
      referrerPolicy="no-referrer"
      alt={`${username}'s avatar`}
      onError={() => setFailed(true)}
    />
  );
}
