<!-- 我的钱包 -->
<template>
	<view class="wallet">
		<view class="wallet-top">
			<view class="wallet-money text-bold">
				<text>1000.00</text>
				<text class="unit">金币</text>
			</view>
			<button class="btn text-bold">我要提现</button>
			<view class="title text-bold">提现规则：</view>
			<view class="desc">1、满500金币即可提现。2、100金币等于人民币1元</view>
		</view>
		<!-- 金币变动明细 -->
		<view class="wallet-details">
			<view class="title text-bold">金币变动明细：</view>
			<view class="list-item flex-center-between">
				<view class="flex-column">
					<view>提现</view>
					<view class="color-9">2021-03-21 18:03:12</view>
				</view>
				<view class="money text-bold color-red">-500金币</view>
			</view>
			<view class="list-item flex-center-between">
				<view class="flex-column">
					<view>每日任务</view>
					<view class="color-9">2021-03-21 18:03:12</view>
				</view>
				<view class="money text-bold">+500金币</view>
			</view>
		</view>
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
