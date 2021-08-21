<!-- 搜索结果 -->
<template>
	<view class="search-result">
		<custom-horizontal-tabs :data="tabsData" :currentIndex="tabsIdex" @change="getCurrentIndex"></custom-horizontal-tabs>
		<!-- 课程 -->
		<scroll-view v-if="tabsIdex === 0" class="lists" scroll-y="true">
			<course-lists-item v-for="(item, index) in ['', '', '', '']" :key="index"></course-lists-item>
		</scroll-view>
		<!-- 机构 -->
		<scroll-view v-if="tabsIdex === 1" class="lists" scroll-y="true">
			<view class="group-lists-item" v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
				<image class="item-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
				<view class="item-right flex-column-between">
					<view class="flex-column">
						<view class="name text-ellipsis text-bold">店铺名称</view>
						<view class="desc">补充说明</view>
					</view>
					<view class="flex-center">
						<view class="color-yellow">店铺推荐指数</view>
						<image class="icon-star" :src="item < 3 ? iconStarSelect:iconStar" mode="aspectFill" v-for="item in [1, 2, 3, 4, 5]" :key="item"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 老师 -->
		<scroll-view v-if="tabsIdex === 2" class="lists" scroll-y="true">
			<view class="teacher-lists-item" v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
				<image class="item-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
				<view class="item-right flex-column-between">
					<view class="flex-column">
						<view class="name text-ellipsis text-bold">店铺名称</view>
						<view class="desc">补充说明</view>
					</view>
					<view class="flex-center color-6">
						<text class="color-yellow">30</text>
						个课程
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'searchResult',
	data() {
		return {
			tabsData: ['课程', '机构', '老师'],
			tabsIdex: 0,
			iconStar: '../../../static/images/icons/icon-star.svg',
			iconStarSelect: '../../../static/images/icons/icon-star-selected.svg'
		};
	},
	methods: {
		//  tabs value
		getCurrentIndex(value) {
			this.tabsIdex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
