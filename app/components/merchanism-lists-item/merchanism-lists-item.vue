<template>
	<view class="group-lists-item">
		<image class="item-image" :src="data.avatar" mode="aspectFill"></image>
		<view class="item-right flex-column-between">
			<view class="flex-column">
				<view class="name text-ellipsis text-bold">{{data.storeName}}</view>
				<view class="desc">{{data.storeDesc}}</view>
			</view>
			<view class="flex-center">
				<view class="color-yellow">店铺推荐指数</view>
				<rate class="rate" :number="data.score" :max="5"></rate>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"merchanism-lists-item",
		props:{
			data:{
				type:Object,
				default:{
					storeName:'',
					storeDesc:'',
					avatar:'../../static/images/other/girl.png',
					score:0
				}
			}
		},
		data() {
			return {
				iconStar: '../../static/images/icons/icon-star.svg',
				iconStarSelect: '../../static/images/icons/icon-star-selected.svg',
			};
		}
	}
</script>

<style lang="less" src="./style.less"></style>
