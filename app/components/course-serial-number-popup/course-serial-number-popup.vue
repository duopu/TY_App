<!-- 题目序列号 弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-between">
				<view class="left flex-center">
					<!-- 对的个数 -->
					<image class="icons" mode="aspectFill" src="../../static/images/icons/icon-exam-right.svg"></image>
					<text>1</text>
					<!-- 错的个数 -->
					<image class="icons m-left-80" mode="aspectFill" src="../../static/images/icons/icon-exam-error.svg"></image>
					<text>1</text>
				</view>
				<view class="right flex-center">
					<!-- 做题的数 -->
					<image class="icons" src="../../static/images/icons/icon-tiku.svg" mode="aspectFill"></image>
					<text>1/25</text>
				</view>
			</view>
			<view class="title">单选题</view>
			<view class="answer-lists flex">
				<view class="item" :class="showClassName(item)" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8]" :key="index">{{ item }}</view>
			</view>
			<view class="title">多选题</view>
			<view class="answer-lists flex">
				<view class="item" :class="showClassName(item)" v-for="(item, index) in [9, 10, 11, 12, 13, 14, 15, 16]" :key="index">{{ item }}</view>
			</view>
			<view class="title">判断题</view>
			<view class="answer-lists flex">
				<view class="item" :class="showClassName(item)" v-for="(item, index) in [17, 18, 19, 20]" :key="index">{{ item }}</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'course-serial-number-popup',
	data() {
		return {};
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
		showClassName(index) {
			switch (index) {
				case 1:
					return 'error';
					break;
				case 2:
					return 'current';
					break;
				case 3:
					return 'right';
					break;
			}
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
