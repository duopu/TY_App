<!-- 待发货 -->
<template>
	<view class="delivery-item" @click="seeOrderInfo(orderItemData.orderNum)">
		<view class="item-top flex-center">
			<image class="avatar-image" :src="orderItemData.avatar" mode="aspectFill"></image>
			<text class="name text-bold">{{orderItemData.userName}}</text>
			<text class="color-9">{{orderItemData.province || ''}} </text>
		</view>
		<view class="item-content flex-center">
			<image class="goods-image" :src="orderItemData.thumbnail" mode="aspectFill"></image>
			<view class="flex-column-between">
				<view class="title text-bold">{{ orderItemData.goodsName }}</view>
				<view class="flex-center-between">
					<view class="tips" v-if="!!orderItemData.attributesName">{{orderItemData.attributesName}}</view>
					<view class="number">×{{orderItemData.goodsNum}}</view>
				</view>
			</view>
		</view>
		<view class="item-bottom flex-center-between">
			<view class="color-9">{{orderItemData.createTime}}</view>
			<view class="flex-center">
				已支付：
				<view class="price text-bold">
					<text class="unit">￥</text>
					{{orderItemData.payAmount}}
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
		// this.orderGoodData = (this.orderItemData.orderItemList || []).length > 0 ? this.orderItemData.orderItemList[0] : {}
		// this.orderGoodData = this.orderItemData.orderItemList
		// console.error(this.props.orderItemData);
	},
	methods:{
		seeOrderInfo(id){
			uni.navigateTo({
				url: '/pages-business/index/order-details/order-details?orderId='+id
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
