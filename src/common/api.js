// import axios from "axios";
import Qs from "qs";
export const base_url = "https://www.clplms.com";
import { Message } from 'element-ui';

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
//超时时间10秒
// axios.defaults.timeout = 10000;
export const $Post = (api, value) => {
    return new Promise((resolve, reject) => {
        axios({
            url: base_url + api,
            method: 'post',
            transformRequest: [function(data) { //在请求之前对data传参进行格式转换
                data = Qs.stringify(data)
                return data
            }],
            data: value,
        }).then(res => {
            resolve(res.data)
            if (res.data.code != 100) {
                Message.warning(res.data.extend.error || "To deal with failure")
            }
        }).catch(err => {
            reject(err)
        })
    })
}
export const imageUpload = (formData) => {
    return new Promise((resolve, reject) => {
        let api = base_url + "/api/upload/uploadFileNow";
        // let formData = new FormData();
        // formData.append("userId", "1");
        // for (var i = 0; i < this.fileList.length; i++) {
        //     formData.append("picList", this.fileList[i]);
        // }
        // formData.append("picList", this.fileList);
        axios({
                url: api,
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": `multipart/form-data;boundary=${new Date().getTime()}`,
                },
            })
            .then((res) => {
                console.log(res);
                resolve(res.data);
                if (res.code != 0) {
                    Message.warning(res.data.error || "To deal with failure")
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err)
            });
    })
}


// 通用
// 发送短信验证码
export const sendSms = (data) => $Post("/api/sendSms/sendSms", data);
// 上传图片
export const uploadFileNow = (data) => $Post("/api/upload/uploadFileNow", data);
// 控制设备
export const controlCharger = (data) => $Post("/api/chargerOperation/controlCharger", data);
// 查询六个地区下充电桩等信息
export const findBYN = (data) => $Post("/api/chargerData/findByChargerNetwork", data);
// 根据条件查询充电状态
export const findBIC = (data) => $Post("/api/chargerInfo/findByIndividualCharger", data);
// 查询充电桩的实时数据
export const findByDetails = (data) => $Post("/api/chargerInfo/findByDetails", data);
// 条件筛选查询
export const findByParamsAll = (data) => $Post("/api/chargerInfo/findByParamsAll", data);
// 根据地区查询 充电桩的充电总时长等
export const findByDataRecord = (data) => $Post("/api/chargerInfo/findByDataRecord", data);
// 导出
export const excelExp = (data) => $Post("/api/chargerInfo/excelExp", data)


// 登陆部分
//  登陆
export const Login = (data) => $Post("/api/pcUser/login", data);
//  需要发送验证码的 第二次登陆
export const loginTwo = (data) => $Post("/api/pcUser/loginTwo", data);
//  添加或者修改用户信息
export const addOrUpdEntity = (data) => $Post("/api/pcUser/addOrUpdEntity", data);
//  删除用户
export const delEntity = (data) => $Post("/api/pcUser/delEntity", data);
//  根据用户ID查询信息
export const findById = (data) => $Post("/api/pcUser/findById", data);
// 查询所有用户
export const pcUserFindByAll = (data) => $Post("/api/pcUser/findByAll", data);




// 权限部分
// 分页查询权限信息
export const roleKeyFindAll = (data) => $Post("/api/roleKey/findAll", data);
// 添加或修改 权限
export const roleKeySOE = (data) => $Post("/api/roleKey/saveOrUpdEntity", data);

// 设置中 Center
// 查询所有
export const CDFindAll = (data) => $Post("/api/centreDepartment/findAll", data);
// 添加或者修改信息
export const CDSaveOrUpdEntity = (data) => $Post("/api/centreDepartment/saveOrUpdEntity", data);
// 删除信息
export const CDDelEntity = (data) => $Post("/api/centreDepartment/delEntity", data);
// 根据ID查询信息
export const CDFindById = (data) => $Post("/api/centreDepartment/findById", data);




// 设置中Electric
// 查询所有的车辆信息
export const EVFindAll = (data) => $Post("/api/electricVehicle/findAll", data);
// 查询单个车辆信息
export const EVFindById = (data) => $Post("/api/electricVehicle/findById", data);
// 删除车辆信息
export const EVDelEntity = (data) => $Post("/api/electricVehicle/delEntity", data);
// 添加或者修改 车辆信息
export const EVSaveOrUpdEntity = (data) => $Post("/api/electricVehicle/saveOrUpdEntity", data);
// 下拉框查询 车辆名称
export const EVFindBySelect = (data) => $Post("/api/electricVehicle/findBySelect", data);
// 下拉框查询 车辆类型
export const EVFindBySelectTwo = (data) => $Post("/api/electricVehicle/findBySelectTwo", data);

// 设置中Charger
// 分页查询所有充电桩
export const ChargerFindAll = (data) => $Post("/api/charger/findAll", data);
// 查询一条
export const ChargerFindById = (data) => $Post("/api/charger/findById", data);
// 删除信息
export const ChargerDelEntity = (data) => $Post("/api/charger/delEntity", data);
// 添加或修改充电桩
export const ChargerSaveOrUpdEntity = (data) => $Post("/api/charger/saveOrUpdEntity", data);

// 设置中Charger Number
// 分页查询所有充电器编号
export const CNFindAll = (data) => $Post("/api/chargerNumbering/findAll", data);
// 根据充电桩编号ID查询
export const CNFindById = (data) => $Post("/api/chargerNumbering/findById", data);
// 根据充电桩编号ID删除对象
export const CNDelEntity = (data) => $Post("/api/chargerNumbering/delEntity", data);
// 添加或修改 充电编号信息
export const CNSaveOrUpdEntity = (data) => $Post("/api/chargerNumbering/saveOrUpdEntity", data);


// Ev Charger Number
//分页查询 电动车充电器编号 
export const ECNFindAll = (data) => $Post("/api/evChargerNumbering/findAll", data);
//根据电动车充电器ID查询信息 
export const ECNFindById = (data) => $Post("/api/evChargerNumbering/findById", data);
//根据电动车充电器ID删除对象 
export const ECNDelEntity = (data) => $Post("/api/evChargerNumbering/delEntity", data);
//添加或者修改电动车充电器 
export const ECNSaveOrUpdEntity = (data) => $Post("/api/evChargerNumbering/saveOrUpdEntity", data);
//  根据中心和层数 查询车类类别
export const findByChargerType = (data) => $Post("/api/chargerNumbering/findByChargerType", data);


// 设置中Vehicle
// 分页查询车牌号码
export const VNFindAll = (data) => $Post("/api/vehicleNumber/findAll", data);
// 根据车牌号码ID查询信息
export const VNFindById = (data) => $Post("/api/vehicleNumber/findById", data);
// 根据车牌号码ID删除对象
export const VNDelEntity = (data) => $Post("/api/vehicleNumber/delEntity", data);
// 添加或修改 车牌号码
export const VNSaveOrUpdEntity = (data) => $Post("/api/vehicleNumber/saveOrUpdEntity", data);
// 根据车辆类型查询车牌号
export const findByModel = (data) => $Post("/api/vehicleNumber/findByModel", data);