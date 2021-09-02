
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    outputDir: path.join(__dirname, '../../gourd/demo-gourd/public'),
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
    }
}