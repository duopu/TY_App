<!-- 保证金 -->
<template>
	<view class="money">
		<view class="title text-bold">保证金总额</view>
		<!-- 金额 -->
		<view class="block-box">
			<view class="flex sum-money">
				<text class="unit">¥</text>
				2000.00
			</view>
			<view class="flex-center-center">
				<button class="btn btn-block">立即缴纳</button>
				<button class="btn btn-light">保证金退款</button>
			</view>
		</view>
		<!-- 保证金说明 -->
		<view class="block-box">
			<view>保证金说明</view>
			<view class="describe">
				<view class="text">1.缴纳保证金后，方可使用商城功能</view>
				<view class="text">2.请按约定额度及时间缴纳保证金</view>
				<view class="text">3.可申请退还保证金</view>
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

<style src="./style.less" lang="less"></style>
