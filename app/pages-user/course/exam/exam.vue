<!-- 考试/模拟练习 -->
<template>
	<view class="exam">
		<!-- 头部 -->
		<view class="exam-top flex-center-between">
			<image class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
			<!-- 随机练习或者模拟考试 -->
			<text>随机练习</text>
			<view class="right flex-center">
				<image class="icons" src="../../../static/images/icons/icon-circle-wenhao.svg" mode="aspectFill"></image>
				<!-- 未收藏 -->
				<image v-if="false" class="icons" src="../../../static/images/icons/icon-star-black.svg" mode="aspectFill"></image>
				<!-- 已收藏 -->
				<image v-if="true" class="icons" src="../../../static/images/icons/icon-star-save.svg" mode="aspectFill"></image>
				<!-- 模拟考试 -->
				<button class="btn">交卷</button>
			</view>
		</view>
		<!-- 内容 -->
		<scroll-view class="exam-content">
			<!-- 考试题目 -->
			<view class="exam-item">
				<view class="flex-name">
					<text>6、</text>
					<view>【多选题】提纲体感吧啦吧啦嗲就能懂啊</view>
				</view>
				
				<view class="select-row flex">
					<view class="radio"></view>
					<view>A、选项1度爱肌肤那就店铺名</view>
				</view>
				<view class="select-row flex">
					<view class="radio on"></view>
					<view>B、选项1度爱肌肤那就店铺名</view>
				</view>
				<view class="select-row flex">
					<view class="checkbox right"></view>
					<view>C、选项1度爱肌肤那就店铺名</view>
				</view>
				<view class="select-row flex">
					<view class="checkbox on"></view>
					<view>D、选项1度爱肌肤那就店铺名</view>
				</view>
			</view>
			<!-- 确定按钮 -->
			<button class="btn">确定</button>
			<!-- 解析 -->
			<view class="exam-analysis">
				<view class="flex-center analysis-answer">
					<view class="flex-1">正确答案：C、D</view>
					<view class="flex-1 color-9">考生答案：A、B</view>
				</view>
				<view class="title">解析：</view>
				<view class="analysis-content">集团秉承“人文、温暖、有趣”的产品哲学，依托住宿（酒店、公寓）产业，从经营房间到经营空间再到经营人群，致力于打造新中产品质生活。</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="exam-bottom flex-center-between">
			<view class="left flex-center">
				<!-- 对的个数 -->
				<image class="icons" mode="aspectFill" src="../../../static/images/icons/icon-exam-right.svg"></image>
				<text>1</text>
				<!-- 错的个数 -->
				<image class="icons m-left-80" mode="aspectFill" src="../../../static/images/icons/icon-exam-error.svg"></image>
				<text>1</text>
			</view>
			<view class="right flex-center">
				<!-- 做题的数 -->
				<image class="icons" src="../../../static/images/icons/icon-tiku.svg" mode="aspectFill"></image>
				<text>1/25</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
