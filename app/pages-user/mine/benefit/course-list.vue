<!-- 课程列表 -->
<template>
	<view class="page-wrapper page-benefit-course">
		<course-lists-item v-for="(item, index) in dataList" :key="index" :data="item" from="benefit"></course-lists-item>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList:[]
		};
	},
	onLoad(option) {
    let { list } = option
    this.dataList = JSON.parse(list)
	},
	methods: {
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
