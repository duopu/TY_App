<!-- 我的 -->
<template>
	<view class="my">
		<!-- 头部 -->
		<view class="flex-center-between my-top">
			<view class="flex-center">
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view>
					<view class="name text-bold">忙碌的管理员</view>
					<view class="flex-center account">关联其他账号 ></view>
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
			<view class="flex-1 flex-center-center" @click="jump('quanyi')">
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
	export default {
		name:"myIndex",
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				this.$tool.logout();
			},
			jump(type){
				switch (type) {
					case 'quanyi':
						uni.navigateTo({
							url:'/pages-business/my/benefit/benefit'
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
							url:'/pages-business/index/live/record'
						})
						break;
				}
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
