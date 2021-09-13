<!-- 退款详情 -->
<template>
	<scroll-view scroll-y="true" class="refund">
		<!-- 处理状态 -->
		<view class="box">
			<view class="state text-bold flex-center">
				<!-- 申请退款中 -->
				<block v-if="orderVO.orderState === 5">
					<image class="image-state" src="../../../static/images/gou.png" mode="aspectFill"></image>
					<text>商家处理中</text>
				</block>
				
				<!-- 待用户填写发货信息 -->
				<block v-else-if="orderVO.orderState === 6">
					<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
					<text>商家已同意退款，请寄回退货商品</text>
				</block>
				
				<!-- 用户已填写发货信息待退款 -->
				<block v-if="orderVO.orderState === 7">
					<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
					<text>已寄回退货商品，等待商家确认</text>
				</block>
				
				<!-- 退款中 -->
				<block v-if="orderVO.orderState === 8">
					<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
					<text>商家已收到货，等待退款到账</text>
				</block>
				
				<!-- 退款完成 -->
				<block v-if="orderVO.orderState === 9">
					<image class="image-state" src="../../../static/images/gou.png" mode="aspectFill"></image>
					<text v-if="orderVO.entityGoodsId">商家已收到货，退款成功</text>
					<text v-else>退款成功</text>
				</block>
			</view>
			<block v-if="orderVO.orderState === 5">
				<view class="desc">您已成功发起退款申请，请耐心等待商家处理</view>
			</block>
			<block v-if="orderVO.orderState === 6">
				<view class="desc">请按商家提供的地址退货，并及时填写运单信息</view>
				<view class="desc">7天0小时后自动关闭退款申请</view>
			</block>
			<block v-if="orderVO.orderState === 7">
				<view class="desc">商家确认后，退款将原路返回至支付账户</view>
			</block>
			<block v-if="orderVO.orderState === 8">
				<view class="desc">正在退款中，退款将原路返回至支付账户</view>
			</block>
			<block v-if="orderVO.orderState === 9">
				<view class="desc">退款将原路返回至支付账户</view>
			</block>
			
		</view>
		<!-- 商品 -->
		<view class="store">
			<view class="flex-center-between top"><view class="name">退款商品</view></view>
			<view class="content flex">
				<image class="avatar-image" :src="orderVO.thumbnail" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">{{orderVO.goodsName}}</view>
					<view class="tag"><view v-if="orderVO.attributesId" class="tag-item">{{orderVO.attributesName}}</view></view>
					<view class="flex-center-between">
						<view class="price">
							<text class="unit">¥</text>
							{{orderVO.goodsPrice}}
						</view>
						<view class="number">×{{orderVO.goodsNum}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view class="box discount">
			<view class="discount-title text-bold">退款信息</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款数量*</text>
				<text class="flex-1">{{orderVO.goodsNum}}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款原因*</text>
				<text class="flex-1">{{orderVO.refundMsg}}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款金额*</text>
				<text class="flex-1">¥{{orderVO.refundAmount}}</text>
			</view>
			<view class="discount-row">
				<text class="label">补充描述*</text>
				<!-- 图片展示 -->
				<uni-file-picker class="image-lists"  limit="3" mode="grid" :image-styles="{width:84, height:84}" :readonly="true" :value="orderVO.refundImg || []">
				</uni-file-picker>	
				<view class="remark">{{orderVO.refundAddMsg}}</view>
			</view>
		</view>
		<view class="bottom">
			<button class="btn">撤销退款申请</button>
			<button class="btn">修改退款申请</button>
			<button class="btn">提交退款申请</button>
			<button class="btn">提交运单信息</button>
		</view>
		
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderNum: undefined,
			orderVO: {}
		};
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
			});
		},
	}
};
</script>

<style lang="less" src="./style.less"></style>
