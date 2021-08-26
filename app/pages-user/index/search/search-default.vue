<!-- 搜索的默认列表 -->
<template>
	<scroll-view scroll-y="true" class="search-content">
		<!-- 历史搜索 -->
    <view class="flex-center-between">
      <view class="title text-bold">历史搜索</view>
	  <!-- 删除历史记录 新增 -->
	  <image class="icon-delete" src="../../../static/images/icons/icon-colorful-delete.svg"></image>
    </view>

		<view class="history-lists">
			<view class="item"
			v-for="(item,index) in historyList"
			:key="`history-list-${index}`"
			@click="tagClick(item.name,0)">{{item.name}}</view>
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
				@click="tagClick(item.name,0)">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">{{item.classNum}}</text>
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
				@click="tagClick(item.name,1)">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">{{item.storeName}}</text>
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
				@click="tagClick(item.name,2)">
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
