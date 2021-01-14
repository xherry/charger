import router from '../router/index';
import store from '../store/index';
// import { Message } from 'element-ui';

// 路由守卫
router.beforeEach((to, from, next) => {
    let loginType = localStorage.getItem("loginType");
    // 判断是否到主页
    if (to.name === 'index' || to.name === 'login' || to.name === 'Selectlogin' || loginType == 1) {
        store.commit('changeShowBottom', false)
    } else {
        store.commit('changeShowBottom', true)
    }
    let roleKey = JSON.parse(localStorage.getItem("roleKey"));
    // console.log(roleKey)
    if (to.name === 'login') {
        localStorage.setItem('loginType', '0');
    }
    // console.log(roleKey);
    // 登录获取权限
    if (roleKey) {
        if (roleKey.configureSystem == 1) {
            if (to.path.includes("setting")) {
                Message.warning('暂无权限！')
                store.commit('changeShowBottom', false)
                return
            }
        }
        if (roleKey.controlOtherChargers == 1 && roleKey.controlOwnCharger == 1) {
            if (to.path.includes("ChargerControl")) {
                Message.warning('暂无权限！')
                store.commit('changeShowBottom', false)
                return
            }
        }
        if (roleKey.createAccount == 1) {
            if (to.path.includes("UserAccount")) {
                Message.warning('暂无权限！')
                store.commit('changeShowBottom', false)
                return
            }
        }
        if (roleKey.dataReport == 1) {
            if (to.path.includes("DataReport")) {
                Message.warning('暂无权限！')
                store.commit('changeShowBottom', false)
                return
            }
        }
        if (roleKey.viewGeneralData == 1) {
            if (to.path.includes("CentreInformation")) {
                Message.warning('暂无权限！')
                store.commit('changeShowBottom', false)
                return
            }
        }
    }

    return next()
})