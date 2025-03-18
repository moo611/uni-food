<template>
	<view class="main">
		<NavBar title="设置" />
		<view class="content">
			<image src="@/static/user.png" style="width: 100rpx;height: 100rpx;margin: 50rpx;" />
			<text>{{user.nickname}}</text>


			<button type="warn" @click="logout" style="margin-top: 100rpx;">退出登录</button>
		</view>

	</view>
</template>

<script setup>
	import {
		toRefs
	} from 'vue'
	const user = toRefs(JSON.parse(uni.getStorageSync("user")))

	const logout = () => {
		uni.clearStorage()
		uni.redirectTo({
			url: "/pages/login/login"
		})
	}
</script>

<style scoped>
	.main{
		height: 100vh;
	}
	.content {
		flex-direction: column;
		display: flex;
		align-items: center;
		height: 100%;
	}
</style>