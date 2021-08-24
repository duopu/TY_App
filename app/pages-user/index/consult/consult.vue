<!-- 最新资讯 -->
<template>
	<view class="page-wrapper consult">
		<!-- 菜单 -->
		<scroll-view scroll-x="true" class="consult-top">
			<view class="item" :class="{'on':currentCategoryId === item.articleCategoryId}" v-for="(item,index) in categoryList" :key="item.id" @click="changeTabs(item.articleCategoryId)">{{item.name}}</view>
		</scroll-view>
		<!-- 列表 -->
		<view class="consult-lists">
			<consult-lists-item v-for="(item,index) in articleList"
								:key="item.id"
								:data="item"
								@clickItem="itemOnClick"></consult-lists-item>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCategoryId: undefined,
				categoryList: [],
				articleList: [],
				page: 1,
				pageSize: 20,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		onLoad() {
			this.getCategoryList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getArticelList();
		},
		onReachBottom() {
			this.status = 'more';
			this.page += 1;
			this.getArticelList();
		},
		methods:{
			
			/** 顶部类型切换
			 * @param {Object} categoryId 资讯类型ID
			 */
			changeTabs(categoryId){
				this.currentCategoryId = categoryId;
				this.getArticelList();
			},
			
			/**
			 * 获取资讯分类
			 */
			getCategoryList() {
				this.$http.get('/article/queryCategoryList',{},true).then(res=>{
					this.categoryList = res;
					if(res.length > 0 ){
						this.currentCategoryId = res[0].articleCategoryId;
						this.getArticelList(this.currentCategoryId);
					}
					
				})
			},
			
			/** 
			 * 获取文章列表
			 */
			getArticelList(){
				
				if(this.page > 1){
					this.status = "loading";
				}

				this.$http.get('/article/queryPage',{articleCategoryId:this.currentCategoryId, page:this.page, size:this.pageSize},true).then(res=>{
					
					if(this.page == 1){
						uni.stopPullDownRefresh();
						this.articleList = res.content;
					}else {
						this.articleList = this.articleList.concat(res.content);
					}
					
					if(res.totalSize <= this.page * this.pageSize){
						this.status = "noMore"
					}else{
						this.status = "more"
					}
				}).catch( err => {
					if(this.page == 1){
						uni.stopPullDownRefresh();
					}else {
						this.status = "more";
						this.page -= 1;
					}
				})
			},
			
			/** 列表行点击
			 * @param {Object} articleId 为文章id
			 */
			itemOnClick(articleId){
				uni.navigateTo({
					url: `/pages-user/index/consult/details?articleId=${articleId}`
				});
			}
		}
	}
</script>

<style src="./style.less" lang="less"></style> 
