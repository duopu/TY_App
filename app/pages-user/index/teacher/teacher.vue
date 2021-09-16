<template>
	<view>
		
		<!-- 老师基本信息 -->
		<teacher-lists-item :data="teacherVO"></teacher-lists-item>
		
		<!-- 教学课程 -->
		<course-lists-item
		v-for="(item, index) in teacherVO.teacherGoodsList"
		:key="`goods-${index}`" 
		:data="item"></course-lists-item>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacherId: undefined,
				teacherVO: {}
			}
		},
		onLoad(option) {
			this.teacherId = option.teacherId;
			this.queryTeacherInfo();
		},
		methods: {
			// 查询老师详情
			queryTeacherInfo(){
				this.$http
					.get('/teacher/queryInfo', {teacherId:this.teacherId}, true)
					.then(res => {
						this.teacherVO = res;
					});
			}
		}
	}
</script>

<style>

</style>
