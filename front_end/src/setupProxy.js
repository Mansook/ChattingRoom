const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://port-0-filchatter-1fgm12klx5u6yb5.sel5.cloudtype.app",
      changeOrigin: true,
    })
  );
};
//http://218.239.229.119:4440
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