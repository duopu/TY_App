<!-- 考试/模拟练习 -->
<template>
	<view class="exam">
		<!-- 头部 -->
		<view class="exam-top flex-center-between">
			<image class="icon-back" @click="goBack" src="../../../static/images/icons/icon-back.svg" mode="aspectFill" />
			<!-- 随机练习或者模拟考试 -->
			<text>{{title}}</text>
			<view class="right flex-center">
				<image class="icons" @click="mark" src="../../../static/images/icons/icon-circle-wenhao.svg" mode="aspectFill" />
				<!-- 未收藏 -->
				<image v-if="isStart" @click="start(1)" class="icons" src="../../../static/images/icons/icon-star-black.svg" mode="aspectFill" />
				<!-- 已收藏 -->
				<image v-else @click="start(0)" class="icons" src="../../../static/images/icons/icon-star-save.svg" mode="aspectFill" />
				<!-- 模拟考试 -->
				<button class="btn" @click="openPopup('submitPopup')">交卷</button>
			</view>
		</view>
		<!-- 内容 -->
		<scroll-view class="exam-content">
      <swiper class="swiper" :current="current" @change="swiperChange" duration="10">
          <swiper-item v-for="(item,index) in questionList" :key="index"> 
              <!-- 考试题目 -->
              <view class="exam-item">
                <view class="flex-name">
                  <text>{{item.index+1}}、</text>
                  <view>
                    【{{item.type | getType}}】
                    <text v-html="item.content"></text>
                  </view>
                </view>
                <block v-for="(flag,ind) in item.questionOptionVOList" :key="ind">
                  <view class="select-row flex" @click="checkChange(item.type,flag)">
                    <!-- 多选 -->
                    <view v-if="item.type === 2" class="checkbox" :class="flag.checked && 'on'"></view>
                    <!-- 单选 | 判断题 -->
                    <view v-else class="radio" :class="[ flag.isTrue && 'right',(flag.checked || item.userAnswer === flag.optionLabel) && 'on']"></view>
                    <view>{{flag.optionLabel ? (flag.optionLabel + '、') : ''}}{{flag.content}}</view>
                  </view>
                </block>

                <!-- 解析 -->
                <view class="exam-analysis" v-if="item.userAnswer && item.answer != item.userAnswer">
                  <view class="flex-center analysis-answer">
                    <view class="flex-1">正确答案：{{item.answer}}</view>
                    <view class="flex-1 color-9">考生答案：{{item.userAnswer}}</view>
                  </view>
                  <view class="title">解析：</view>
                  <view class="analysis-content">
                    <text v-html="item.answerAnalysis"></text>
                  </view>
                </view>

                <!-- 确定按钮 -->
                <button class="btn" @click="btnSure(item)">确定</button>
              </view>
          </swiper-item>
      </swiper>  

        
      
		</scroll-view>

		<!-- 底部 -->
		<view class="exam-bottom flex-center-between">
			<view class="left flex-center">
				<!-- 对的个数 -->
				<image class="icons" mode="aspectFill" src="../../../static/images/icons/icon-exam-right.svg" />
				<text>{{1 | rightWrongQues}}</text>
				<!-- 错的个数 -->
				<image class="icons m-left-80" mode="aspectFill" src="../../../static/images/icons/icon-exam-error.svg" />
				<text>{{0 | rightWrongQues}}</text>
			</view>
			<view class="right flex-center" @click="openPopup('serialPopup')">
				<!-- 做题的数 -->
				<image class="icons" src="../../../static/images/icons/icon-tiku.svg" mode="aspectFill" />
				<text>{{current + 1}}/{{questionList.length}}</text>
			</view>
		</view>

		<!-- 弹窗 交卷 -->
		<course-exam-submit 
      ref="submitPopup" 
      :title="modal.title" 
      @sure="modal.sure" />

		<!-- 弹窗 题目序列号 -->
		<course-serial-number-popup 
      ref="serialPopup" 
      :current="current"
      :question="questionList"
      :rightLen="getRightWrongQues(1)"
      :wrongLen="getRightWrongQues(0)"
      @answerClick="answerClick"
    />

	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
      questionBankId:'',
      type:undefined, //做题方式
      title:'',
      current:0,
      questionList:[],
      examStartTime:new Date().valueOf(),
      modal:{
        title:'',
        sure:()=>uni.navigateBack()
      },
      submitQuestionDTOList:[],
    };
	},
  filters:{
    // 题目类型 
    getType(type){
      let text = ''
      switch(type){
        case 1:
          text = '单选'
          break;
        case 2:
          text = '多选'
          break;
        case 3:
          text = '判断'
          break;
      }
      return text + '题'
    },

    // 对错题
    rightWrongQues(v){
      return that.getRightWrongQues(v)
    }
  },
  
  beforeCreate: function () {
    that = this
  },

  async onLoad(option){
    const { questionBankId,type } = option || {}
    this.questionBankId = questionBankId
    this.type = Number(type)
    let title = ''
    switch(this.type){
      case 0:
        title = '随机练习'
        break;
      case 1:
        title = '顺序练习' 
        break;
      case 2:
        title = '模拟考试'
        break;
    }
    this.title = title
    this.queryList()
  },

	methods: {

		// 打开弹窗
		openPopup(value) {
			this.$refs[value].open();
		},

    // 标记
    mark(){
      // 做过的题目不能打标记
      if(this.questionList[this.current].isAnswer){
        this.questionList[this.current].mark = false
        return;
      }
      this.questionList[this.current].mark = !this.questionList[this.current].mark
    },

    // 收藏
    start(type){
      const params = {
        questionBankId:this.questionBankId,
        questionId:this.questionList[this.current].questionId
      }
      const apiUrl = type === 1 ?  '/question/collect' : '/question/cancelCollect'
      this.$http.post(apiUrl,params,true)
    },
    isStart(){
      return this.questionList[this.current].start === 1
    },

    swiperChange(e){
      this.current = e.detail.current
    },

    // 对错题 个数 
    getRightWrongQues(flag){
      let quesLen = 0;
      if(flag === 1){
        quesLen = this.questionList.filter(i=>i.answer === i.userAnswer).length
      }else{
        quesLen = this.questionList.filter(i=>i.userAnswer && (i.answer !== i.userAnswer)).length
      }
      return quesLen
    },

    // 弹窗校验
    modalCheck(){
      const questionLen = this.questionList.length;
      const isAnswerLen = this.questionList.filter(i=>i.isAnswer === 1).length;
      if(isAnswerLen === questionLen ){
        return true
      }else{
        this.modal.title = `还有${questionLen - isAnswerLen}道题未完成，确定提交？`
        this.openPopup('submitPopup');
        return false
      }
    },

    answerClick(current){
      this.current = current;
    },

    // 返回
    goBack(){
      if(this.modalCheck()){
        uni.navigateBack()
      }
    },

    // 答案选中事件
    checkChange(type,flag){
       this.questionList.map(i=>{
        (i.questionOptionVOList || []).map(f=>{
          // 单选 | 判断
          if(type === 1 || type === 3){
            if(f.questionOptionId === flag.questionOptionId){
              f.checked = true
              i.isAnswer = 1 //表示题目已经答过
            }else{
              f.checked = false
            }
          // 多选
          }else{
            if(f.questionOptionId === flag.questionOptionId){
              f.checked = true
              i.isAnswer = 1
            }
          }
        })
      })
    },
    

    // 按钮确定
    btnSure(item){
      const isAns = (item.questionOptionVOList || []).filter(i=>i.checked)
      if(isAns.length === 0){
        this.$tool.showToast('请至少选择一个答案')
        return;
      }
      this.submit() 
    },

    // 提交练习题
    submit(){
      this.questionList.map(i=>{
        const checkedQuestionOption = i.questionOptionVOList.filter(i=>i.checked)
        if(checkedQuestionOption.length>0){
            // 单选 | 多选 取optionLabel  判断题 取 1或0 
            let userAnswer = ''; 
            if(i.type === 3 ){
              userAnswer = (checkedQuestionOption || []).map(i=>i.content).indexOf('对')> -1 ?  1 : 0
            }else{
              userAnswer = (checkedQuestionOption || []).map(i=>i.optionLabel).join('') 
            } 
            const checkSubmitQuestionDTOList = this.submitQuestionDTOList.filter(item=>item.questionId === i.questionId)
            if(checkSubmitQuestionDTOList.length>0){
              checkSubmitQuestionDTOList.userAnswer = userAnswer
            }else{
              this.submitQuestionDTOList.push({
                  questionId:i.questionId,
                  userAnswer
              })  
            }
        }
      })
      const examStartTime = new Date().valueOf()
      const examTime = examStartTime - this.examStartTime;
      const params = {
        examTime,
        questionBankId:this.questionBankId,
        submitQuestionDTOList:this.submitQuestionDTOList,
        questionType:this.type,
      }
      this.$http.post('/questionRecord/practiceSubmit',params,true).then(async (res)=>{
        const questionRecordId = res.questionRecordId
        if(questionRecordId){
          await this.queryQuestionList(questionRecordId)
        }
      })
    },

    // 随机练习0 | 顺序练习1 | 模式练习2 | 我的收藏3 | 我的错题4
    async queryList(){
      const params = {
        questionBankId:this.questionBankId 
      }
      let apiUrl = '';
      switch(this.type){
        case 0:
          apiUrl = '/question/queryRandomAllList'
          break;
        case 1:
          apiUrl = '/question/queryList'
          break; 
        case 2:
          apiUrl = '/question/querySimulatedPaperList'
          break; 
        case 3:
          apiUrl = '/questionBank/queryCollectionListByUser'
          break;  
        case 4:
          apiUrl = '/questionBank/queryWrongListByUser'
          break;      
      }
      const data =  await this.$http.get(apiUrl,params,true) || []
      data.map((i,index)=>{
        i.index = index;
        i.mark = false;
        (i.questionOptionVOList || []).map(f=>{
          f.checked = false
        })
      })
      this.questionList = data;
    }, 

    // 查询全部解析
    async queryQuestionList(questionRecordId){
      const params = {
        questionRecordId
      }
      const data =  await this.$http.get('/questionRecord/queryQuestionList',params,true) || []
      data.map(i=>{
        this.questionList.map(f=>{
          if(i.userAnswer){
            if(i.questionId === f.questionId){
              // 去除标记
              f.mark = false
              // 用户答案赋值到 questionList 如果用户答案等于正确答案 跳转到下一题
              f.userAnswer = i.userAnswer
              if(f.answer !== i.userAnswer){
                return;
              }
              this.current ++;
            }

          }
        })
      })
    }
    
	}
};
</script>

<style lang="less" src="./style.less"></style>
