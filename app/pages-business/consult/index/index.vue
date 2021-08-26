<!-- 咨询 -->
<template>
	<view class="consult">
		<!-- 头部 -->
		<view class="consult-top flex-center">
			<view class="title text-bold flex-1">资讯22</view>
			<image class="icon-edit" src="../../../static/images/icons/icon-edit.svg" mode="aspectFill"></image>
		</view>
		<!-- 菜单 -->
		<custom-horizontal-tabs @change="getTabsIndex" :currentIndex="tabsIndex" :data="tabsData"></custom-horizontal-tabs>
		<!-- 列表 -->
		<scroll-view class="consult-content" scroll-y="true">
			<block v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
				<consult-lists-item class="current-item"></consult-lists-item>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'consultIndex',
	data() {
		return {
			tabsIndex:0,
			tabsData:['推荐','最新','关注','我的'],
			dataList: []
		};
	},
	created() {
		this.queryList();
	},
	methods:{
		getTabsIndex(value){
			this.tabsIndex = value;
		},
		queryList(){
			this.$http.get('/article/queryPage',{page: this.page,size: this.size,type: this.tabsIndex }, true).then(res => {
				this.dataList = res.data;
			})
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
