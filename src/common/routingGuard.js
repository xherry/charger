import router from '../router/index';
import store from '../store/index';
// import { Message } from 'element-ui';

// 路由守卫
router.beforeEach((to, from, next) => {
    let roleKey = JSON.parse(localStorage.getItem("roleKey"));
    // 获取用户登录内容
    let cid = localStorage.getItem("cid") || "";
    // 判断是否到主页
    let loginType = localStorage.getItem("loginType");
    // 登录获取权限
    if (roleKey) {
        if (to.name === 'index' || to.name === 'login' || to.name === 'Selectlogin' || loginType == 1) {
            store.commit('changeShowBottom', false)
        } else {
            store.commit('changeShowBottom', true)
        }
        if (to.name === 'login') {
            localStorage.setItem('loginType', '0');
        }
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
    } else {
        if (cid !== '' && to.name === 'login') {
            return next()
        } else if (to.name !== 'Selectlogin') {
            return next("Selectlogin")
        }
    }

    return next()
})