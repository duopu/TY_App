<!-- 分类 首页 -->
<template>
	<view class="page-wrapper">
		<!-- 我的兴趣 -->
		<view class="title text-bold">我的兴趣</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" 
			v-for="(item, index) in interestCategoryVOList" 
			:key="item.categoryId" 
			@click="goDetail(item.categoryId)">
				<image class="item-image" :src="item.img" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">{{item.interestName}}</text>
			</view>
			<view class="classify-lists-item" @click="onAddMore">
				<view class="item-border">+</view>
				<text class="text-bold text-ellipsis">更多</text>
			</view>
		</view>
		<!-- 热门分类 -->
		<view class="title text-bold">热门分类</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" 
			v-for="(item, index) in hotCategoryVOList" 
			:key="item.categoryId" 
			@click="goDetail(item.categoryId)">
				<image class="item-image" :src="item.img" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">{{item.categoryName}}</text>
			</view>
		</view>
		<block v-for="(item, index) in categoryVOList" :key="item.categoryId">
			<!-- 一级类目 -->
			<view class="title text-bold">{{item.categoryName}}</view>
			<view class="classify-lists block-box">
				<view class="classify-lists-item" 
				v-for="(node, nodeIndex) in item.nodes" 
				:key="node.categoryId"
				@click="goDetail(item.categoryId)">
					<image class="item-image" :src="item.img" mode="aspectFill"></image>
					<text class="text-bold text-ellipsis">{{item.categoryName}}</text>
				</view>
			</view>
		</block>

		<!-- 弹窗 -->
		<classify-category-popup ref="categoryPopup" 
			:data="{hotCategoryVOList:hotCategoryVOList,
					interestCategoryVOList:interestCategoryVOList,
					categoryVOList:categoryVOList}" 
			@submitSuccess="getAllCategory()"></classify-category-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hotCategoryVOList:[], //热门分类
			interestCategoryVOList:[], //我的兴趣分类
			categoryVOList:[] //分类
		};
	},
	onLoad() {
		this.getAllCategory();
	},
	methods:{
		
		// 获取全部分类
		getAllCategory(){
			this.$http.get('/category/queryAll',{},true).then(res=>{
				this.hotCategoryVOList = res.hotCategoryVOList || [];
				this.interestCategoryVOList = res.interestCategoryVOList || [];
				this.categoryVOList = res.categoryVOList || [];
			})
		},
		
		// 更多
		onAddMore(){
		  this.$refs.categoryPopup.open();
		},
		
		/**
		 * 跳转到分类详情
		 */
		goDetail(categoryId){
			uni.navigateTo({
				url: `/pages-user/classify/details/details?categoryId=${categoryId}`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
