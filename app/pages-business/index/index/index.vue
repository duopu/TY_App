<!--  -->
<template>
	<scroll-view scroll-y="true" class="index">
		<view class="flex-center-between index-top">
			<view class="flex-center">
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view>
					<view class="name text-bold">忙碌的管理员</view>
					<view class="flex-center account">关联其他账号 ></view>
				</view>
			</view>
			<view class="state-lists" :class="{on:showState}" @click="changeState">
				<view v-show="showState || (!showState && userStatus === 1)" @click="userStatus = 1"  class="state-lists-item">在线</view>
				<view v-show="showState || (!showState && userStatus === 2)" @click="userStatus = 2" class="state-lists-item">忙碌</view>
				<view v-show="showState || (!showState && userStatus === 3)" @click="userStatus = 3" class="state-lists-item">离线</view>
			</view>
		</view>
		<!-- 公告 -->
		<view class="block-box notice">
			<swiper :vertical="true" :circular="true" :indicator-dots="false" :autoplay="true" :interval="2000">
				<swiper-item v-for="(item,index) in noticeList" @click="jumpNotice" :key="index">
					<view class="swiper-item">{{ item.title }}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 订单 -->
		<view class="flex-center-between index-title">
			<text class="text">订单</text>
			<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<view class="order-lists flex-center block-box">
			<view class="order-lists-item" @click="onJump(index)" v-for="(item, index) in ordersStateData" :key="index">
				<image class="item-image" :src="item.icon" mode="aspectFill" />
				<view class="number-tips" v-if="item.number">{{ item.number }}</view>
				<text>{{ item.label }}</text>
			</view>
		</view>
		<!-- 商品 -->
		<view class="flex-center-between index-title">
			<text class="text">商品</text>
			<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<view class="lists block-box">
			<view class="flex-center-between lists-row" v-for="(item, index) in goodsStateData" @click="jumpGoodList(item.type)" :key="index">
				<text>{{ item.label }}</text>
				<view class="flex-center">
					<view class="number-tips">{{ item.number }}</view>
					<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="flex-center-between index-title">
			<text class="text">优惠卷</text>
			<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<view class="lists block-box">
			<view class="flex-center-between lists-row" v-for="(item, index) in ticketsData.oldTicketsData" @click="jump('ticket',index)" :key="index">
				<view class="flex-center">
					<image class="icons" :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.label }}</text>
				</view>
				<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="lists block-box">
			<view class="flex-center-between lists-row" v-for="(item, index) in ticketsData.nowTicketsData" @click="jump(item.key,index)"  :key="index">
				<view class="flex-center">
					<image class="icons" :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.label }}</text>
				</view>
				<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'businessIndex',
	data() {
		return {
			// 显示当前用户状态\
			showState:false,
			userStatus: 1,
			noticeList: [],
			// 订单
			ordersStateData: [
				{
					key: 'noPayCount',
					icon: '../../static/images/order/dfk.png',
					number: 0,
					label: '待付款'
				},
				{
					key: 'noDeliveryCount',
					icon: '../../static/images/order/dfh.png',
					number: 0,
					label: '待发货'
				},
				{
					key: 'afterSaleCount',
					icon: '../../static/images/order/dsh.png',
					number: 0,
					label: '待售后'
				},
				{
					key: 'noEvaluateCount',
					icon: '../../static/images/order/dpj.png',
					label: '待评价',
					number: 0,
				}
			],
			//商品
			goodsStateData: [
				{
					label: '已上架',
					type: 1,
					key: 'pushCount',
					number: 0
				},
				{
					label: '未上架',
					type: 2,
					key: 'noPushCount',
					number: 0
				},
				{
					label: '回收站',
					type: 3,
					key: 'recycleCount',
					number: 0
				}
			],
			// 优惠卷
			ticketsData: {
				oldTicketsData: [
					{
						icon: '../../static/images/icons/icon-ticket-created.svg',
						label: '已创建'
					},
					{
						icon: '../../static/images/icons/icon-ticket-created-invalid.svg',
						label: '已生效'
					}
				],
				nowTicketsData: [
					{
						icon: '../../static/images/icons/icon-ticket-add.svg',
						label: '创建优惠劵',
						key: 'created-ticket'
					},
					{
						icon: '../../static/images/icons/icon-live.svg',
						label: '直播',
						key: 'live'
					} 
				]
			}
		};
	},
	mounted(data) {
		console.log('首页的用户信息打印',getApp().globalData.user);

		// 获取公告列表
		this.queryNoticeList();
		// 获取订单统计i信息
		this.queryOrderNumber();
		// 获取商品统计信息
		this.queryGoodsNumber();
		
		// 测试推流 丁乐
		// setTimeout(()=>{
		// 	uni.navigateTo({
		// 		url:'/pages-business/index/live/live-broadcast?pushUrl=rtmp://push.sinfinite.cn/live/10?txSecret=c6454257db0e9be54726b64a0c7154c4&txTime=6146C2C6&courseId=3&liveName=让人&liveIntro=好👌？我'
		// 	})
		// },1000)
	},
	methods: {
		changeState(value) {
			this.showState = !this.showState
		},
		queryNoticeList(){
			this.$http.get('/announcement/queryPage',{page: 1, size: 3},false).then(res => {
				console.log(res);
				this.noticeList = res.content || [];
			})
		},
		jumpGoodList(type){
			uni.navigateTo({
				url:`/pages-business/index/goods/goods?type=${type}`
			})
		},
		jumpNotice(){
			uni.navigateTo({
				url:`/pages-business/index/notice/notice`
			})
		},
		onJump(index){
			uni.navigateTo({
				url:`/pages-business/index/order/order`
			})
		},
		jump(name,type){
			switch (name) {
				case 'ticket':
					uni.navigateTo({
						url:`/pages-business/my/ticket/ticket`
					})
					break;
				case 'created-ticket':
					uni.navigateTo({
						url:`/pages-business/my/ticket/add`
					});
					break;
				case 'live':
					// 跳转直播，测试用 丁乐写
					uni.navigateTo({
						url:'/pages-business/index/live/publish'
					})
					break;
			}
		},
		queryOrderNumber(){
			this.$http.get('/order/statistic').then(res => {
				let ordersStateData = [...this.ordersStateData];
				ordersStateData.forEach(item =>  {
					item.number = res[item.key]
				});
				this.ordersStateData = ordersStateData;
			})
		},
		// 获取商品列表统计信息
		queryGoodsNumber(){
			this.$http.get('/goods/statistic').then(res => { 
				if(!res) return;
				let goodsStateData = [...this.goodsStateData];
				goodsStateData.forEach(item =>  {
					item.number = res[item.key] || 0
				});
				this.goodsStateData = goodsStateData;
			})
		}
	} 
};
</script>

<style lang="less" src="./style.less"></style>
