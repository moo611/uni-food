
const storage = {
  set: (key, data) => {
    try {
      uni.setStorageSync(key, data);
    } catch(e) {}
  },
  remove: (key) => {
    try {
      uni.removeStorageSync(key);
    } catch (e) {}
  },
  get: (key) => {
    try {
      const value = uni.getStorageSync(key);
      return value && value;
    } catch (e) {}
  },
  clear: () => {
    try {
      uni.clearStorageSync();
    } catch (e) {}
  },
};

const message = {
  toast: (title) => {
    uni.showToast({
      title,
      icon: 'none',
      duration: 2000,
      mask: true,
    });
  },
  success: (title) => {
    uni.showToast({
      title,
      duration: 2000,
      mask: true,
    });
  },
  error: (title) => {
    uni.showToast({
      title,
      icon: 'error',
      duration: 2000,
      mask: true,
    });
  },
  clearToast: () => {
    uni.hideToast();
  },
  showLoading: (msg) => {
    uni.showLoading({
      title: msg || "请稍后...",
      mask: true,
    });
  },
  hideLoading: () => {
    uni.hideLoading();
  },
  confirm: (content) =>
    new Promise((reslove, reject) => {
      uni.showModal({
        title: '温馨提示',
        content,
        success: function (res) {
          if (res.confirm) {
            reslove(res)
          } else if (res.cancel) {
          }
        }
      });
    }),
};

const successBack = (msg) => {
  storage.remove("collectForm");
  message.success(msg);
  setTimeout(() => {
    uni.navigator.go(-1);
  }, 1200);
};



export { successBack, message, storage };
