<!-- 签到 -->
<template>
	<view class="sign-in">
		<!-- 头部 -->
		<view class="sign-in-top flex-center-between">
			<image class="icon" src="../../../static/images/icons/icon-back-white.svg" mode="aspectFill"></image>
			<view class="number flex-center-center">
				<image class="icon" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image>
				<text class="text-bold">500</text>
			</view>
		</view>
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="sign-in-content">
			<!-- 签到按钮 -->
			<view class="sign-in-button">
				<!-- 未签到 -->
				<image v-if="false" class="image-btn" src="../../../static/images/sign-in.png" mode="aspectFill"></image>
				<!-- 已签到 -->
				<image class="image-btn" src="../../../static/images/sign-in-finish.png" mode="aspectFill"></image>
			</view>
			<!-- 连续签到 -->
			<view class="box series">
				<view class="title text-bold">
					<text>连续签到</text>
					<text class="day">3天</text>
				</view>
				<view class="font-24 color-9">连续7天签到有惊喜</view>
				<!-- 时间 -->
				<view class="series-list flex">
					<view class="item normal flex-center-center"><text class="number">29</text></view>
					<view class="item normal flex-center-center"><text class="number ">30</text></view>
					<view class="item normal flex-center-center"><text class="number ">1</text></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<image class="image item" src="../../../static/images/sign-in-gift.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 每日任务 -->
			<view class="box task">
				<view class="title text-bold">每日任务</view>
				<!-- 学习时间 -->
				<view class="flex-center-center item" v-for="(item, index) in ['', '', '', '']" :key="index">
					<view class="flex-column flex-1">
						<view class="flex-center">
							<text class="text-bold">学习100分钟</text>
							<view class="flex-center tag">
								<image class="image-tag" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image>
								<text class="color-red font-24">+100</text>
							</view>
						</view>
						<text class="font-24 color-6">今天已完成：10/100</text>
					</view>
					<!-- yellow -->
					<button class="btn text-bold " :class="{ yellow: index === 1 }">去完成</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
