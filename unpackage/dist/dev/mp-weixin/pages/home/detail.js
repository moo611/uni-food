"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_NavBar + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    let id = "";
    const state = common_vendor.reactive({
      data: {},
      foodList: []
    });
    const form = common_vendor.reactive({
      foodId: "",
      rating: "",
      username: ""
    });
    const popupRef = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      id = options.id;
      getFoodDetail();
      getSimilarFood();
    });
    const getFoodDetail = () => {
      utils_request.request({
        url: "food/" + id,
        method: "GET"
      }).then((res) => {
        state.data = res;
      });
    };
    const getSimilarFood = () => {
      utils_request.request({
        url: "food/similar/" + id,
        method: "GET"
      }).then((res) => {
        state.foodList = res;
      });
    };
    const handleRating = () => {
      console.log(popupRef);
      popupRef.value.open();
    };
    const saveRating = () => {
      const username = JSON.parse(common_vendor.index.getStorageSync("user")).username;
      form.username = username;
      form.foodId = id;
      utils_request.request({
        url: "rating",
        data: form,
        method: "POST"
      }).then((res) => {
        utils_util.message.toast("评分成功");
        clearData();
        popupRef.value.close();
      }).catch((e) => {
        clearData();
        popupRef.value.close();
      });
    };
    const clearData = () => {
      form.username = "";
      form.rating = "";
      form.foodId = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "详情",
          showBack: true,
          ["scroll-y"]: true
        }),
        b: state.data.url,
        c: common_vendor.t(state.data.name),
        d: common_vendor.t(state.data.price),
        e: common_vendor.o(handleRating),
        f: common_vendor.f(state.foodList, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: index
          };
        }),
        g: common_vendor.o(($event) => form.rating = $event),
        h: common_vendor.p({
          modelValue: form.rating
        }),
        i: common_vendor.o(saveRating),
        j: common_vendor.sr(popupRef, "431a10b7-1", {
          "k": "popupRef"
        }),
        k: common_vendor.p({
          type: "center",
          ["border-radius"]: "10px 10px 0 0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-431a10b7"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/pages/home/detail.vue"]]);
wx.createPage(MiniProgramPage);
