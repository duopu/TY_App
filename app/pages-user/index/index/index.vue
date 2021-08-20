<!-- 首页 -->
<template>
	<view class="page-wrapper">
		<!-- 头部 -->
		<view class="top">
			<view class="flex-center-between">
				<view class="flex-center">
					<image class="image-eduction" src="../../../static/images/index/eduction-course.png" mode="aspectFill"></image>
					<text class="line"></text>
					<text class="color-yellow">slogn可换</text>
				</view>
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/icons/icon-search.svg" mode="aspectFill"></image>
					<image class="icon-image" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 横向-菜单 -->
			<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabIndex" @change="getTabIndex"></custom-horizontal-tabs>
		</view>
		<scroll-view scroll-y="true" class="content">
			<!-- 轮播图 -->
			<view class="swiper">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item><image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image></swiper-item>
					<swiper-item><image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image></swiper-item>
					<swiper-item><image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image></swiper-item>
				</swiper>
			</view>
			<!-- 分类 -->
			<view class="menus flex-center">
				<view class="menus-item flex-column-center" v-for="(item, index) in menusData" :key="index">
					<image class="icon-image" :src="item.url" mode="aspectFill"></image>
					<text class="text">{{ item.text }}</text>
				</view>
			</view>
			<!-- 最新咨询 -->
			<view class="flex-column-center consult">
				<view class="consult-item">
					<view class=""></view>
					<view class="consult-text">人工智能体系课，从入门到精通,工智能体系课</view>
				</view>
				<view class="consult-item">
					<view></view>
					<view class="flex-center">
						<view class="consult-subitem"></view>
						<view class="consult-subitem"></view>
					</view>
				</view>
			</view>
			<!-- 大咖直播 -->
			<view class="broadcast">
				<view class="flex-center-between index-title">
					<view class="flex-center">
						<image class="icon-image" src="../../../static/images/index/index-menu-02.png" mode="aspectFill"></image>
						<text class="title">大咖直播</text>
						<text class="line"></text>
						<text class="color-9">很多大咖可更换</text>
					</view>
					<view class="more flex-center">
						<text>更多</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="classify-tabs flex-center">
					<view v-for="(item, index) in ['', '', '']" :key="index" :class="{ on: index === 0 }" class="classify-tabs-item">分类一</view>
					<view class="color-9 border-item">修改兴趣</view>
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
			</view>
			<!-- 考试题库 -->
			<view class="question-bank">
				<view class="flex-center-between index-title">
					<view class="flex-center">
						<image class="icon-image" src="../../../static/images/index/index-menu-03.png" mode="aspectFill"></image>
						<text class="title">考试题库</text>
					</view>
					<view class="more flex-center">
						<text>更多</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
					</view>
				</view>
				<scroll-view scroll-x="true" class="question-bank-lists">
					<view class="lists-item" v-for="(item, index) in ['', '', '', '']" :key="index">
						<view>
							<text class="sub-title">小标题</text>
							<text class="name">2021下半年软考高级职称-45分高数直通车(重学)</text>
						</view>
						<view class="lists-item-bottom">
							<view class="flex-center">
								<image class="person-image" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
								<image class="person-image" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
								<image class="person-image" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
								<text class="color-6 font-24">.....等836人已报名</text>
							</view>
							<view class="right">
								<view class="color-9 font-20">自定义标签</view>
								<view class="price">
									<text class="price-unit">￥</text>
									<text class="price-number">500</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 高薪转行 -->
			<view class="change-career">
				<view class="flex-center-between index-title">
					<view class="flex-center">
						<image class="icon-image" src="../../../static/images/index/index-menu-04.png" mode="aspectFill"></image>
						<text class="title">高薪转行</text>
					</view>
					<view class="more flex-center">
						<text>更多</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- 精品课程 -->
			<view class="course">
				<view class="flex-center-between index-title">
					<view class="flex-center">
						<image class="icon-image" src="../../../static/images/index/index-menu-05.png" mode="aspectFill"></image>
						<text class="title">精品课程</text>
					</view>
					<view class="more flex-center">
						<text>更多</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="classify-tabs flex-center">
					<view v-for="(item, index) in ['', '', '']" :key="index" :class="{ on: index === 0 }" class="classify-tabs-item">分类一</view>
					<view class="color-9 border-item">修改兴趣</view>
				</view>
			</view>
		</scroll-view>
		<!-- 
		<uni-popup ref="popup" v-if="typesShow" type="bottom">
			<view class="types">
				<view class="title">我的兴趣</view>
				<view class="content">
					<view class="item">
						<view class="item-title">热门分类</view>
						<view class="fl aln bet item-content">
							<view class="datum" v-for="index in 8" :key="index">
								<image class="item-a" src="../../../static/images/index/avatar.jpg" mode=""></image>
								<view class="name">名称</view>
							</view>
						</view>
					</view>
				</view>

				<view class="btn" @click="close">确定</view>
			</view>
		</uni-popup>
 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 4000,
			duration: 500,
			typesShow: true,
			tabIndex: 0,
			tabsData: ['推荐', '活动', '高新转行', '认证', '提升', '好物'],
			menusData: [
				{
					text: '分类',
					url: '../../../static/images/index/index-menu-01.png'
				},
				{
					text: '大咖直播',
					url: '../../../static/images/index/index-menu-02.png'
				},
				{
					text: '考试题库',
					url: '../../../static/images/index/index-menu-03.png'
				},
				{
					text: '高薪转行',
					url: '../../../static/images/index/index-menu-04.png'
				},
				{
					text: '精品课程',
					url: '../../../static/images/index/index-menu-05.png'
				}
			]
		};
	},
	onLoad() {},
	created() {},

	methods: {
		// 横向菜单，返回值
		getTabIndex(value) {
			this.tabIndex = value;
		},
		open() {
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			this.$refs.popup.open('top');
		},
		close() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
