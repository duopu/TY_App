<!-- 我的 -->
<template>
	<view class="my">
		<!-- 头部 -->
		<view class="flex-center-between my-top">
			<view class="flex-center">
				<image class="avatar-image" :src="storeInfo.avatar" mode="aspectFill"></image>
				<view>
					<view class="name text-bold">{{storeInfo.storeName}}</view>
					<!-- <view class="flex-center account">关联其他账号 ></view> -->
				</view>
			</view>
			<view class="state-lists">
				<view class="state-lists-item">在线</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="flex-center tabs-lists">
			<view class="flex-1 flex-center-center">
				<image class="tabs-image" src="../../../static/images/icons/icon-money.svg" mode="aspectFill"></image>
				<text class="text-bold">保证金</text>
			</view>
			<view class="flex-1 flex-center-center">
				<image class="tabs-image" src="../../../static/images/icons/icon-gift.svg" mode="aspectFill"></image>
				<text class="text-bold">权益中心</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="lists">
			<view class="lists-item">
				<view class="flex-center">
					<image class="item-image" src="" mode="aspectFill"></image>
					<text>账号与安全</text>			
				</view>
				<image src="../../../static/images/icons/icon-arrow-right.svg" class="icon-arrow" mode="aspectFill"></image>
			</view>
			<view class="lists-item">
				<view class="flex-center">
					<image class="item-image" src="" mode="aspectFill"></image>
					<text>新消息通知设置</text>			
				</view>
				<image src="../../../static/images/icons/icon-arrow-right.svg" class="icon-arrow" mode="aspectFill"></image>
			</view>
		</view>
		<view class="lists">
			<view class="lists-item">
				<text>帮助与反馈</text>	
				<image src="../../../static/images/icons/icon-arrow-right.svg" class="icon-arrow" mode="aspectFill"></image>
			</view>
			<view class="lists-item">
				<text>关于腾云课堂</text>	
				<image src="../../../static/images/icons/icon-arrow-right.svg" class="icon-arrow" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 退出登录 -->
		<button class="btn-border-yellow text-bold" @click="logout">退出登录</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default {
		name:"myIndex",
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'storeInfo' // 兴趣点列表
			])
		},
		methods: {
			logout(){
				this.$tool.logout();
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
