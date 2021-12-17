<!-- 用户信息-用户查看 -->
<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-top">
			<view class="flex-center-between">
				<image class="icon-arrow" src="../../../static/images/icons/icon-back.svg" @click="backAction" mode="aspectFill"></image>
				<view class="save font-24">{{goodsInfo.storeCollectionCheck == 1 ? '未收藏本店' : '已收藏本店'}}</view>
			</view>
			<!-- 用户 -->
			<view class="user-message">
				<view class="flex-column-center">
					<image class="avatar-image" :src="userInfo.avatar" mode="aspectFill"></image>
					<view class="text-bold">{{userInfo.nickName}}</view>
				</view>
				<view class="flex-center">
					<view class="flex-column-center flex-1 horizontal-item">
						<text class="text-bold">{{(statistc.minuteTotal || 0) / 60}}h</text>
						<text class="font-24">学习时长</text>
					</view>
					<view class="flex-column-center flex-1 horizontal-item">
						<text class="text-bold">{{ (statistc.beyondPlatformTotal || 0) }}%</text>
						<text class="font-24">超越平台用户</text>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="user-content">
			<!-- 数据 -->
			<view class="goods-data-lists flex-center">
				<view class="flex-column-center item">
					<text class="number">{{goodsInfo.userOrderCount}}</text>
					<text class="font-24">购买本店商品</text>
				</view>
				<view class="flex-column-center item">
					<text class="number">{{goodsInfo.userCollectionCount}}</text>
					<text class="font-24">收藏本店商品</text>
				</view>
				<view class="flex-column-center item">
					<text class="number">{{goodsInfo.afterSaleCount}}</text>
					<text class="font-24">售后次数</text>
				</view>
			</view>
			<!-- 列表 -->
			<view class="user-lists" v-if="list.length > 0">
				<block v-for="(item, index) in list" :key="index">
					<trade-lists-item :role="1" :key="index" :dataItem="item" :state="1"></trade-lists-item>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 商家信息
			goodsInfo: [],
			// 用户信息
			userInfo: [],
			userId: '',
			storeId:'',
			// 用户统计信息
			statistc:'',
			// 订单列表
			list: []
		};
	},
	onLoad(option){
		this.userId = option.userId;
		this.storeId = option.storeId;
		
		this.getUserInfo();
		this.getUserGoodsList();
		this.queryLearnStatistic()
	},
	methods: {
		// 返回事件
		backAction(){
			uni.navigateBack({})
		},
		getUserInfo(){
			this.$http.get('/user/queryInfoById',{userId: this.userId},false).then(res => {
				this.userInfo = res;
			})
		},
		getUserGoodsList(){
			console.log(getApp().globalData.user)
			this.$http.get('/goods/queryListByUserId',{userId: this.userId,storeId:this.storeId},false).then(res => {
				this.goodsInfo = res;
				this.list = res.orderVOList;
			})
		},
		queryLearnStatistic(){
			console.log(getApp().globalData.user)
			this.$http.get('/dailyTask/queryLearnStatisticByUserId',{userId: this.userId},false).then(res => {
				this.statistc = res;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
