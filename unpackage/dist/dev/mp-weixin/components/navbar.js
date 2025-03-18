"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const navBarHeight = common_vendor.ref(44);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: common_assets._imports_0
      } : {}, {
        c: common_vendor.o(handleBack),
        d: common_vendor.t(__props.title),
        e: navBarHeight.value + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b7e7b81"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/components/navbar.vue"]]);
wx.createComponent(Component);
