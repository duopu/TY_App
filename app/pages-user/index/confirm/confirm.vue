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
				<view class="row flex-center-between"  @click="chooseStoreCoupon(item.storeCouponId, item.storeCouponList, index)">
					<text class="label">商家优惠</text>
					<text v-if="item.storeCouponId" class="flex-1 color-red">-¥{{item.storeDiscountAmount}}</text>
					<text v-else class="flex-1 color-9">{{item.storeCouponList && item.storeCouponList.length > 0 ? '请选择优惠券' : '无可用优惠券'}}</text>
					<image v-if="item.storeCouponList && item.storeCouponList.length > 0" class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view class="row flex-center-between">
					<text class="flex-1 color-red">小计: ¥{{item.payAmount}}</text>
				</view>
			</view>
			<!-- 平台优惠券 -->
			<view class="box platform">
				<view class="row flex-center-between" @click="choosePlatformCoupon()">
					<text class="label">平台优惠</text>
					<text v-if="orderVO.platformCouponId" class="flex-1 color-red">-¥{{orderVO.platformDiscountAmount}}</text>
					<text v-else class="flex-1 color-9">{{orderVO.platFormCouponList && orderVO.platFormCouponList.length > 0 ? '请选择优惠券' : '无可用优惠券'}}</text>
					<image v-if="orderVO.platFormCouponList && orderVO.platFormCouponList.length > 0" class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view v-if="orderVO.goldCoin && orderVO.goldCoin > 0" class="row flex-center-between" @click="openPopup('dicountPopup')">
					<text class="label">金币抵扣</text>
					<text v-if="orderVO.goldDeductionAmount && orderVO.goldDeductionAmount > 0" class="flex-1 color-red">-¥{{orderVO.goldDeductionAmount}}</text>
					<text v-else class="flex-1 color-9">请选择</text>
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
			<button class="btn" @click="submitOrder">提交订单</button>
		</view>
		<!-- 直选支付方式 弹窗 -->
		<common-payment-popup ref="paymentPopup"></common-payment-popup>
		<!-- 金币抵扣弹窗 -->
		<confirm-dicount-popup v-if="orderVO.goldCoin && orderVO.goldCoin > 0" 
		ref="dicountPopup" 
		:useGoldCoin="orderVO.useGoldCoin" 
		:goldCoin="orderVO.goldCoin" 
		:goldDeductionAmount="orderVO.goldDeductionAmount" 
		@submit="goldCoinSubmit"></confirm-dicount-popup>
		<!-- 商家优惠券 -->
		<confirm-ticket-popup ref="storeCouponPopup" 
		title="商家优惠券"
		:couponList="storeCouponList || []" 
		:selectCouponId="selectStoreCouponId" 
		@submit="storeCouponSubmit"></confirm-ticket-popup>
		<!-- 平台优惠券 -->
		<confirm-ticket-popup ref="platformCouponPopup" 
		title="平台优惠券"
		:couponList="platFormCouponList" 
		:selectCouponId="refreshOrderDetailParams.platFormCouponId" 
		@submit="platformCouponSubmit"></confirm-ticket-popup>
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
				maxGoldCoin:0, //可使用金币数
				maxGoldCoinAmount:0, //可用金币抵金额
				needAddress:false, //是否需要收货地址
				orderAmount:0, //订单原始金额
				payAmount:0, //支付金额
				platformCouponId:undefined, //平台优惠券ID
				platformDiscountAmount:0, //平台优惠金额
				platFormCouponList:[], //平台可用优惠券
				storeDiscountAmount:0, //商家优惠金额
				storeOrderList:[], //店铺订单明细
				useGoldCoin:0 //是否使用金币 0:不使用 1:使用
			},
			storeCouponList:[], //商家可用优惠券
			selectStoreCouponId:undefined, //商家选中的优惠券
			currentStoreCouponIndex:0, //当前点击的第几个商家下面的优惠券
			platFormCouponList:[], //平台可用优惠券
			refreshOrderDetailParams:{
				address:undefined,
				useGoldCoin:0,
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
	watch:{
		defaultAddress(newV, oldV){
			let {provinceName,cityName,areaName,streetName,address} = newV;
			this.refreshOrderDetailParams.address = `${provinceName}${cityName}${areaName}${streetName}${address}`;
			this.refreshOrderDetailParams.name = newV.name;
			this.refreshOrderDetailParams.mobile = newV.phone;
		}
	},
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
					this.initOrderVO(res);
				});
		},
		
		// 刷新订单信息
		refreshOrderDetail(){
			this.$http
				.post('/order/refreshDetail', this.refreshOrderDetailParams, true)
				.then(res => {
					this.initOrderVO(res);
				});
		},
		
		/**
		 * 提交订单
		 */
		submitOrder(){
			if(!this.isAgree){
				this.$tool.showToast("请先同意《腾云课堂服务协议》");
				return
			}
			this.$http
				.post('/order/submit', this.refreshOrderDetailParams, true)
				.then(res => {
					if(this.orderVO.payAmount === 0){
						//TODO: 不需要显示支付弹窗，直接跳转到我的订单页面
					}else {
						// TODO: 如果支付过程中关闭弹窗或者取消交易，也跳转到我的订单页面
						this.openPopup('paymentPopup');
					}
				});
		},
		
		/**
		 * 初始化订单详情对象
		 * @param {Object} data 接口返回的下订单对象
		 */
		initOrderVO(data){
			this.orderVO = data;
			
			// 平台优惠券赋值，因为平台优惠券列表返回的优惠券ID叫做userCouponId，要改成couponId
			let platFormCouponList = [];
			platFormCouponList = data.platFormCouponList && data.platFormCouponList.map(function(value){
				let obj = {...value};
				obj.couponId = value.userCouponId;
				return obj;
			});
			this.platFormCouponList = platFormCouponList;
			
			
			let storeGoodsList = [];
			storeGoodsList = data.storeOrderList && data.storeOrderList.map(function(value){
				
				let orderItemList = [];
				orderItemList = value.orderItemList && value.orderItemList.map(function(v){
					return {
						attributesId: v.attributesId,
						goodsId: v.goodsId,
						goodsNum: v.goodsNum
					}
				});
				return {
					storeId: value.storeId,
					storeCouponId: value.storeCouponId,
					orderItemList: orderItemList
				}
			})

			let {provinceName,cityName,areaName,streetName,address} = this.defaultAddress;

			this.refreshOrderDetailParams = {
				address: `${provinceName}${cityName}${areaName}${streetName}${address}`,
				useGoldCoin: data.useGoldCoin,
				mobile: this.defaultAddress.phone,
				name: this.defaultAddress.name,
				platFormCouponId: data.platformCouponId,
				storeGoodsList: storeGoodsList
			};
			
			this.selectPlatformCouponId = data.platformCouponId;
		},
		
		/**
		 * 商家优惠点击
		 * @param {Object} storeCouponId  选中的商家优惠券ID
		 * @param {Object} storeCouponList  可选择的商家优惠券列表
		 * @param {Object} index 当前商家的索引值
		 */
		chooseStoreCoupon(storeCouponId, storeCouponList, index){
			if(!storeCouponList || storeCouponList.length === 0){ return }
			this.selectStoreCouponId = storeCouponId;
			let finalStoreCouponList = [];
			finalStoreCouponList = storeCouponList && storeCouponList.map(function(value){
				let obj = {...value};
				obj.couponId = value.userCouponId;
				return obj;
			})
			this.storeCouponList = finalStoreCouponList;
			this.currentStoreCouponIndex = index;
			this.openPopup('storeCouponPopup');
		},
		
		/**
		 * 商家优惠券确定点击回调
		 * @param Number storeCouponId  选中的商家优惠券ID
		 */
		storeCouponSubmit(storeCouponId){
			this.selectStoreCouponId = storeCouponId;
			this.refreshOrderDetailParams.storeGoodsList[this.currentStoreCouponIndex].storeCouponId = storeCouponId;
			this.refreshOrderDetail();
		},
		
		/**
		 * 平台优惠点击
		 */
		choosePlatformCoupon(){
			if(!this.orderVO.platFormCouponList || this.orderVO.platFormCouponList.length === 0) { return }
			this.openPopup('platformCouponPopup');
		},
		
		/**
		 * 平台优惠券确定点击回调
		 * @param Number platformCouponId  选中的平台优惠券ID
		 */
		platformCouponSubmit(platformCouponId){
			this.refreshOrderDetailParams.platFormCouponId = platformCouponId;
			this.refreshOrderDetail();
		},
		
		/**
		 * 金币使用情况回调
		 * @param {Object} useGoldCoin 是否使用金币
		 */
		goldCoinSubmit(useGoldCoin){
			this.refreshOrderDetailParams.useGoldCoin = useGoldCoin;
			this.refreshOrderDetail();
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
