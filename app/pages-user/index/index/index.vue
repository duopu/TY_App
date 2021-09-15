<!-- 首页 -->
<template>
	<view class="page-wrapper main">
		<!-- 头部 -->
		<view class="main-top">
			<view class="flex-center-between">
				<view class="flex-center">
					<image class="image-eduction" src="../../../static/images/index/eduction-course.png"
						mode="aspectFill"></image>
					<text class="line"></text>
					<text class="color-yellow">slogn可换</text>
				</view>
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/icons/icon-search.svg" mode="aspectFill"
						@click="searchClick()"></image>
					<image class="icon-image" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"
						@click="goMessageList"></image>
				</view>
			</view>
			<!-- 横向-菜单 -->
			<view class="main-tabs flex-center-between">
				<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabIndex"
					@change="getTabIndex"></custom-horizontal-tabs>
			</view>
		</view>
		<!-- 主页 -->
		<tab-recommend v-show="tabIndex === 0"></tab-recommend>
		<!-- 活动 -->
		<tab-activity v-show="tabIndex === 1"></tab-activity>
		<!-- 高薪转业 -->
		<!-- <tab-index-salary v-show="tabIndex === 2"></tab-index-salary> -->
	</view>
</template>

<script>
	import TabActivity from '../activity/activity.vue';
	import TabRecommend from './tab-recommend.vue';
	import TabIndexSalary from "../salary/salary.vue";
	export default {
		components: {
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
			uni.$on('kcfx-open', () => {
				this.tabIndex = 1;
			})
		},
		onShow() {
			setTimeout(()=>{
				this.$store.dispatch('queryInterestList');
			},1000)
		},
		created() {},

		methods: {
			// 横向菜单，返回值
			getTabIndex(value) {
				this.tabIndex = value;
			},
			// 跳转消息列表
			goMessageList() {
				this.$tool.toMessageList()
			},
			// 搜索点击
			searchClick() {
				uni.navigateTo({
					url: "/pages-user/index/search/search?"
				});
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
