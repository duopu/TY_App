<!-- 分销大使 -->
<template>
	<view>
		<!-- 平台分销 -->
		<view class="sales-list platform">
			<view class="item">
				<view class="flex-center-between row" v-for="(item,index) in plantformDistributionList" :key="`palantform-${index}`">
					<text class="text">{{item.title}}</text>
					<button class="btn" @click="plantformOpenDetail(item.id)">查看详情</button>
				</view>
			</view>
		</view>
		<!-- 商家分销 -->
		<view class="sales-list marchant">
			<custom-horizontal-tabs :currentIndex="tabsIndex" :data="tabsData" @change="changeTabsIndex"></custom-horizontal-tabs>
			<!-- 1、商家分销 -->
			<view v-show="tabsIndex === 0">
				<block v-if="goodsList.length > 0">
					<sales-goods-lists-item v-for="(item, index) in goodsList" 
					:key="`distribution-goods-${index}`"
					:data="item"
					@openDetail="showGoodsDetail(item)" 
					@cancel="cancelGoodsApply(item)" 
					@apply="goodsApply(item)">
					</sales-goods-lists-item>
					<uni-load-more :status="goodsState" 
					:icon-size="16" 
					:content-text="contentText"></uni-load-more>
				</block>
				<!-- 无数据 -->
				<block v-else>
					<view class="flex-center-center no-lists">
						您还没有商品分销任务，
						<view class="color-blue" @click="openPopup('goodsSalesPopup')">点击申请</view>
					</view>
				</block>
			</view>
			<!-- 2、 店铺分销 -->
			<view v-show="tabsIndex === 1">
				<block v-if="storeList.length > 0">
					<view class="flex-center-between marchant-item" 
					v-for="(item, index) in storeList" 
					:key="`distribution-store-${index}`">
						<view class="flex-center">
							<image class="avatar-image" :src="item.avatar" mode="aspectFill"></image>
							<text>{{item.storeName}}</text>
						</view>
						<view class="text">
							分销折扣：
							<text class="discount">{{item.discount}}折</text>
						</view>
						<button class="btn">复制链接</button>
					</view>
					<uni-load-more :status="storeState"
					:icon-size="16" 
					:content-text="contentText"></uni-load-more>
				</block>
				<!-- 无数据 -->
				<block v-else>
					<view class="flex-center-center no-lists">
						您还没有店铺分销任务，
						<view class="color-blue" @click="openPopup('goodsSalesPopup', 1)">点击申请</view>
					</view>
				</block>
			</view>
		</view>
		
		<!-- 店铺分销申请说明弹窗 -->
		<sales-apply-popup :state="1" ref="storeSalesPopup"></sales-apply-popup>
		<!-- 商品分销申请说明弹窗 -->
		<sales-apply-popup :state="2" ref="goodsSalesPopup"></sales-apply-popup>
		<!-- 平台分销弹窗 -->
		<sales-distribute-popup :state="1" ref="plantformDistributePopup" :data="plantformDistributionDetail"></sales-distribute-popup>
		<!-- 商品分销弹窗 -->
		<sales-distribute-popup :state="2" ref="goodsDistributePopup" :data="goodsDistributionDetail"></sales-distribute-popup>
	</view>
</template>

<script>
export default {
	emits: ['tabChange'],
	props: {
		distributionGoodsList: {
			type: Array,
			default: []
		},
		distributionStoreList: {
			type: Array,
			default: []
		},
		goodsLoadMoreState: {
			type: String,
			default: 'more'
		},
		storeLoadMoreState: {
			type: String,
			default: 'more'
		}
	},
	watch: {
		distributionGoodsList(newV, oldV){
			this.goodsList = newV;
		},
		distributionStoreList(newV, oldV){
			this.storeList = newV;
		},
		goodsLoadMoreState(newV, oldV){
			this.goodsState = newV;
		},
		storeLoadMoreState(newV, oldV){
			this.storeState = newV;
		}
	},
	data() {
		return {
			tabsData: ['商品分销', '店铺分销'],
			tabsIndex: 0,
			plantformDistributionList: [], //平台分销活动列表
			plantformDistributionDetail: {}, //平台分销活动详情对象
			goodsDistributionDetail: {}, //商品分销活动对象
			goodsList: this.distributionGoodsList,
			storeList: this.distributionStoreList,
			goodsState: this.goodsLoadMoreState,
			storeState: this.storeState,
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	created() {
		this.queryPlantformDistribution();
	},
	methods: {
		// change tabs index
		changeTabsIndex(value) {
			if (value === this.tabsIndex) return;
			this.tabsIndex = value;
			this.$emit('tabChange',value);
		},
		// 查询平台分销活动列表
		queryPlantformDistribution(){
			this.$http
				.get('/platformDistribution/queryList', {}, true)
				.then(res => {
					this.plantformDistributionList = res;
				});	
		},
		/**
		 * 打开弹窗
		 * @param {Object} refName 弹窗ref的名称
		 */
		openPopup(refName) {
			this.$refs[refName].open();
		},
		
		/**
		 * 平台分销活动查看详情
		 * @param {Object} id 平台分销id
		 */
		plantformOpenDetail(id){
			this.$http
				.get('/platformDistribution/queryInfo', {id:id}, true)
				.then(res => {
					this.plantformDistributionDetail = res;
					this.openPopup('plantformDistributePopup');
				});	
		},
		
		/**
		 * 商品分销查看详情
		 * @param {Object} item  商品分销对象
		 */
		showGoodsDetail(item){
			this.$http
				.get('/distribution/queryGoodsDetail', {id:item.id}, true)
				.then(res => {
					this.goodsDistributionDetail = {
						commission: res.totalGold,
						content: res.content,
						extensionCount: res.personNum,
						title: res.title,
						id: res.id
					};
					this.openPopup('goodsDistributePopup');
				});	
		},
		
		/**
		 * 商品取消分销
		 * @param {Object} item 商品分销对象
		 */
		cancelGoodsApply(item){
		},
		
		/**
		 * 商品重新申请分销
		 * @param {Object} item 商品分销对象
		 */
		goodsApply(item){
			
		}
		
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
