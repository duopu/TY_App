<template>
	<view class="group-lists-item">
		<image class="item-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
		<view class="item-right flex-column-between">
			<view class="flex-column">
				<view class="name text-ellipsis text-bold">{{data.storeName}}</view>
				<view class="desc">{{data.storeDesc}}</view>
			</view>
			<view class="flex-center">
				<view class="color-yellow">店铺推荐指数</view>
				<image class="icon-star" :src="item < 3 ? iconStarSelect:iconStar" mode="aspectFill" v-for="item in [1, 2, 3, 4, 5]" :key="item"></image>
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
					avatar:'../../static/images/other/girl.png'
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
