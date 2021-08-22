<!-- 消息 -->
<template>
	<view class="message flex-column">
		<!-- 头部 -->
		<view class="message-top flex-center-between">
			<view class="state flex-center">
				<image mode="aspectFill" src="" class="icon-state"></image>
				<text>在线</text>
			</view>
			<text class="title text-bold">消息</text>
			<view class="right-text">
				<image @click="onShowLists" class="icon-more-dot" src="" mode="aspectFill"></image>
				<view class="dot-lists" v-show="showMessage">
					<view class="dot-lists-item" v-for="(item, index) in dotsData" :key="index">{{ item }}</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="message-content">
			<view class="account">
				当前登录账号：
				<text class="color-yellow text-bold">管理员1</text>
			</view>
			<!-- 其他账号 -->
			<view class="lists-item flex-center" @click="openAccount()">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">账号信息</view>
					<view class="desc">2个账号有新消息</view>
				</view>
				<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
			<!-- 交易信息 -->
			<view class="lists-item">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">交易信息</view>
					<view class="desc">有1个新订单产生</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">2012-20-12</view>
					<view class="number">15</view>
				</view>
			</view>
			<!-- 店铺信息 -->
			<view class="lists-item">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">店铺信息</view>
					<view class="desc">有新的退款审批需处理</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">2012-20-12</view>
					<view class="number">15</view>
				</view>
			</view>
			<!-- 用户消息列表 -->
			<view class="lists-item" v-for="(item,index) in ['','','','','']" :key="index">
				<image src="../../../static/images/other/girl.png" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">用户A</view>
					<view class="desc">好哒，亲～～</view>
				</view>
				<view class="flex-column item-right">
					<view class="time text-bold">2012-20-12</view>
					<view class="number">15</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'tabMessageIndex',
	data() {
		return {
			showMessage:false,
			dotsData: ['全部标为已读', '删除全部会话', '聊天设置', '新消息通知设置']
		};
	},
	methods: {
		// 显示消息设置状态
		onShowLists(){
			this.showMessage = !this.showMessage;
		},
		// 显示账号页面
		openAccount(){
			this.$emit('change');
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
