<!-- 二级 店铺-推荐 -->
<template>
	<view class="recommend">
		<!-- 大咖推荐 -->
		<view class="flex-center-between recommend-title m-top-20">
			<view class="flex-center">
				<image class="icon-image" src="../../../static/images/index/index-menu-02.png" mode="aspectFill"></image>
				<text class="title text-bold">大咖直播</text>
				<text class="line"></text>
				<text class="color-9">很多大咖可更换</text>
			</view>
			<view class="more flex-center">
				<text>更多</text>
				<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right-black.svg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="broadcast-item flex-center-between">
			<view class="broadcast-item-left">
				<view class="name">最强大脑3天挑战极限记忆力</view>
				<view class="desc">世界记忆大师带你深挖记忆潜能</view>
				<view class="flex-center-between broadcast-item-live">
					<text>2021-04-21 18:00</text>
					<text class="color-white">预约直播</text>
				</view>
			</view>
			<image class="broadcast-item-image" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
		</view>
		<!-- 精品课程 -->
		<view class="flex-center-between recommend-title" id="s">
			<view class="flex-center">
				<image class="icon-image" src="../../../static/images/index/index-menu-05.png" mode="aspectFill"></image>
				<text class="title text-bold">精品课程</text>
			</view>
			<view class="more flex-center"><image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right-black.svg" mode="aspectFill"></image></view>
		</view>
		<block v-for="(item, index) in [{}, {}, {}, {}, {}]" :key="index"><course-lists-item></course-lists-item></block>
	</view>
</template>

<script>
export default {
	name: 'tab-store-recommend',
	data() {
		return {};
	},
	onLoad() {
		setTimeout(() => {
			uni.pageScrollTo({
				selector: '#s'
			});
		}, 1000);
	}
};
</script>

<style lang="less" src="./style.less"></style>
