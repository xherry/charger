// const path = require('path')

// function addStyleResource(rule) {
//     rule.use('style-resource')
//         .loader('style-resources-loader')
//         .options({
//             patterns: [
//                 path.resolve(__dirname, './src/common/common.less'),
//                 //这里写你的全局样式地址
//             ],
//         })
// }


module.exports = {
    lintOnSave: false, //这里禁止使用eslint-loader
    publicPath: './',
    chainWebpack: config => {
        // 移除 prefetch 插件（解决首次进入页面所有资源预加载）
        config.plugins.delete('prefetch');
        // types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        // 这里写你的样样式类型
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 192 //代表的是 1rem = ？px  这里假设设计稿是 1920px ，那么这里的比例就是 1/10
            })
            .end()
    },
}