<!-- 店铺列表项 -->
<template>
	<view class="group-lists-item" @click="jumpStoreDetail">
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
				<rate class="rate" :number="storeInfo.score || 5"></rate>
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
		canJump: {
			type: Boolean,
			default: true
		},
		data: {
			type: Object,
			default: {
				storeName: '', //店铺名
				storeDesc: '', //店铺描述
				avatar: '', //店铺头像
				score: 0, //店铺评分
				type: 1,  //店铺类型
				id: undefined //店铺ID
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
	},
	methods: {
		// 跳转到店铺详情
		jumpStoreDetail(){
			if(!this.canJump) return
			const storeId = this.storeInfo.id;
			uni.navigateTo({
				url:`/pages-user/index/store-details/store-details?storeId=${storeId}`
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
