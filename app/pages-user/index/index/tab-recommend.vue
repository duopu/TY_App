<!-- 首页 -->
<template>
	<scroll-view scroll-y="true" class="main-content" :scroll-top="scrollTop">
		<!-- 轮播图 -->
		<view class="swiper-content">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" interval="4000" duration="500">
				<swiper-item v-for="item in bannerList">
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
				<view class="image-left-top flex" >
					<view class="flex-column-center time-box" v-show="newArticleCreatedTime">
						<text class="text-bold text">{{newArticleCreatedTime.month}}</text>
						<text class="line"></text>
						<text class="text-bold text">{{newArticleCreatedTime.day}}</text>
					</view>
					<view class="flex-column">
						<image class="image-text" src="../../../static/images/index/index-consult-title.png" mode="widthFix"></image>
						<text class="desc">新鲜资讯随心看</text>
					</view>
				</view>
				<view class="consult-text text-ellipsis">{{newArticle.title}}</view>
			</view>
			<view class="flex-column">
				<!-- 每日任务 -->
				<image class="image-right" @click="gotoTasks" src="../../../static/images/index/index-active-03.png" mode="aspectFill"></image>
				<view class="flex-center">
					<!-- 活动推荐 -->
					<image class="flex-1 image-right-small" @click="gotoActivity" src="../../../static/images/index/index-active-01.png"
						mode="aspectFill"></image>
					<!-- 分销大使 -->
					<image class="flex-1 image-right-small" @click="gotoKcfx" src="../../../static/images/index/index-active-02.png"
						mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 大咖直播 -->
		<view class="broadcast">
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
				<view class="classify-tabs-item" v-for="(item, index) in interestList"
					@click="() => (dakaIndex = index)" :key="index" :class="{ on: index === dakaIndex }">
					{{ item.interestName }}
				</view>
				<view class="color-9 border-item" @click="gotoClassCategory">修改兴趣</view>
			</view>
			<view class="broadcast-item flex-center-between" v-if="liveData">
				<view class="broadcast-item-left">
					<view class="name">{{ liveData.title }}</view>
					<view class="desc">{{ liveData.content }}</view>
					<view class="flex-center-between broadcast-item-live">
						<text>{{ liveData.time || '--' }}</text>
						<text class="color-white" @click="gotoGoodsDetail(liveData)">购买直播</text>
					</view>
				</view>
				<image class="broadcast-item-image" :src="liveImg" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 考试题库 -->
		<view class="question-bank">
			<view class="flex-center-between index-title">
				<view class="flex-center">
					<image class="icon-image" src="../../../static/images/index/index-menu-03.png" mode="aspectFill">
					</image>
					<text class="title">考试题库</text>
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
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
							<image class="person-image" src="../../../static/images/index/live_img.png"
								mode="aspectFill"></image>
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
					<image class="icon-image" src="../../../static/images/index/index-menu-04.png" mode="aspectFill">
					</image>
					<text class="title">高薪转行</text>
				</view>
			</view>
			<scroll-view scroll-x="true" class="career-lists">
				<view class="item flex-column-center" v-for="(item, index) in ['', '', '']" :key="index">
					<view class="title text-bold">转薪秘籍</view>
					<view class="text-line">职场最全加薪秘籍</view>
					<view class="text-line">史上最牛跳槽达人</view>
					<view class="text-line">燃爆你的职场生涯</view>
					<view class="text">落户，一证多用</view>
					<button type="default" class="btn text-bold">查看详情</button>
				</view>
			</scroll-view>
		</view>
		<!-- 精品课程 -->
		<view class="course">
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
				<view v-for="(item, index) in interestList" @click="() => (jpkcIndex = index)" :key="index"
					:class="{ on: index === jpkcIndex }" class="classify-tabs-item">{{ item.interestName }}</view>
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
				newArticle:{},
				// 大咖直播 选中兴趣点
				dakaIndex: null,
				// 精品课程 选中兴趣点
				jpkcIndex: null,
				// 大咖直播数据
				liveData: null,
				// 精品课程 数据
				clsssData: null,
				// banner图
				bannerList: [],
				// 滚动条顶部位置
				scrollTop: 0
			};
		},
		mounted() {
			this.dakaIndex = 0;
			this.jpkcIndex = 0;
			this.queryBannerList();
			this.queryNewArticle();
		},
		computed: {
			...mapState([
				'interestList' // 兴趣点列表
			]),
			liveImg(){
				if(this.liveData && this.liveData.img){
					return this.liveData.img[0]
				}
			},
			newArticleCreatedTime(){
				if(this.newArticle.createdTime){
					const createdTime = dayjs(this.newArticle.createdTime);
					return {
						month:createdTime.month() + 1,
						day:createdTime.date()
					}
				}
			}
		},
		watch: {
			interestList() {
				const interest1 = this.interestList[this.dakaIndex];
				if (interest1) {
					this.queryLive(interest1.categoryId);
				}
				const interest2 = this.interestList[this.jpkcIndex];
				if (interest2) {
					this.queryClass(interest2.categoryId);
				}
			},
			dakaIndex() {
				const interest = this.interestList[this.dakaIndex];
				if (interest) {
					this.queryLive(interest.categoryId);
				}
			},
			jpkcIndex() {
				const interest = this.interestList[this.jpkcIndex];
				if (interest) { 
					this.queryClass(interest.categoryId);
				} 
			}
		},
		methods: {
			// 查询轮播图
			queryBannerList() {
				this.$http.get('/navigate/queryBannerList').then(res => {
					this.bannerList = res;
				});
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
			// 跳转大咖直播页面
			gotoLiveList() {
				uni.navigateTo({
					url:'/pages-user/index/live/payback'
				})
			},
			// 跳转分类页面
			gotoClassCategory() {
				uni.switchTab({
					url: '/pages-user/classify/index/index'
				})
			},
			// 跳转修改兴趣点
			gotoChangeInterestList() {
				uni.switchTab({
					url: '/pages-user/classify/index/index'
				});
			},
			// 跳转商品详情
			gotoGoodsDetail(liveData){
				uni.navigateTo({
					url: `/pages-user/index/goods-details/goods-details?goodsId=${liveData.goodsId}`
				});
			},
			// 查询直播
			queryLive(cateId) {
				this.$http.get('/live/queryLiveList', {
					cateIdList: [cateId]
				}).then(res => {
					if (res && res.length > 0) {
						this.liveData = res[0];
					} else {
						this.liveData = null;
					}
				});
			},
			// 查询最新资讯 
			queryNewArticle(){
				this.$http.get('/article/queryPageAll',{page:1,size:1}).then(res=>{
					this.newArticle = res.content[0];
				})
			},
			// 查询 精品课程
			queryClass(cateId) {
				this.$http.get('/course/queryList', {
					cateIdList: [cateId]
				}).then(res => {
					if (res && res.length > 0) {
						this.clsssData = res[0];
					} else {
						this.clsssData = null;
					}
				});
			},
			// 跳转资讯页面
			gotoConsult(){
				uni.navigateTo({
					url:'/pages-user/index/consult/consult'
				})
			},
			// 跳转每日任务
			gotoTasks(){
				uni.navigateTo({
					url:'/pages-user/mine/sign-in/sign-in'
				})
			},
			// 跳转活动页面
			gotoActivity(){
				uni.$emit('activity-open')
			},
			// 跳转分销大使
			gotoKcfx(){
				uni.$emit('activity-open',2)
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
