
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    outputDir: path.join(__dirname, 'disc'),
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.entry = {
                index: path.join(__dirname, 'src', 'main-production.js'),
                'gourd-ui': path.join(__dirname, './gourd-ui/build/build.js')
            }

            config.output.filename = '[name].js';

            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex:'Vuex'
            }
        } else {
            config.entry = path.join(__dirname, 'src', 'main.js');
        }
    },
    chainWebpack: (config) => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.plugin('html').tap(arg => {
                arg[0].isDev = false;
                return arg;
            });
        });

        config.when(process.env.NODE_ENV === 'development', config => {
            config.plugin('html').tap(arg => {
                arg[0].isDev = true;

                return arg;
            });
        });
    },
    devServer: {
      port: 8000,
      proxy: {
        '/backend/upload': {
          target: 'http://upload.huluxia.com', //API服务器的地址
          //ws: true,  //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/backend': '',
          },
          onProxyReq(proxyReq) {
            proxyReq.setHeader('User-Agent', 'okhttp/3.8.1');  
          },
        },
        '/backend': {
          target: 'https://floor.huluxia.com', //API服务器的地址
          //ws: true,  //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/backend': '',
          },
          onProxyReq(proxyReq) {
            proxyReq.setHeader('Referer', '');
            //proxyReq.setHeader('Host', 'floor.huluxia.com');
            proxyReq.setHeader('User-Agent', 'okhttp/3.8.1');  
          },
        }
      },
    },
    // 打包 app 配置
    publicPath: "./"
}
