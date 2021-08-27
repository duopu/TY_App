<template>
	<view class="tabs-recommend">
		<block v-for="(item, index) in ['', '', '', '']" :key="index"><course-lists-item></course-lists-item></block>
	</view>
</template>

<script>
export default {
	name: 'tabsRecommend'
};
</script>

<style lang="less" scoped>
.tabs-recommend {
	padding: 0 20rpx;
	background-color: #ffffff;
}
</style>
