// Keep the newest release first. Older distributions remain available in the archive.
export const gatewayVersions = ['2.7.1', '2.7.0.3', '2.7.0.2', '2.7.0.1', '2.7.0', '2.6.1', '2.6.0', '2.5.1', '2.5.0', '2.4.3', '2.4.2'];
const mirroredVersions = new Set(['2.7.1', '2.7.0.3']);
export const signingKeys = 'https://downloads.apache.org/shenyu/KEYS';
export const releaseArchive = 'https://archive.apache.org/dist/shenyu/';

export function distribution(path: string, archived = false) {
  const checksBase = archived ? releaseArchive : 'https://downloads.apache.org/shenyu/';
  return {
    filename: path.slice(path.lastIndexOf('/') + 1),
    download: `${archived ? releaseArchive : 'https://www.apache.org/dyn/closer.lua/shenyu/'}${path}`,
    asc: `${checksBase}${path}.asc`,
    sha512: `${checksBase}${path}.sha512`,
  };
}

export function gatewayDistribution(version: string, kind: 'source' | 'admin' | 'bootstrap') {
  const prefix = version.startsWith('2.4.') ? 'apache-shenyu-incubating' : 'apache-shenyu';
  const suffix = kind === 'source' ? 'src.zip' : `${kind}-bin.tar.gz`;
  return distribution(`${version}/${prefix}-${version}-${suffix}`, !mirroredVersions.has(version));
}

export const ecosystemDownloads = [
  {name: 'Go Client', version: '1.0.0', path: 'shenyu-client-golang/v1.0.0/shenyu-client-golang-v1.0.0-src.tar.gz'},
  {name: 'Rust Client', version: '1.0.0', path: 'shenyu-client-rust/1.0.0/shenyu-client-rust-1.0.0-src.tar.gz'},
  {name: '.NET Client', version: '1.0.0', path: 'shenyu-client-dotnet/v1.0.0/shenyu-client-dotnet-v1.0.0-src.tar.gz'},
  {name: 'Nginx', version: '1.0.0-1', path: 'shenyu-nginx/1.0.0-1/shenyu-nginx-1.0.0-1-src.tar.gz'},
  {name: 'WASM', version: '1.0.0', path: 'shenyu-wasm/1.0.0/shenyu-wasm-1.0.0-src.zip'},
];
