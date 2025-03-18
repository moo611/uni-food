<template>
	<view class="navbar">
		<!-- 状态栏占位 -->
		<view class="status-bar"></view>
		<!-- 导航栏内容 -->
		<view class="navbar-content" :style="{ height: navBarHeight + 'px' }">
			<!-- 后退按钮 -->
			<view class="navbar-left" @click="handleBack">
				<image v-if="showBack" src="@/static/back.png" style="width: 30px;height: 30px;"/> <!-- 使用图标字体或图片 -->
			</view>
			<view class="navbar-title">
				<text>{{ title }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	// 定义 props
	const props = defineProps({
		title: {
			type: String,
			default: '标题'
		},
		showBack: {
			type: Boolean,
			default: false
		}
	});

	const handleBack = () => {
		uni.navigateBack(); // 调用 UniApp 的后退 API
	}

	const navBarHeight = ref(44); // 默认导航栏高度

</script>

<style scoped>
	/* 样式部分保持不变 */
	.navbar {
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
	}

	/* 导航栏内容 */
	.navbar-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		
	}

	/* 左侧后退按钮 */
	.navbar-left {
		position: absolute;
		left: 10px;
		width: 40px;
		/* 按钮宽度 */
		display: flex;
		align-items: center;
	}


	.back-icon {
		font-family: 'iconfont';
		font-size: 20px;
		color: #333333;
	}

	.navbar-title {
		flex: 1;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.navbar-right {
		width: 40px;
	}
</style>