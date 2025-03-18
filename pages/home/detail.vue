<template>
	<view class="main">
		<NavBar title="详情" :showBack="true" :scroll-y="true" />
		<scroll-view class="scroll-view" scroll-y="true">
			<image style="width: 100%; height: 400rpx; padding: 30rpx; box-sizing: border-box;" :src="state.data.url" />
			<view class="row">
				<text>菜名：{{state.data.name}}</text>
			</view>
			<view class="row">
				<text>价格：{{state.data.price}}</text>
			</view>
			<button type="primary" style="width: 80%; margin: 50rpx auto;" @click="handleRating">评分</button>
			<view class="row">
				<text>相似推荐</text>
			</view>

			<view v-for="(item, index) in state.foodList" :key="index" class="card">

				<image style="width: 150rpx;height: 150rpx; object-fit: contain;" :src="item.url" />
				<view style="flex: 1;height: 100%;margin-left: 30rpx;">
					<view style="margin: 5rpx;"><text>菜名:{{item.name}}</text></view>
					<view style="margin: 5rpx;"><text>价格:{{item.price}}￥</text></view>
				</view>

			</view>

		</scroll-view>
		<uni-popup ref="popupRef" type="center" border-radius="10px 10px 0 0">
			<view
				style="width: 600rpx; height: 400rpx; background-color: white; display: flex; justify-content: center; align-items: center;flex-direction: column;">
				<uni-rate v-model="form.rating" style="margin-bottom: 50rpx;" />
				<button @click="saveRating">确定</button>
			</view>

		</uni-popup>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	import request from '../../utils/request.js'
	import {
		message
	} from '../../utils/util.js';
	let id = ''
	const state = reactive({
		data: {},
		foodList: []
	})
	const form = reactive({
		foodId: '',
		rating: '',
		username: ''
	})
	const popupRef = ref('')
	onLoad((options) => {

		id = options.id
		getFoodDetail()
		getSimilarFood()
	})

	const getFoodDetail = () => {
		request({
			url: 'food/' + id,
			method: 'GET'
		}).then(res => {
			state.data = res
		})
	}

	const getSimilarFood = () => {
		request({
			url: 'food/similar/' + id,
			method: 'GET'
		}).then(res => {
			state.foodList = res
		})
	}

	const handleRating = () => {
		console.log(popupRef)
		popupRef.value.open()
	}
	const saveRating = () => {
		const username = JSON.parse(uni.getStorageSync("user")).username
		form.username = username
		form.foodId = id
		request({
			url: 'rating',
			data: form,
			method: 'POST'
		}).then(res => {
			message.toast("评分成功")
			clearData()
			popupRef.value.close()
		}).catch(e => {
			clearData()
			popupRef.value.close()
		})

	}
	const clearData=()=>{
		form.username = ''
		form.rating = ''
		form.foodId = ''
	}
</script>

<style scoped>
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;

	}

	.scroll-view {

		width: 100%;
		/* height: 100%; */
		flex: 1;
		overflow: hidden;

		box-sizing: border-box;
	}

	.row {
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.card {
		/* margin: 10rpx; */
		box-sizing: border-box;
		padding: 20rpx;
		width: 100%;
		height: 200rpx;
		background-color: white;
		display: flex;
	}
</style>