"use strict";
const common_vendor = require("../common/vendor.js");
const message = {
  toast: (title) => {
    common_vendor.index.showToast({
      title,
      icon: "none",
      duration: 2e3,
      mask: true
    });
  },
  success: (title) => {
    common_vendor.index.showToast({
      title,
      duration: 2e3,
      mask: true
    });
  },
  error: (title) => {
    common_vendor.index.showToast({
      title,
      icon: "error",
      duration: 2e3,
      mask: true
    });
  },
  clearToast: () => {
    common_vendor.index.hideToast();
  },
  showLoading: (msg) => {
    common_vendor.index.showLoading({
      title: msg || "请稍后...",
      mask: true
    });
  },
  hideLoading: () => {
    common_vendor.index.hideLoading();
  },
  confirm: (content) => new Promise((reslove, reject) => {
    common_vendor.index.showModal({
      title: "温馨提示",
      content,
      success: function(res) {
        if (res.confirm) {
          reslove(res);
        } else if (res.cancel)
          ;
      }
    });
  })
};
exports.message = message;
