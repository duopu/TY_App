<!-- 待发货 -->
<template>
	<view class="delivery-item">
		<view class="item-top flex-center">
			<image class="avatar-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
			<text class="name text-bold">用户A</text>
			<text class="color-9">江苏省南京市</text>
		</view>
		<view class="item-content flex-center">
			<image class="goods-image" :src="orderGoodData.thumbnail" mode="aspectFill"></image>
			<view class="flex-column-between">
				<view class="title text-bold">{{ orderGoodData.goodsName }}</view>
				<view class="flex-center-between">
					<view class="tips">型号一</view>
					<view class="number">×{{orderGoodData.goodsNum}}</view>
				</view>
			</view>
		</view>
		<view class="item-bottom flex-center-between">
			<view class="color-9">{{orderItemData.createTime}}</view>
			<view class="flex-center">
				已支付：
				<view class="price text-bold">
					<text class="unit">￥</text>
					{{orderItemData.payAmount / 100}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'order-delivery-lists-item',
	props: {
		orderItemData: Object,
		itemClick: Function
	},
	data() {
		return {
			orderGoodData: {}
		};
	},
	created(){
		console.log(this.orderItemData);
		this.orderGoodData = (this.orderItemData.orderItemList || []).length > 0 ? this.orderItemData.orderItemList[0] : {}
		// console.error(this.props.orderItemData);
	},
};
</script>

<style lang="less" src="./style.less"></style>
