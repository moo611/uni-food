"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "tabs",
  props: {
    // 定义属性
    titles: {
      type: Array,
      default: () => []
    },
    active: {
      type: String,
      default: ""
    },
    backColor: {
      type: String,
      default: "#fff"
    }
  },
  emits: ["click-tab", "update:active"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const currentTab = common_vendor.ref("0"), tabs = common_vendor.ref([]);
    const stopWatch = common_vendor.watch(() => props.titles, (newVal) => {
      tabs.value = newVal.map((item) => ({
        key: item.value,
        title: item.name
      }));
      if (newVal.length > 0) {
        stopWatch();
      }
    });
    const acStopWatch = common_vendor.watch(() => props.active, (newVal) => {
      currentTab.value = newVal;
      if (newVal) {
        acStopWatch();
      }
    });
    if (props.titles.length > 0) {
      props.titles.forEach((item, index) => {
        tabs.value.push({ key: item.value, title: item.name });
      });
      currentTab.value = tabs.value[0].key;
    }
    const tabChange = (key, index) => {
      currentTab.value = key;
      emits("update:active", key);
      emits("click-tab", index);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tabs), (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.title),
            b: index,
            c: common_vendor.unref(currentTab) === tab.key ? 1 : "",
            d: common_vendor.o(($event) => tabChange(tab.key, index), index)
          };
        }),
        b: props.backColor
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec5aa011"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/components/tabs.vue"]]);
wx.createComponent(Component);
