<!-- 分销弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="bottom" :safeArea="false">
		<view class="popup-main">
			<!-- 标题 -->
			<view class="popup-top">
				<view class="title text-bold">{{ state === 0 ? '商品分销' : '平台分销' }}</view>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<!-- 内容 -->
			<scroll-view class="popup-content" :scroll-y="true">
				<view class="row">
					<text class="label text-bold">分销活动：</text>
					<text class="color-6">{{state === 0 ? '邀请好友购买商品':'邀请好友注册'}}</text>
				</view>
				<view class="row">
					<text class="label text-bold">分销规则：</text>
					<text class="color-6" v-if="state === 0">每成功邀请一个好友购买完该商品，获得500金币，同一分享人和被分享人只在首次消费是获得返佣，无邀请好友上限。</text>
					<text class="color-6" v-if="state === 1">每成功邀请一个好友注册app账号，获得500金币，无邀请上限</text>
				</view>
				<!-- 推广记录 -->
				<view class="record-title"><text class="text">推广记录</text></view>
				<view class="flex-center">
					<view class="record-item flex-column">
						<text class="number">29</text>
						<text class="text">推广人数</text>
					</view>
					<view class="record-item flex-column">
						<text class="number">1500</text>
						<text class="text">反佣金币</text>
					</view>
				</view>
				<!-- 表格 -->
				<view class="table">
					<view class="table-header">
						<view class="cell">推广用户</view>
						<view class="cell" v-if="state === 0">用户状态</view>
						<view class="cell">预计分佣</view>
						<view class="cell">分佣状态</view>
					</view>
					<view class="table-row" v-for="(item,index) in ['','','','','','']" :key="index">
						<view class="cell">
							<view class="flex-center">
								<image class="avatar-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
								<text>商家品</text>
							</view>
						</view>
						<view class="cell" v-if="state === 0">已关联</view>
						<view class="cell">500</view>
						<view class="cell">等待分佣</view>
					</view>
				</view>
			</scroll-view>
			<!-- 复制链接 -->
			<view class="popup-bottom">
				<button class="btn">复制链接</button>
			</view>
		</view>
		
	</uni-popup>
</template>

<script>
export default {
	name: 'sales-distribute-popup',
	props: {
		state: {
			type: Number,
			default: 0 // 0-商品 1-平台
		}
	},
	data() {
		return {};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
