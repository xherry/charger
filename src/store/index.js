import Vue from 'vue';
import Vuex from 'vuex';
import { findById } from '../common/api';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsShowBottom: false,
        userId: '',
        userTypes: [
            { userType: 0, value: "guest" },
            { userType: 1, value: "generalUser" },
            { userType: 2, value: "operator" },
            { userType: 3, value: "superUser" },
            { userType: 4, value: "adminstrator" },
            { userType: 5, value: "systemManager" },
        ],
        centerType: [
            { centreId: 0, value: "Shatin Centre" },
            { centreId: 1, value: "Hung HoM HQ" },
            { centreId: 2, value: "Sham Shui Po Centre" },
            { centreId: 3, value: "Tsing Yi Centre" },
            { centreId: 4, value: "Yuen Long Centre" },
            { centreId: 5, value: "Shek Wu Hui Centre" },
        ],
        userInfo: {},
        roleInfo: {},
        DataTypes: [
            { name: "Charging Voltage【v】", choose: true, id: "1" },
            { name: "Average Charging Current【A】", choose: true, id: "2" },
            { name: "Average Charging Power【kw】", choose: true, id: "3" },
            { name: "Total Charging Energy【kwh】", choose: true, id: "4" },
            { name: "Charging Time【Hour】", choose: true, id: "5" },
            { name: "SoC Before Charging【%】", choose: true, id: "6" },
            { name: "Mileage Travelled Before Charging【km】", choose: true, id: "7" },
        ],
    },
    mutations: {
        changeShowBottom(state, value) {
            state.IsShowBottom = value
        },
        getUserInfo(state, value) {
            state.userInfo = value.pcUser;
        },
        setUserInfo(state) {
            let id = localStorage.getItem("userId")
            findById({ userIds: id, userId: id }).then(res => {
                console.log(res);
                if (res.code == 100) {
                    state.userInfo = res.extend.pcUser;
                }
            })
        },
        showTableUl(state, value) {
            state.DataTypes = value;
        }
    },
    actions: {},
    modules: {}
})