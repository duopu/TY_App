<!-- 我的 -->
<template>
	<view class="my">
		<!-- 头部 -->
		<view class="flex-center-between my-top">
			<view class="flex-center">
				<image class="avatar-image" :src="user.avatar || defaultShopIcon" mode="aspectFill"></image>
				<view>
					<view class="name text-bold">{{ user.userName }}</view>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="flex-center tabs-lists">
			<view class="flex-1 flex-center-center" @click="jump('baozhengjin')">
				<image class="tabs-image" src="../../../static/images/icons/icon-money.svg" mode="aspectFill"></image>
				<text class="text-bold">保证金</text>
			</view>
			<view class="flex-1 flex-center-center" @click="jump('quanyi')">
				<image class="tabs-image" src="../../../static/images/icons/icon-gift.svg" mode="aspectFill"></image>
				<text class="text-bold">权益中心</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="lists">
			<view class="lists-item" @click="jump('account')">
				<image class="item-image" src="../../../static/images/icons/icon-business-account.svg"
					mode="aspectFill"></image>
				<text class="flex-1">账号与安全</text>
				<image src="../../../static/images/icons/icon-business-more.svg" class="icon-arrow" mode="aspectFill">
				</image>
			</view>
			<!-- <view class="lists-item" @click="jump('setting')">
				<image class="item-image" src="../../../static/images/icons/icon-business-message.svg" mode="aspectFill"></image>
				<text class="flex-1">新消息通知设置</text>
				<image src="../../../static/images/icons/icon-business-more.svg" class="icon-arrow" mode="aspectFill"></image>
			</view> -->
		</view>
		<view class="lists">
			<view class="lists-item" @click="jump('help')">
				<image class="item-image" src="../../../static/images/icons/icon-business-help.svg" mode="aspectFill">
				</image>
				<text class="flex-1">帮助与反馈</text>
				<image src="../../../static/images/icons/icon-business-more.svg" class="icon-arrow" mode="aspectFill">
				</image>
			</view>
			<view class="lists-item" @click="jump('about')">
				<image class="item-image" src="../../../static/images/icons/icon-business-about.svg" mode="aspectFill">
				</image>
				<text class="flex-1">关于腾云课堂</text>
				<image src="../../../static/images/icons/icon-business-more.svg" class="icon-arrow" mode="aspectFill">
				</image>
			</view>
			<view class="lists-item" @click="jump('dy')">
				<image class="item-image" src="../../../static/images/icons/icon-business-about.svg" mode="aspectFill">
				</image>
				<text class="flex-1">打印机配置</text>
				<image src="../../../static/images/icons/icon-business-more.svg" class="icon-arrow" mode="aspectFill">
				</image>
			</view>
		</view>
		<!-- 退出登录 -->
		<button class="btn-border-yellow text-bold" @click="logout">退出登录</button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'myIndex',
		data() {
			return {
				defaultShopIcon: '../../../static/images/my/defaultShopIcon.png',
			};
		},
		computed: {
			...mapState([
				'storeInfo', // 兴趣点列表
				'user'
			])
		},
		mounted() {

		},
		methods: {
			logout() {
				this.$tool.logout();
			},
			jump(type) {
				switch (type) {
					case 'quanyi':
						uni.navigateTo({
							url: '/pages-business/my/benefit/benefit'
						});
						break;
					case 'baozhengjin':
						uni.navigateTo({
							url: `/pages-business/my/money/money`
						});
						break;
					case 'account':
						uni.navigateTo({
							url: '/pages-business/my/account/account'
						});
						break;
					case 'setting':
						uni.navigateTo({
							url: '/pages-business/my/setting/setting'
						});
						break;
					case 'help':
						uni.navigateTo({
							url: '/pages/help/help'
						});
						break;
					case 'about':
						uni.navigateTo({
							url: '/pages/about/about'
						});
						break;

					case 'dy':
						uni.navigateTo({
							url: '/pages-business/dy/dy'
						})
				}
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
