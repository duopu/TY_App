<!-- 首页 -->
<template>
	<view class="page-wrapper main">
		<!-- 头部 -->
		<view class="main-top">
			<view class="flex-center-between" v-if="tabIndex === 0">
				<view class="flex-center">
					<image class="image-eduction" src="../../../static/images/index/eduction-course.png" mode="aspectFill"></image>
					<text class="line"></text>
					<text class="color-yellow">slogn可换</text>
				</view>
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/icons/icon-search.svg" mode="aspectFill" @click="searchClick()"></image>
					<image class="icon-image" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 横向-菜单 -->
			<view class="main-tabs flex-center-between">
				<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabIndex" @change="getTabIndex"></custom-horizontal-tabs>
				<image src="../../../static/images/icons/icon-search-yellow.svg" mode="aspectFill" class="icon-image"></image>
			</view>
		</view>
		<!-- 活动 -->
		<tab-activity></tab-activity>
	</view>
</template>

<script>
import TabActivity from '../activity/activity.vue';
export default {
	components:{
		TabActivity
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 4000,
			duration: 500,
			typesShow: true,
			tabIndex: 1,
			tabsData: ['推荐', '活动', '高新转行', '认证', '提升', '好物'],
			menusData: [
				{
					text: '分类',
					url: '../../../static/images/index/index-menu-01.png'
				},
				{
					text: '大咖直播',
					url: '../../../static/images/index/index-menu-02.png'
				},
				{
					text: '考试题库',
					url: '../../../static/images/index/index-menu-03.png'
				},
				{
					text: '高薪转行',
					url: '../../../static/images/index/index-menu-04.png'
				},
				{
					text: '精品课程',
					url: '../../../static/images/index/index-menu-05.png'
				}
			]
		};
	},
	onLoad() {
		// 跳转聊天页面  测试用
		setTimeout(()=>{
			uni.navigateTo({
				url:'/pages/im-message/im-message?groupId=@TGS#2XZIVENHN&userName=18911755085&userPortrait=https://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/webpage/logo512.png&userIM=Czm0l61Ac8R0Cvt4z&storeName=雪梨小店&storePortrait=https://bm-oss.oss-cn-hangzhou.aliyuncs.com/coll_mp.png'
			})
		},600)
	},
	created() {},

	methods: {
		// 横向菜单，返回值
		getTabIndex(value) {
			this.tabIndex = value;
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
