<!-- tab 我的题库 -->
<template>
	<view class="bank-content">
		<!-- 列表 -->
		<my-scroll-view v-if="!questionBankInfo" class="course-lists" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-video-item :state="1" v-for="(item, index) in slotProps.list" :key="index" :data="item" @clickItem="itemClick" @btnClick="bindQuestionInfo" />
			</template>
		</my-scroll-view>
		<!-- 我的题库 -->
		<scroll-view scroll-y="true" v-else class="course-exam-content">
			<!-- 列表 -->
			<view class="flex bank-lists">
				<view class="bank-item flex-column-center" @click="route('exam')" >
					<image class="image" src="../../../static/images/course-sjlx.png" mode="aspectFill" />
					<text>随机练习</text>
				</view>
				<view class="bank-item-middle flex-column-center text-bold" @click="route('exam')">
					<text>顺序练习</text>
					<text class="font-24">0/{{detail.questionCount}}</text>
				</view>
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-error.png" mode="aspectFill" />
					<text>我的错题</text>
				</view>
				<view class="bank-item flex-column-center" @click="route('history')">
					<image class="image" src="../../../static/images/course-history.png" mode="aspectFill" />
					<text>做题历史</text>
				</view>
				<view class="bank-item-middle flex-column-center text-bold">
					<text>模拟考试</text>
					<text class="font-24">100%仿真</text>
				</view>
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-collect.png" mode="aspectFill" />
					<text>我的收藏</text>
				</view>
			</view>
			<!-- 我的题库 -->
			<view class="flex-center-between my-bank">
				<view class="title text-bold">我的题库</view>
        <view class="flex-center" @click="bindQuestionInfo()">
				  <view class="flex-1">{{questionBankInfo.title}}</view>
				  <image class="arrow-right" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill" />
        </view>
			</view>
			<!-- 广告位 -->
			<image class="advertise-image" src="../../../static/images/login/advert.png" mode="widthFix" />
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'tab-question-bank',
	data() {
		return {
      questionBankInfo:undefined,
      detail:{}, //题库详情
		};
	},
	onLoad() {
  },
	methods: {
		onLoadData(page, size, callback) {
			this.$http
				.get('/questionBank/queryPageByUser', { page, size }, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		},

		/**题库行点击
		 * @param {Object} questionBankId  题库ID
		 */
		itemClick(questionBankId) {
			// uni.navigateTo({
			// 	url: `/pages-user/index/consult/details?articleId=${articleId}`
			// });
		},
    
    // 开始做题点击事件
    bindQuestionInfo(data){
      this.questionBankInfo = data || undefined
      if(data){
        this.queryDetail(data.questionBankId)
      }
    },

    async queryDetail(questionBankId){
      const data = await this.$http.get('/questionBank/queryInfo',{questionBankId},true)
      this.detail = data
    },

    route(name){
      let url = '';
      const { questionBankId } = this.detail || {}
      switch(name){
        case 'history':
          url = `/pages-user/course/history/history?questionBankId=${questionBankId}`
          break;
        case 'exam':
          url = '/pages-user/course/exam/exam'
          break;  
      }
      uni.navigateTo({
				url
			});
    }
	}
};
</script>

<style lang="less" src="./style.less"></style>
