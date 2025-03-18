"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request2 = require("../../utils/request2.js");
const utils_util = require("../../utils/util.js");
const _sfc_main = {
  __name: "signup",
  setup(__props) {
    const form = common_vendor.reactive({
      username: "",
      password: "",
      nickname: "",
      role: "1"
    });
    const signup = () => {
      utils_request2.request({ url: "user", data: form }).then((res) => {
        utils_util.message.toast("注册成功");
        common_vendor.index.navigateBack();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: form.username,
        b: common_vendor.o(($event) => form.username = $event.detail.value),
        c: form.nickname,
        d: common_vendor.o(($event) => form.nickname = $event.detail.value),
        e: form.password,
        f: common_vendor.o(($event) => form.password = $event.detail.value),
        g: common_vendor.o(signup)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e3975d0a"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/pages/login/signup.vue"]]);
wx.createPage(MiniProgramPage);
