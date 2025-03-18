"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request2 = require("../../utils/request2.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const form = common_vendor.reactive({
      username: "",
      password: ""
    });
    const login = () => {
      utils_request2.request({
        url: "user/login",
        data: form
      }).then((res) => {
        common_vendor.index.setStorageSync("token", res);
        utils_request.request({
          url: "user/info",
          method: "GET"
        }).then((res2) => {
          const user = res2;
          common_vendor.index.setStorageSync("user", JSON.stringify(user));
          utils_util.message.toast("登录成功");
          common_vendor.index.switchTab({
            url: "/pages/home/index"
          });
        });
      });
    };
    const signup = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/signup"
      });
    };
    const token = common_vendor.index.getStorageSync("token");
    if (token) {
      common_vendor.index.switchTab({
        url: "/pages/home/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: form.username,
        b: common_vendor.o(($event) => form.username = $event.detail.value),
        c: form.password,
        d: common_vendor.o(($event) => form.password = $event.detail.value),
        e: common_vendor.o(login),
        f: common_vendor.o(signup)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
