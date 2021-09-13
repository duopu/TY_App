<!-- 活动-分销大使-商品分销 -->
<template>
	<view class="sales-goods-lists-item">
		<view class="item-top">
			<image class="goods-image" :src="data.thumbnail" mode="aspectFill"></image>
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
						<text class="number">{{data.waitNum}}</text>
						等待下单
					</view>
					<view class="process-item">
						<text class="number">{{data.waitRebateNum}}</text>
						等待返佣
					</view>
					<view class="process-item">
						<text class="number">{{data.rebateNum}}</text>
						已返佣
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom flex-center-end">
			<button class="btn btn-border grey" @click="cancel">取消分销</button>
			<button class="btn btn-border black" @click="apply">重新申请</button>
			<button class=" btn btn-block" @click="openDetail">查看详情</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'sales-goods-lists-item',
	emits: ['openDetail', 'cancel', 'apply'],
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
		openDetail(){
			this.$emit('openDetail');
		},
		// 取消分销
		cancel(){
			this.$emit('cancel')
		},
		apply(){
			this.$emit('apply')
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
