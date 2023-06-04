const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
module.exports = {
  poweredByHeader: process.env.NODE_ENV === 'development',
  reactStrictMode: process.env.NODE_ENV === 'development',
  optimizeFonts: false,
}