<!-- 商品 -->
<template>
	<view class="goods">
		<!-- 头部 -->
		<business-common-navigation></business-common-navigation>
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="goods-content">
			<view class="goods-item" v-for="(item,index) in ['',' ','','','','']" :key="index">
				<view class="item-top">
					<image class="image-goods" src="../../../static/images/other/good_banner.png"></image>
					<view class="name text-bold">5天英语全能挑战名称可能很长可能是两行可能是两行可能是两行</view>
					<view class="price flex-center">
						<view class="flex-center"><text class="unit">￥</text>100</view>
						<text class="line">~</text>
						<view class="flex-center"><text class="unit">￥</text>100</view>
					</view>
				</view>
				<!-- 销售数量 -->
				<view class="flex-center sales">
					<view class="sales-item flex-1">
						<image class="icons" src="../../../static/images/icons/icon-ticket.svg" mode="aspectFill"></image>
						<text class="color-9">总销量</text>
						<text>（248）</text>
					</view>
					<view class="sales-item flex-1">
						<image class="icons" src="../../../static/images/icons/icon-ticket.svg" mode="aspectFill"></image>
						<text class="color-9">月销量</text>
						<text>（248）</text>
					</view>
					<view class="sales-item flex-1">
						<image class="icons" src="../../../static/images/icons/icon-grey-message.svg" mode="aspectFill"></image>
						<text class="color-9">评论</text>
						<text>（248）</text>
					</view>
				</view>
				<!-- button -->
				<view class="item-bottom flex-center">
					<button class="btn btn-block grey">
						<image src="../../../static/images/icons/icon-white-off.svg" mode="aspectFill" class="icons"></image>
						<text>立即下架</text>
					</button>
					<button class="btn btn-block red">
						<image src="../../../static/images/icons/icon-white-clear.svg" mode="aspectFill" class="icons"></image>
						<text>立即删除</text>
					</button>
					<button class="btn btn-block yellow">
						<image src="../../../static/images/icons/icon-white-edit.svg" mode="aspectFill" class="icons"></image>
						<text>修改价格</text>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData:['上架中','未上架','回收站'],
			tabsIndex:0,
			goodList: [],
			page: 1,
			size: 10,
		};
	},
	created(){

	},
	methods:{
		//获取当前 tabs Index
		getTabsIndex(value){
			this.tabsIndex = value;
		},
		// 获取商品列表
		queryGoodList(params){
			this.$http.post('/goods/queryPage',{page,size},true).then(res =>{
				this.goodList = res.data;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
