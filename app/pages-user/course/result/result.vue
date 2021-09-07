<!-- 得分 -->
<template>
	<view class="result">
		<image class="image" src="../../../static/images/score.png" mode="heightFix" />
		<view class="flex-column-center middle">
			<text>您的得分</text>
			<view class="score">{{score}}</view>
		</view>
		<view class="btns-row">
			<button class="btn btn-border" @click="goBack(1)">查看错题解析</button>
			<button class="btn btn-block" @click="goBack(2)">查看全部解析</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      questionRecordId:'',
      score:0,
    };
	},
  onLoad(option){
    const { questionRecordId,points } = option || {}
    this.questionRecordId = questionRecordId;
    this.points = points;
  },
  methods:{
    async goBack(v){
       await uni.$emit("goBack",v);
       uni.navigateBack()
    },
  }
};
</script>

<style lang="less" src="./style.less"></style>
