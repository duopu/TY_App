<!-- 店铺列表项 -->
<template>
	<view class="group-lists-item">
		<image class="item-image" :src="storeInfo.avatar" mode="aspectFill"></image>
		<view class="item-right flex-column-between">
			<view class="flex-column">
				<view class="flex-center">
					<view class="name text-ellipsis text-bold">{{ storeInfo.storeName }}</view>
					<image v-if="storeInfo.type === 2" src="../../static/images/index/company-tag.png" class="company-tag-image" mode="aspectFill"></image>
				</view>
				<view class="desc">{{ storeInfo.storeDesc }}</view>
			</view>
			<view class="flex-center">
				<view class="color-yellow">{{ type === 1 ? '综合评分' : '店铺推荐指数' }}</view>
				<rate class="rate" :number="storeInfo.score || 0"></rate>
				<view v-if="type === 1" class="color-yellow score">{{storeInfo.score}}</view>
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
				storeName: '', //店铺名
				storeDesc: '', //店铺描述
				avatar: '', //店铺头像
				score: 0, //店铺评分
				type: 1  //店铺类型
			}
		}
	},
	data() {
		return {
			storeInfo:this.data
		};
	},
	watch:{
		data(newV, oldV){
			this.storeInfo = newV;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
