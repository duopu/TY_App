<!-- 主页面 -->
<template>
	<view class="page-wrapper main">
		<!-- 首页 -->
		<business-index v-if="tabbarsIndex === 0"></business-index>
		<!-- 消息 -->
		<message-index v-else-if="tabbarsIndex === 1"></message-index>
		<!-- 资讯 -->
		<consult-index v-else-if="tabbarsIndex === 2"></consult-index>
		<!-- 我的 -->
		<my-index v-else></my-index>
		<!-- 底部 -->
		<view class="main-tabbars-bottom flex-center-center">
			<view class="tabbers-item" @click="changeTabs(index)" :class="{ on: tabbarsIndex === index }" v-for="(item, index) in tabbarsData" :key="index">
				<image class="item-image" :src="showImage(item, index)" mode="aspectFill"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import BusinessIndex from '../index/index/index.vue';
import MessageIndex from '../message/index/index.vue';
import ConsultIndex from '../consult/index/index.vue';
import MyIndex from '../my/index/index.vue';
export default {
	components:{
		BusinessIndex,
		MessageIndex,
		ConsultIndex,
		MyIndex
	},
	data() {
		return {
			tabbarsIndex: 3,
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
		},
		// 切换tabs
		changeTabs(value){
			if(this.tabbarsIndex === value) return;
			this.tabbarsIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
