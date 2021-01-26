// import Vue from 'vue';
// import Vuex from 'vuex';
import { findById, findByDetails } from '../common/api';
import { Loading } from "element-ui";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsShowBottom: false,
        userId: '',
        userTypes: [
            { userType: 0, value: "Guest", level: 6 },
            { userType: 1, value: "GeneralUser", level: 5 },
            { userType: 2, value: "Operator", level: 4 },
            { userType: 3, value: "SuperUser", level: 3 },
            { userType: 4, value: "Adminstrator", level: 2 },
            { userType: 5, value: "SystemManager", level: 1 },
        ],
        centerType: [
            { centreId: 0, value: "Shatin Centre", cid: 'CLP3301' },
            { centreId: 1, value: "Hung Hom HQ", cid: 'CLP2101' },
            { centreId: 2, value: "Sham Shui Po Centre", cid: 'CLP2201' },
            { centreId: 3, value: "Tsing Yi Centre", cid: 'CLP3801' },
            { centreId: 4, value: "Yuen Long Centre", cid: 'CLP3701' },
            { centreId: 5, value: "Shek Wu Hui Centre", cid: 'CLP3101' },
        ],
        userInfo: {},
        roleInfo: {},
        DataTypes: [
            { name: "Charging Voltage（v）", choose: false, id: "1" },
            { name: "Average Charging Current（A）", choose: false, id: "2" },
            { name: "Average Charging Power（kw）", choose: false, id: "3" },
            { name: "Total Charging Energy（kwh）", choose: false, id: "4" },
            { name: "Charging Time（Hour）", choose: false, id: "5" },
            { name: "SoC Before Charging（%）", choose: false, id: "6" },
            { name: "Mileage Travelled Before Charging（km）", choose: false, id: "7" },
        ],
        chargerInfoData: {
            // centre: '',
            // location: "",
            // chargerType: '',
            // chargerNo: '',
            // manufacturer: "",
            // model: "",
            // vehicleNo: "",
            // startDate: "",
            // endDate: ""
        },
        centers: [],
        loginInfos: {
            cid: "",
            location: '',
            cno: '',
            vno: ""
        },
        isBack: 0
    },
    mutations: {
        isBacked(state, value) {
            state.isBack = value
        },
        changeShowBottom(state, value) {
            state.IsShowBottom = value
        },
        getUserInfo(state, value) {
            state.userInfo = value.pcUser;
        },
        setUserInfo(state) {
            let id = localStorage.getItem("userId")
            findById({ userIds: id, userId: id }).then(res => {
                // console.log(res);
                if (res.code == 100) {
                    state.userInfo = res.extend.pcUser;
                }
            })
        },
        showTableUl(state, value) {
            state.DataTypes = value;
        },
        getChargerInfoData(state, value) {
            state.chargerInfoData = value;
        },
        setLoginInfos(state, value) {
            state.loginInfos = value;
        }
    },
    actions: {

    },
    modules: {}
})