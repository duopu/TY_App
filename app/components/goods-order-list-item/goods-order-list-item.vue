<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view class="flex-center-between top">
			<view class="name">{{ storeGoodsVO.storeName }}</view>
			<view class="desc">{{ showStateName }}</view>
		</view>

		<!-- 商品 -->
		<view class="content flex" @click="goodsClick">
			<image class="avatar-image" :src="storeGoodsVO.thumbnail" mode="aspectFill"></image>
			<view class="flex-column flex-1 right">
				<view class="title">{{storeGoodsVO.goodsName}}</view>
				<view class="tag"><view v-if="storeGoodsVO.attributesId" class="tag-item">{{storeGoodsVO.attributesName}}</view></view>
				<view class="flex-center-between">
					<view class="price">
						<text class="unit">¥</text>
						{{storeGoodsVO.goodsPrice}}
					</view>
					<view class="number">×{{storeGoodsVO.goodsNum}}</view>
				</view>
			</view>
		</view>	

		<!-- 底部操作按钮 -->
		<view class="flex-center bottom">
			<button v-if="storeGoodsVO.orderState === 0" class="btn btn-border grey" @click.stop="cancelOrder">取消订单</button>
			<button v-if="storeGoodsVO.orderState === 0 || storeGoodsVO.orderState === 22" class="btn btn-block" @click.stop="payOrder">支付订单</button>
			<button v-if="storeGoodsVO.orderState === 1 || storeGoodsVO.orderState === 2 || storeGoodsVO.orderState === 3 || storeGoodsVO.orderState === 4 || storeGoodsVO.orderState === 8 || storeGoodsVO.orderState === 16 || storeGoodsVO.orderState === 21 || storeGoodsVO.orderState === 22" class="btn btn-border grey" @click.stop="applyRefund">申请退款</button>
			<button v-if="storeGoodsVO.orderState === 5 || storeGoodsVO.orderState === 6 || storeGoodsVO.orderState === 7 || storeGoodsVO.orderState === 8 || storeGoodsVO.orderState === 9 || storeGoodsVO.orderState === 11 || storeGoodsVO.orderState === 12 || storeGoodsVO.orderState === 13 || storeGoodsVO.orderState === 14 || storeGoodsVO.orderState === 15 || storeGoodsVO.orderState === 16 || storeGoodsVO.orderState === 23 || storeGoodsVO.orderState === 24" class="btn btn-border black" @click.stop="refundDetail">退款详情</button>
			<button v-if="storeGoodsVO.examCheck === 1 && storeGoodsVO.orderState !== -1 && storeGoodsVO.orderState !== 0" class="btn btn-border black" @click="queryExam">电子凭证</button>
			<button v-if="storeGoodsVO.entityGoodsId && (storeGoodsVO.orderState === 2 || storeGoodsVO.orderState === 3 || storeGoodsVO.orderState === 4)" class="btn btn-border black" @click.stop="queryLogistics">查看物流</button>
			<button v-if="storeGoodsVO.orderState === 2" class="btn btn-block" @click="receivedOrder">确认收货</button>
			<button v-if="storeGoodsVO.orderState === 3" class="btn btn-block" @click.stop="evaluateOrder">去评价</button>
			<button v-if="storeGoodsVO.orderState === 4 || storeGoodsVO.orderState === 10" class="btn btn-border grey" @click.stop="deletOrder">删除订单</button>
		</view>
		
		<!-- 底部的插槽 -->
		<slot name="bottom"></slot>
		
	</view>
</template>

<script>
export default {
	name: 'goods-order-list-item',
	emits: ['goodsClick', 'queryLogistics', 'queryExam'],
	props: {
		type: {
			type: Number,
			default: 0 //0
		},
		storeGoodsVO: { //商品
			type: Object,
			required: true,
			default: {
				attributesId: undefined,
				attributesName: undefined,
				goodsPrice: 0,
				goodsId:undefined,
				goodsNum:0,
				goodsName:undefined,
				thumbnail:undefined,
				deliveryState:undefined, //发货状态 -1:无需发货 0:未发货 1:已发货 2：已收货
				examState:undefined, //是否有电子凭证 0:无 1:有
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

				// 订单状态 -1:已取消 0:待支付 1:已支付 2:已发货 3:已收货 4:已评价 5:申请退款中(未发货) 6:退款中 7:拒绝退款 8：退款失败 9：退款完成 10:已完成（不能再做任何操作） 11: 退货退款申请中 12:商家允许退款待填写发货信息 13:商家拒绝退款 14:用户已填写发货单待商家退款 15:退货退款中 16:退货退款失败21：已支付拼团定金 22:拼团成功待支付尾款 23:已完成拼团并退款 24:拼团失败并退款中

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
				case 10:
					return '已完成';
					break;
				case 5: case 11:
					return '申请退款中';
					break;
				case 6: case 12: case 14: case 15: case 23: case 24:
					return '退款中';
					break;
				case 7: case 13:
					return '拒绝退款';
					break;
				case 9:
					return '退款完成';
					break;
				case 8: case 16:
					return '退款失败';
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
			this.$emit('goodsClick');
		},
		// 取消订单
		cancelOrder(){
			uni.showModal({
			    title: '提示',
			    content: '是否取消订单',
				confirmText: '确定',
				cancelText: '取消',
			    success: (res) => {
			        if (res.confirm) {
					   this.$http
					   	.post('/order/cancel', {orderNum:this.storeGoodsVO.orderNum}, true)
					   	.then(res => {
					   		this.$store.commit('setOrderChange');
					   	});
			        }
			    }
			});
		},
			
		// 支付订单
		payOrder(){
			//TODO: 这里需要掉支付接口
			// this.$store.commit('setOrderChange');
		},
		// 删除订单
		deletOrder(){
			uni.showModal({
			    title: '提示',
			    content: '是否确定删除订单',
				confirmText: '确定',
				cancelText: '取消',
			    success: (res) => {
			        if (res.confirm) {
			            this.$http.post('/order/delete', {orderNum:this.storeGoodsVO.orderNum}, true).then(res => {
			            	this.$store.commit('setOrderChange');
			            });
			        }
			    }
			});
		},
		// 申请退款
		applyRefund(){
			uni.navigateTo({
				url: `/pages-user/mine/refund/refund?orderNum=${this.storeGoodsVO.orderNum}`
			});
		},
		// 查看物流
		queryLogistics(){
			this.$http
				.get('/order/logistics', {orderNum:this.storeGoodsVO.orderNum}, true)
				.then(res => {
					this.$emit('queryLogistics', res);
				});
		},
		//去评价
		evaluateOrder(){
			let that = this;
			uni.navigateTo({
				url: `/pages-user/mine/evaluate/evaluate?goodsVO=${encodeURIComponent(JSON.stringify(this.storeGoodsVO))}`
			});
		},
		//确认收货
		receivedOrder(){
			this.$http
				.post('/order/received', {orderNum:this.storeGoodsVO.orderNum, goodsId:this.storeGoodsVO.goodsId}, true)
				.then(res => {
					this.$store.commit('setOrderChange');
				});
		},
		//退款详情
		refundDetail(){
			uni.navigateTo({
			    url: `/pages-user/mine/refund/details?orderNum=${this.storeGoodsVO.orderNum}`
			});
		},
		//电子凭证
		queryExam(){
			this.$http
				.get('/goods/queryExam', {goodsId:this.storeGoodsVO.goodsId}, true)
				.then(res => {
					this.$emit('queryExam', res);
				});
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
