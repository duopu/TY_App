<!-- 分销大使 -->
<template>
	<view>
		<!-- 平台分销 -->
		<view class="sales-list platform">
			<view class="item">
				<view class="flex-center-between row">
					<text class="text">邀请好友注册</text>
					<button class="btn">查看详情</button>
				</view>
				<view class="flex-center-between row">
					<text class="text">邀请好友参加组团</text>
					<button class="btn">查看详情</button>
				</view>
				<view class="flex-center-between row">
					<text class="text">邀请好友参加打卡</text>
					<button class="btn">查看详情</button>
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
					@open="openPopup('distributePopup',0)">
					</sales-goods-lists-item>
					<uni-load-more :status="goodsState" 
					:icon-size="16" 
					:content-text="contentText"></uni-load-more>
				</block>
				<!-- 无数据 -->
				<block v-else>
					<view class="flex-center-center no-lists">
						您还没有商品分销任务，
						<view class="color-blue" @click="openPopup('salesPopup', 0)">点击申请</view>
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
						<button class="btn" @click="openPopup('distributePopup',1)">复制链接</button>
					</view>
					<uni-load-more :status="storeState"
					:icon-size="16" 
					:content-text="contentText"></uni-load-more>
				</block>
				<!-- 无数据 -->
				<block v-else>
					<view class="flex-center-center no-lists">
						您还没有店铺分销任务，
						<view class="color-blue" @click="openPopup('salesPopup', 1)">点击申请</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 分销申请说明弹窗 -->
		<sales-apply-popup :state="salesPopupState" ref="salesPopup"></sales-apply-popup>
		<!-- 商品分销/平台分销弹窗 -->
		<sales-distribute-popup :state="salesPopupState" ref="distributePopup"></sales-distribute-popup>
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
			salesPopupState: 0,
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
	methods: {
		// change tabs index
		changeTabsIndex(value) {
			if (value === this.tabsIndex) return;
			this.tabsIndex = value;
			this.$emit('tabChange',value);
		},
		/**
		 * 打开弹窗
		 * @param {Object} refName 弹窗ref的名称
		 * @param {Object} state 0-商品 1-分销
		 */
		openPopup(refName, state) {
			this.salesPopupState = state;
			this.$refs[refName].open();
		},
		
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
