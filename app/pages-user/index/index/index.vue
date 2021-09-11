<!-- 首页 -->
<template>
	<view class="page-wrapper main">
		<!-- 头部 -->
		<view class="main-top">
			<view class="flex-center-between">
				<view class="flex-center">
					<image class="image-eduction" src="../../../static/images/index/eduction-course.png" mode="aspectFill"></image>
					<text class="line"></text>
					<text class="color-yellow">slogn可换</text>
				</view>
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/icons/icon-search.svg" mode="aspectFill" @click="searchClick()"></image>
					<image class="icon-image" src="../../../static/images/icons/icon-message.svg" mode="aspectFill" @click="goMessageList"></image>
				</view>
			</view>
			<!-- 横向-菜单 -->
			<view class="main-tabs flex-center-between">
				<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabIndex" @change="getTabIndex"></custom-horizontal-tabs>
			</view>
		</view>
		<!-- 主页 -->
		<tab-recommend v-show="tabIndex === 0"></tab-recommend>
		<!-- 活动 -->
		<tab-activity v-show="tabIndex === 1"></tab-activity>
		<!-- 高薪转业 -->
		<tab-index-salary v-show="tabIndex === 2"></tab-index-salary>
	</view>
</template>

<script>
import TabActivity from '../activity/activity.vue';
import TabRecommend from './tab-recommend.vue';
import TabIndexSalary from "../salary/salary.vue";
export default {
	components:{
		TabActivity,
		TabRecommend,
		TabIndexSalary
	},
	data() {
		return {
			tabIndex: 0,
			tabsData: ['推荐', '活动', '高新转行', '认证', '提升', '好物'],
		};
	},
	onLoad() {
		// 跳转聊天页面  测试用
		// setTimeout(()=>{
		// 	uni.navigateTo({
		// 		url:'/pages/im-message/im-message?groupId=@TGS#2XZIVENHN&userName=18911755085&userPortrait=https://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/webpage/logo512.png&userIM=Czm0l61Ac8R0Cvt4z&storeName=雪梨小店&storePortrait=https://bm-oss.oss-cn-hangzhou.aliyuncs.com/coll_mp.png'
		// 	})
		// },600) 
		
		// 跳转课程播放页面  测试用
		// setTimeout(()=>{
		// 	uni.navigateTo({
		// 		url:'/pages-user/index/live/room'
		// 	})
		// },600)
		uni.$on('kcfx-open',()=>{
			this.tabIndex = 1;
		})
	},
	onShow() {
		this.$store.dispatch('queryInterestList');
	},
	created() {},

	methods: {
		// 横向菜单，返回值
		getTabIndex(value) {
			this.tabIndex = value;
		},
		// 跳转消息列表
		goMessageList(){
			this.$tool.toMessageList()
		},
		// 搜索点击
		searchClick(){
			uni.navigateTo({
				url: "/pages-user/index/search/search?"
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
