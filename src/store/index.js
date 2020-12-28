// import Vue from 'vue';
// import Vuex from 'vuex';
import { findById } from '../common/api';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsShowBottom: false,
        userId: '',
        userTypes: [
            { userType: 0, value: "Guest" },
            { userType: 1, value: "GeneralUser" },
            { userType: 2, value: "Operator" },
            { userType: 3, value: "AuperUser" },
            { userType: 4, value: "Adminstrator" },
            { userType: 5, value: "SystemManager" },
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
            { name: "Charging Voltage【v】", choose: false, id: "1" },
            { name: "Average Charging Current【A】", choose: false, id: "2" },
            { name: "Average Charging Power【kw】", choose: false, id: "3" },
            { name: "Total Charging Energy【kwh】", choose: false, id: "4" },
            { name: "Charging Time【Hour】", choose: false, id: "5" },
            { name: "SoC Before Charging【%】", choose: false, id: "6" },
            { name: "Mileage Travelled Before Charging【km】", choose: false, id: "7" },
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
        }
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
        },
        getChargerInfoData(state, value) {
            state.chargerInfoData = value;
        },
    },
    actions: {},
    modules: {}
})