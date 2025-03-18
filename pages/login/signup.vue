<template>
	<view style="display: flex;justify-content: center;align-items: center; height: 500rpx;">
		<image src="../../static/logo.png" style="width: 150rpx;height: 150rpx;"/>
	</view>
	
	<view class="my-input-div">
		<text>用户名</text>
		<input class="my-input" v-model="form.username" placeholder="请输入" />
	</view>
	
	<view class="my-input-div">
		<text>昵称</text>
		<input class="my-input" v-model="form.nickname" placeholder="请输入" />
	</view>
	<view class="my-input-div">
		<text>密码</text>
		<input class="my-input" v-model="form.password" placeholder="请输入" password />
	</view>
	
	<button type="primary" class="my-btn" @click="signup">注册</button>
</template>

<script setup>
import { reactive } from 'vue';
import request from '../../utils/request2';
import { message } from '../../utils/util';
	const form = reactive({
		username:'',
		password:'',
		nickname:'',
		role:'1'
	})
	
	const signup=()=>{
		request({url:'user',data:form}).then(res=>{
			message.toast("注册成功")
			uni.navigateBack()
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