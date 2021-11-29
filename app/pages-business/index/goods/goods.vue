<!-- 商品 -->
<template>
	<view class="goods">
		<!-- 头部 -->
		<business-common-navigation></business-common-navigation>
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 列表 -->
<!--		<scroll-view scroll-y="true" class="goods-content">-->
<!--			<view class="goods-item" v-for="(item,index) in goodList" :key="item.goodsId">-->
<!--				<view class="item-top">-->
<!--					<image class="image-goods" :src="item.thumbnail" mode="aspectFill"></image>-->
<!--					<view class="name text-bold">{{ item.goodsName }}</view>-->
<!--					<view class="price flex-center">-->
<!--						<view class="flex-center"><text class="unit">￥</text>{{ !item.entityGoodsVO ? item.price : item.minPrice}}</view>-->
<!--						<block v-if="item.entityGoodsVO">-->
<!--							<text class="line">~</text>-->
<!--							<view class="flex-center"><text class="unit">￥</text>{{item.maxPrice}}</view>-->
<!--						</block>-->
<!--					</view>-->
<!--				</view>-->
<!--				&lt;!&ndash; 销售数量 &ndash;&gt;-->
<!--				<view class="flex-center sales">-->
<!--					<view class="sales-item flex-1">-->
<!--						<image class="icons" src="../../../static/images/icons/icon-ticket.svg" mode="aspectFill"></image>-->
<!--						<text class="color-9">总销量</text>-->
<!--						<text>（{{item.sales}}）</text>-->
<!--					</view>-->
<!--					<view class="sales-item flex-1">-->
<!--						<image class="icons" src="../../../static/images/icons/icon-ticket.svg" mode="aspectFill"></image>-->
<!--						<text class="color-9">月销量</text>-->
<!--						<text>（{{item.salesMonth}}）</text>-->
<!--					</view>-->
<!--					<view class="sales-item flex-1">-->
<!--						<image class="icons" src="../../../static/images/icons/icon-grey-message.svg" mode="aspectFill"></image>-->
<!--						<text class="color-9">评论</text>-->
<!--						<text>（{{item.commentCount}}）</text>-->
<!--					</view>-->
<!--				</view>-->
<!--				&lt;!&ndash; button &ndash;&gt;-->
<!--				<view class="item-bottom flex-center">-->
<!--					<button class="btn btn-block grey" v-if="tabsIndex < 2" @click="actionGoodItem(item)">-->
<!--						<image src="../../../static/images/icons/icon-white-off.svg" mode="aspectFill" class="icons"></image>-->
<!--						<text>立即{{tabsIndex === 1 ? '上' : '下'}}架</text>-->
<!--					</button>-->
<!--					<block v-if="tabsIndex == 1">-->
<!--						<button class="btn btn-block red"  @click="actionGoodItem(item,3)">-->
<!--							<image src="../../../static/images/icons/icon-white-clear.svg" mode="aspectFill" class="icons"></image>-->
<!--							<text>立即删除</text>-->
<!--						</button>-->
<!--						<button class="btn btn-block yellow" >-->
<!--							<image src="../../../static/images/icons/icon-white-edit.svg" mode="aspectFill" class="icons"></image>-->
<!--							<text>修改价格</text>-->
<!--						</button>-->
<!--					</block>-->
<!--				</view>-->
<!--			</view>-->
<!--		</scroll-view>-->

		<my-scroll-view ref="myScrollView" class="goods-content" @loadData="queryGoodList">
			<template v-slot:list="slotProps">
				<view class="goods-item" v-for="(item, index) in slotProps.list" :key="item.goodsId">
					<view class="item-top">
						<image class="image-goods" :src="item.thumbnail" mode="aspectFill"></image>
						<view class="name text-bold">{{ item.goodsName }}</view>
						<view class="price flex-center">
							<view class="flex-center"><text class="unit">￥</text>{{ !item.entityGoodsVO ? item.price : item.minPrice}}</view>
							<block v-if="item.entityGoodsVO">
								<text class="line">~</text>
								<view class="flex-center"><text class="unit">￥</text>{{item.maxPrice}}</view>
							</block>
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
							<text>（{{item.salesMonth}}）</text>
						</view>
						<view class="sales-item flex-1">
							<image class="icons" src="../../../static/images/icons/icon-grey-message.svg" mode="aspectFill"></image>
							<text class="color-9">评论</text>
							<text>（{{item.commentCount}}）</text>
						</view>
					</view>
					<!-- button -->
					<view class="item-bottom flex-center">
						<button class="btn btn-block grey" v-if="tabsIndex < 2" @click="actionGoodItem(item)">
							<image src="../../../static/images/icons/icon-white-off.svg" mode="aspectFill" class="icons"></image>
							<text>立即{{tabsIndex === 1 ? '上' : '下'}}架</text>
						</button>
						<block v-if="tabsIndex == 1">
							<button class="btn btn-block red"  @click="actionGoodItem(item,3)">
								<image src="../../../static/images/icons/icon-white-clear.svg" mode="aspectFill" class="icons"></image>
								<text>立即删除</text>
							</button>
							<button class="btn btn-block yellow" >
								<image src="../../../static/images/icons/icon-white-edit.svg" mode="aspectFill" class="icons"></image>
								<text>修改价格</text>
							</button>
						</block>
					</view>
				</view>
			</template>
		</my-scroll-view>
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
			priceText: '',
			apis: ['/goods/downPush','/goods/push','/goods/delete']
		};
	},
	onLoad(options) {
		console.log(options);
		console.error('==============')
		this.type = Number(options.type);
		this.tabsIndex = Number(options.type) - 1;
	},
	methods:{
		//获取当前 tabs Index
		getTabsIndex(value){
			this.tabsIndex = value;
			this.type = value + 1;
			this.$refs.myScrollView.onRefresh();
		},
		queryGoodList(pageNum = 1, pageSize, callback){
			let params = {
				status: this.type
			}
			this.$http.get('/goods/queryPageByStoreId',{page: pageNum,size: pageSize,...params},true).then(res =>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		actionGoodItem(dataItem,type){
			// 对应ais下标 0 下架 1 新增 2 删除
			console.log(this.tabsIndex,type);
			let title = type === 3 ? '删除' : (!this.tabsIndex ? '下架' : '上架');
			uni.showModal({
				title: '提示',
				content: `是否${title} ${dataItem.goodsName} 商品?`,
				success: (res) => {
					if(res.confirm){
						let url = this.apis[type == 3 ? 2 : this.tabsIndex];
						this.$http.post(url,{goodsId: dataItem.goodsId},true).then(res =>{
							this.$refs.myScrollView.onRefresh();
						})
					}
				}

			})
		}
	},
};
</script>

<style lang="less" src="./style.less"></style>
