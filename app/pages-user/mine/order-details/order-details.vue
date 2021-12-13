<!-- 订单详情 -->
<template>
	<scroll-view class="order-details" scroll-y="true">
		<!-- 订单状态 -->
		<view class="flex-center-center order-state">
			<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
			<text class="text-bold">{{ showStateName }}</text>
		</view>
		<!-- 商品 -->
		<goods-order-list-item :storeGoodsVO="orderVO" @queryLogistics="queryLogistics" @queryExam="queryExam" @payOrder="payOrder">
			<template v-slot:bottom>
				<view class="box">
					<!-- 组团商品 -->
					<block v-if="orderVO.orderType === 2">
						<!-- 只有实体商品才会有运费 -->
						<view v-if="orderVO.entityGoodsId" class="row flex-center-between">
							<text class="label">运费</text>
							<text class="flex-1 color-9">¥{{ orderVO.freightAmount || 0 }}</text>
						</view>
						<view class="row flex-center-between">
							<text v-if="orderVO.orderState === 0 || orderVO.orderState === -1" class="label">拼团定金（待支付）</text>
							<text v-else class="label">拼团定金（已支付）</text>
							<text class="flex-1 color-9">¥{{ orderVO.joinAmount || 0 }}</text>
						</view>
						<view class="row flex-center-between">
							<block v-if="orderVO.orderState === 0 || orderVO.orderState === -1 || orderVO.orderState === 21">
								<text class="label">尾款（待支付）</text>
								<text class="flex-1 color-9">¥{{ orderVO.goodsPrice - orderVO.maxPrice }} - ¥{{ orderVO.goodsPrice - orderVO.minPrice }}</text>
							</block>
							<block v-else-if="orderVO.orderState === 22">
								<text class="label">尾款（待支付）</text>
								<text class="flex-1 color-9">¥{{ orderVO.finalPayment }}</text>
							</block>
							<block v-else>
								<text class="label">尾款（已支付）</text>
								<text class="flex-1 color-9">¥{{ orderVO.finalPayment }}</text>
							</block>
						</view>
						<view class="column flex-column">
							<text class="remark">{{ groupBuyGoodsVO.endTime }}开始支付尾款，尾款金额由成团人数决定</text>
							<button class="rule" @click="openPopup('groupPopup')">查看拼团规则</button>
						</view>
					</block>

					<!-- 坚持不懈商品 -->
					<block v-if="orderVO.orderType === 3">
						<!-- 只有实体商品才会有运费 -->
						<view v-if="orderVO.attributesId" class="row flex-center-between">
							<text class="label">运费</text>
							<text class="flex-1 color-9">¥{{ orderVO.freightAmount || 0 }}</text>
						</view>
						<view class="row flex-center-between">
							<text class="label">商品原价</text>
							<text class="flex-1 color-9">¥{{ orderVO.orderAmount }}</text>
						</view>
						<view class="row flex-center-between">
							<text class="label">活动折扣</text>
							<text class="flex-1 color-9">{{ orderVO.unremittinglyDiscount }}折</text>
						</view>
						<view class="row flex-center-between">
							<text class="label">实际支付</text>
							<text class="flex-1">¥{{ orderVO.payAmount }}</text>
						</view>
						<view class="column flex-column">
							<text class="remark">付款后活动开始，活动结束时若不满足活动要求，将自动按比例退款</text>
							<button class="rule" @click="openPopup('salesActivityPopup')">查看活动规则</button>
						</view>
					</block>
				</view>
			</template>
		</goods-order-list-item>
		<!-- 地址 -->
		<view v-if="orderVO.entityGoodsId" class="flex-center address" @click="jumpChooseAddress">
			<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">{{ orderVO.name }} {{ orderVO.mobile }}</view>
				<view class="desc">{{ orderVO.address }}</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="box">
			<view class="flex-center row">
				<text class="text-bold">订单编号：</text>
				<view class="flex-1 text-left">{{ orderVO.orderNum }}</view>
			</view>
			<view class="flex-center row">
				<text class="text-bold">创建时间：</text>
				<view class="flex-1 text-left">{{ orderVO.createTime }}</view>
			</view>
		</view>
		<!-- 普通商品/商品分销  优惠信息 -->
		<view v-if="orderVO.orderType === 1 || orderVO.orderType === 4" class="box">
			<view class="title text-bold">优惠信息</view>
			<view class="row flex-center-between">
				<text class="label">商品原价</text>
				<text class="flex-1">¥{{ orderVO.orderAmount }}</text>
			</view>
			<!-- 只有实体商品才会有运费 -->
			<view v-if="orderVO.entityGoodsId" class="row flex-center-between">
				<text class="label">运费</text>
				<text class="flex-1 color-9">¥{{ orderVO.freightAmount || 0 }}</text>
			</view>
			<view v-if="orderVO.platformCouponAmount > 0" class="row flex-center-between">
				<text class="label">平台优惠</text>
				<text class="flex-1 color-9">-¥{{ orderVO.platformCouponAmount }}</text>
			</view>
			<view v-if="orderVO.platformDiscountAmount > 0" class="row flex-center-between">
				<text class="label">平台折扣</text>
				<text class="flex-1 color-9">-¥{{ orderVO.platformDiscountAmount }}</text>
			</view>
			<view v-if="orderVO.storeCouponAmount > 0" class="row flex-center-between">
				<text class="label">商家优惠</text>
				<text class="flex-1 color-9">-¥{{ orderVO.storeCouponAmount }}</text>
			</view>
			<view v-if="orderVO.storeDiscountAmount > 0" class="row flex-center-between">
				<text class="label">商家折扣</text>
				<text class="flex-1 color-9">-¥{{ orderVO.storeDiscountAmount }}</text>
			</view>
			<view v-if="orderVO.goldDeductionAmount > 0" class="row flex-center-between">
				<text class="label">金币抵扣</text>
				<text class="flex-1 color-9">-¥{{ orderVO.goldDeductionAmount }}</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">实际支付</text>
				<text class="flex-1">¥{{ orderVO.payAmount }}</text>
			</view>
		</view>

		<!-- 物流 弹窗 -->
		<order-logistic-popup ref="logisticPopup" :data="logisticsVO"></order-logistic-popup>

		<!-- 电子凭证 弹窗 -->
		<order-exam-certificate ref="examPop" :data="examVO"></order-exam-certificate>

		<!-- 弹窗 拼团规则-->
		<goods-group-popup v-if="orderVO.orderType === 2" ref="groupPopup" :data="groupBuyGoodsVO" :showBottom="false"></goods-group-popup>

		<!-- 弹窗 坚持不懈规则 -->
		<sales-activity-popup v-if="orderVO.orderType === 3" ref="salesActivityPopup" :showBottom="false" :data="unremittinglyVO"></sales-activity-popup>

		<!-- 支付方式 弹窗 -->
		<common-payment-popup ref="paymentPopup" :data="payOrderVO" @cancelPay="cancelPay"></common-payment-popup>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderNum: undefined, //订单编号
			orderVO: {}, //订单对象
			logisticsVO: {}, //物流对象
			examVO: {}, //电子凭证对象
			groupBuyGoodsVO: {}, //组团优惠活动详情对象
			unremittinglyVO: {}, //坚持不懈活动详情对象
			payOrderVO: {} //订单支付对象
		};
	},
	computed: {
		// 显示当前订单状态
		showStateName() {
			switch (this.orderVO.orderState) {
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
	watch: {
		'$store.state.orderChange': function() {
			this.queryOrderDetail();
		}
	},
	onLoad(option) {
		this.orderNum = option.orderNum;
		this.queryOrderDetail();
	},
	methods: {
		// 查询订单详情
		queryOrderDetail() {
			this.$http.get('/order/queryDetail', { orderNum: this.orderNum }, true).then(res => {
				this.orderVO = res;

				if (res.orderType === 2) {
					// 如果是组团商品，需要查询组团活动详情
					this.queryGroupBuyInfo();
				} else if (res.orderType === 3) {
					// 如果是坚持不懈商品，需要查询坚持不懈活动详情
					this.queryUnremittingly();
				}
			});
		},
		// 查询拼团活动详情
		queryGroupBuyInfo() {
			this.$http.get('/groupBuy/queryInfoByLogin', { groupBuyId: this.orderVO.groupBuyId }, true).then(res => {
				this.groupBuyGoodsVO = res;
			});
		},

		// 查询坚持不懈活动详情
		queryUnremittingly() {
			this.$http.get('/unremittingly/queryInfo', { unremittinglyId: this.orderVO.unremittinglyId }, true).then(res => {
				this.unremittinglyVO = res;
			});
		},
		// 打开弹窗
		openPopup(value) {
			this.$refs[value].open();
		},
		// 跳转到选择配送地址页面
		jumpChooseAddress(){
			uni.navigateTo({
				url: `/pages-user/index/address/address`
			});
		},
		/**
		 * 查询物流
		 * @param {Object} logisticsVO 物流对象
		 */
		queryLogistics(logisticsVO) {
			this.logisticsVO = logisticsVO;
			this.$refs.logisticPopup.open();
		},

		/**
		 * 电子凭证点击
		 * @param {Object} data 电子凭证对象
		 */
		queryExam(data) {
			this.examVO = data;
			this.$refs.examPop.open();
		},

		// 支付订单
		payOrder() {
			this.payOrderVO = {
				orderNum: this.orderVO.orderNum,
				payOrderNum: this.orderVO.orderTotalNum
			};
			this.$refs.paymentPopup.open();
		},

		// 取消支付
		cancelPay() {
			this.$refs.paymentPopup.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
