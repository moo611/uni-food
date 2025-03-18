"use strict";
const common_vendor = require("../common/vendor.js");
const utils_util = require("./util.js");
const baseURL = "http://localhost:8081/";
const request = ({
  url,
  data,
  method = "POST"
}) => {
  const token = common_vendor.index.getStorageSync("token");
  return new Promise((resolve, reject) => {
    const header = {};
    if (token) {
      header.Authorization = "Bearer " + token;
    }
    let reqUrl = baseURL + url;
    common_vendor.index.request({
      url: reqUrl,
      data,
      method,
      timeout: 1e4,
      dataType: "json",
      header,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const {
            code
          } = res.data;
          const _msg = res.data.msg || res.data.message;
          if (code === 200) {
            return resolve(res.data.data);
          }
          if (code === 401) {
            utils_util.message.toast(_msg);
            common_vendor.index.clearStorage();
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          }
          console.log("-------", code);
          utils_util.message.toast(_msg || res.error || "未知错误");
          reject(_msg);
        } else {
          utils_util.message.error("请求失败请重试");
          reject(new Error("请求失败请重试"));
        }
      },
      fail(err) {
        console.log(err);
        utils_util.message.error("请求失败请重试");
        reject(new Error("请求失败请重试"));
      }
    });
  });
};
exports.request = request;
