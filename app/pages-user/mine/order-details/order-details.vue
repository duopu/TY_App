<!-- 订单详情 -->
<template>
	<scroll-view class="order-details" scroll-y="true" >
		<!-- 订单状态 -->
		<view class="flex-center-center order-state">
			<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
			<text class="text-bold">{{showStateName}}</text>
		</view>
		<!-- 商品 -->
		<merchanism-order-lists-item :storeGoodsVO="orderVO"></merchanism-order-lists-item>
		<!-- 地址 -->
		<view class="flex-center address" @click="jumpChooseAddress">
			<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">{{orderVO.name}} {{orderVO.mobile}}</view>
				<view class="desc">{{orderVO.address}}</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="box">
			<view class="flex-center row">
				<text class="text-bold">订单编号：</text>
				<view class="flex-1 text-left">{{orderVO.orderNum}}</view>
			</view>
			<view class="flex-center row">
				<text class="text-bold">创建时间：</text>
				<view class="flex-1 text-left">{{orderVO.createTime}}</view>
			</view>
		</view>
		<!-- 优惠信息 -->
		<view class="box">
			<view class="title text-bold">优惠信息</view>
			<view class="row flex-center-between">
				<text class="label">商品原价</text>
				<text class="flex-1">¥{{orderVO.orderAmount}}</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">平台优惠</text>
				<text class="flex-1 color-9">{{orderVO.platformDiscountAmount}}</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">商家优惠</text>
				<text class="flex-1 color-9">-¥{{orderVO.storeDiscountAmount}}</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">金币抵扣</text>
				<text class="flex-1 color-9">-¥{{orderVO.goldDeductionAmount}}</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">实际支付</text>
				<text class="flex-1">¥{{orderVO.payAmount}}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderNum:undefined, //订单编号
			orderVO: {} //订单对象
		};
	},
	computed:{
		// 显示当前订单状态
		showStateName() {
			switch (this.orderVO.orderState) {
				
				// 订单状态 -1:已取消 0:待支付 1:已支付 2:已发货 3:已完成 4:已评价 5:申请退款中 6:退款中 7:退款完成
				// 8.未支付拼团定金 9.已支付拼团定金 10.已完成拼团并退款 11.拼团失败并退款中
				
				case -1:
					return '已取消';
					break;
				case 0:
					return '待付款';
					break;
				case 1:
					return '待发货';
					break;
				case 2:
					return '待收货';
					break;
				case 3:
					return '待评价';
					break;
				case 4:
					return '已完成';
					break;
				case 5:
					return '申请退款中';
					break;
				case 6:
					return '退款中';
					break;
				case 7:
					return '退款完成';
					break;
							
			}
		}
	},
	onLoad(option) {
		this.orderNum = option.orderNum;
		this.queryOrderDetail();
	},
	methods: {
		queryOrderDetail(){
			this.$http
				.get('/order/queryDetail', {orderNum:this.orderNum}, true)
				.then(res => {
					this.orderVO = res;
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
