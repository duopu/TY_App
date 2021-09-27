<template>
	<!-- 列表item -->
	<view class="trade-item" @click="goUserInfo">
		<!-- 用户/地址 -->
		<view class="flex-center-between item-top">
			<!-- 商家 -->
			<view class="flex-center" v-if="role === 0">
				<image class="avatar-image" src="../../static/images/other/girl.png"></image>
				<text class="text-bold">{{dataItem.orderDetailVO.name}}</text>
				<text class="color-9">{{dataItem.orderDetailVO.address}}</text>
			</view>
			<!-- 用户消息 -->
			<view class="text-bold merchant-name" v-else-if="role === 1">商家名称</view>
			<!-- 退款-红色-red，未发货-黄色-yellow -->
			<view v-if="state !== -1" class="state" :class="[state === 0 ? 'red' : 'yellow']">{{ state === 0 ? '退款待处理' : '未发货' }}</view>
		</view>
		<!-- 主体 -->
		<view class="item-content flex">
			<image class="goods-image" mode="aspectFill" :src="dataItem.orderDetailVO.thumbnail"></image>
			<view class="flex-1 flex-column-between">
				<view class="text-bold">{{dataItem.orderDetailVO.goodsName}}</view>
				<view class="flex-center-between">
					<view class="tag">{{dataItem.orderDetailVO.attributesName}}</view>
					<view class="color-9 number">×{{dataItem.orderDetailVO.goodsNum}}</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="item-bottom flex-center">
			<!-- 时间 - 商家状态显示 -->
			<view class="color-9" v-if="role === 0">{{dataItem.orderDetailVO.createTime}}</view>
			<!-- 金钱 -->
			<view class="flex-center pay-block">
				<text>{{ role === 0 ? '已支付：' : '实付款:' }}</text>
				<view class="text-bold flex-center price">
					<view class="unit">¥</view>
					<view>{{dataItem.orderDetailVO.payAmount}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'trade-lists-item',
	props: {
		dataItem: {
			type: Object,
			required: true
		},
		state: {
			type: Number,
			default: -1 // 0-退款 1-未发货
		},
		role: {
			type: Number,
			default: 0 //0-商家 1-用户
		}
	},
	data() {
		return {
		};
	},
	created(){
		console.info(this.dataItem);
	},
	methods:{
		goUserInfo(){
		  console.log(111);
			uni.navigateTo({
				url: '/pages-business/message/user/user?userId='+ this.dataItem.orderDetailVO.userId
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
