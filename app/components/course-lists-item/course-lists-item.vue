<!-- 高薪转行 -->
<template>
	<view class="course-lists-item" @click="itemClick()">
		<image class="item-image" :src="data.thumbnail" mode="aspectFill"></image>
		<view class="item-right">
			<view class="name text-bold">{{data.goodsName}}</view>
			<view class="item-desc">
				<text class="unit price">￥</text>
				<view class="price">{{data.price}}</view>
				<view class="number">{{data.sales}}人最近报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"course-lists-item",
		emits: ['itemClick'],
		props:{
			data: {
				type:Object,
				default:{
					goodsName:'',
					thumbnail: '../../static/images/other/demo.png',
					price:0,
					sales:0
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			itemClick(){
				this.$emit("itemClick")
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
