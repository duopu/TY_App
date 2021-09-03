<!-- 订单确认 -->
<template>
	<view class="order-confirm">
		<scroll-view class="order-confirm-content" scroll-y="true">
			<!-- 收获地址 -->
			<view v-if="orderVO.needAddress" class="flex-center address" @click="jumpChooseAddress">
				<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
				<view class="flex-column flex-1">
					<view class="name">{{defaultAddress.name}} {{defaultAddress.phone}}</view>
					<view class="desc">{{defaultAddress.provinceName}} {{defaultAddress.cityName}} {{defaultAddress.areaName}} {{defaultAddress.streetName}} {{defaultAddress.address}}</view>
				</view>
				<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
			</view>

			<!-- 购买列表 -->
			<view class="box" v-for="(item, index) in orderVO.storeOrderList" :key="`store-goods-${index}`">
				<!-- 商家 -->
				<merchanism-order-lists-item :storeGoodsVO="item"></merchanism-order-lists-item>
				<view class="row flex-center-between">
					<text class="label">商品原价</text>
					<text>¥{{item.orderAmount}}</text>
				</view>
				<view v-if="orderVO.needAddress" class="row flex-center-between">
					<text class="label">运费</text>
					<text>¥{{item.freightAmount}}</text>
				</view>
				<view class="row flex-center-between"  @click="chooseStoreCoupon(item.storeCouponId, item.storeCouponList)">
					<text class="label">商家优惠</text>
					<text v-if="item.storeCouponId" class="flex-1 color-red">-¥{{item.storeDiscountAmount}}</text>
					<text v-else class="flex-1 color-9">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view class="row flex-center-between"  @click="openPopup('ticketPopup')">
					<text class="flex-1 color-red">小计: ¥{{item.payAmount}}</text>
				</view>
			</view>
			<!-- 平台优惠券 -->
			<view class="box platform">
				<view class="row flex-center-between">
					<text class="label">平台优惠</text>
					<text v-if="orderVO.platformCouponId" class="flex-1 color-red">-¥{{orderVO.platformDiscountAmount}}</text>
					<text v-else class="flex-1 color-9">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view class="row flex-center-between" @click="openPopup('dicountPopup')">
					<text class="label">金币抵扣</text>
					<text v-if="orderVO.goldDeductionAmount && orderVO.goldDeductionAmount > 0" class="flex-1 color-red">-¥{{orderVO.goldDeductionAmount}}</text>
					<text v-else class="flex-1 color-9">无可用金币</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>	
			</view>
			<!-- 同意协议 -->
			<view class="flex-center agree-row">
				<!-- 选中 类名 on -->
				<view class="radio" :class="{on:isAgree}" @click="setAgree()"></view>
				<view class="flex-center text">
					同意
					<!-- TODO: 这里的协议地址需要配置 -->
					<navigator class="service" url="">《腾云课堂服务协议》</navigator>
				</view>
			</view>
		</scroll-view>
		<!-- 底部合计 -->
		<view class="order-confirm-bottom flex-center-between">
			<view class="flex left">
				<text>合计:</text>
				<text class="price">¥{{orderVO.payAmount}}</text>
			</view>
			<button class="btn" @click="openPopup('paymentPopup')">提交订单</button>
		</view>
		<!-- 直选支付方式 弹窗 -->
		<common-payment-popup ref="paymentPopup"></common-payment-popup>
		<!-- 金币抵扣弹窗 -->
		<confirm-dicount-popup ref="dicountPopup"></confirm-dicount-popup>
		<!-- 商家优惠券 -->
		<confirm-ticket-popup ref="ticketPopup" 
		:couponList="storeCouponList" 
		:selectCouponId="selectStoreCouponId" 
		@submit="storeCouponSubmit"></confirm-ticket-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex'; //引入mapState
export default {
	data() {
		return {
			isAgree: true, //是否同意协议
			orderVO:{
				freightAmount:0, //运费
				goldCoin:0, //能使用的金币数量
				goldDeductionAmount:0, //金币抵扣金额
				maxGoldCoin:0, //每笔订单最大使用金币数
				needAddress:false, //是否需要收货地址
				orderAmount:0, //订单原始金额
				payAmount:0, //支付金额
				platformCouponId:undefined, //平台优惠券ID
				platformDiscountAmount:0, //平台优惠金额
				storeDiscountAmount:0, //商家优惠金额
				storeOrderList:[]
			},
			storeCouponList:[], //商家可用优惠券
			selectStoreCouponId:undefined, //商家选中的优惠券
			refreshOrderDetailParams:{
				address:undefined,
				goldCoin:0,
				mobile:undefined,
				name:undefined,
				platFormCouponId:undefined,
				storeGoodsList:[]
			}
		};
	},
	computed: mapState({
		// 选中的收货地址
		defaultAddress: state => state.defaultAddress
	}),
	onLoad() {
		this.getOrderDetail();
	},
	methods: {
		// 打开 支付方式弹窗
		openPopup(value) {
			this.$refs[value].open();
		},
		
		// 是否同意点击
		setAgree(){
			this.isAgree = !this.isAgree;
		},
		
		// 下单之前获取订单信息
		getOrderDetail(){
			this.$http
				.post('/order/getDetail', {goodsList:this.$store.state.storeGoodsList}, true)
				.then(res => {
					this.orderVO = res;
				});
		},
		
		/**
		 * 选择商家优惠点击
		 * @param {Object} storeCouponId  选中的商家优惠券ID
		 * @param {Object} storeCouponList  可选择的商家优惠券列表
		 */
		chooseStoreCoupon(storeCouponId, storeCouponList){
			this.selectStoreCouponId = storeCouponId;
			this.storeCouponList = storeCouponList || [];
			this.openPopup('ticketPopup');
		},
		
		/**
		 * 商家优惠券确定点击回调
		 * @param Number storeCouponId  选中的商家优惠券ID
		 */
		storeCouponSubmit(storeCouponId){
			
			this.selectStoreCouponId = storeCouponId;
			
			// this.$http
			// 	.post('/order/refreshDetail', this.refreshOrderDetailParams, true)
			// 	.then(res => {
			// 		this.orderVO = res;
			// 	});
		},
		
		// 跳转到选择配送地址页面
		jumpChooseAddress(){
			uni.navigateTo({
				url: `/pages-user/index/address/address`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
