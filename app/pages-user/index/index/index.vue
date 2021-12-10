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
				tabsData: ['推荐', '活动', '高薪转行', '认证', '提升', '好物'],
			};
		},
		onLoad() {
			uni.$on('activity-open', () => {
				this.tabIndex = 1;
			})
			
			// 监听会话，更新消息未读数
			uni.$on('ConversationListen',()=>{
				this.$store.dispatch('refreshTotalUnreadMessageCount')
			})
			// 初始化的时候更新一下消息未读数
			this.$store.dispatch('refreshTotalUnreadMessageCount')
			
			console.log('用户 异步获取客户端推送标识信息');
			plus.push.getClientInfoAsync((info) => {
				console.log('用户 异步获取客户端推送标识信息', info);
				const param = {
					cid: info.clientid
				}
				this.$http.post('/user/updatePushId', param).then(res => {})
			}, (e) => { 
				console.error('用户 异步获取客户端推送标识信息  失败');
				console.error(JSON.stringify(e));
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
