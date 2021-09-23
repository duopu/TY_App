<!-- 订单确认 - 组团优惠商品 -->
<template>
	<view class="order-confirm">
		<scroll-view class="order-confirm-content" scroll-y="true">
			<!-- 收获地址 -->
			<view v-if="groupBuyGoodsVO.entityGoodsFlag === 1" class="flex-center address" @click="jumpChooseAddress">
				<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
				<!-- 显示当前收货地址 -->
				<view class="flex-column flex-1" v-if="defaultAddress && defaultAddress.id">
					<view class="name">{{defaultAddress.name}} {{defaultAddress.phone}}</view>
					<view class="desc">{{defaultAddress.provinceName}} {{defaultAddress.cityName}} {{defaultAddress.areaName}} {{defaultAddress.streetName}} {{defaultAddress.address}}</view>
				</view>
				<!-- 没有收货地址 -->
				<view class="flex-1 text-bold label" v-else>添加收货地址</view>
				<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
			</view>

			<!-- 购买列表 -->
			<view class="box">
				<!-- 商家 -->
				<goods-order-list-item :storeGoodsVO="{...groupBuyGoodsVO, goodsNum: 1, goodsPrice:groupBuyGoodsVO.price}"></goods-order-list-item>
				<view v-if="groupBuyGoodsVO.entityGoodsFlag === 1" class="row flex-center-between">
					<text class="label">运费</text>
					<text>¥{{groupBuyGoodsVO.freightAmount || 0}}</text>
				</view>
				<view class="row flex-center-between">
					<text class="label">拼团定金</text>
					<text>¥{{groupBuyGoodsVO.joinAmount}}</text>
				</view>
				<view class="row flex-center-between">
					<text class="label">尾款</text>
					<text>¥{{groupBuyGoodsVO.price - groupBuyGoodsVO.maxPrice}} - ¥{{groupBuyGoodsVO.price - groupBuyGoodsVO.minPrice}}</text>
				</view>
				<view class="column flex-column">
					<text class="remark">{{groupBuyGoodsVO.endTime}}开始支付尾款，尾款金额由成团人数决定</text>
					<button class="rule" @click="openPopup('groupPopup')">查看拼团规则</button>
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
				<text class="price">¥{{groupBuyGoodsVO.joinAmount}}</text>
			</view>
			<button class="btn" @click="submitOrder">提交订单</button>
		</view>
		
		<!-- 支付方式 弹窗 -->
		<common-payment-popup ref="paymentPopup" :data="submitOrderVO"></common-payment-popup>
		<!-- 弹窗 拼团规则-->
		<goods-group-popup ref="groupPopup" :data="groupBuyGoodsVO" :showBottom="false"></goods-group-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex'; //引入mapState
export default {
	data() {
		return {
			isAgree: true, //是否同意协议
			params: { //提交订单参数对象
				groupBuyId: this.$store.state.groupBuyGoodsVO.groupBuyId,
				address: undefined,
				mobile: undefined,
				name: undefined,
				userId: undefined,
			},
			submitOrderVO: {} //提交订单后返回的对象
		};
	},
	computed: mapState({
		// 选中的收货地址
		defaultAddress: state => state.defaultAddress,
		// 下单时确定的组团优惠商品
		groupBuyGoodsVO: state => state.groupBuyGoodsVO,
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
		
	},
	onUnload(){
		// 这里要把邀请人清空掉
		this.$store.commit('setInviterId', undefined);
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
		 * 提交订单
		 */
		submitOrder(){
			
			if(!this.isAgree){
				this.$tool.showToast("请先勾选服务协议");
				return
			}

			if(this.groupBuyGoodsVO.entityGoodsFlag === 1 && !this.defaultAddress.id){
				this.$tool.showToast("请填写收货地址");
				return
			}
			
			// 设置邀请人ID
			this.params.userId = this.inviterId;
			
			this.$http
				.post('/groupBuy/create', this.params, true)
				.then(res => {
					this.submitOrderVO = res;
					
					// 这里要把邀请人清空掉
					this.$store.commit('setInviterId', undefined);
					
					if (res.orderPayAmount === 0) { //如果支付金额是0元，直接跳转到我的订单详情页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
					} else { //弹出支付弹窗
						this.openPopup('paymentPopup');
					}
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
