<!-- 店铺列表项 -->
<template>
	<view class="group-lists-item">
		<image class="item-image" :src="data.avatar" mode="aspectFill"></image>
		<view class="item-right flex-column-between">
			<view class="flex-column">
				<view class="flex-center">
					<view class="name text-ellipsis text-bold">{{ data.storeName }}</view>
					<image v-if="type === 1" src="../../static/images/index/company-tag.png" class="company-tag-image" mode="aspectFill"></image>
				</view>
				<view class="desc">{{ data.storeDesc }}</view>
			</view>
			<view class="flex-center">
				<view class="color-yellow">{{ type === 1 ? '综合评分' : '店铺推荐指数' }}</view>
				<rate class="rate" :number="data.score" :max="5"></rate>
				<view v-if="type === 1" class="color-yellow score">1.23</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'merchanism-lists-item',
	props: {
		type: {
			type: Number,
			default: 0 // 0-店铺推荐 1-综合评分
		},
		data: {
			type: Object,
			default: {
				storeName: '',
				storeDesc: '',
				avatar: '../../static/images/other/girl.png',
				score: 0
			}
		}
	},
	data() {
		return {
			iconStar: '../../static/images/icons/icon-star.svg',
			iconStarSelect: '../../static/images/icons/icon-star-selected.svg'
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
