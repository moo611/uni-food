"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const user = common_vendor.toRefs(JSON.parse(common_vendor.index.getStorageSync("user")));
    const logout = () => {
      common_vendor.index.clearStorage();
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "设置"
        }),
        b: common_assets._imports_0$1,
        c: common_vendor.t(common_vendor.unref(user).nickname),
        d: common_vendor.o(logout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-861f37f2"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/pages/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
