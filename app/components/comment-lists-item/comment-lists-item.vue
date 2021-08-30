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
		<!-- 新增评论图片 -->
		<view class="flex-center image-lists">
			<block v-for="(item,index) in ['','','']" :key="index"><image class="image" src="../../static/images/other/demo.png" mode="aspectFill"></image></block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'comment-lists-item',
	props: {
		data: {
			type: Object
			//required:true
		}
	},
	data() {
		return {
			detail: {
				avatar: '', //this.data.avatar,
				evaluateImg: [], //this.data.evaluateImg,
				evaluation: '', //this.data.evaluation,
				score: 0, //this.data.score,
				userName: '', //this.data.userName,
				createdTime: '' //this.data.createdTime
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
	}
};
</script>

<style src="./style.less" lang="less"></style>
