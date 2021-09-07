<template>
	<view class="history">
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>

		<!-- 随机练习 -->
		<scroll-view v-if="tabsIndex === 0" scroll-y="true" class="history-content">
			<view class="history-item" v-for="(item,index) in practiceList" :key="index" @click="exam(item)">
				<view class="text">{{item.title}}</view>
				<view class="time">
					{{item.startTime}} 共{{item.questionNum}}道题，答对{{item.correctNum}}道
				</view>
			</view>
		</scroll-view>
		<!-- 模拟考试 -->
		<scroll-view v-else scroll-y="true" class="history-content">
			<view class="history-item" v-for="(item,index) in examList" :key="index"  @click="exam(item)">
				<view class="text">{{item.title}}</view>
				<view class="time">
					{{item.startTime}} 共{{item.questionNum}}道题，答对{{item.correctNum}}道
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['练习', '考试'],
      questionBankId:'',
      practiceList:[], //练习列表
      examList:[], //考试列表
		};
	},
  onLoad(option){
    const { questionBankId } = option || {}
    this.questionBankId = questionBankId
    this.queryList()
  },
	methods:{
		// 获取当前 tabs index
		getTabsIndex(value){
			this.tabsIndex = value;
		},

    // 列表查询  
    async queryList(){
      const params = {
        questionBankId:this.questionBankId
      }
      const data = await this.$http.get('/questionRecord/queryList',params,true) || {}
      const { practiceList,examList } = data
      this.practiceList = practiceList
      this.examList = examList
    },

    exam(item){
      const { questionType, questionRecordId } = item || {}
      let type,url;
      switch(questionType){
        case 1: // 随机练习
          type = 0;
          break;
        case 2: // 顺序练习
          type = 1;
          break;
        case 2: // 模拟考试
          type = 2;
          break;  
      }
      url = `/pages-user/course/exam/exam?questionRecordId=${questionRecordId}&type=${type}&from=history`
      uni.navigateTo({
				url,
			});
    },
	}
};
</script>

<style lang="less" src="./style.less"></style>
