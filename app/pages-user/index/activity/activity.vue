<!-- 活动 -->
<template>
	<scroll-view scroll-y="true" class="main-content activity">
		<!-- banner -->
		<image class="banner-image" src="" mode="aspectFill"></image>
		<!-- tabs -->
		<view class="flex-center tabs-block">
			<view class="item">组团优惠</view>
			<view class="item">坚持不懈</view>
			<view class="item">分销大使</view>
		</view>
		<!-- 列表 -->
		<view class="activity-lists-item flex-center" v-for="(item,index) in ['','','']" :key="index">
			<image src="../../../static/images/other/demo.png" class="avatar-image" mode="aspectFill"></image>
			<view class="right">
				<view class="name text-bold">
					5天英语全能挑战只等你来
				</view>
				<!-- 拼团进度条 -->
				<view class="process-wrapper flex-center">
					<view class="process-discount">
						<text class="text">当前优惠:</text><text class="price">¥23</text>
					</view>
					<view class="process flex-1">
						<view class="process-bar text-bold">40%</view>
					</view>
					<view class="process-text flex-center">
						<text class="text">预计优惠:</text><text class="price">¥16</text>
					</view>
				</view>
				<view class="time">
					拼团时间:2020-04-17 10:00:00
				</view>
				<view class="flex-center-between item-bottom">
					<view class="text-bold price">最低折扣价¥200</view>
					<button class="btn-block">参与拼团</button>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name:'TabActivity',
	data() {
		return {

		};
	}
}
</script>

<style lang="less" src="./style.less"></style>
