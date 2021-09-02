<!-- 得分 -->
<template>
	<view class="result">
		<image class="image" src="../../../static/images/score.png" mode="heightFix"></image>
		<view class="flex-column-center middle">
			<text>您的得分</text>
			<view class="score">20</view>
		</view>
		<view class="btns-row">
			<button class="btn btn-border">查看错题解析</button>
			<button class="btn btn-block">查看全部解析</button>
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
