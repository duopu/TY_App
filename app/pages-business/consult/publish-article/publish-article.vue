<!-- 发布文章 -->
<template>
	<view class="article">
		<view class="article-top flex-center">
			<text class="color-9" @click="goBack">取消</text>
			<text class="title text-bold">发布文章</text>
			<text @click="publishArticle">发布</text>
		</view>
		<!-- 旧版本 -->
		<!-- <view class="article-content">
			<view class="flex-column text">
				<view>已跳转至</view>
				<view>https://huaban.com/search/?q=%E5%A4%8D%E5%88%B6%E7%BD%91%E5%9D%80&sort=all&category=web_app_icon</view>
			</view>
			<button class="btn-yellow">复制链接</button>
		</view> -->
		<view class="article-classify flex-center">
			<view class="text">分类</view>
			<scroll-view scroll-x="true" class="classify-lists">
				<view class="item" @click="articleCategoryId = item.articleCategoryId" :class="{'on': articleCategoryId === item.articleCategoryId }" v-for="(item, index) in classifyData" :key="index">{{ item.name }}</view>
			</scroll-view>
		</view>
		<scroll-view class="article-edit" scroll-y="true">
			<view class="box">
				<view class="flex-center">
					<text class="label">标题</text>
					<input @blur="changeCallBack" data-type="title" placeholder-class="input-placeholder" class="input" v-model="title" type="text" placeholder="请输入" />
				</view>
				<textarea @blur="changeCallBack" data-type="content" placeholder-class="input-placeholder" class="textarea" v-model="content" placeholder="请输入" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'publishArticle',
	data() {
		return {
			classifyData: [],
			articleCategoryId: '',
			title: '',
			content: '',
			activeIndex: 0
		};
	},
	onLoad(){
		this.queryClassifyData();
	},
	methods:{
		// 查询分类数据
		queryClassifyData(){
			this.$http.get('/article/queryCategoryList',null,false).then(res => {
				this.classifyData = res;
			})
		},
		changeCallBack(event){
			if( event.target.dataset.type === 'title'){
				this.title = event.detail.value;
			}else{
				this.content = event.detail.value;
			}
		},
		// 发布文章
		publishArticle(){
			let params = {
				articleCategoryId: this.articleCategoryId,
				content: this.content,
				title: this.title
			}
			this.$http.post('/article/create',params,true).then(res => {
				this.classifyData = res;
				this.$tool.showSuccess('发布成功',()=>{
					uni.navigateBack({})
				})
			})
		},
		goBack(){
			uni.navigateBack();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
