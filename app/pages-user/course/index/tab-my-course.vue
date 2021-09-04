<!-- tab 我的课程 -->
<template>
	<my-scroll-view class="course-lists" @loadData="onLoadData">
		<template v-slot:list="slotProps">
			<course-video-item 
        v-for="(item, index) in slotProps.list"
			  :key="index" 
			  :data="item"
        :state="0"
			  @clickItem="itemClick"
        @btnClick="btnClick"
        />
        
		</template>
	</my-scroll-view>
</template>

<script>
export default {
	name:'tab-my-course',
	data() {
		return {
			
		};
	},
	methods:{
		onLoadData(page,size, callback){
			this.$http.get('/course/queryPage',{ page, size },true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/**课程行点击
		 * @param {Object} goodsId  课程ID
		 */
		itemClick(goodsId){
			console.log("itemClick");
			// uni.navigateTo({
			// 	url: `/pages-user/index/consult/details?articleId=${articleId}`
			// });
		},
    btnClick(data){
      this.$emit('btnClick',data)
    },
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
