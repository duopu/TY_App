<!-- 我的 -->
<template>
	<view class="my">
		<!-- 顶部 -->
		<view class="my-top flex-center-between">
			<view class="flex-center">
				<image class="icons" src="../../../static/images/icons/icon-setting.svg" mode="aspectFill"></image>
				<image class="icons m-left-20" src="../../../static/images/icons/icon-scan.svg" mode="aspectFill"></image>
			</view>
			<view class="right">
				<image class="icons" src="../../../static/images/icons/icon-message2.svg" mode="aspectFill"></image>
				<text class="tips-number">12</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="my-content">
			<!-- 头像 -->
			<view class="flex-center avatar">
				<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
				<view class="right">
					<view class="flex-center">
						<text class="name">我是木子呀！</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
					</view>
					<view class="level">LV1</view>
				</view>
			</view>
			<!-- 任务 -->
			<view class="flex-center task-lists">
				<view class="item">
					<text class="text">20小时</text>
					<text class="desc">学习超过</text>
				</view>
				<view class="item">
					<text class="text">97%学员</text>
					<text class="desc">超过平台</text>
				</view>
				<view class="item">
					<text class="text">3次</text>
					<text class="desc">完成任务</text>
				</view>
			</view>
			<!-- 会员 -->
			<view class="vip flex-center-between">
				<view class="flex-center">
					<image class="vip-image" src="../../../static/images/my/vip.png" mode="aspectFill"></image>
					<text class="name">vip会员</text>
				</view>
				<view class="flex-center desc">查看我的会员权益 ></view>
			</view>

			<view class="my-list-box">
				<!-- 我的服务 -->
				<view class="title">我的服务</view>
				<view class="service-lists">
					<view class="item" v-for="(item,index) in serviceLists" :key="index" @click="jumpPage(item.page)">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<text class="text">{{item.text}}</text>
					</view>
				</view>
				<!-- 课程中心 -->
				<view class="title">课程中心</view>
				<view class="course-lists">
					<view class="item" v-for="(item,index) in courseLists" :key="index">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<text class="text">{{item.text}}</text>
					</view>
				</view>
				<!-- 其他服务 -->
				<view class="title">其他服务</view>
				<view class="other-lists">
					<navigator url="../account/account" class="flex-center-between item">
						<image class="item-image" src="../../../static/images/icons/icon-my-account.svg" mode="aspectFill"></image>
						<view class="flex-center-between right">
							<text class="text">账户与安全</text>
							<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
						</view>
					</navigator>
					<navigator url="../setting/setting" class="flex-center-between item">
						<image class="item-image" src="../../../static/images/icons/icon-my-setting.svg" mode="aspectFill"></image>
						<view class="flex-center-between right">
							<text class="text">设置中心</text>
							<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			serviceLists: [
				{
					image: '../../../static/images/my/my-money.png',
					text: '我的钱包'
				},
				{
					image: '../../../static/images/my/my-order.png',
					text: '我的订单'
				},
				{
					image: '../../../static/images/my/my-cart.png',
					text: '购物车',
					page: '/pages-user/mine/cart/cart'
				},
				{
					image: '../../../static/images/my/my-task.png',
					text: '每日任务'
				},
				{
					image: '../../../static/images/my/my-ticket.png',
					text: '优惠券',
					page: '/pages-user/mine/ticket/ticket'
				},
				{
					image:'../../../static/images/my/my-storage.png',
					text:'收藏/足迹'
				}
			],
			courseLists:[
				{
					image:'../../../static/images/my/my-kcfx.png',
					text:'课程分销'
				},
				{
					image:'../../../static/images/my/my-wyrz.png',
					text:'我要入驻'
				},
				{
					image:'../../../static/images/my/my-lxkf.png',
					text:'联系客服'
				},
				{
					image:'../../../static/images/my/my-swhz.png',
					text:'商务合作'
				}
			]
		};
	},
	methods:{
		
		/**
		 * 页面跳转
		 * @param {Object} pagePath 页面路由
		 */
		jumpPage(pagePath){
			uni.navigateTo({
				url:pagePath
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
