<!-- 评论项 -->
<template>
	<view class="commnent-lists-item">
		<view class="flex-center-between">
			<image mode="aspectFill" class="avatar-image" :src="detail.avatar"></image>
			<view class="flex-column flex-1">
				<view class="user-name">{{ detail.userName }}</view>
				<rate :number="detail.score || 0"></rate>
			</view>
			<view class="time">{{ detail.createdTime }}</view>
		</view>
		<view class="message">{{ detail.evaluation }}</view>
		
		<view v-if="detail.evaluateImg && detail.evaluateImg.length > 0" class="flex-center image-lists">
			<block v-for="(item,index) in detail.evaluateImg" :key="`comment-img-${index}`">
				<image class="image" :src="item" mode="aspectFill" @click="previewImg(index)"></image>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'comment-lists-item',
	props: {
		data: {
			type: Object,
			required:true
		}
	},
	data() {
		return {
			detail: {
				avatar: this.data.avatar,
				evaluateImg: this.data.evaluateImg,
				evaluation: this.data.evaluation,
				score: this.data.score,
				userName: this.data.userName,
				createdTime: this.data.createdTime
			}
		};
	},
	watch: {
		data(newV, oldV) {
			this.detail = {
				avatar: newV.avatar,
				evaluateImg: newV.evaluateImg,
				evaluation: newV.evaluation,
				score: newV.score,
				userName: newV.userName,
				createdTime: newV.createdTime
			};
		}
	},
	methods:{
		
		/**
		 * 预览图片
		 * @param {Object} index 图片下标
		 */
		previewImg(index){
			uni.previewImage({
			    urls: this.detail.evaluateImg,
			    current:index
			});       
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
