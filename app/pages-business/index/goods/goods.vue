<!-- 商品 -->
<template>
	<view class="goods">
		<!-- 头部 -->
		<business-common-navigation></business-common-navigation>
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="goods-content">
			<view class="goods-item" v-for="(item,index) in goodList" :key="item.goodsId">
				<view class="item-top">
					<image class="image-goods" :src="item.thumbnail"></image>
					<view class="name text-bold">{{ item.goodsName }}</view>
					<view class="price flex-center">
						<view class="flex-center"><text class="unit">￥</text>{{item.price}}</view>
						<text class="line">~</text>
						<view class="flex-center"><text class="unit">￥</text>{{item.price}}</view>
					</view>
				</view>
				<!-- 销售数量 -->
				<view class="flex-center sales">
					<view class="sales-item flex-1">
						<image class="icons" src="../../../static/images/icons/icon-ticket.svg" mode="aspectFill"></image>
						<text class="color-9">总销量</text>
						<text>（{{item.sales}}）</text>
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
					<button class="btn btn-block grey" v-if="type === 1">
						<image src="../../../static/images/icons/icon-white-off.svg" mode="aspectFill" class="icons"></image>
						<text>立即下架</text>
					</button>
					<button class="btn btn-block red" v-if="type > 1" >
						<image src="../../../static/images/icons/icon-white-clear.svg" mode="aspectFill" class="icons"></image>
						<text>立即删除</text>
					</button>
					<button class="btn btn-block yellow" v-else-if="type === 2" >
						<image src="../../../static/images/icons/icon-white-edit.svg" mode="aspectFill" class="icons"></image>
						<text>修改价格</text>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
let page = 1, size = 10;

export default {
	data() {
		return {
			tabsData:['上架中','未上架','回收站'],
			tabsIndex:0,
			goodList: [],
			type: 1,
		};
	},
	// onLoad() {
	// 	this.queryGoodList();
	// },
	onLoad(options) {
		console.log(options);
		this.type = Number(options.type);
		this.tabsIndex = Number(options.type) - 1;
		this.queryGoodList({
			status: options.type
		});
	},
	methods:{
		//获取当前 tabs Index
		getTabsIndex(value){
			this.tabsIndex = value;
			this.queryGoodList({
				status: value+1
			});
		},
		// 获取商品列表
		queryGoodList(params){
			this.$http.get('/goods/queryPageByStoreId',{page,size,...params},true).then(res =>{
				this.goodList = page > 0 ? this.goodList.concat(res.content) : res.content;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
