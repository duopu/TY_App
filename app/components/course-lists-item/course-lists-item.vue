<!-- 课程列表项 -->
<template>
	<!-- 项 -->
	<view class="course-lists-item">
		<image src="../../static/images/course/demo.png" mode="aspectFill" class="item-image"></image>
		<view class="item-content">
			<view>
				<view class="name text-bold text-ellipsis">5天英语全能挑战</view>
				<view class="learn-color" v-if="state === 0">
					已学习
					<text class="learn-process">80%</text>
				</view>
			</view>
			<view class="flex-center-between">
				<view class="flex-center flex-1">
					<image src="../../static/images/course/shop.png" mode="aspectFill" class="icon-image"></image>
					<text>商家名</text>
				</view>
				<button class="btn btn-block black" v-if="state === 0">观看学习</button>
				<button class="btn btn-block black" v-else-if="state === 1">开始做题</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'course-lists-item',
	props: {
		state: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
