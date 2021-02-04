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
        { centreId: 0, value: "Shatin Centre", cid: 'CLP3301' },
        { centreId: 1, value: "Hung Hom HQ", cid: 'CLP2101' },
        { centreId: 2, value: "Sham Shui Po Centre", cid: 'CLP2201' },
        { centreId: 3, value: "Tsing Yi Centre", cid: 'CLP3801' },
        { centreId: 4, value: "Yuen Long Centre", cid: 'CLP3701' },
        { centreId: 5, value: "Shek Wu Hui Centre", cid: 'CLP3101' },
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
    if (val) {
        if (val == 0) {
            return 0;
        }
        if (val.includes('.')) {
            return Number(val).toFixed(2);
        }
        return val;
    } else {
        return ""
    }
});

const on = Vue.prototype.$on
    // 防抖处理
Vue.prototype.$on = function(event, func) {
    let timer
    let newFunc = func
    if (event === 'click') {
        newFunc = function() {
            clearTimeout(timer)
            timer = setTimeout(function() {
                func.apply(this, arguments)
            }, 500)
        }
    }
    on.call(this, event, newFunc)
}
Vue.filter("changeVal", (val) => {
    if (val) {
        let newVal = val.split("Φ");
        return newVal[0] + "P" + " " + Math.ceil(newVal[1]) + 'V'
    } else {
        return ""
    }
})