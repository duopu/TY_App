<!-- 高薪转行 -->
<template>
	<view class="course-lists-item flex-center-between">
		<image class="item-image" src="../../static/images/other/demo.png" mode="aspectFill"></image>
		<view class="item-right">
			<view class="name text-bold">{{data.title}}</view>
			<view class="item-desc">
				<text class="unit price">￥</text>
				<view class="price">{{data.price}}</view>
				<view class="number">38人最近报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"course-lists-item",
		props:{
			data: {
				type:Object,
				default:{
					title:'',
					price:0
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" src="./style.less"></style>
