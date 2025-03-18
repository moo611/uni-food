"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/home/index.js";
  "./pages/setting/index.js";
  "./pages/home/detail.js";
  "./pages/login/signup.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/lnpjj/Desktop/jiedan/android-food/uni-food/App.vue"]]);
const Tabs = () => "./components/tabs.js";
const NavBar = () => "./components/navbar.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.component("Tabs", Tabs);
  app.component("NavBar", NavBar);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
