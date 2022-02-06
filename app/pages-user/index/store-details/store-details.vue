<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<view class="sticky-top" :class="{ 'hidden-store': hideStore }">
			<!-- 头部 -->
			<view class="flex-center-between store-top">
				<image @click="goBack" class="icon-back" src="../../../static/images/icons/icon-back.svg"
					mode="aspectFill"></image>
				<custom-search placeholder="搜索" :value="searchText" @search="onSearchInput"></custom-search>
				<image @click="shareClick" class="icon-share" src="../../../static/images/icons/icon-share-right.svg"
					mode="aspectFill"></image>
			</view>
			<!-- 店铺信息-->
			<view class="store-message-item flex">
				<image class="avatar-image" :src="storeInfo.avatar" mode="aspectFill"></image>
				<view class="right flex-1 flex-column-between">
					<view class="item-top flex-center-between">
						<view class="flex-column flex-1">
							<view class="flex-center">
								<view class="text-bold">{{ storeInfo.storeName }}</view>
								<image class="icon-company" v-if="storeInfo.type == 2"
									src="../../../static/images/index/company-tag.png" mode="aspectFill"></image>
							</view>
							<text class="desc">{{ storeInfo.storeDesc }}</text>
						</view>
						<view class="flex-column-center save" @click="shopCollectAction">
							<image class="icon"
								:src="storeInfo.storeCollectionCheck == 2 ? '../../../static/images/icons/icon-save-on.svg' : '../../../static/images/icons/icon-save.svg'"
								mode="aspectFill"></image>
							<text class="text">{{ storeInfo.storeCollectionCheck == 2 ? '已收藏' : '收藏' }}</text>
						</view>
						<view class="flex-column-center" @click="applyDistributionAction">
							<image class="icon" src="../../../static/images/icons/icon-share2.svg" mode="aspectFill">
							</image>
							<text class="text">申请分销</text>
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
			<custom-horizontal-tabs class="custom-tabs" @change="i => (t_tabIndex = i)" :data="tabsData"
				:currentIndex="t_tabIndex" v-if="tabsIndex == 0"></custom-horizontal-tabs>
			<!-- 筛选 综合排序， 云计算，筛选 -->
			<filter-tab ref="filterRef" v-show="t_tabIndex !== 0 || tabsIndex == 1" @filterParam="onFilterParam" @hide="hideMessage">
			</filter-tab>
		</view>

		<!-- 列表 -->
		<scroll-view scroll-y="true" class="store-content">
			<block v-for="(item, index) in goodsList" :key="index" @itemClick="goodsItemClick(item)">
				<course-lists-item :data="item"></course-lists-item>
			</block>
		</scroll-view>

		<!-- 底部 tabbar -->
		<view class="store-bottom flex-center">
			<view class="item flex flex-column-center" v-for="(item, index) in tabbarData" :key="index"
				@click="changeTabsContent(index)">
				<image class="image" :src="tabsIndex === index ? item.iconSelectPath : item.iconPath" mode="aspectFill">
				</image>
				<text :class="{ on: tabsIndex === index }">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import filterTab from './filter-tab.vue';
	import config from '../../../utils/config.js';
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
				hideStore: false,
				// 顶部tab
				tabsData: ['推荐', '全部宝贝', '新品'],
				// 顶部tab 序号
				t_tabIndex: 0,
				// 搜索文字
				searchText: '',
				// 筛选条件
				filterParam: {},
				goodsList: [],
				tabsIndex: 0,
				tabbarData: [{
						iconPath: '../../../static/images/tabbars/store-tabbar-store.png',
						iconSelectPath: '../../../static/images/tabbars/store-tabbar-store-select.png',
						text: '店铺'
					},
					{
						iconPath: '../../../static/images/tabbars/store-tabbar-goods.png',
						iconSelectPath: '../../../static/images/tabbars/store-tabbar-goods-select.png',
						text: '商品'
					},
					{
						iconPath: '../../../static/images/tabbars/store-tabbar-kf.png',
						iconSelectPath: '',
						text: '客服'
					}
				]
			};
		},
		onLoad(option) {
			this.storeId = option.storeId;
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
				this.$http.get('/store/queryInfoByLogin', {
					storeId: this.storeId
				}, true).then(res => {
					this.storeInfo = res;
				});
			},
			// 申请分销 事件
			applyDistributionAction() {
				this.$http.post('/distribution/storeApply', {
					storeId: this.storeId
				}).then(res => {
					this.$tool.showSuccess('已提交申请');
				}).catch(res => {
					uni.switchTab({
						url: '/pages-user/index/index/index'
					})
					uni.$emit('activity-open', 2) // 先切换到分销大使
					uni.$emit('sales-open', 1) // 再切换到店铺分销
				});
			},
			// 店铺收藏 取消收藏
			shopCollectAction() {
				this.$http.post('/store/collect', {
					storeId: this.storeId
				}, true).then(res => {
					this.queryStoreInfo();
				});
			},
			/**
			 * 切换content
			 * 点击客服进行跳转
			 * */
			changeTabsContent(index) {
				if (index < 2) {
					this.tabsIndex = index;
					this.queryGoodsList();
				}else{
					// 跳转客服
					this.$http.get('/im/getIMGroupId',{storeId:this.storeInfo.storeId},true).then(res=>{
						const groupId = res.groupId;
						const user = getApp().globalData.user;
						getApp().globalData.messageParam = {
							groupId:groupId,
							userIM:user.imNum,
							userName:user.userName,
							storeName:this.storeInfo.storeName,
							storePortrait:this.storeInfo.avatar 
						}
						uni.navigateTo({
							url:'/pages/im-message/im-message'
						})
					})
				}
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
				let source = 4;
				if(this.tabsIndex == 0){
					source = [3, 4, 1][this.t_tabIndex];
				}else{
					source = 4
				}
				let param = {
					source,
					page: 1,
					size: 1000,
					searchText: this.searchText,
					storeId: this.storeId
				};
				if (this.t_tabIndex !== 0) {
					param = {
						...param,
						...this.filterParam
					};
				}
				this.$http.get('/category/goods/queryPage', param, true).then(res => {
					this.goodsList = res.content;
				});
			},
			//  返回上一级
			goBack() {
				uni.navigateBack({});
			},
			// 点击下拉弹窗，隐藏店铺信息
			hideMessage(value) {
				this.hideStore = value;
				console.log(this.hideStore)
			},
			//TODO: 分享按钮点击
			shareClick() {
				const linkType = config.linkType.storeShare;
				const url = `${config.urlLink.shareShopDetailUrl}?linkType=${linkType}&storeId=${this.storeId}`;
				const shareMsg = `推荐一家超赞的店铺给你：${url}`;
				uni.setClipboardData({
					data: shareMsg,
					success: () => {
						uni.hideToast(); //这里去掉系统级粘贴成功的弹窗效果
						this.$tool.showToast('链接已复制到剪贴板，快分享给小伙伴吧');
					}
				});
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
