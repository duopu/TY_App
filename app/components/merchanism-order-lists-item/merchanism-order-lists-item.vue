<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view v-if="type === 0" class="flex-center-between top">
			<view class="name">xx商家</view>
			<view class="desc">{{ showStateName }}</view>
		</view>
		<!-- 退款 -->
		<view v-if="type === 2" class="flex-center-between top"><view class="name">退款商品</view></view>
		<!-- 多个商品 -->
		<view class="content flex" v-for="(item,index) in ['','']" :key="index">
			<image class="avatar-image" src="../../static/images/other/demo.png" mode="aspectFill"></image>
			<view class="flex-column flex-1 right">
				<view class="title">5天英语全能挑战名称可能很长可能是两行</view>
				<view class="tag"><view class="tag-item">型号一</view></view>
				<view class="flex-center-between">
					<view class="price">
						<text class="unit">¥</text>
						500
					</view>
					<view class="number">×24</view>
				</view>
			</view>
		</view>
		<!-- 待付款 -->
		<view class="flex-center bottom" v-if="state === 1">
			<button class="btn btn-border grey">取消订单</button>
			<button class="btn btn-block">支付订单</button>
		</view>
		<!-- 待发货 -->
		<view class="flex-center bottom" v-if="state === 2"><button class="btn btn-border grey">申请退款</button></view>
		<!-- 待收货 -->
		<view class="flex-center bottom" v-if="state === 3">
			<button class="btn btn-border grey">申请退款</button>
			<button class="btn btn-border black">电子凭证</button>
			<button class="btn btn-block">确认收货</button>
		</view>
		<!-- 已完成 -->
		<view class="flex-center bottom" v-if="state === 4">
			<button class="btn btn-border grey">申请退款</button>
			<button class="btn btn-border grey">删除订单</button>
			<button class="btn btn-border black">再来一单</button>
			<button class="btn btn-block">去评价</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'merchanism-order-lists-item',
	props: {
		type: {
			type: Number,
			default: 0 //0-默认不状态，只显示商家 2-退款
		},
		state: {
			type: Number,
			default: 0 //0-不显示底部，1-待付款 2-待发货 3-待收货 4-已完成
		}
	},
	computed:{
		// 显示当前订单状态
		showStateName() {
			switch (this.state) {
				case 1:
					return '待付款';
					break;
				case 2:
					return '待发货';
					break;
				case 3:
					return '待收货';
					break;
				case 4:
					return '已完成';
					break;
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		
	}
};
</script>

<style src="./style.less" lang="less"></style>
