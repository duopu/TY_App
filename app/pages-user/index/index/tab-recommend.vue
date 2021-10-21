<!-- 首页 -->
<template>
	<scroll-view scroll-y="true" class="main-content" :scroll-top="scrollTop">
		<!-- 轮播图 -->
		<view class="swiper-content">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" interval="4000" duration="500">
				<swiper-item v-for="item in bannerList" @click="bannerAction(item)">
					<image class="swiper-img" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="menus flex-center">
			<view class="menus-item flex-column-center" v-for="(item, index) in menusData" @click="menuClick(item)"
				:key="index">
				<image class="icon-image" :src="item.url" mode="aspectFill"></image>
				<text class="text">{{ item.text }}</text>
			</view>
		</view>
		<!-- 最新资讯 -->
		<view class="flex consult">
			<!-- 最新资讯 -->
			<view class="image-left flex-column" @click="gotoConsult">
				<view class="image-left-top flex">
					<view class="flex-column-center time-box" v-show="newArticleCreatedTime">
						<text class="text-bold text">{{newArticleCreatedTime.month}}</text>
						<text class="line"></text>
						<text class="text-bold text">{{newArticleCreatedTime.day}}</text>
					</view>
					<view class="flex-column">
						<image class="image-text" src="../../../static/images/index/index-consult-title.png"
							mode="widthFix"></image>
						<text class="desc">新鲜资讯随心看</text>
					</view>
				</view>
				<view class="consult-text text-ellipsis">{{newArticle.title}}</view>
			</view>
			<view class="flex-column">
				<!-- 每日任务 -->
				<image class="image-right" @click="gotoTasks" src="../../../static/images/index/index-active-03.png"
					mode="aspectFill"></image>
				<view class="flex-center">
					<!-- 活动推荐 -->
					<image class="flex-1 image-right-small" @click="gotoActivity"
						src="../../../static/images/index/index-active-01.png" mode="aspectFill"></image>
					<!-- 分销大使 -->
					<image class="flex-1 image-right-small" @click="gotoKcfx"
						src="../../../static/images/index/index-active-02.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 大咖直播 -->
		<view class="broadcast" v-if="showLive">
			<view class="flex-center-between index-title">
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/index/index-menu-02.png" mode="aspectFill">
					</image>
					<text class="title">大咖直播</text>
					<text class="line"></text>
					<text class="color-9">很多大咖可更换</text>
				</view>
				<view class="more flex-center" @click="gotoLiveList">
					<text>更多</text>
					<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill">
					</image>
				</view>
			</view>
			<view class="classify-tabs flex-center">
				<view class="classify-tabs-item" v-for="(item, index) in interestList">
					{{ item.interestName }}
				</view>
				<view class="color-9 border-item" @click="gotoClassCategory">修改兴趣</view>
			</view>
			<view class="broadcast-item flex-center-between" v-if="liveData">
				<view class="broadcast-item-left">
					<view class="name">{{ liveData.goodsName }}</view>
					<view class="desc">{{ liveData.courseName }}</view>
					<view class="flex-center-between broadcast-item-live">
						<text>{{ liveData.startTime || '--' }}</text>
						<text class="color-white" @click="gotoGoodsDetail(liveData)">购买直播</text>
					</view>
				</view>
				<image class="broadcast-item-image" :src="liveImg" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 考试题库 -->
		<view class="question-bank" v-if="show_question_bank">
			<view class="flex-center-between index-title">
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/index/index-menu-03.png" mode="aspectFill">
					</image>
					<text class="title">考试题库</text>
				</view>
			</view>
			<scroll-view scroll-x="true" class="question-bank-lists">
				<view class="lists-item" v-for="(item, index) in examinationBank" :key="index" @click="gotoGoodsDetail(item)">
					<view>
						<text class="sub-title">{{item.title}}</text>
						<text class="name">{{item.smallTitle}}</text>
					</view>
					<view class="lists-item-bottom">
						<view class="flex-center" >
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
							<text class="color-6 font-24" v-if="item.sales">.....已有{{item.sales}}人已报名</text>
						</view>
						<view class="right">
							<view class="color-9 font-20">{{item.tag}}</view>
							<view class="price">
								<text class="price-unit">￥</text>
								<text class="price-number">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 高薪转行 -->
		<view class="change-career" v-if="showDiverted">
			<view class="flex-center-between index-title">
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/index/index-menu-04.png" mode="aspectFill">
					</image>
					<text class="title">高薪转行</text>
				</view>
			</view>
			<scroll-view scroll-x="true" class="career-lists">
				<view class="item flex-column-center" v-for="(item, index) in divertedConfigVOList" :key="index">
					<view class="title text-bold text-ellipsis">{{item.title}}</view>
					<view class="text-line">{{item.description}}</view>
					<!-- <view class="text-line">史上最牛跳槽达人</view>
					<view class="text-line">燃爆你的职场生涯</view> -->
					<!-- <view class="text">{{item.description}}</view> -->
					<button type="default" class="btn text-bold" @click="watchDiverted(item)">查看详情</button>
				</view>
			</scroll-view>
		</view>
		<!-- 精品课程 -->
		<view class="course" v-if="showCourse">
			<view class="flex-center-between index-title">
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/index/index-menu-05.png" mode="aspectFill">
					</image>
					<text class="title">精品课程</text>
				</view>
				<view class="more flex-center" @click="gotoClassCategory">
					<text>更多</text>
					<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg" mode="aspectFill">
					</image>
				</view>
			</view>
			<view class="classify-tabs flex-center">
				<view v-for="(item, index) in interestList" :key="index"
					class="classify-tabs-item">{{ item.interestName }}</view>
				<view class="color-9 border-item" @click="gotoClassCategory">修改兴趣</view>
			</view>
			<course-lists-item :data="clsssData" v-if="clsssData">
			</course-lists-item>
		</view>
	</scroll-view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import dayjs from 'dayjs';
	import config from '../../../utils/config.js';

	export default {
		name: 'tab-recommend',
		data() {
			return {
				menusData: [{
						text: '分类',
						url: '../../../static/images/index/index-menu-01.png',
						path: 'fl'
					},
					{
						text: '大咖直播',
						url: '../../../static/images/index/index-menu-02.png',
						path: 'dkzb'
					},
					{
						text: '考试题库',
						url: '../../../static/images/index/index-menu-03.png',
						path: 'kstk'
					},
					{
						text: '高薪转行',
						url: '../../../static/images/index/index-menu-04.png',
						path: 'gxzh'
					},
					{
						text: '精品课程',
						url: '../../../static/images/index/index-menu-05.png',
						path: 'jpkc'
					}
				],
				// 最新资讯
				newArticle: {},
				// 大咖直播数据
				liveData: null,
				// 精品课程 数据
				clsssData: null,
				// banner图
				bannerList: [],
				// 滚动条顶部位置
				scrollTop: 0,
				// 考试题库
				examinationBank:[],
				// 高薪转行
				divertedConfigVOList:[],
				// 显示大咖直播
				showLive:false,
				// 显示 开始题库
				show_question_bank:false ,
				// 显示 高薪转行
				showDiverted :false,
				// 显示精品课程
				showCourse :false,
			};
		},
		mounted() {
			this.queryBannerList();
			this.queryNewArticle();
			// 查询腾云课堂自定义模块化信息（高新转行、考试题库）
			this.queryHomeConfig();
		},
		computed: {
			...mapState([
				'interestList' // 兴趣点列表
			]),
			liveImg() {
				if (this.liveData && this.liveData.img) {
					return this.liveData.img[0]
				}
			},
			newArticleCreatedTime() {
				const time = {}
				if (this.newArticle.createdTime) {
					const createdTime = dayjs(this.newArticle.createdTime);
					time.month = createdTime.month() + 1;
					time.day = createdTime.date()
				}
				return time
			}
		},
		watch:{
			interestList(){
				// 获取大咖直播数据
				this.queryLive();
				// 获取精品课程数据
				this.queryClass();
			}
		},
		methods: {
			// 查询轮播图
			queryBannerList() {
				this.$http.get('/navigate/queryBannerList',{platform:1}).then(res => {
					this.bannerList = res;
				});
			},
			// banner 点击事件
			bannerAction(banner){
				if(banner.type == 1){
					config.H5Obj = {
						title:banner.title,
						link:banner.content
					}
					uni.navigateTo({
						url:'/pages/watch-h5/watch-h5?type=link'
					})
				}else if(banner.type == 2){
					this.gotoGoodsDetail({goodsId:banner.content});
				}else if(banner.type == 3){
					uni.navigateTo({
						url:`/pages-user/index/store-details/store-details?storeId=${banner.content}`
					})
				}
			},
			// 菜单按钮点击事件
			menuClick(item) {

				if (item.path == 'fl') {
					uni.switchTab({
						url: '/pages-user/classify/index/index'
					});
				} else if (item.path == 'dkzb') {
					this.scrollTop = 360 + Math.random();
				} else if (item.path == 'kstk') {
					this.scrollTop = 600 + Math.random();
				} else if (item.path == 'gxzh') {
					this.scrollTop = 783 + Math.random();
				} else if (item.path == 'jpkc') {
					this.scrollTop = 1026 + Math.random();
				}
			},
			// 查询自定义模块化信息
			queryHomeConfig(){
				this.$http.get('/tencent/queryHomeConfig').then(res=>{
					res.forEach(config=>{
						if(config.code == 'question_bank'){  // 考试题库
							this.examinationBank = config.questionBankConfigVOList;
							this.show_question_bank = true;
						}else if (config.code == 'Diverted'){ // 高薪转行
							this.divertedConfigVOList = config.divertedConfigVOList;
							this.showDiverted = true;
						}else if (config.code == 'Live'){ // 大咖直播
							this.showLive = true;
						}else if (config.code == 'course'){ // 精品课程
							this.showCourse = true;
						}
					})
				})
			},
			// 跳转大咖直播页面
			gotoLiveList() {
				uni.navigateTo({
					url: '/pages-user/index/live/payback'
				})
			},
			// 跳转分类页面
			gotoClassCategory() {
				uni.switchTab({
					url: '/pages-user/classify/index/index'
				})
			},
			// 跳转商品详情
			gotoGoodsDetail(goodsData) {
				uni.navigateTo({
					url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsData.goodsId}`
				});
			},
			// 查询大咖直播
			queryLive() {
				this.$http.get('/live/queryLiveList', {
					cateIdList: this.interestList.map(i=>i.categoryId)
				}).then(res => {
					if (res && res.length > 0) {
						this.liveData = res[0];
					} else {
						this.liveData = null;
					}
				});
			},
			// 查询最新资讯 
			queryNewArticle() {
				this.$http.get('/article/queryPageAll', {
					page: 1,
					size: 1
				}).then(res => {
					this.newArticle = res.content[0];
				})
			},
			// 查询 精品课程
			queryClass() {
				this.$http.get('/course/queryList', {
					cateIdList:  this.interestList.map(i=>i.categoryId)
				}).then(res => {
					if (res && res.length > 0) {
						this.clsssData = res[0];
					} else {
						this.clsssData = null;
					}
				});
			},
			// 高薪转行  查看详情操作
			watchDiverted(item){
				
			},
			// 跳转资讯页面
			gotoConsult() {
				uni.navigateTo({
					url: '/pages-user/index/consult/consult'
				})
			},
			// 跳转每日任务
			gotoTasks() {
				uni.navigateTo({
					url: '/pages-user/mine/sign-in/sign-in'
				})
			},
			// 跳转活动页面
			gotoActivity() {
				uni.$emit('activity-open')
			},
			// 跳转分销大使
			gotoKcfx() {
				uni.$emit('activity-open', 2)
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
