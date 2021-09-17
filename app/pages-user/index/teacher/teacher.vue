<!-- 老师详情 -->
<template>
	<scroll-view scroll-y="true" class="teacher-details">
		<!-- 老师基本信息 -->
		<teacher-lists-item class="box" :data="teacherVO"></teacher-lists-item>
		<view class="title text-bold">教学课程</view>
		<!-- 教学课程 -->
		<course-lists-item class="box" v-for="(item, index) in teacherVO.teacherGoodsList" :key="`goods-${index}`" :data="item"></course-lists-item>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			teacherId: undefined,
			teacherVO: {}
		};
	},
	onLoad(option) {
		this.teacherId = option.teacherId;
		this.queryTeacherInfo();
	},
	methods: {
		// 查询老师详情
		queryTeacherInfo() {
			this.$http.get('/teacher/queryInfo', { teacherId: this.teacherId }, true).then(res => {
				this.teacherVO = res;
			});
		}
	}
};
</script>

<style lang="scss" src="./style.scss"></style>
