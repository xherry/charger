module.exports = {
        externals: {
            "vue": Vue,
            'vue-router': VueRouter,
            "vuex": Vuex,
            "axios": axios,
            "echarts": echarts,
            "element-ui/lib/umd/locale/en": lang,
            // 'element-ui': ElementUI,
            // "jspdf": jspdf
        },
        // plugins: [
        //     new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
        // ]
    }
    // import VueRouter from 'vue-router'
    // import JsPDF from "jspdf";