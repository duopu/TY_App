<!-- tab 我的题库 -->
<template>
	<view class="bank-content">
		<!-- 列表 -->
		<my-scroll-view v-if="false" class="course-lists" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-video-item :state="1" v-for="(item, index) in slotProps.list" :key="index" :data="item" @clickItem="itemClick"></course-video-item>
			</template>
		</my-scroll-view>
		<!-- 我的题库 -->
		<scroll-view scroll-y="true" v-if="true" class="course-exam-content">
			<!-- 列表 -->
			<view class="flex bank-lists">
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-sjlx.png" mode="aspectFill"></image>
					<text>随机练习</text>
				</view>
				<view class="bank-item-middle flex-column-center text-bold">
					<text>顺序练习</text>
					<text class="font-24">0/1241</text>
				</view>
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-error.png" mode="aspectFill"></image>
					<text>我的错题</text>
				</view>
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-history.png" mode="aspectFill"></image>
					<text>做题历史</text>
				</view>
				<view class="bank-item-middle flex-column-center text-bold">
					<text>模拟考试</text>
					<text class="font-24">100%仿真</text>
				</view>
				<view class="bank-item flex-column-center">
					<image class="image" src="../../../static/images/course-collect.png" mode="aspectFill"></image>
					<text>我的收藏</text>
				</view>
			</view>
			<!-- 我的题库 -->
			<view class="flex-center-between my-bank">
				<view class="title text-bold">我的题库</view>
				<view class="flex-1">2021年教师资格证题库</view>
				<image class="arrow-right" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
			<!-- 广告位 -->
			<image class="advertise-image" src="../../../static/images/login/advert.png" mode="widthFix"></image>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'tab-question-bank',
	data() {
		return {
			
		};
	},
	onLoad() {},
	methods: {
		onLoadData(page, pageSize, callback) {
			this.$http
				.get('/questionBank/queryPageByUser', { page: page, size: pageSize }, true)
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
