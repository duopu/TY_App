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
				<view class="title">{{ storeGoodsVO.goodsName }}</view>
				<view class="tag">
					<view v-if="storeGoodsVO.attributesId" class="tag-item">{{ storeGoodsVO.attributesName }}</view>
				</view>
				<view class="flex-center-between">
					<view class="price">
						<text class="unit">¥</text>
						{{ storeGoodsVO.goodsPrice }}
					</view>
					<view class="number">×{{ storeGoodsVO.goodsNum }}</view>
				</view>
			</view>
		</view>

		<!-- 底部操作按钮 -->
		<view class="flex-center-between bottom">
			
			<!-- 更多按钮 -->
			<view v-if="moreOptionBtns.length > 0" class="dots" @click="openMore">
				<image class="icon-dots" src="../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
				<view class="dots-list">
					<button v-for="(value,index) in moreOptionBtns" 
					class="btn-text" 
					:key="`more-btn-${index}`" 
					@click.stop="handleFunctionCall(value.method)">{{value.name}}</button>
				</view>
			</view>	
			
			
			<!-- 操作按钮，最多展示3个，超过3个后其余的放入更多中展示 -->
			<view class="flex-center-end">
				<button v-for="(value,index) in bottomOptionBtns" 
				:class="value.class" 
				:key="`bottom-btn-${index}`" 
				@click.stop="handleFunctionCall(value.method)">{{value.name}}</button>
			</view>
		</view>

		<!-- 底部的插槽 -->
		<slot name="bottom"></slot>
	</view>
</template>

<script>
export default {
	name: 'goods-order-list-item',
	emits: ['goodsClick', 'queryLogistics', 'queryExam', 'payOrder'],
	props: {
		type: {
			type: Number,
			default: 0 //0
		},
		storeGoodsVO: {
			//商品
			type: Object,
			required: true,
			default: {
				attributesId: undefined,
				attributesName: undefined,
				goodsPrice: 0,
				goodsId: undefined,
				goodsNum: 0,
				goodsName: undefined,
				thumbnail: undefined,
				deliveryState: undefined, //发货状态 -1:无需发货 0:未发货 1:已发货 2：已收货
				examState: undefined, //是否有电子凭证 0:无 1:有
				storeId: undefined,
				storeName: undefined,
				orderState: undefined
			}
		}
	},
	computed: {
		// 显示当前订单状态
		showStateName() {
			switch (this.storeGoodsVO.orderState) {
				// 订单状态 -1:已取消 0:待支付 1:已支付 2:已发货 3:已收货 4:已评价 5:申请退款中(未发货) 6:退款中 7:拒绝退款 8：退款失败 9：退款完成 10:已完成（不能再做任何操作） 11: 退货退款申请中 12:商家允许退款待填写发货信息 13:商家拒绝退款 14:用户已填写发货单待商家退款 15:退货退款中 16:退货退款失败21：已支付拼团定金 22:拼团成功待支付尾款 23:已完成拼团并退款 24:拼团失败并退款中
				case -1:
					return '已取消';
					break;
				case 0:
				case 21:
				case 22:
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
				case 10:
					return '已完成';
					break;
				case 5:
				case 11:
				case 6:
				case 12:
				case 14:
				case 15:
				case 23:
				case 24:
					return '退款中';
					break;
				case 7:
				case 13:
					return '拒绝退款';
					break;
				case 9:
					return '退款完成';
					break;
				case 8:
				case 16:
					return '退款失败';
					break;
			}
		}
	},
	data() {
		return {
			optionBtns: [  //所有操作按钮配置  
				{name:'取消订单',method:'cancelOrder',class:['btn','btn-border','grey']},
				{name:'支付订单',method:'payOrder',class:['btn','btn-block']},
				{name:'申请退款',method:'applyRefund',class:['btn','btn-border','black']},
				{name:'退款详情',method:'refundDetail',class:['btn','btn-border','grey']},
				{name:'电子凭证',method:'queryExam',class:['btn','btn-border','grey']},
				{name:'查看物流',method:'queryLogistics',class:['btn','btn-border','black']},
				{name:'确认收货',method:'receivedOrder',class:['btn','btn-block']},
				{name:'去评价',method:'evaluateOrder',class:['btn','btn-block']},
				{name:'删除订单',method:'deletOrder',class:['btn','btn-border','grey']}
			],
			
			bottomOptionBtns: [], //底部操作按钮
			moreOptionBtns: [] //更多操作按钮
		};
	},
	created() {
		this.initOptionBtns();
	},
	methods: {
		
		/**
		 * 初始化底部操作按钮
		 */
		initOptionBtns(){
			this.optionBtns.forEach(value => {
				const isShow = this.isOptionBtnShow(value.name);
				if(isShow){
					if(this.bottomOptionBtns.length < 3){ //这里底部操作按钮最多展示3个，超出三个后其余全部放入更多操作按钮中
						this.bottomOptionBtns.push(value);
					}else {
						this.moreOptionBtns.push(value);
					}
				}
			})
		},
		
		/**
		 * 根据订单状态判断当前按钮是否展示
		 * @param {Object} optionBtnName 按钮名称
		 */
		isOptionBtnShow(optionBtnName){
			const {orderState, examCheck, entityGoodsId} = this.storeGoodsVO;
			switch (optionBtnName) {
				case '取消订单':
					return orderState === 0;
					break;
				case '支付订单':
					return orderState === 0 || orderState === 22;
					break;
				case '申请退款':
					return orderState === 1 || orderState === 2 || orderState === 3 || orderState === 4 || orderState === 8 || orderState === 16 || orderState === 21 || orderState === 22;
					break;
				case '退款详情':
					return orderState === 5 || orderState === 6 || orderState === 7 || orderState === 8 || orderState === 9 || orderState === 11 || orderState === 12 || orderState === 13 || orderState === 14 || orderState === 15 || orderState === 16 || orderState === 23 || orderState === 24;
					break;
				case '电子凭证':
					return examCheck === 1 && orderState !== -1 && orderState !== 0;
					break;
				case '查看物流':
					return entityGoodsId && (orderState === 2 || orderState === 3 || orderState === 4);
					break;
				case '确认收货':
					return orderState === 2;
					break;
				case '去评价':
					return orderState === 3;
					break;
				case '删除订单':
					return orderState === -1 || orderState === 4 || orderState === 10;
					break;
			}
		},
		
		/**
		 * 执行函数
		 * @param {Object} functionName 函数名
		 */
		handleFunctionCall(functionName) {
		    this[functionName]();
		},
		
		// 商品点击
		goodsClick() {
			this.$emit('goodsClick');
		},
		// 取消订单
		cancelOrder() {
			uni.showModal({
				title: '提示',
				content: '是否取消订单',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						this.$http.post('/order/cancel', { orderNum: this.storeGoodsVO.orderNum }, true).then(res => {
							this.$store.commit('setOrderChange');
						});
					}
				}
			});
		},

		// 支付订单
		payOrder() {
			this.$emit('payOrder');
		},
		// 删除订单
		deletOrder() {
			uni.showModal({
				title: '提示',
				content: '是否确定删除订单',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						this.$http.post('/order/delete', { orderNum: this.storeGoodsVO.orderNum }, true).then(res => {
							this.$store.commit('setOrderChange');
						});
					}
				}
			});
		},
		// 申请退款
		applyRefund() {
			uni.navigateTo({
				url: `/pages-user/mine/refund/refund?orderNum=${this.storeGoodsVO.orderNum}`
			});
		},
		// 查看物流
		queryLogistics() {
			this.$http.get('/order/logistics', { orderNum: this.storeGoodsVO.orderNum }, true).then(res => {
				this.$emit('queryLogistics', res);
			});
		},
		//去评价
		evaluateOrder() {
			let that = this;
			uni.navigateTo({
				url: `/pages-user/mine/evaluate/evaluate?goodsVO=${encodeURIComponent(JSON.stringify(this.storeGoodsVO))}`
			});
		},
		//确认收货
		receivedOrder() {
			this.$http.post('/order/received', { orderNum: this.storeGoodsVO.orderNum, goodsId: this.storeGoodsVO.goodsId }, true).then(res => {
				this.$store.commit('setOrderChange');
			});
		},
		//退款详情
		refundDetail() {
			uni.navigateTo({
				url: `/pages-user/mine/refund/details?orderNum=${this.storeGoodsVO.orderNum}`
			});
		},
		//电子凭证
		queryExam() {
			this.$http.get('/goods/queryExam', { goodsId: this.storeGoodsVO.goodsId }, true).then(res => {
				this.$emit('queryExam', res);
			});
		},
		// 更多按钮点击
		openMore(){
			event.currentTarget.classList.toggle('on');
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
