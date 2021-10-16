<!-- 课程小模块 -->
<template>
	<view class="course-lists-item" @click="itemClick()">
		<image class="item-image" :src="data.thumbnail" mode="aspectFill" />
		<view class="item-right">
			<view class="name text-bold">{{data.goodsName}}</view>
			<view class="item-desc flex-center">
				<view class="flex price text-bold" :class="from && 'cost'">
					<text class="unit">￥</text>
					<view>{{data.minPrice || data.price}}</view>
				</view>
				<view v-if="from" class="flex price text-bold">
					<text class="unit">￥</text>
					<view>{{data.discountPrice}}</view>
				</view>
				<view v-if="!from" class="number">{{data.sales}}人最近报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "course-lists-item",
		props: {
			canJump: {
				type: Boolean,
				default: true
			},
			data: {
				type: Object,
				default: {
					goodsName: undefined,
					thumbnail: undefined,
					price: 0,
					minPrice: 0,
					maxPrice: 0,
					discountPrice: 0, //会议权益跳转过来需要用到的折扣字段
					sales: 0,
					goodsId: undefined
				}
			},
			/*
			 @params:String
			  benefit 会员权益跳转过来的页面
			*/
			from: {
				type: String,
				default: '',
			}
		},
		data() {
			return {

			};
		},
		methods: {
			
			// 跳转到商品详情页
			itemClick() {
				if(!this.canJump) return
				const goodsId = this.data.goodsId;
				uni.navigateTo({
					url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
				});
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
