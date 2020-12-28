module.exports = {
        externals: {
            "vue": Vue,
            'vue-router': VueRouter,
            "vuex": Vuex,
            "axios": axios,
            "echarts": echarts,
            'element-ui': ElementUI,
            "element-ui/lib/locale/lang/en": locale
                // "jspdf": jspdf
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
        ]
    }
    // import VueRouter from 'vue-router'
    // import JsPDF from "jspdf";