const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target:
        'https://port-0-react-gongcha-migration-ss7z32llwcg7ke3.sel5.cloudtype.app/',
      changeOrigin: true,
    })
  );
};
