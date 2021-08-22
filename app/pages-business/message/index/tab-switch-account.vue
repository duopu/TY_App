<!-- 其他账号消息 -->
<template>
	<view class="message flex-column">
		<!-- 头部 -->
		<view class="message-top flex-center-between">
			<image class="icon-left-arrow" src="" mode="aspectFill" @click="closeAccount"></image>
			<text class="title text-bold">其他账号信息</text>
		</view>
		<!-- 内容  -->
		<scroll-view scroll-y="true" class="message-content">
			<!-- 管理员列表 -->
			<scroll-view scroll-x="true" class="flex-center account-lists">
				<view class="account-lists-item flex-column" :class="{ on: index === 0 }" v-for="(item, index) in ['', '', '', '']" :key="index">
					<image mode="aspectFill" class="item-image" src="../../../static/images/other/girl.png"></image>
					<view class="tips" v-if="index === 0"></view>
					<text class="text text-ellipsis">管理员2</text>
				</view>
			</scroll-view>
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
			<view class="lists-item" v-for="(item, index) in ['', '', '', '', '']" :key="index">
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
	name: 'tabSwitchAccount',
	data() {
		return {};
	},
	methods: {
		// 关闭当前页面
		closeAccount() {
			this.$emit('change');
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
