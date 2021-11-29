<!-- 分类 首页 -->
<template>
	<view class="page-wrapper">
		<!-- 我的兴趣 -->
		<view class="flex-center-between title text-bold">我的兴趣 <view @click="manageClick">{{canDelete ? '完成' : '管理'}}</view></view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" 
			v-for="(item, index) in interestList" 
			:key="item.categoryId" 
			@click="goDetail(item.categoryId, item.interestName)">
				<image class="icon-del" v-show="canDelete" @click.stop="deleteInterset(item.id)" src="../../../static/images/icons/icon-cha.svg"/>
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
			@click="goDetail(item.categoryId, item.categoryName)">
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
				@click="goDetail(node.categoryId, node.categoryName)">
					<image class="item-image" :src="node.img" mode="aspectFill"></image>
					<text class="text-bold text-ellipsis">{{node.categoryName}}</text>
				</view>
			</view>
		</block>

		<!-- 弹窗 -->
		<classify-category-popup ref="categoryPopup" 
			:data="{hotCategoryVOList:hotCategoryVOList,
					categoryVOList:categoryVOList}" ></classify-category-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
export default {
	data() {
		return {
			hotCategoryVOList:[], //热门分类
			categoryVOList:[], //分类
			canDelete: false //能否删除
		};
	},
	computed:{
		...mapState([
			'interestList', // 兴趣点列表
		])
	},
	onLoad() {
		this.getAllCategory();
	},
	
	onPullDownRefresh() {
		this.$store.dispatch('queryInterestList')
		this.getAllCategory();
	    setTimeout(function () {
	        uni.stopPullDownRefresh();
	    }, 500);   
	},
	 
	methods:{
		
		// 获取全部分类(热门+全平台)
		getAllCategory(){
			this.$http.get('/category/queryAll',{},true).then(res=>{
				this.hotCategoryVOList = res.hotCategoryVOList || [];
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
		goDetail(categoryId,categoryName){
			uni.navigateTo({
				url: `/pages-user/classify/details/details?categoryId=${categoryId}&categoryName=${categoryName}`
			});
		},
		
		// 管理按钮点击
		manageClick(){
			this.canDelete = !this.canDelete
		},
		
		/**
		 * 删除感兴趣的分类
		 * @param {Object} id
		 */
		deleteInterset(id){
			this.$http.post('/category/delete',{id: id},true).then(res=>{
				this.$store.dispatch('queryInterestList')
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
