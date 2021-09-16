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
	import { mapState } from 'vuex'; //引入mapState
	export default {
		data() {
			return {
				
			}
		},
		computed: mapState({
			teacherVO: state => state.teacherVO
		}),
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
