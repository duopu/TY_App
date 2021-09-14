<!-- 大咖直播 -->
<template>
	<view class="page-wrapper live">
		<!-- 商家信息 -->
		<view class="flex-center-between live-profile">
			<text class="text-bold">直播名称吧啦吧啦</text>
			<view class="flex-center">
				<image class="image-name" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<text class="font-24">商家名</text>
			</view>
		</view>
		<!-- 广告 -->
		<view class="live-advertise">
			<image class="image-advertise" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
		</view>
		
    	<!-- 目录 -->
		<scroll-view class="live-room-category" scroll-y="true">
			<!-- 列表 -->
			<view  class="lists-item" :class="index === current && 'on'" @click="collapseItem(index)" v-for="(item, index) in [{},{}]" :key="index">
				<view class="row flex-center-between">
					<text class="text-bold title">{{(index + 1)}}、{{item.courseClassName}}</text>
					<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill" />
				</view>
				<view class="collapse-content">
					<view v-if="item.nodes" class="flex collapse-item" v-for="(subItem, subIndex) in item.nodes" :key="subIndex" @click.stop="periodClick(subItem)">
						<image class="icon-video" src="../../../static/images/icons/icon-video.svg" mode="aspectFill" />
						<view class="flex-column flex-1">
							<view class="flex-center">
								<text>{{subItem.courseClassName}}</text>
								<text class="tag">上次学到</text>
							</view>
							<view class="flex-center desc">
								<text>{{subItem.learnTime || filterDate}}分钟</text>
                <block>
								  <text class="m-left-40">已学习</text>
								  <text class="color-red">{{ subItem.learnTime | filterProgress(subItem.classTime)}}%</text>
                </block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

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
