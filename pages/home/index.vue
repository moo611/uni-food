<template>
	<view class="main">
		<NavBar title="首页" />
		<view class="toper">
			<tabs :titles="[{
		    name: '全部',
		    value: '0'
		  }, {
		    name: '推荐',
		    value: '1'
		  },]" v-model:active="activeTab" @click-tab="tabChange"></tabs>
		</view>
		<view v-if="activeTab == '0'" style="display: flex;flex-direction: row;align-items: center;">
			<uni-search-bar style="flex: 1;" placeholder="请输入名称" v-model="queryParams.name" clearButton="none" cancelButton="none"></uni-search-bar>
			<button style="margin-right: 20rpx;" size="mini" @click="refresh()">搜索</button>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="loadmore">
			<view v-for="(item, index) in state.data" :key="index" class="card" @click="goDetail(item.id)">

				<image style="width: 150rpx;height: 150rpx; object-fit: contain;" :src="item.url" />
				<view style="flex: 1;height: 100%;margin-left: 30rpx;">
					<view style="margin: 5rpx;"><text>菜名:{{item.name}}</text></view>
					<view style="margin: 5rpx;"><text>价格:{{item.price}}￥</text></view>
					<view style="margin: 5rpx;"><text>评分:{{item.rating.toFixed(2)}}</text></view>
				</view>

				<!-- <view style="background-color: #f0f0f0;height: 2rpx; position: absolute; bottom: 0;width: 100%;"/> -->
			</view>
		</scroll-view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue"
	import request from '../../utils/request.js'
	import {
		message
	} from "../../utils/util.js";
	const activeTab = ref('0')
	const queryParams = reactive({
		pageNum: 1,
		pageSize: 10,
		name:''
	})
	const state = reactive({
		data: []
	})

	
	const tabChange = () => {

		const value = activeTab.value
		if (value == '0') {
			refresh()
		} else if (value == '1') {
			getRecommend()
		}

	}

	let isEnd = false
	let isLoading = false

	const refresh = () => {
		isEnd = false
		isLoading = false
		queryParams.pageNum = 1
		state.data = []
		request({
			url: 'food/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			queryParams.pageNum++
			state.data = res.list
		})
	}
	
	const onCancel=()=>{
		console.log(queryParams.name)
	}

	const loadmore = () => {
		
		if(activeTab.value == '1'){
			return
		}
		
		if (isEnd || isLoading) {
			return
		}
		isLoading = true
		request({
			url: 'food/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			isLoading = false
			if (res.list.length == 0) {
				isEnd = true
			} else {
				queryParams.pageNum++
				state.data = state.data.concat(res.list)
			}

		})
	}

	const getRecommend = () => {
		request({
			url: 'food/recommend',
			method: 'GET'
		}).then(res => {
			state.data = res
		})
	}

	const goDetail = (id) => {
		uni.navigateTo({
			url: '/pages/home/detail?id=' + id
		})
	}


	refresh()
</script>

<style scoped>
	.toper {
		/* height: 90rpx; */
		width: 100%;
	}

	.scroll-view {
		width: 100%;
		/* height: 100%; */
		flex: 1;
		overflow: hidden;

		box-sizing: border-box;
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

	.btn {
		position: absolute;
		right: 20rpx;
		top: 20rpx;

	}

	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;

	}

	.toper {
		/* height: 90rpx; */
		width: 100%;
	}
</style>