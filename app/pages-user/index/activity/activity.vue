<!-- 活动 -->
<template>
	<scroll-view scroll-y="true" 
	class="main-content activity" 
	:refresher-enabled="true" 
	:refresher-triggered="triggered" 
	:refresher-threshold="45"
	@refresherrefresh="onRefresh"
	@scrolltolower="onScrollTolower">
		<!-- banner -->
		<image class="banner-image" src="../../../static/images/other/banner.jpg" mode="widthFix"></image>
		<!-- tabs -->
		<view class="flex-center tabs-block">
			<view class="item" :class="{ first: tabsIndex === 0 }" @click="changeTabsIndex(0)">组团优惠</view>
			<view class="item" :class="{ second: tabsIndex === 1 }" @click="changeTabsIndex(1)">坚持不懈</view>
			<view class="item" :class="{ three: tabsIndex === 2 }" @click="changeTabsIndex(2)">分销大使</view>
		</view>
		
		<!-- 组团优惠 -->
		<view v-show="tabsIndex === 0">
			<block v-for="(item, index) in groupBuyList" :key="`group-goods-${index}`">
				<active-group-lists-item class="activity-lists-item" :data="item"></active-group-lists-item>
			</block>
			<!-- 加载更多 -->
			<uni-load-more :status="groupBuyParams.status" :icon-size="16" :content-text="contentText"></uni-load-more>
		</view>
		
		
		
		<!-- 坚持不懈 -->
		<view v-show="tabsIndex === 1" class="insist-lists-item" v-for="(item, index) in unremittinglyList" :key="`unremittingly-${index}`">
			<view class="flex-column">
				<text>{{item.unremittinglyName}}</text>
				<text class="price">奖品：{{item.goodsName}}</text>
			</view>
			<button class="btn" v-if="item.joinFlag === 1" @click="submitUnremittingly(item.unremittinglyId)">报名活动</button>
			<button class="btn disable" v-if="item.joinFlag === 2">已报名</button>
		</view>
		
		
		<!-- 分销大使 -->
		<tabs-sales v-show="tabsIndex === 2"></tabs-sales>
	
		
		<!-- tab content 分销活动详情 弹窗 -->
		<sales-activity-popup ref="salesActivityPopup" 
		:data="currentUnremittinglyVO" 
		@submit="unremittinglySubmit"></sales-activity-popup>
	</scroll-view>
</template>

<script>
import TabsSales from './tabs-sales.vue';
export default {
	name: 'TabActivity',
	components: {
		TabsSales
	},
	data() {
		return {
			tabsIndex: 0,
			_freshing:false,
			triggered:false, //刷新标志位
			
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			
			groupBuyParams: { //组团优惠参数
				page: 1,
				size: 20,
				status: 'more' //加载更多状态
			},
			unremittinglyParams: { //坚持不懈参数
				page: 1,
				size: 20,
				status: 'more' //加载更多状态
			},
			groupBuyList: [], //组团优惠商品
			unremittinglyList: [], //坚持不懈
			currentUnremittinglyVO: {} //当前选中的坚持不懈报名产品
			
		};
	},
	computed: {},
	created() {
		this.queryGroupBuy();
		this.queryUnremittingly();
	},
	methods: {
		// change tabs index
		changeTabsIndex(value) {
			if (value === this.tabsIndex) return;
			this.tabsIndex = value;
		},
		//打开弹窗
		openPopup(refName) {
			this.$refs[refName].open();
		},
		
		/**
		 * 查询组团优惠商品
		 */
		queryGroupBuy(){
			this.$http
				.get('/groupBuy/queryPageByLogin', this.groupBuyParams, true)
				.then(res => {
					if(this.groupBuyParams.page == 1){
						this.triggered = false;
						this._freshing = false;
						this.groupBuyList = res.content;
					}else {
						this.groupBuyList = this.groupBuyList.concat(res.content);
					}
					if(res.totalSize <= this.groupBuyParams.page * this.groupBuyParams.size){
						this.groupBuyParams.status = "noMore"
					}else{
						this.groupBuyParams.status = "more"
					}
				}).catch(err => {
					if(this.groupBuyParams.page == 1){
						this.triggered = false;
						this._freshing = false;
					}else {
						this.groupBuyParams.status = "more";
						this.groupBuyParams.page -= 1;
					}
				});
		},
		
		/**
		 * 查询坚持不懈
		 */
		queryUnremittingly(){
			this.$http
				.get('/unremittingly/queryPageByLogin', this.unremittinglyParams, true)
				.then(res => {
					if(this.unremittinglyParams.page == 1){
						this.triggered = false;
						this._freshing = false;
						this.unremittinglyList = res.content;
					}else {
						this.unremittinglyList = this.unremittinglyList.concat(res.content);
					}
					if(res.totalSize <= this.unremittinglyParams.page * this.unremittinglyParams.size){
						this.unremittinglyParams.status = "noMore"
					}else{
						this.unremittinglyParams.status = "more"
					}
				}).catch(err => {
					if(this.unremittinglyParams.page == 1){
						this.triggered = false;
						this._freshing = false;
					}else {
						this.unremittinglyParams.status = "more";
						this.unremittinglyParams.page -= 1;
					}
				});
		},
		
		/**
		 * 下拉刷新
		 */
		onRefresh(){
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) this.triggered = true;
			
			if(this.tabsIndex === 0){
				this.groupBuyParams.page = 1;
				this.queryGroupBuy();
			}else if(this.tabsIndex === 1){
				this.unremittinglyParams.page = 1;
				this.queryUnremittingly();
			}else if(this.tabsIndex === 2){
				
			}
			
		},
		
		/**
		 * 上拉加载
		 */
		onScrollTolower(){
			if(this.tabsIndex === 0 && this.groupBuyParams.status !== 'noMore'){
				this.groupBuyParams.status = 'more';
				this.groupBuyParams.page += 1;
				this.queryGroupBuy();
			}else if(this.tabsIndex === 1){
				
			}else if(this.tabsIndex === 2){
				
			}
		},
		
		/**
		 * 坚持不懈报名活动按钮点击
		 * @param {Object} unremittinglyId 活动id
		 */
		submitUnremittingly(unremittinglyId){
			this.$http
				.get('/unremittingly/queryInfo', {unremittinglyId: unremittinglyId}, true)
				.then(res => {
					this.currentUnremittinglyVO = res;
					this.openPopup('salesActivityPopup');
				});
		},
		
		/**
		 * 坚持不懈立即参加点击回调
		 * @param {Object} unremittinglyVO 活动报名对象
		 */
		unremittinglySubmit(unremittinglyVO){
			
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
