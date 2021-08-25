<!--  -->
<template>
	<scroll-view class="index">
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
			<swiper :vertical="true" :indicator-dots="false" :autoplay="true" :interval="2000">
				<swiper-item><view class="swiper-item">我是公告标题我是公告标题我是公告标题我是公告标题...</view></swiper-item>
				<swiper-item><view class="swiper-item">我是公告标题我是公告标题我是公告标题我是公告标题...</view></swiper-item>
			</swiper>
		</view>
		<!-- 订单 -->
		<view class="flex-center-between index-title">
			<text class="text">订单</text>
			<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<view class="order-lists flex-center block-box">
			<view class="order-lists-item" @click="onJump(item)" v-for="(item, index) in ordersStateData" :key="index">
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
			<view class="flex-center-between lists-row" v-for="(item, index) in goodsStateData" :key="index">
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
			<view class="flex-center-between lists-row" v-for="(item, index) in ticketsData.oldTicketsData" :key="index">
				<view class="flex-center">
					<image class="icons" :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.label }}</text>
				</view>
				<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="lists block-box">
			<view class="flex-center-between lists-row" v-for="(item, index) in ticketsData.nowTicketsData" :key="index">
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
			// 订单
			ordersStateData: [
				{
					icon: '../../../static/images/order/dfk.png',
					number: 6,
					label: '待付款'
				},
				{
					icon: '../../../static/images/order/dfh.png',
					number: 20,
					label: '待发货'
				},
				{
					icon: '../../../static/images/order/dsh.png',
					number: 0,
					label: '待售后'
				},
				{
					icon: '../../../static/images/order/wlyc.png',
					number: 0,
					label: '物流异常'
				},
				{
					number: 0,
					icon: '../../../static/images/order/dpj.png',
					label: '待评价'
				}
			],
			//商品
			goodsStateData: [
				{
					label: '已上架',
					number: 5
				},
				{
					label: '未上架',
					number: 5
				},
				{
					label: '回收站',
					number: 15
				}
			],
			// 优惠卷
			ticketsData: {
				oldTicketsData: [
					{
						icon: '../../../static/images/icons/icon-ticket-created.svg',
						label: '已创建'
					},
					{
						icon: '../../../static/images/icons/icon-ticket-created-invalid.svg',
						label: '已生效'
					}
				],
				nowTicketsData: [
					{
						icon: '../../../static/images/icons/icon-ticket-add.svg',
						label: '创建优惠劵'
					},
					{
						icon: '../../../static/images/icons/icon-live.svg',
						label: '直播'
					}
				]
			}
		};
	},
	created(data) {
		console.log(getApp().globalData.user)
	},
	methods: {
		changeState(value) {
			this.showState = !this.showState
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
