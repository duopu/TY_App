<template>
	<view class="teacher-lists-item">
		<image class="item-image" :src="data.avatar" mode="aspectFill"></image>
		<view class="item-right flex-column-between">
			<view class="flex-column">
				<view class="name text-ellipsis text-bold">{{data.name}}</view>
				<view class="desc">{{data.desc}}</view>
			</view>
			<view class="flex-center color-6">
				<text class="color-yellow">{{data.count}}</text>
				个课程
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"teacher-lists-item",
		props:{
			data:{
				type:Object,
				default:{
					name:'',
					desc:'',
					avatar:'../../static/images/other/girl.png',
					count:0
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
