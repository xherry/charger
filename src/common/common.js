// import Vue from "vue";

// import Vue from "vue";

export const utype = (val) => {
    let userTypes = [
        { userType: 0, value: "Guest", level: 6 },
        { userType: 1, value: "GeneralUser", level: 5 },
        { userType: 2, value: "Operator", level: 4 },
        { userType: 3, value: "SuperUser", level: 3 },
        { userType: 4, value: "Adminstrator", level: 2 },
        { userType: 5, value: "SystemManager", level: 1 },
    ];
    let name = userTypes.filter(item => item.userType == val)[0].value
    return name
}
export const uLevel = (val) => {
    let userTypes = [
        { userType: 0, value: "Guest", level: 6 },
        { userType: 1, value: "GeneralUser", level: 5 },
        { userType: 2, value: "Operator", level: 4 },
        { userType: 3, value: "SuperUser", level: 3 },
        { userType: 4, value: "Adminstrator", level: 2 },
        { userType: 5, value: "SystemManager", level: 1 },
    ];
    let level = userTypes.filter(item => item.userType == val)[0].level
    return level
}
export const ctype = (val) => {
    let centerType = [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung Hom HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
    ];
    let name = centerType.filter(item => item.centreId == val)[0].value
    return name
}



Vue.filter("utype", utype);
Vue.filter("ctype", ctype);
Vue.filter("uLevel", uLevel);
Vue.filter("valNO", (val) => {
    if (!val || val == "null") {
        return ""
    }
    return val;
});
Vue.filter("value2", (val) => {
    return Number(val).toFixed(2);
});