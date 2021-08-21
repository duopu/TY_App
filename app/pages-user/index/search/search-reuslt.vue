<!-- 搜索结果 -->
<template>
	<view class="search-result">
		<custom-horizontal-tabs :data="tabsData" :currentIndex="tabsIdex" @change="getCurrentIndex"></custom-horizontal-tabs>
		<!-- 课程 -->
		<scroll-view v-if="tabsIdex === 0" class="lists" scroll-y="true">
			<course-lists-item v-for="(item,index) in ['','','','']" :key="index"></course-lists-item>
		</scroll-view>
		<!-- 机构 -->
		<scroll-view v-if="tabsIdex === 1" class="lists" scroll-y="true">
			<view class="group-lists-item">
				<image class="item-image" src="" mode="aspectFill"></image>
				<view class="item-right">
					<view class="name">店铺名称</view>
					<view class="desc">补充说明</view>
					<view class="flex-center">
						<view>店铺推荐指数</view>
						<!-- <image src="" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 老师 -->
		<scroll-view v-if="tabsIdex === 2" class="lists" scroll-y="true">
			<view class="teacher-lists-item">
				<image class="item-image" src="" mode="aspectFill"></image>
				<view class="item-right">
					<view class="name">店铺名称</view>
					<view class="desc">补充说明</view>
					<view class="flex-center">
						<view>店铺推荐指数</view>
						<!-- <image src="" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
export default {
	name:'searchResult',
	data() {
		return {
			tabsData: ['课程', '机构', '老师'],
			tabsIdex: 0
		};
	},
	methods:{
		//  tabs value
		getCurrentIndex(value){
			this.tabsIdex = value;
		}
	}
}
</script>

<style lang="less" src="./style.less"></style>
