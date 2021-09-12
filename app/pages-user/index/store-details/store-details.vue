<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<!-- 头部 -->
		<view class="flex-center-between store-top">
			<image @click="goBack" class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
			<custom-search v-if="b_tabIndex === 1" placeholder="搜索" :value="searchText" @search="onSearchInput"></custom-search>
		</view>
		<scroll-view scroll-y="true" class="store-content">
			<!-- 店铺信息-->
			<view class="store-message-item flex">
				<image class="avatar-image" :src="storeInfo.avatar" mode="aspectFill"></image>
				<view class="right flex-1 flex-column-between">
					<view class="item-top flex-center-between">
						<view class="flex-column flex-1">
							<view class="flex-center">
								<view class="text-bold">{{storeInfo.storeName}}</view>
								<image class="icon-company" v-if="storeInfo.type == 2" src="../../../static/images/index/company-tag.png" mode="aspectFill"></image>
							</view>
							<text class="desc">{{storeInfo.storeDesc}}</text>
						</view>
						<view class="flex-column-center save" @click="shopCollectAction">
							<image class="icon" :src="storeInfo.storeCollectionCheck == 2  ? '../../../static/images/icons/icon-save-on.svg' : '../../../static/images/icons/icon-save.svg'" mode="aspectFill"></image>
							<text class="text">{{storeInfo.storeCollectionCheck == 2 ? '已收藏' : '收藏'}}</text>
						</view>
						<view class="flex-column-center" @click="applyDistributionAction">
							<image class="icon" src="../../../static/images/icons/icon-share2.svg" mode="aspectFill"></image>
							<text class="text">申请分销</text>
						</view>
					</view>
					<!-- 得分 -->
					<view class="rate flex-center">
						<text>综合评分</text>
						<rate :max="5" class="rate-star" :number="storeInfo.score"></rate>
					</view>
				</view>
			</view>
			<!-- 菜单  推荐、全部宝贝、新品-->
			<custom-horizontal-tabs class="custom-tabs" v-if="b_tabIndex == 0" @change="i=>t_tabIndex=i" :data="tabsData" :currentIndex="t_tabIndex"></custom-horizontal-tabs>
			
			<!-- 筛选 综合排序， 云计算，筛选 -->
			<filter-tab v-if="!(t_tabIndex==0&&b_tabIndex==0)"></filter-tab>
			
			<block v-for="(item, index) in [{}, {}, {}, {}, {}, {}, {}, {}, {}]" :key="index" @itemClick="goodsItemClick(item)">
				<course-lists-item></course-lists-item>
			</block>
			
		</scroll-view>

		<!-- 底部 tabbar -->
		<bottom-tab :tabbarIndex="b_tabIndex" @tabbarIndexChange="i=>b_tabIndex=i"></bottom-tab>
	</view>
</template>

<script>
import TabStore from './tab-store.vue';
import TabGoods from './tab-goods.vue';
import bottomTab from './bottom-tab.vue';
import filterTab from './filter-tab.vue';

export default {
	components: {
		TabStore,
		TabGoods,
		bottomTab,
		filterTab
	},
	data() {
		return {
			// 店铺id
			storeId:'',
			// 店铺详情
			storeInfo:{},
			// 顶部tab 
			tabsData: ['推荐', '全部宝贝', '新品'],
			// 顶部tab 序号
			t_tabIndex:0,
			// 底部 tab 序号
			b_tabIndex: 0,
			// 搜索文字
			searchText:''
		};
	},
	onLoad(option) {
		this.storeId = option.storeId;
		this.queryStoreInfo();
		this.queryGoodsList();
	},
	watch:{
		t_tabIndex(){
			this.queryGoodsList()
		},
		b_tabIndex(){
			this.queryGoodsList()
		},
		searchText(){
			this.queryGoodsList()
		}
	},
	methods: {
		
		// 查询店铺详情
		queryStoreInfo(){
			this.$http.get('/store/queryInfoByLogin',{storeId:this.storeId},true).then(res=>{
				this.storeInfo = res;
			})
		},
		// 申请分销 事件
		applyDistributionAction(){
			this.$http.post('/distribution/storeApply',{storeId:this.storeId},true).then(res=>{
				this.$tool.showSuccess('已提交申请')
			})
		},
		// 店铺收藏 取消收藏
		shopCollectAction(){
			this.$http.post('/store/collect',{storeId:this.storeId},true).then(res=>{
				this.queryStoreInfo()
			})
		},
		// 搜索事件
		onSearchInput(text){
			this.searchText = text;
		},
		// 查询商品列表
		queryGoodsList(){
			
		},
		//  返回上一级
		goBack() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
