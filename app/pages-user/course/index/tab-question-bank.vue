<!-- tab 我的题库 -->
<template>
	<my-scroll-view class="course-lists" :pageSize="pageSize" @loadData="onLoadData">
		<template v-slot:list="slotProps">
			<course-video-item :state="1"
			v-for="(item, index) in slotProps.list"
			:key="index" 
			:data="item"
			 @clickItem="itemClick"></course-video-item>
		</template>
	</my-scroll-view>
</template>

<script>
export default {
	name: 'tab-question-bank',
	data() {
		return {
			pageSize: 20,
		};
	},
	onLoad() {
		
	},
	methods: {
		onLoadData(page, callback){
			this.$http.get('/questionBank/queryPageByUser',{page:page, size:this.pageSize},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/**题库行点击
		 * @param {Object} questionBankId  题库ID
		 */
		itemClick(questionBankId){
			// uni.navigateTo({
			// 	url: `/pages-user/index/consult/details?articleId=${articleId}`
			// });
		}
	}
};
</script>

<style lang="less">
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
