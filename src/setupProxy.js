const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/article",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
