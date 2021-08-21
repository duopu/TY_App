<!-- 高薪转行 -->
<template>
	<view class="page-wrapper salary">
		<!-- 头部 -->
		<view class="salary-top flex-center-between">
			<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :currentIndex="tabIndex"></custom-horizontal-tabs>
			<image src="../../../static/images/icons/icon-search-yellow.svg" mode="aspectFill"  class="icon-image"></image>
		</view>
		<!-- 列表 -->
		<scroll-view class="salary-lists" scroll-y="true">
			<course-lists-item v-for="(item,index) in ['','','','','','','','']" :key="index"></course-lists-item>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'salary',
		data() {
			return {
				tabIndex: 2,
				tabsData: ['推荐', '活动', '高新转行', '认证', '提升', '好物'],
			};
		}
	}
</script>

<style lang="less" src="./style.less"></style>
