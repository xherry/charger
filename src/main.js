import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// main.js
import 'lib-flexible';
// 引入公共组件
import './components/components';

// 引入element-ui;
import "./common/element";


// 
import "./common/common";



// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.name === 'index' || to.name === 'login' || to.name === 'Selectlogin') {
        store.commit('changeShowBottom', false)
    } else {
        store.commit('changeShowBottom', true)
    }
    return next()
})




Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')