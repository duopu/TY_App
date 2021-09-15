<!-- tab 缓存课程 -->
<template>
	<scroll-view scroll-y="true" class="course-lists">
		<course-video-item 
      v-for="(item, index) in dataList" 
      :key="index" 
      :state="2"
      :data="item"
      @clickItem="clickItem"
      />
	</scroll-view>
</template>

<script>
	export default {
		name:'tab-storage-course',
		data() {
			return {
        dataList:[]
			};
		},
    beforeMount(){
      const data = uni.getStorageSync('courseList') || []
      this.dataList = data
    },
    methods:{
      /**课程行点击
       * @param {Object} goodsId  课程ID
       */
      clickItem(data){
        const { courseId } = data || {}
        uni.navigateTo({
          url: `/pages-user/course/live-room/live-room?courseId=${courseId}&from=local`
        });
      },
    }
	}
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
