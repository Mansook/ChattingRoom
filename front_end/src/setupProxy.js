const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://211.211.70.210:4444",
      changeOrigin: true,
    })
  );
};
/*
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api0", {
      target: "https://krdict.korean.go.kr",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api1",{
      target: "http://localhost:4444",
      changeOrigin: true,
    })
  );
};
*/