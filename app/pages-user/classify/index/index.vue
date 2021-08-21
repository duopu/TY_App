<!-- 分类 首页 -->
<template>
	<view class="page-wrapper">
		<!-- 我的兴趣 -->
		<view class="title text-bold">我的兴趣</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" v-for="(item, index) in interestCategoryVOList" :key="item.categoryId">
				<image class="item-image" :src="item.img" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">{{item.categoryName}}</text>
			</view>
			<view class="classify-lists-item" @click="onAddMore">
				<view class="item-border">+</view>
				<text class="text-bold text-ellipsis">更多</text>
			</view>
		</view>
		<!-- 热门分类 -->
		<view class="title text-bold">热门分类</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" v-for="(item, index) in hotCategoryVOList" :key="item.categoryId">
				<image class="item-image" :src="item.img" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">{{item.categoryName}}</text>
			</view>
		</view>
		<block v-for="(item, index) in categoryVOList" :key="item.categoryId">
			<!-- 一级类目 -->
			<view class="title text-bold">{{item.categoryName}}</view>
			<view class="classify-lists block-box">
				<view class="classify-lists-item" v-for="(node, nodeIndex) in item.nodes" :key="node.categoryId">
					<image class="item-image" :src="item.img" mode="aspectFill"></image>
					<text class="text-bold text-ellipsis">{{item.categoryName}}</text>
				</view>
			</view>
		</block>


		<!-- slot -->
		<view class="slot-item"></view>
		<!-- 弹窗 -->
		<classify-category-popup ref="categoryPopup"></classify-category-popup>
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

		// 获取全部分类
		this.$http.get('/category/queryAll',{},true).then(res=>{
			this.hotCategoryVOList = res.hotCategoryVOList;
			this.interestCategoryVOList = res.interestCategoryVOList;
			this.categoryVOList = res.categoryVOList;
		})
	},
  methods:{
    // 更多
    onAddMore(){
      this.$refs.categoryPopup.open();
    }
  }
};
</script>

<style lang="less" src="./style.less"></style>
