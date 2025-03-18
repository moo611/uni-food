"use strict";
const common_vendor = require("../common/vendor.js");
const utils_util = require("./util.js");
const baseURL = "http://localhost:8081/";
const request = ({
  url,
  data,
  method = "POST"
}) => {
  return new Promise((resolve, reject) => {
    let reqUrl = baseURL + url;
    console.log("reqUrl", reqUrl);
    common_vendor.index.request({
      url: reqUrl,
      data,
      method,
      timeout: 1e4,
      dataType: "json",
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const {
            code
          } = res.data;
          const _msg = res.data.msg || res.data.message;
          if (code === 200) {
            return resolve(res.data.data);
          }
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
