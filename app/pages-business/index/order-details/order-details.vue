<!-- 订单详情(订单和消息交易) -->
<template>
	<scroll-view scroll-y="true" class="order-details">
		<!-- 商家 -->
		<view class="box store">
			<view class="flex-center-between top">
				<view class="flex-center">
					<image class="icon-store" src="../../../static/images/icons/icon-store.svg" mode="aspectFill">
					</image>
					<text>{{ orderInfo.storeName }}</text>
				</view>
				<image class="icon-dy" src="../../../static/images/icons/icon-dy.svg" mode="aspectFill"></image>
			</view>
			<view class="flex-center content">
				<image class="avatar-image" :src="orderInfo.thumbnail" mode="aspectFill"></image>
				<view class="flex-column content-column">
					<text class="name">{{ orderInfo.goodsName }}</text>
					<view class="flex-center-between">
						<view class="tag-item">{{ orderInfo.attributesName }}</view>
						<view class="flex-baseline">
							<view class="price color-yellow text-bold">
								<text class="unit">¥</text>
								{{ orderInfo.goodsPrice }}
							</view>
							<text class="number">× {{ orderInfo.goodsNum }}</text>
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
				<view class="text flex-1">{{ orderInfo.name }}，{{ orderInfo.mobile }}，{{ orderInfo.address }}</view>
			</view>
			<view class="flex row">
				<text class="label">订单编号:</text>
				<view class="text flex-1">{{ orderInfo.orderNum }}</view>
			</view>
			<view class="flex row">
				<text class="label">创建时间:</text>
				<view class="text flex-1">{{ orderInfo.createTime }}</view>
			</view>
		</view>
		<!-- 优惠信息 -->
		<view class="box discount">
			<view class="title">优惠信息</view>
			<view class="row">
				<text class="label">商品原价:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>
					{{ orderInfo.orderAmount}}
				</view>
			</view>
			<view class="row">
				<text class="label">优惠券:</text>
				<view class="price color-grey text-bold">
					-
					<text class="unit">¥</text>
					{{ orderInfo.platformDiscountAmount }}
				</view>
			</view>
			<view class="row">
				<text class="label">实际支付:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>
					{{ orderInfo.payAmount }}
				</view>
			</view>
		</view>
		<!-- 待发货 -->
		<button v-if="orderInfo.orderState == 1" @click="openLogisticsPopup()" class="btn">发货</button>
		<!-- 待收货 -->
		<button class="btn" @click="queryLogistics" v-if="orderInfo.orderState >=2 && !!orderInfo.entityGoodsId">物流详情</button>

		<!-- 弹窗  物流 -->
		<uni-popup type="bottom" ref="logisticsPopup">
			<view class="logistics-popup-content flex-column-between">
				<!-- 标题 -->
				<view class="popup-top flex-center-between">
					<view class="title text-bold">物流信息</view>
					<image @click="closeLogisticsPopup" class="icon-close"
						src="../../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
				</view>
				<!-- 内容 -->
				<view class="form">
					<view class="form-item">
						<text class="label">物流公司</text>
						<picker class="picker flex-1 flex-center-end" @change="bindPickerChange"
							range-key="deliveryName" :range="list">
							<view class="uni-input">{{ index > -1 ? list[index].deliveryName : '请选择' }}</view>
						</picker>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"
							mode="aspectFill"></image>
					</view>
					<view class="form-item">
						<text class="label">物流单号</text>
						<input type="text" @blur="inputChange" class="input" placeholder-class="input-placeholder"
							placeholder="请输入" />
					</view>
				</view>

				<view class="logistics-btn">
					<view class="btn" @click="publishGoods">确定</view>
				</view>
			</view>
		</uni-popup>

		<!-- 物流 弹窗 -->
		<order-logistic-popup ref="logisticPopup" :data="logisticsVO"></order-logistic-popup>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {
					orderItemList: []
				},
				index: -1,
				list: [],
				logisticsVO: {}
			};
		},
		onLoad(option) {
			this.orderId = option.orderId;
			this.queryInfo();
			this.queryExpress();
		},
		methods: {
			queryInfo() {
				this.$http.get('/order/queryDetail', {
					orderNum: this.orderId
				}).then(res => {
					this.orderInfo = res;
				});
			},
			publishGoods() {
				let params = {
					...this.list[this.index],
					deliveryNum: this.deliveryNum,
					orderNum: this.orderId
				};
				this.$http
					.post('/order/delivery', {
						...params
					})
					.then(res => {
						// this.orderInfo = res;
						uni.showToast({
							title: '发货成功'
						});
						this.closeLogisticsPopup();
						this.queryInfo();
					})
					.catch(err => {});
			},
			queryExpress() {
				this.$http.get('/order/queryExpress', {
					orderNum: this.orderId
				}).then(res => {
					this.list = res;
				});
			},
			bindPickerChange(event) {
				console.info(event.detail);
				this.index = event.detail.value;
			},
			logistics() {},
			// 查看物流
			queryLogistics() {              
				this.$http.get('/order/logistics', {
					orderNum: this.orderId
				}, true).then(res => {
					this.logisticsVO = res;
					this.$refs.logisticPopup.open();
				});
			},
			// 发货 弹窗 打开物流
			openLogisticsPopup() {
				this.$refs.logisticsPopup.open();
			},
			// 弹窗 关闭物流
			closeLogisticsPopup() {
				this.$refs.logisticsPopup.close();
			},
			inputChange(event) {
				console.log(event)
				this.deliveryNum = event.detail.value
			}
		}
	};
</script>

<style src="./style.less" lang="less"></style>
