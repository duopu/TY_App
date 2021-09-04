<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view v-if="type === 0" class="flex-center-between top">
			<view class="name">{{storeGoodsVO.storeName}}</view>
			<view class="desc">{{ showStateName }}</view>
		</view>
		<!-- 退款 -->
		<view v-if="type === 2" class="flex-center-between top"><view class="name">退款商品</view></view>
		<!-- 多个商品 -->
		<view class="content flex" v-for="(item,index) in storeGoodsVO.orderItemList" :key="`goods-${index}`">
			<image class="avatar-image" :src="item.thumbnail" mode="aspectFill"></image>
			<view class="flex-column flex-1 right">
				<view class="title">{{item.goodsName}}</view>
				<view class="tag"><view v-if="item.attributesId" class="tag-item">{{item.attributesName}}</view></view>
				<view class="flex-center-between">
					<view class="price">
						<text class="unit">¥</text>
						{{item.price}}
					</view>
					<view class="number">×{{item.goodsNum}}</view>
				</view>
			</view>
		</view>
		<!-- 待付款 -->
		<view class="flex-center bottom" v-if="state === 1">
			<button class="btn btn-border grey">取消订单</button>
			<button class="btn btn-block">支付订单</button>
		</view>
		<!-- 待发货 -->
		<view class="flex-center bottom" v-if="state === 2"><button class="btn btn-border grey">申请退款</button></view>
		<!-- 待收货 -->
		<view class="flex-center bottom" v-if="state === 3">
			<button class="btn btn-border grey">申请退款</button>
			<button class="btn btn-border black">电子凭证</button>
			<button class="btn btn-block">确认收货</button>
		</view>
		<!-- 已完成 -->
		<view class="flex-center bottom" v-if="state === 4">
			<button class="btn btn-border grey">申请退款</button>
			<button class="btn btn-border grey">删除订单</button>
			<button class="btn btn-border black">再来一单</button>
			<button class="btn btn-block">去评价</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'merchanism-order-lists-item',
	props: {
		type: {
			type: Number,
			default: 0 //0-默认不状态，只显示商家 2-退款
		},
		state: {
			type: Number,
			default: 0 //0-不显示底部，1-待付款 2-待发货 3-待收货 4-已完成
		},
		storeGoodsVO: { //商品
			type: Object,
			required: true,
			default: {
				orderItemList:[{
					attributesId: undefined,
					attributesName: undefined,
					price: 0,
					goodsId:undefined,
					goodsNum:0,
					goodsName:undefined,
					thumbnail:undefined
				}],
				storeId:undefined,
				storeName:undefined
			}
		}
	},
	computed:{
		// 显示当前订单状态
		showStateName() {
			switch (this.state) {
				case 1:
					return '待付款';
					break;
				case 2:
					return '待发货';
					break;
				case 3:
					return '待收货';
					break;
				case 4:
					return '已完成';
					break;
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		
	}
};
</script>

<style src="./style.less" lang="less"></style>
