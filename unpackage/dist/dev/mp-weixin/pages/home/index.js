"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  const _component_tabs = common_vendor.resolveComponent("tabs");
  (_component_NavBar + _component_tabs)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeTab = common_vendor.ref("0");
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10
    });
    const state = common_vendor.reactive({
      data: []
    });
    const tabChange = () => {
      const value = activeTab.value;
      if (value == "0") {
        refresh();
      } else if (value == "1") {
        getRecommend();
      }
    };
    let isEnd = false;
    let isLoading = false;
    const refresh = () => {
      isEnd = false;
      isLoading = false;
      queryParams.pageNum = 1;
      state.data = [];
      utils_request.request({
        url: "food/list",
        data: queryParams,
        method: "GET"
      }).then((res) => {
        queryParams.pageNum++;
        state.data = res.list;
      });
    };
    const loadmore = () => {
      if (activeTab.value == "1") {
        return;
      }
      if (isEnd || isLoading) {
        return;
      }
      isLoading = true;
      utils_request.request({
        url: "food/list",
        data: queryParams,
        method: "GET"
      }).then((res) => {
        isLoading = false;
        if (res.list.length == 0) {
          isEnd = true;
        } else {
          queryParams.pageNum++;
          state.data = state.data.concat(res.list);
        }
      });
    };
    const getRecommend = () => {
      utils_request.request({
        url: "food/recommend",
        method: "GET"
      }).then((res) => {
        state.data = res;
      });
    };
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/home/detail?id=" + id
      });
    };
    refresh();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "首页"
        }),
        b: common_vendor.o(tabChange),
        c: common_vendor.o(($event) => activeTab.value = $event),
        d: common_vendor.p({
          titles: [{
            name: "全部",
            value: "0"
          }, {
            name: "推荐",
            value: "1"
          }],
          active: activeTab.value
        }),
        e: common_vendor.f(state.data, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: index,
            e: common_vendor.o(($event) => goDetail(item.id), index)
          };
        }),
        f: common_vendor.o(loadmore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
