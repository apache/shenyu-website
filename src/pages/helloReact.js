
import React from 'react';
import Layout from '@theme/Layout';

function Hello() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          编辑 <code>pages/hello.js</code> 并保存以刷新。
        </p>
      </div>
    </Layout>
  );
}

export default Hello;