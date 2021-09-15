<!-- 高薪转行 -->
<template>
	<view class="page-wrapper salary">
		<!-- 列表 -->
		<scroll-view class="salary-lists" scroll-y="true">
			<course-lists-item v-for="(item,index) in ['','','','','','','','']" :key="index"></course-lists-item>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'tab-index-salary',
		data() {
			
		}
	}
</script>

<style lang="less" src="./style.less"></style>
