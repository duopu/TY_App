<!-- tab 我的题库 -->
<template>
	<scroll-view scroll-y="true" class="course-lists">
		<course-lists-item v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index"></course-lists-item>
	</scroll-view>
</template>

<script>
export default {
	name:'tab-my-course',
	data() {
		return {};
	}
};
</script>

<style lang="less" scoped>
//列表
.course-lists {
	padding: 0 20rpx;
	flex: 1;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
}
</style>
