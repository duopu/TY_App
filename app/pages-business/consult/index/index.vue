<!-- 咨询 -->
<template>
	<view class="consult">
		<!-- 头部 -->
		<view class="consult-top flex-center">
			<view class="title text-bold flex-1">资讯</view>
			<image @click="addConsult" class="icon-edit" src="../../../static/images/icons/icon-edit.svg" mode="aspectFill"></image>
		</view>
		<!-- 菜单 -->
		<custom-horizontal-tabs @change="getTabsIndex" :currentIndex="tabsIndex" :data="tabsData"></custom-horizontal-tabs>
		<!-- 列表 -->
		<my-scroll-view ref="myScrollView" class="consult-content" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<consult-lists-item v-for="(item, index) in slotProps.list" :data="item" class="current-item" :key="index"></consult-lists-item>
			</template>
		</my-scroll-view>
		<!-- <scroll-view class="consult-content" scroll-y="true">
			<block v-for="(item, index) in dataList" :key="index">
				<consult-lists-item :data="item" class="current-item"></consult-lists-item>
			</block>
		</scroll-view> -->
	</view>
</template>

<script>
export default {
	name: 'consultIndex',
	data() {
		return {
			tabsIndex:0,
			tabsData:['热门','最新','我的'],
			dataList: [],
			page: 1,
			size: 20
		};
	},
	created() {
	},
	methods:{
		getTabsIndex(value){
			this.tabsIndex = value;
			this.$refs.myScrollView.onRefresh();
		},
		onLoadData(pageNum = 1, pageSize, callback){
			this.$http.get('/article/queryPageByType',{
				page: pageNum,
				size: pageSize,
				type: this.tabsIndex + 1 
				}, true
			).then(res => {
				console.log(res,'22');
				callback(res);
				// this.dataList = res.content;
			}).catch( err => {
				callback(null);
			})
		},
		addConsult(){
			// 发布文章
			uni.navigateTo({
				url:`/pages-business/consult/publish-article/publish-article`
			})
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
