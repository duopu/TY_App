<!-- 题目序列号 弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-between">
				<view class="left flex-center">
					<!-- 对的个数 -->
					<image class="icons" mode="aspectFill" src="../../static/images/icons/icon-exam-right.svg"></image>
					<text>{{rightLen}}</text>
					<!-- 错的个数 -->
					<image class="icons m-left-80" mode="aspectFill" src="../../static/images/icons/icon-exam-error.svg"></image>
					<text>{{wrongLen}}</text>
				</view>
				<view class="right flex-center">
					<!-- 做题的数 -->
					<image class="icons" src="../../static/images/icons/icon-tiku.svg" mode="aspectFill"></image>
					<text>{{current + 1}}/{{question.length}}</text>
				</view>
			</view>
      <scroll-view :scroll-y="true" class="popup-body">
        <view class="title">单选题</view>
        <view class="answer-lists flex">
          <view class="item" @click="answerClick(item.index)" :class="showClassName(item)" v-for="(item, ind) in question.filter(i=>i.type=== 1)" :key="ind">{{ item.index + 1 }}</view> 
        </view>
        <view class="title">多选题</view>
        <view class="answer-lists flex">
          <view class="item" @click="answerClick(item.index)" :class="showClassName(item)" v-for="(item, ind) in question.filter(i=>i.type=== 2)" :key="ind">{{ item.index + 1 }}</view>
        </view>
        <view class="title">判断题</view>
        <view class="answer-lists flex">
          <view class="item" @click="answerClick(item.index)" :class="showClassName(item)" v-for="(item, ind) in question.filter(i=>i.type=== 3)" :key="ind">{{ item.index + 1 }}</view>
        </view>
        <view class="title">简答题</view>
        <view class="answer-lists flex">
          <view class="item" @click="answerClick(item.index)" :class="showClassName(item)" v-for="(item, ind) in question.filter(i=>i.type=== 4)" :key="ind">{{ item.index + 1 }}</view>
        </view>
      </scroll-view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'course-serial-number-popup',
	props:{
    type:{
      type:Number,
      default:0,
    },
    current:{
      type:Number,
      default:0,
    },
    lastCurr:{
      type:Number,
      default:0,
    },
    rightLen:{
      type:Number,
      default:0,
    },
    wrongLen:{
      type:Number,
      default:0,
    },
    question:{
      type:Array,
      default:[]
    }
  },
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 当前题目状态
		showClassName(item) {
      if(item.userAnswer){
        if(item.answer === item.userAnswer){
          return 'right';
        }
        return 'error';
      }else if(item.mark){
        return 'current';
      }
      if(this.type === 1 && item.index < this.lastCurr){
        return 'error';
      }
		},
    answerClick(current){
      this.$emit('answerClick',current)
      this.close()
    }
	}
};
</script>

<style lang="less" src="./style.less"></style>
