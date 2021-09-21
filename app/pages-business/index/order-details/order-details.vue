<!-- 订单详情(订单和消息交易) -->
<template>
	<scroll-view scroll-y="true" class="order-details">
		<!-- 商家 -->
		<view class="box store">
			<view class="flex-center-between top">
				<view class="flex-center">
					<image class="icon-store" src="../../../static/images/icons/icon-store.svg" mode="aspectFill"></image>
					<text>{{orderInfo.storeName}}</text>
				</view>
				<image class="icon-dy" src="../../../static/images/icons/icon-dy.svg" mode="aspectFill"></image>
			</view>
			<view class="flex-center content" >
				<image class="avatar-image" :src="orderInfo.thumbnail" mode="aspectFill"></image>
				<view class="flex-column content-column">
					<text class="name">{{orderInfo.goodsName}}</text>
					<view class="flex-center-between">
						<view class="tag-item">{{ orderInfo.attributesName }}</view>
						<view class="flex-baseline">
							<view class="price color-yellow text-bold">
								<text class="unit">¥</text>
								{{ orderInfo.goodsPrice }}
							</view>
							<text class="number">× {{orderInfo.goodsNum}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="box message">
			<view class="title">订单信息</view>
			<view class="flex row">
				<text class="label">收货信息:</text>
				<view class="text flex-1">{{orderInfo.name}}，{{orderInfo.mobile}}，{{orderInfo.address}}</view>
			</view>
			<view class="flex row">
				<text class="label">订单编号:</text>
				<view class="text flex-1">{{orderInfo.orderNum}}</view>
			</view>
			<view class="flex row">
				<text class="label">创建时间:</text>
				<view class="text flex-1">{{orderInfo.createTime}}</view>
			</view>
		</view>
		<!-- 优惠信息 -->
		<view class="box discount">
			<view class="title">优惠信息</view>
			<view class="row">
				<text class="label">商品原价:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>{{orderInfo.orderAmount / 100}}
				</view>
			</view>
			<view class="row">
				<text class="label">优惠券:</text>
				<view class="price color-grey text-bold">
					- <text class="unit">¥</text>{{orderInfo.platformDiscountAmount / 100}}
				</view>
			</view>
			<view class="row">
				<text class="label">实际支付:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>{{orderInfo.payAmount / 100}}
				</view>
			</view>
		</view>
		<view class="logistics-box" v-if="showModal">
			<view class="content">
				<view class="form-item">
					<text class="label">物流公司</text>
					<picker class="picker" @change="bindPickerChange" range-key="deliveryName" :range="list">
						<view class="uni-input">{{ index> -1 ? list[index].deliveryName : '请选择'}}</view>
					</picker>
				</view>
				<view class="form-item">
					<text class="label">物流单号</text>
					<input type="text" @input="(event) => this.deliveryNum = event.detail.value"  class="border input" placeholder-class="input-placeholder" placeholder="请输入" />
				</view>

				<view class="logistics-btn">
					<view class="btn-item" @click="publishGoods">确定</view>
					<view class="btn-item" @click="showModal = false">取消</view>
				</view>
			</view>
		</view>
		<!-- 待发货 -->
		<button v-if="orderInfo.orderState == 1" @click="showModal = true" class="btn">发货</button>
		<!-- 待收货 -->
		<button class="btn">物流详情</button>

	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderInfo: {
				orderItemList: [],
			},
			index: -1,
			list: [],
			showModal: true
		};
	},
	onLoad(option){
		this.orderId = option.orderId;
		this.queryInfo();
		this.queryExpress();
	},
	methods: {
		queryInfo(){
			this.$http.get('/order/queryDetail',{orderNum: this.orderId}).then(res => {
				this.orderInfo = res;
			})
		},
		publishGoods(){
			let params = {
				...this.list[this.index],
				deliveryNum: this.deliveryNum,
				orderNum: this.orderId
			};
			this.$http.get('/order/delivery', params).then(res => {
				// this.orderInfo = res;
				uni.showToast({
					title: '发货成功'
				});
				this.queryInfo();
			}).catch(err => {

			})
		},
		queryExpress(){
			this.$http.get('/order/queryExpress',{orderNum: this.orderId}).then(res => {
				this.list = res;
			})
		},
		bindPickerChange(event){
			console.info(event.detail);
			this.index = event.detail.value;
		},
		logistics(){}
	}
};
</script>

<style src="./style.less" lang="less"></style>
