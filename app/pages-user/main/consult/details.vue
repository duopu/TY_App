<!-- 资讯详情 -->
<template>
	<view class="consult-details">
		<view class="article-title text-bold">{{detail.title}}</view>
		<view class="flex-center-between article-desc">
			<view class="flex-center">
				<image class="avatar-image" :src="detail.avatar" mode="aspectFill"></image>
				<text>{{detail.userName}}</text>
			</view>
			<view class="flex-center">
				<image class="icon-image" src="../../../static/images/icons/icon-eye.svg" mode="aspectFill"></image>
				<text class="number font-24">{{detail.readNum}}</text>
				<text class="time font-24">{{detail.createdTime}}</text>
			</view>
		</view>
		<view class="content" v-html="detail.content"></view>
		<view class="title text-bold">相关文章</view>
		<consult-lists-item class="lists-item" 
							v-for="(item,index) in aboutList" 
							:key="item.articleId" 
							:data="item" 
							@clickItem="itemOnClick"></consult-lists-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				aboutList:[]
			};
		},
		onLoad(option) {
			// 文章已读
			this.$http.post('/article/read',{articleId:option.articleId},false);
			
			// 查询文章详情
			this.$http.get('/article/queryInfo',{articleId:option.articleId},true).then(res=>{
				this.detail = res;
			})
		},
		methods: {
			/** 列表行点击
			 * @param {Object} articleId 为文章id
			 */
			itemOnClick(articleId){
				uni.navigateTo({
					url: `/pages-user/main/consult/details?articleId=${articleId}`
				});
			}
		}
	}
</script>

<style lang="less" src="./style.less">

</style>
