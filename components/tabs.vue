<template>
  <view class="tabs" :style="{ 'background-color': props.backColor }">
    <view v-for="(tab, index) in tabs" :key="index" :class="{ active: currentTab === tab.key }" @click="tabChange(tab.key, index)">
      {{ tab.title }}
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  // 定义属性
  titles: {
    type: Array,
    default: () => [],
  },
  active: {
    type: String,
    default: "",
  },
  backColor: {
    type: String,
    default: "#fff",
  }
});
const emits = defineEmits(["click-tab", "update:active"]);

const currentTab = ref("0"),
  tabs = ref([]);
const stopWatch = watch(() => props.titles, (newVal) => {
  tabs.value = newVal.map(item => ({
    key: item.value,
    title: item.name
  }));
  if (newVal.length > 0)
  {
    stopWatch()
  }
})
const acStopWatch = watch(() => props.active, (newVal) => {
  currentTab.value = newVal;
  if (newVal)
  {
    acStopWatch()
  }
})

if (props.titles.length > 0)
{
  props.titles.forEach((item, index) => {
    tabs.value.push({ key: item.value, title: item.name });
  });
  currentTab.value = tabs.value[0].key;
}
const tabChange = (key, index) => {
  currentTab.value = key
  emits("update:active", key);
  emits("click-tab", index);
}
</script>

<style lang="scss" scoped>
.tabs {
  padding-bottom: 10rpx;
  font-size: 25rpx;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
  display: flex;
}

.tabs view {
  cursor: pointer;
  padding: 15rpx;
  display: inline-block
}

.tabs .active {
  border-bottom: 2px solid #09f;
}

.content {
  padding: 20rpx;
}
</style>
