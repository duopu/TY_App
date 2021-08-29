<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view v-if="state === 0" class="flex-center-between top"><view class="name">xx商家</view></view>
		<!-- 退款 -->
		<view v-if="state === 2" class="flex-center-between top"><view class="name">退款商品</view></view>
		<view class="content flex">
			<image class="avatar-image" src="../../static/images/other/demo.png" mode="aspectFill"></image>
			<view class="flex-column flex-1 right">
				<view class="title">5天英语全能挑战名称可能很长可能是两行</view>
				<view class="tag"><view class="tag-item">型号一</view></view>
				<view class="flex-center-between">
					<view class="price">
						<text class="unit">¥</text>
						500
					</view>
					<view class="number">×24</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'merchanism-order-lists-item',
	props: {
		state: {
			type: Number,
			default: 0 //0-默认不状态，只显示商家 2-退款
		}
	},
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
