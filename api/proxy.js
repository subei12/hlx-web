// Vercel Serverless
// api/proxy.js

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  if (req.url.startsWith('/backend')) {
    target = 'https://floor.huluxia.com/'
  }
  // 上传图片的代理地址
  if (req.url.startsWith('/backend/upload')) {
    target = 'http://upload.huluxia.com/'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    headers: {
      'User-Agent': 'okhttp/3.8.1',
      'Referer': '' // 设置 Referer 为空
    },
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/backend/': '/'
    }
  })(req, res)
}



