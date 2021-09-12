<!-- 活动-分销大使-商品分销 -->
<template>
	<view class="sales-goods-lists-item">
		<view class="item-top">
			<image class="goods-image" src="../../static/images/other/demo.png" mode="aspectFill"></image>
			<view class="right flex-column-between">
				<view class="name">{{data.goodsName}}</view>
				<view class="flex-center-between">
					<view class="">售价:¥{{data.price}}</view>
					<view class="flex-center">
						预计佣金:
						<view class="price">
							{{data.gold}}
							<text class="unit">金币</text>
						</view>
					</view>
				</view>
				<view class="flex-center process">
					<view class="process-item">
						<text class="number">1</text>
						等待下单
					</view>
					<view class="process-item">
						<text class="number">2</text>
						等待下单
					</view>
					<view class="process-item">
						<text class="number">3</text>
						已返佣
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom flex-center-end">
			<button class="btn btn-border grey">取消分销</button>
			<button class="btn btn-border black">重新申请</button>
			<button class=" btn btn-block" @click="openDetailsPopup">查看详情</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'sales-goods-lists-item',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	
	data() {
		return {};
	},
	methods:{
		// 查看详情
		openDetailsPopup(){
			this.$emit('open');
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
