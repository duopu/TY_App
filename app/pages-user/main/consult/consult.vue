<!-- 最新资讯 -->
<template>
	<view class="page-wrapper consult">
		<!-- 菜单 -->
		<scroll-view scroll-x="true" class="consult-top">
			<view class="item" :class="{'on':menusIndex === index}" v-for="(item,index) in menusData" :key="index" @click="changeTabs(index)">{{item}}</view>
		</scroll-view>
		<!-- 列表 -->
		<scroll-view class="consult-lists" scroll-y="true">
			<consult-lists-item v-for="(item,index) in ['','','','','','','','','']" :key="index"></consult-lists-item>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menusIndex:0,
				menusData:['热门','经济','科技','教育','体育','健康','政治']
			};
		},
		methods:{
			changeTabs(value){
				this.menusIndex = value;
			}
		}
	}
</script>

<style src="./style.less" lang="less"></style> 
