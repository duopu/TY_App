<!-- 搜索的默认列表 -->
<template>
	<scroll-view scroll-y="true" class="search-content">
		<!-- 历史搜索 -->
    <view v-if="historyList.length > 0" class="flex-center-between">
      <view class="title text-bold">历史搜索</view>
	  <!-- 删除历史记录 新增 -->
	  <image class="icon-delete" src="../../../static/images/icons/icon-colorful-delete.svg" @click="deleteHistroySearch()"></image>
    </view>

		<view class="history-lists">
			<view class="item"
			v-for="(item,index) in historyList"
			:key="`history-list-${index}`"
			@click="tagClick(item,0)">{{item.name}}</view>
		</view>
		<!-- 热门搜索 -->
		<view class="title text-bold">热门搜索</view>
		<view class="history-lists">
			<view class="item"
			v-for="(item,index) in topList"
			:key="`top-list-${index}`"
			@click="tagClick(item.name,0)">{{item.name}}</view>
		</view>
		<!--热门课程/热搜机构/优秀教师 -->
		<scroll-view scroll-x="true" class="hot-lists">
			<!-- 热门课程 -->
			<view class="lists-item yellow">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot1.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotkc.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row"
				v-for="(item, index) in courseVOList"
				:key="`course-list-${index}`"
				@click="jumpGoodsInfo(item.goodsId)">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">{{item.courseName}}</text>
				</view>
			</view>
			<!-- 热搜机构 -->
			<view class="lists-item blue">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot2.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotjg.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row"
				v-for="(item, index) in storeVOList"
				:key="`store-list-${index}`"
				@click="jumpStoreInfo(item.storeId)">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">{{item.storeName || item.companyName}}</text>
				</view>
			</view>
			<!-- 优秀教师 -->
			<view class="lists-item red">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot3.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotjs.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row"
				v-for="(item, index) in teacherVOList"
				:key="`teacher-list-${index}`"
				@click="jumpTeacherInfo(item.teacherId)">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">{{item.name}}</text>
				</view>
			</view>
		</scroll-view>
	</scroll-view>
</template>

<script>
export default {
	name: 'searchDefault',
	emits:['tagClick'],
	data() {
		return {
			historyList:this.$store.state.historySearchList, //历史搜索
			topList:[], //热门搜索
			courseVOList:[], //热门课程
			storeVOList:[], //热搜机构
			teacherVOList:[] //优秀教师
		};
	},
	created() {
		this.loadTopList();
		this.loadHotTop();
	},
	watch: {
		"$store.state.historySearchList": {
			handler:function(newVal,oldVal){
				this.historyList = newVal
			}
		}
	},
	methods: {
		/**
		 * 查询热门搜索
		 */
		loadTopList(){
			this.$http.get('/search/queryTopList',{},true).then(res=>{
				this.topList = res;
			})
		},

		/**
		 * 查询热门课程、热搜机构、优秀教师
		 */
		loadHotTop(){
			this.$http.get('/goods/queryHotTop',{},true).then(res=>{
				this.courseVOList = res.courseVOList;
				this.storeVOList = res.storeVOList;
				this.teacherVOList = res.teacherVOList;
			})
		},

		/** 标签被点击
		 * @param {Object} value
		 * @param {Object} tabType
		 */
		tagClick(value, tabType){
			this.$emit('tagClick',{search:value, tabType: tabType})
		},
		
		/**
		 * 删除历史搜索记录
		 */
		deleteHistroySearch(){
			this.$store.commit("deleteHistorySearch");
		},
		
		/**
		 * 跳转到商品详情页
		 * @param {Object} goodsId 商品ID
		 */
		jumpGoodsInfo(goodsId){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
			});
		},
		
		/**
		 * 跳转到店铺详情页
		 * @param {Object} storeId 店铺ID
		 */
		jumpStoreInfo(storeId){
			uni.navigateTo({
				url:`/pages-user/index/store-details/store-details?storeId=${storeId}`
			})
		},
		
		/**
		 * 跳转到老师详情页
		 * @param {Object} teacherId 老师ID
		 */
		jumpTeacherInfo(teacherId){
			uni.navigateTo({
				url: `/pages-user/index/teacher/teacher?teacherId=${teacherId}`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
