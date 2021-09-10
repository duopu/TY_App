<!-- 订单确认 - 坚持不懈商品 -->
<template>
	<view class="order-confirm">
		<scroll-view class="order-confirm-content" scroll-y="true">
			<!-- 收获地址  只有实体商品才需要填写收货地址 -->
			<view v-if="orderVO.needAddress" class="flex-center address" @click="jumpChooseAddress">
				<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
				<view class="flex-column flex-1">
					<view class="name">{{defaultAddress.name}} {{defaultAddress.phone}}</view>
					<view class="desc">{{defaultAddress.provinceName}} {{defaultAddress.cityName}} {{defaultAddress.areaName}} {{defaultAddress.streetName}} {{defaultAddress.address}}</view>
				</view>
				<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
			</view>

			<!-- 购买列表 -->
			<view class="box">
				<!-- 商家 -->
				<goods-order-list-item :storeGoodsVO="{...orderVO, goodsPrice:orderVO.price}"></goods-order-list-item>
				<view v-if="orderVO.needAddress" class="row flex-center-between">
					<text class="label">运费</text>
					<text>¥{{orderVO.freightAmount || 0}}</text>
				</view>
				<view class="row flex-center-between">
					<text class="label">商品原价</text>
					<text>¥{{orderVO.orderAmount}}</text>
				</view>
				<view class="row flex-center-between">
					<text class="label">活动折扣</text>
					<text>{{orderVO.discount}}折</text>
				</view>
				<view class="column flex-column">
					<text class="remark">付款后活动开始，活动结束时若不满足活动要求，将自动按比例退款</text>
					<button class="rule" @click="openPopup('salesActivityPopup')">查看活动规则</button>
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
		<common-payment-popup ref="paymentPopup" ></common-payment-popup>
		
		<!-- 坚持不懈活动详情 弹窗 -->
		<sales-activity-popup ref="salesActivityPopup" 
		:showBottom="false"
		:data="unremittinglyVO"></sales-activity-popup>
		
	</view>
</template>

<script>
import { mapState } from 'vuex'; //引入mapState
export default {
	data() {
		return {
			isAgree: true, //是否同意协议
			orderVO: {}, //订单对象
			detailParams: {}, //获取订单信息的参数对象
			params: { //提交订单参数对象
				unremittinglyId: undefined,
				unremittinglyNumber: undefined,
				goodsNum: undefined,
				goodsId: undefined,
				distributorId: undefined,
				attributesId: undefined,
				address: undefined,
				mobile: undefined,
				name: undefined
			}
		};
	},
	computed: mapState({
		// 选中的收货地址
		defaultAddress: state => state.defaultAddress,
		// 坚持不懈报名活动对象
		unremittinglyVO: state => state.unremittinglyVO,
		// 邀请人ID
		inviterId: state => state.inviterId
	}),
	watch:{
		defaultAddress: {
			handler: function(newV, oldV){
				let {provinceName,cityName,areaName,streetName,address,phone,name} = newV;
				this.params.address = `${provinceName}${cityName}${areaName}${streetName}${address}`;
				this.params.name = name;
				this.params.mobile = phone;
			},
			immediate: true
		}
	},
	onLoad(option) {
		this.detailParams = {
			attributesId: option.attributesId,
			goodsNum: option.goodsNum,
			goodsId: this.unremittinglyVO.goodsId,
			unremittinglyId: this.unremittinglyVO.unremittinglyId
		};
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
		
		/**
		 * 下单前获取订单信息
		 */
		getOrderDetail(){
			this.$http
				.get('/unremittingly/getOrderDetail', this.detailParams, true)
				.then(res => {
					this.orderVO = res;
					this.params.attributesId = res.attributesId;
					this.params.goodsId = res.goodsId;
					this.params.goodsNum = res.goodsNum;
					this.params.unremittinglyId = res.unremittinglyId;
					this.params.unremittinglyNumber = this.unremittinglyVO.unremittinglyNumber;
					this.params.distributorId = this.inviterId;
				});
		},
		
		
		/**
		 * 提交订单
		 */
		submitOrder(){
			
			if(!this.isAgree){
				this.$tool.showToast("请先勾选服务协议");
				return
			}
			
			if(this.unremittinglyVO.needAddress && !this.defaultAddress.id){
				this.$tool.showToast("请填写收货地址");
				return
			}
			
			this.$http
				.post('/unremittingly/create', this.params, true)
				.then(res => {
					this.$store.commit('setOrderChange');
					// TODO: 如果支付过程中关闭弹窗或者取消交易，也跳转到我的订单页面
					this.openPopup('paymentPopup');
				});
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
