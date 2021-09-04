<template>
	<!-- 列表item -->
	<view class="trade-item">
		<!-- 用户/地址 -->
		<view class="flex-center-between item-top">
			<!-- 商家 -->
			<view class="flex-center" v-if="role === 0">
				<image class="avatar-image" src="../../static/images/other/girl.png"></image>
				<text class="text-bold">用户A</text>
				<text class="color-9">江苏省南京市</text>
			</view>
			<!-- 用户消息 -->
			<view class="text-bold merchant-name" v-else-if="role === 1">商家名称</view>
			<!-- 退款-红色-red，未发货-黄色-yellow -->
			<view v-if="state !== -1" class="state" :class="[state === 0 ? 'red' : 'yellow']">{{ state === 0 ? '退款待处理' : '未发货' }}</view>
		</view>
		<!-- 主体 -->
		<view class="item-content flex">
			<image class="goods-image" mode="aspectFill" src="../../static/images/other/demo.png"></image>
			<view class="flex-1 flex-column-between">
				<view class="text-bold">5天英语全能挑战名称可能很长可能是两行</view>
				<view class="flex-center-between">
					<view class="tag">型号一</view>
					<view class="color-9 number">×1</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="item-bottom flex-center">
			<!-- 时间 - 商家状态显示 -->
			<view class="color-9" v-if="role === 0">2021-05-20 14:20:00</view>
			<!-- 金钱 -->
			<view class="flex-center pay-block">
				<text>{{ role === 0 ? '已支付：' : '实付款:' }}</text>
				<view class="text-bold flex-center price">
					<view class="unit">¥</view>
					<view>500</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'trade-lists-item',
	props: {
		state: {
			type: Number,
			default: -1 // 0-退款 1-未发货
		},
		role: {
			type: Number,
			default: 0 //0-商家 1-用户
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
