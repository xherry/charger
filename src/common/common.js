// import Vue from "vue";

export const utype = (val) => {
    let userTypes = [
        { userType: 0, value: "guest" },
        { userType: 1, value: "generalUser" },
        { userType: 2, value: "operator" },
        { userType: 3, value: "superUser" },
        { userType: 4, value: "adminstrator" },
        { userType: 5, value: "systemManager" },
    ];
    let name = userTypes.filter(item => item.userType == val)[0].value
    return name
}

export const ctype = (val) => {
    let centerType = [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung HoM HQ" },
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
Vue.filter("valNO", (val) => {
    if (!val || val == "null") {
        return ""
    }
    return val;
});