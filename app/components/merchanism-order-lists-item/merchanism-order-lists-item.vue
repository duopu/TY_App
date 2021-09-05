<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view v-if="type === 0" class="flex-center-between top">
			<view class="name">{{ storeGoodsVO.storeName }}</view>
			<view class="desc">{{ showStateName }}</view>
		</view>
		<!-- 退款 -->
		<view v-if="type === 2" class="flex-center-between top"><view class="name">退款商品</view></view>
		
		<!-- 多个商品 -->
		<view class="flex-column" v-for="(item,index) in storeGoodsVO.orderItemList" :key="`goods-${index}`">
			<view class="content flex" @click="goodsClick">
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
			
			<!-- 待发货 -->
			<view class="flex-center bottom" v-if="storeGoodsVO.orderState === 1">
				<button class="btn btn-border grey" @click.stop="applyRefund">申请退款</button>
			</view>
			<!-- 待收货 -->
			<view class="flex-center bottom" v-if="storeGoodsVO.orderState === 2">
				<button class="btn btn-border grey" @click.stop="applyRefund">申请退款</button>
				<button class="btn btn-border black">电子凭证</button>
				<button v-if="item.deliveryState !== -1" class="btn btn-border black" @click.stop="queryLogistics">查看物流</button>
				<button class="btn btn-block">确认收货</button>
			</view>
			<!-- 待评价 -->
			<view class="flex-center bottom" v-if="storeGoodsVO.orderState === 3">
				<button class="btn btn-border grey" @click.stop="applyRefund">申请退款</button>
				<button class="btn btn-border black">电子凭证</button>
				<button class="btn btn-block" @click.stop="evaluateOrder">去评价</button>
			</view>
			<!-- 已完成 -->
			<view class="flex-center bottom" v-if="storeGoodsVO.orderState === 4">
				<button class="btn btn-border grey" @click.stop="applyRefund">申请退款</button>
				<button class="btn btn-border black">电子凭证</button>
			</view>
			
		</view>
		
		<!-- 待付款 -->
		<view class="flex-center bottom line" v-if="storeGoodsVO.orderState === 0">
			<button class="btn btn-border grey" @click.stop="cancelOrder">取消订单</button>
			<button class="btn btn-block" @click.stop="payOrder">支付订单</button>
		</view>
		
		<!-- 已完成 -->
		<view class="flex-center bottom line" v-if="storeGoodsVO.orderState === 4">
			<button class="btn btn-border grey" @click.stop="deletOrder">删除订单</button>
		</view>
		
	</view>
</template>

<script>
export default {
	name: 'merchanism-order-lists-item',
	emits: ['goodsClick','cancelOrder', 'queryLogistics', 'payOrder', 'deletOrder', 'applyRefund', 'evaluateOrder'],
	props: {
		type: {
			type: Number,
			default: 0 //0-默认不状态，只显示商家 2-退款
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
					thumbnail:undefined,
					deliveryState:undefined //发货状态 -1:无需发货 0:未发货 1:已发货 2：已收货
				}],
				storeId:undefined,
				storeName:undefined,
				orderState: undefined
			}
		}
	},
	computed:{
		// 显示当前订单状态
		showStateName() {
			switch (this.storeGoodsVO.orderState) {
				
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
	data() {
		return {};
	},
	methods: {
		
		// 商品点击
		goodsClick(){
			this.$emit("goodsClick");
		},
		// 取消订单
		cancelOrder(){
			this.$emit("cancelOrder");
		},
		// 支付订单
		payOrder(){
			this.$emit("payOrder");
		},
		// 查看物流
		queryLogistics(){
			this.$emit("queryLogistics");
		},
		// 删除订单
		deletOrder(){
			this.$emit("deletOrder");
		},
		// 申请退款
		applyRefund(){
			this.$emit("applyRefund");
		},
		// 去评价
		evaluateOrder(){
			this.$emit("evaluateOrder");
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
