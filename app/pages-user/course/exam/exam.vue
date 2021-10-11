<!-- 考试/模拟练习 -->
<template>
	<view class="exam">
		<!-- 头部 -->
		<view class="exam-top flex-center-between">
      <view class="icon-back">
        <image class="img" @click="goBack" src="../../../static/images/icons/icon-back.svg" mode="aspectFill" />
        <!-- 模拟显示倒计时 -->
        <uni-countdown v-if="isMoNi && !isGoBack" class="count-down" :show-day="false" :hour="count.hour" :minute="count.minute" :second="count.second" @timeup="timeEnd"></uni-countdown> 
      </view>
			<text class="title">{{title}}</text>
			<view class="right flex-center">
				<image v-if="isShowMark" class="icons" @click="mark" src="../../../static/images/icons/icon-circle-wenhao.svg" mode="aspectFill" />
        <block v-if="isShowStar">
          <!-- 未收藏/已收藏 -->
          <image v-if="isStar()" @click="star(1)" class="icons" src="../../../static/images/icons/icon-star-black.svg" mode="aspectFill" />
          <image v-else @click="star(2)" class="icons" src="../../../static/images/icons/icon-star-save.svg" mode="aspectFill" />
        </block>
				<!-- 模拟考试才有交卷 -->
				<button v-if="type === 2 && !isGoBack" class="btn" @click="finish">交卷</button>
			</view>
		</view>
		<!-- 内容 -->
		<scroll-view class="exam-content">
      <!-- 轮播 -->
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
                <block v-if="item.type === 4">
                    <!-- 简答题 -->
                    <textarea class="textarea" @input="inputChange" placeholder="请输入答案" :value="item.userAnswer" />
                </block>
                <block v-else v-for="(flag,ind) in item.questionOptionVOList" :key="ind">
                  <view class="select-row flex" @click="checkChange(item,flag)">
                    <!-- 多选 -->
                    <view v-if="item.type === 2" class="checkbox" :class="flag.checked && 'on'"></view>
                    <!-- 单选 | 判断题 -->
                    <view v-else class="radio" :class="[ flag.isTrue && 'right',flag.checked && 'on']"></view>
                    <view>{{flag.optionLabel ? (flag.optionLabel + '、') : ''}}{{flag.content}}</view>
                  </view>
                </block>

                <!-- 解析 -->
                <view class="exam-analysis" v-if="item.isShowAnswer" >
                  <view class="flex-center analysis-answer">
                    <view class="flex-1">正确答案：{{item.answer}}</view>
                    <view class="flex-1 color-9">考生答案：{{item.userAnswer}}</view>
                  </view>
                  <view class="title">解析：</view>
                  <view class="analysis-content">
                    <text v-html="item.answerAnalysis"></text>
                  </view>
                </view>
              </view>
          </swiper-item>
      </swiper>  

      <!-- 确定按钮 -->
      <button v-if="!isGoBack" class="btn" @click="btnSure">确定</button>
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
      questionBankId:'', // 题目id
      questionRecordId:'', // 做题记录id
      type:undefined, // 做题方式 随机练习0 | 顺序练习1 | 模式考试2 | 我的收藏3 | 我的错题4
      title:'', // 页面标题
      current:0, // 当前题目索引
      questionList:[], //题目列表
      examStartTime:new Date().valueOf(), // 考试开始时间
      // 弹窗信息
      modal:{
        title:'',
        sure:()=> uni.navigateBack() //默认是返回上一页 不可删除
      },
      isMoNi:false, //是否是模拟题目
      noSunmit:false, // 我的收藏和我的错题 不提交
      isGoBack:false, // 模拟题是否从得分页面返回
      // 标注、收藏显示 模拟考试的时候要标注，不用收藏。考完看解析的时候要收藏，不要标注
      isShowMark:true, // 是否显示标注
      isShowStar:true, //
      count:{ //倒计时
        hour:0,
        minute:0,
        second:0,
      },
      form:'',// 从哪个页面过来
      submitQuestionDTOList:[], // 提交入参-选中的题目的答案
    };
	},

  beforeCreate: function () {
    that = this
  },

  // 过滤器
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
        case 4:
          text = '简答'
          break;  
      }
      return text + '题'
    },

    // 对错题
    rightWrongQues(v){
      return that.getRightWrongQues(v)
    }
  },

  async onLoad(option){
    const { questionBankId, type, examTime, from, questionRecordId } = option || {}
    if(examTime){
      if(examTime>=60){
        this.count.hour = parseInt(examTime/60)
        this.count.minute = parseInt(examTime%60)
        this.count.second = 0
        return;
      }
      this.count.hour = 0;
      this.count.minute = parseInt(examTime%60)
      this.count.second = 0
    }
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
        this.isMoNi = true
        this.isShowStar = false
        break;
      case 3:
        title = '我的收藏'
        this.noSunmit = true
        break;
      case 4:
        title = '我的错题'
        this.noSunmit = true
        break;    
    }
    this.title = title
    // 从我的历史题过来
    this.questionRecordId = questionRecordId;
    this.form = from
    if(from === 'history'){
      this.isGoBack = true
      this.isShowMark = false
      this.noSunmit = true
      this.queryQuestionList(2)
      return;
    }
    this.queryList()

    // 模拟提交后 返回 v:1 全部错题解析 v:2 全部题目解析
    uni.$on("goBack", (v,questionRecordId) => {
      this.current = 0;
      this.questionRecordId = questionRecordId
      this.isGoBack = true
      this.isShowMark = false
      if(v == 1){
        this.queryWrongList() //查看错题列表
        return;
      }
      this.queryQuestionList(2)
      // 清除监听
      uni.$off('goBack');
    }) 
  },

	methods: {

		// 打开弹窗
		openPopup(value) {
			this.$refs[value].open();
		},

    //轮播Change 
    swiperChange(e){
      this.current = e.detail.current
    },

    // 返回
    goBack(){
      if(this.modalCheck() || this.noSunmit || this.isGoBack ){
        uni.navigateBack()
      }
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

    // 计算对错题 个数 
    getRightWrongQues(flag){
      let quesLen = 0;
      if(flag === 1){
        quesLen = this.questionList.filter(i=>i.answer === i.userAnswer).length
      }else{
        quesLen = this.questionList.filter(i=>i.userAnswer && (i.answer !== i.userAnswer)).length
      }
      return quesLen
    },

    // 弹窗-校验
    modalCheck(){
      const questionLen = this.questionList.length;
      const isAnswerLen = this.questionList.filter(i=>i.isAnswer === 1).length;
      if(isAnswerLen === questionLen ){
        return true
      }
      this.modal.title = `还有${questionLen - isAnswerLen}道题未完成，确定${this.isMoNi ? '交卷' : '提交'}？`
      this.openPopup('submitPopup');
      return false
    },

    // 弹窗-序号点击
    answerClick(current){
      this.current = current;
    },

    // 下一题
    next(){
      if((this.questionList.length - 1) === this.current){
        return;
      }
      this.current ++;
    },

    // 答案选中事件
    checkChange(item,flag){
       const { type } = item || {}
       if(item.userAnswer){
         return;
       }
       const currQues = this.questionList[this.current];
       (currQues.questionOptionVOList || []).map(f=>{
          // 单选 | 判断
          if(type === 1 || type === 3){
            if(f.questionOptionId === flag.questionOptionId){
              f.checked = true
              currQues.isAnswer = 1 //表示题目已经答过
            }else{
              f.checked = false
            }
          }
          // 多选
          if(type === 2){
            if(f.questionOptionId === flag.questionOptionId){
              f.checked = !f.checked
              currQues.isAnswer = 1
            }
          }
      })
    },

    inputChange(e){
      const currQues = this.questionList[this.current];
      currQues.isAnswer = 1 //表示题目已经答过
      currQues.userAnswer = e.target.value;
    },

    // 按钮确定
    btnSure(){
      // 模拟题得分页面回来查看解析
      if(this.isMoNi && this.isGoBack){
        this.next();
        return;
      }
      // 错题 + 收藏 不提交
      if(this.noSunmit){
        const currQuestion = this.questionList[this.current]
        const checkedQuestionOption = currQuestion.questionOptionVOList.filter(i=>i.checked);
        const userAns = (checkedQuestionOption || []).map(i=>i.optionLabel).join('') 
        if(currQuestion.answer === userAns){
          this.next();
        }else{
          this.$set(this.questionList[this.current],'userAnswer',userAns)
          this.$set(this.questionList[this.current],'isShowAnswer',true)
        }
        return;
      }
      
      // 模拟考试直接进入下一题 做完提交
      if(this.isMoNi && this.current < (this.questionList.length - 1)){
        this.next();
        return;
      }
      this.submit() 
    },

    // 交卷 
    finish(){
      // 所有题目做完直接提交 ，未做完给弹窗提示
      if(this.modalCheck()){
        this.submit()
        return;
      }
      this.modal.sure = this.submit
    },

    // 倒计时结束提交答案
    timeEnd(){
      this.submit()
    },

    // 收藏
    star(type){
      const params = {
        questionBankId:this.questionBankId,
        questionId:this.questionList[this.current].questionId
      }
      const apiUrl = (type === 1 ?  '/question/collect' : '/question/cancelCollect')
      this.$http.post(apiUrl,params,true)
      this.questionList[this.current].questionCollectionCheck = this.questionList[this.current].questionCollectionCheck === 1 ? 2 : 1 
    },
    isStar(){
      return this.current && this.questionList[this.current].questionCollectionCheck && (this.questionList[this.current].questionCollectionCheck === 1) ? true : false
    },

    // 提交
    submit(){
      const isAnswerList = this.questionList.filter(item=>item.isAnswer === 1);
      console.log('isAnswerList',isAnswerList);
      (isAnswerList || []).map(i=>{
        // 简答题
        if(i.type === 4){
          const checkSubmitQuestionDTOList = this.submitQuestionDTOList.filter(item=>item.questionId === i.questionId)
          if(checkSubmitQuestionDTOList.length>0){
            checkSubmitQuestionDTOList.userAnswer = i.userAnswer
          }else{
            this.submitQuestionDTOList.push({
              questionId:i.questionId,
              userAnswer:i.userAnswer
            }) 
          }
        }else{
          // 单选 + 判断 + 多选
          const checkedQuestionOption = i.questionOptionVOList.filter(i=>i.checked)
          if(checkedQuestionOption.length>0){
              let userAnswer = (checkedQuestionOption || []).map(i=>i.optionLabel).join('') 
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
        }
      })
      const examStartTime = new Date().valueOf()
      const examTime = parseInt(((examStartTime - this.examStartTime) % (1000 * 60 * 60)) / (1000 * 60)); 
      let params = {
        examTime,
        questionBankId:this.questionBankId,
        submitQuestionDTOList:this.submitQuestionDTOList,
      }
      let apiUrl;
      // 模拟考试 接口要跟其他类型区分
      if(this.type === 2){
        apiUrl = '/questionRecord/submit'
      }else{
        apiUrl = '/questionRecord/practiceSubmit'
        params.questionType = this.type === 0 ? 1 : 2
      }
      
      this.$http.post(apiUrl,params,true).then((res)=>{
        const { questionRecordId , points} = res || {}
        this.questionRecordId = questionRecordId

        // 模拟考试跳转到结果页
        if(this.type === 2){
          uni.navigateTo({
            url:`/pages-user/course/result/result?questionRecordId=${this.questionRecordId}&points=${points}`
          });
          return;
        }
        this.queryQuestionList()
      })
    },

    // 随机练习0 | 顺序练习1 | 模式考试2 | 我的收藏3 | 我的错题4
    async queryList(){
      const params = {
        questionBankId:this.questionBankId 
      }
      let apiUrl = '',newData = [];
      switch(this.type){
        case 0:
          apiUrl = '/question/queryRandomAllList'
          break;
        case 1:
          // 顺序练习 查最新列表如果是空表示未做过练习题 
          newData = await this.$http.get('/questionRecord/queryNewList',params,true) || [];
          if(newData.length === 0){
            apiUrl = '/question/queryList'
          }
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
      const data =  apiUrl  ? await this.$http.get(apiUrl,params,true) : newData ||  [];
      data.map((i,index)=>{
        i.index = index;
        i.mark = false;
        i.isShowAnswer = i.userAnswer && i.userAnswer !== i.answer;
        i.isAnswer = i.userAnswer && i.userAnswer === i.answer ? 1 : 0;
        (i.questionOptionVOList || []).map(f=>{
          if(i.userAnswer){
            f.checked = i.userAnswer.indexOf(f.optionLabel) > -1
          }else{
            f.checked = false
          }
        })
        if(i.userAnswer){
          this.current = index
        }
      })
      this.questionList = data;
    }, 

    // 查询错题解析
    async queryWrongList(){
      const params = {
        questionRecordId:this.questionRecordId,
      }
      const data =  await this.$http.get('/questionRecord/queryWrongList',params,true) || []
       data.map((i,index)=>{
        i.index = index;
        i.isShowAnswer = true
      })
      this.questionList = data;
    },

    // 查询全部解析 backType === 1 全部错题解析 ，backType === 2 全部题目解析（显示所有题目解析）
    async queryQuestionList(backType){
      const params = {
        questionRecordId:this.questionRecordId,
      }
      const data =  await this.$http.get('/questionRecord/queryQuestionList',params,true) || []
      // 从做题历史过来 只看解析 不用提交
      if(this.form === 'history'){
        this.current = 0
        data.map((i,index)=>{
          i.index = index
          i.isShowAnswer = true
        })
        this.questionList = data
        return;
      }
      data.map(i=>{
        this.questionList.map(f=>{
          if(backType === 2){
            f.isShowAnswer = true
          }
          if(i.userAnswer){
            if(i.questionId === f.questionId){
              // 去除标记
              f.mark = false
              // 用户答案赋值到 questionList 如果用户答案等于正确答案 跳转到下一题
              f.userAnswer = i.userAnswer
              if(f.answer !== i.userAnswer){
                f.isShowAnswer = true
                return;
              }
              this.next();
            }
          }
        })
      })
    }
    
	}
};
</script>

<style lang="less" src="./style.less"></style>
