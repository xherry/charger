import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsShowBottom: false
    },
    mutations: {
        changeShowBottom(state, value) {
            state.IsShowBottom = value
        },
    },
    actions: {},
    modules: {}
})