const {
	createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:3200',
			changeOrigin: true,
			pathRewrite: {
				'^/api': '/'
			}
		})
	);


	app.use(
		'/apc',
		createProxyMiddleware({
			target: 'http://ws.stream.qqmusic.qq.com',
			changeOrigin: true,
			pathRewrite: {
				'^/apc': '/'
			}
		})
	);
};
