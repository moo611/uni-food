<template>

	<view style="display: flex;justify-content: center;align-items: center; height: 500rpx;">
		<image src="../../static/logo.png" style="width: 150rpx;height: 150rpx;" />
	</view>

	<view class="my-input-div">
		<text>用户名</text>
		<input class="my-input" v-model="form.username" placeholder="请输入" />
	</view>
	<view class="my-input-div">
		<text>密码</text>
		<input class="my-input" v-model="form.password" placeholder="请输入" password />
	</view>
	<button type="primary" class="my-btn" @click="login">登录</button>
	<button type="default" class="my-btn" @click="signup">注册</button>
</template>

<script setup>
	import request2 from '../../utils/request2.js'
	import request from '../../utils/request.js'
	import {
		reactive
	} from 'vue';
	import {
		message
	} from '../../utils/util.js';
	const form = reactive({
		username: '',
		password: ''
	})


	const login = () => {

		request2({
			url: 'user/login',
			data: form
		}).then(res => {
			uni.setStorageSync("token", res)
			request({
				url: 'user/info',
				method: 'GET'
			}).then(res => {
				const user = res
				uni.setStorageSync("user", JSON.stringify(user))
				message.toast('登录成功')

				uni.switchTab({
					url: "/pages/home/index"
				})
			})

		})
	}
	const signup = () => {
		uni.navigateTo({
			url: "/pages/login/signup"
		})
	}
	const token = uni.getStorageSync("token")

	if (token) {
		uni.switchTab({
			url: "/pages/home/index"
		})



	}
</script>

<style scoped>
	.my-input-div {
		width: 80%;
		margin: 20rpx auto;
	}

	.my-input {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 80rpx;
	}

	.my-btn {
		width: 80%;
		margin: 50rpx auto;
		height: 80rpx;
	}
</style>