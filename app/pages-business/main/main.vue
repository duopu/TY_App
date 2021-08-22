<!-- 主页面 -->
<template>
	<view class="page-wrapper main">
		<!-- 首页 -->
		<business-index></business-index>
		<!-- 底部 -->
		<view class="main-tabbars-bottom flex-center-center">
			<view class="tabbers-item" :class="{ on: tabbarsIndex === index }" v-for="(item, index) in tabbarsData" :key="index">
				<image class="item-image" :src="showImage(item, index)" mode="aspectFill"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import BusinessIndex from '../index/index/index.vue';
export default {
	components:{
		BusinessIndex
	},
	data() {
		return {
			tabbarsIndex: 0,
			tabbarsData: [
				{
					defaultImage: '',
					selectImage: '',
					text: '首页'
				},
				{
					defaultImage: '',
					selectImage: '',
					text: '消息'
				},
				{
					defaultImage: '',
					selectImage: '',
					text: '咨询'
				},
				{
					defaultImage: '',
					selectImage: '',
					text: '我的'
				}
			]
		};
	},
	methods: {
		// 显示image地址
		showImage(item, index) {
			return this.tabbarsIndex === index ? item.selectImage : item.defaultImage;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
