<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<view class="sticky-top" :class="{ 'hidden-store': hideStore }">
			<!-- 头部 -->
			<view class="flex-center-between store-top">
				<custom-search placeholder="搜索" :value="searchText" @search="onSearchInput"></custom-search>
			</view>
			<!-- 店铺信息-->
			<view class="store-message-item flex">
				<image class="avatar-image" :src="storeInfo.avatar" mode="aspectFill"></image>
				<view class="right flex-1 flex-column-between">
					<view class="item-top flex-center-between">
						<view class="flex-column flex-1">
							<view class="flex-center">
								<view class="text-bold">{{ storeInfo.storeName }}</view>
								<image class="icon-company" v-if="storeInfo.type == 2" src="../../static/images/index/company-tag.png" mode="aspectFill"></image>
							</view>
							<text class="desc">{{ storeInfo.storeDesc }}</text>
						</view>
					</view>
					<!-- 得分 -->
					<view class="rate flex-center">
						<text>综合评分</text>
						<rate :max="5" class="rate-star" :number="storeInfo.score || 5"></rate>
					</view>
				</view>
			</view>
			<!-- 菜单  推荐、全部宝贝、新品-->
			<custom-horizontal-tabs class="custom-tabs" @change="i => (t_tabIndex = i)" :data="tabsData" :currentIndex="t_tabIndex"></custom-horizontal-tabs>
			<!-- 筛选 综合排序， 云计算，筛选 -->
			<filter-tab ref="filterRef" v-show="t_tabIndex !== 0" @filterParam="onFilterParam" @hide="hideMessage"></filter-tab>
		</view>

		<!-- 列表 -->
		<scroll-view scroll-y="true" class="store-content">
			<block v-for="(item, index) in goodsList" :key="index">
				<course-lists-item :data="item" :canJump="false"></course-lists-item>
			</block>
		</scroll-view>
		<view class="sticky-bottom flex-center-between">
			<button class="btn btn-light" @click="openApp">打开App，查看更多内容</button>
		</view>
	</view>
</template>

<script>
import filterTab from './filter-tab.vue';
import config from '../../utils/config.js';

export default {
	components: {
		filterTab
	},
	data() {
		return {
			// 店铺id
			storeId: '',
			// 店铺详情
			storeInfo: {},
			// 隐藏店铺
			hideStore:false,
			// 顶部tab
			tabsData: ['推荐', '全部宝贝', '新品'],
			// 顶部tab 序号
			t_tabIndex: 0,
			// 搜索文字
			searchText: '',
			// 筛选条件
			filterParam: {},
			goodsList: [],
			linkType: undefined
		};
	},
	onLoad(option) {
		this.storeId = option.storeId;
		this.linkType = option.linkType;
		this.queryStoreInfo();
		this.queryGoodsList();
	},
	watch: {
		t_tabIndex() {
			this.queryGoodsList();
		},
		searchText() {
			this.queryGoodsList();
		},
	},
	methods: {
		// 查询店铺详情
		queryStoreInfo() {
			this.$http.get('/store/queryInfo', { storeId: this.storeId }, true).then(res => {
				this.storeInfo = res;
			});
		},
		// 搜索事件
		onSearchInput(text) {
			this.searchText = text;
		},
		// 筛选条件改变
		onFilterParam(param) {
			this.filterParam = param;
			this.queryGoodsList();
		},
		// 查询商品列表
		queryGoodsList() {
			const source = [3, 4, 1][this.t_tabIndex];
			let param = {
				source,
				page: 1,
				size: 1000,
				searchText: this.searchText,
				storeId: this.storeId
			};
			if (this.t_tabIndex !== 0) {
				param = { ...param, ...this.filterParam };
			}
			this.$http.get('/category/goods/queryPage', param, true).then(res => {
				this.goodsList = res.content;
			});
		},
		// 点击下拉弹窗，隐藏店铺信息
		hideMessage(value){
			this.hideStore = value;
		},
		/**
		 * 打开APP
		 */
		openApp(){
			let url = `${config.schema}?linkType=${this.linkType}&storeId=${this.storeId}`;
			let shareMsg = `推荐一款超赞的店铺给你：${url}`;
			this.$tool.openApp(shareMsg)
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
