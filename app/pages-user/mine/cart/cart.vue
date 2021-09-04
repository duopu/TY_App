<!-- 购物车 -->
<template>
	<view class="cart">
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="cart-content" @scrolltolower="onScrollTolower">
			<!-- 列表 -->
			<view class="lists-item" v-for="(item, index) in carList" :key="`store-goods-${index}`">
				<view class="flex-center top">
					<view class="radio" :class="{ on: selectIndexs[index].isSelect}" @click="chooseStore(item, index)"></view>
					<view class="shop-name">{{item.storeName}}</view>
				</view>
				<!-- 多个商品 -->
				<view class="content flex" v-for="(subItem, subIndex) in item.shoppingCartItemVOList" :key="`goods-${subIndex}`">
					<!-- 选中效果 -->
					<view class="radio" :class="{ on: selectIndexs[index].children[subIndex] }" @click.stop="chooseGoods(subItem, subIndex, index)"></view>
					<image class="avatar-image" :src="subItem.thumbnail" mode="aspectFill" @click="jumpGoodsDetail(subItem.goodsId)"></image>
					<view class="flex-column flex-1 right">
						<view class="flex-between">
							<view  class="name">{{subItem.goodsName}}</view>
							<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill" @click.stop="deleteGoods(subItem.goodsId)"></image>
						</view>
						<view class="tag"><view v-if="subItem.attributesId" class="tag-item">{{subItem.attributeName}}</view></view>
						<view class="flex-center-between">
							<view class="price">
								<text class="unit">¥</text>
								{{subItem.price}}
							</view>
							<uni-number-box :min="1" class="com-nunmber-box" :value="subItem.goodsNum" @change="(value)=>{goodsNumberChange(value, subItem.goodsId)}"></uni-number-box>
						</view>
					</view>
				</view>
			</view>

			<!-- 猜你喜欢 -->
			<view class="title text-bold">猜你喜欢</view>
			<view class="favorite-lists">
				<view class="item" v-for="(item, index) in guessYouLikeList" :key="`guess-goods-${index}`">
					<image class="image" :src="item.thumbnail" mode="aspectFill"></image>
					<view class="text text-bold">{{ spliceStr(item.goodsName) }}</view>
					<view class="price text-bold">
						<text class="unit">￥</text>
						<text>{{item.price}}</text>
					</view>
				</view>
			</view>
			<!-- 占位符 -->
			<view class="slot-item"></view>
			
			<!-- 加载更多 -->
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText"></uni-load-more>
		</scroll-view>
		<!-- 底部 -->
		<view class="cart-bottom flex-center-between">
			<view class="flex-center">
				<view class="radio on"></view>
				<text>全选</text>
			</view>
			<view class="right flex-center">
				<text class="color-6">合计：</text>
				<text class="price">￥124.0</text>
				<button class="btn">结算(2)</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			size: 20,
			status: 'more', //加载更多状态
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			guessYouLikeList:[], //猜你喜欢商品
			carList:[], //购物车
			selectIndexs:[] //购物车选中的索引 //{isSelect:true,children:[true, false, false]}
		};
	},
	onLoad() {
		this.queryShoppintCar();
		this.queryGuessYouLike();
	},
	onShow() {
		this.queryShoppintCar();
	},
	methods: {
		// 截取字符串
		spliceStr(value) {
			return value.length < 18 ? value : `${value.substring(0, 18)}...`;
		},
		
		onScrollTolower(){
			if(this.status !== 'noMore'){
				this.status = 'more';
				this.page += 1;
				this.queryGuessYouLike();
			}
		},
		
		/**
		 * 查询购物车
		 */
		queryShoppintCar(){
			this.$http
				.get('/shopping/cart/queryDetail', {}, true)
				.then(res => {
					this.carList = res || [];
					for(var i=0; i< this.carList.length; i++){
						let children = [];
						for(var j=0; j< this.carList[i].shoppingCartItemVOList.length; j++){
							children.push(false);
						}
						this.selectIndexs[i]={
							isSelect: false,
							children:children
						};
					}
				});
		},
		
		/**
		 * 猜你喜欢
		 */
		queryGuessYouLike(){
			this.$http
				.get('/goods/queryGuessLike', {page:this.page, size:this.size}, true)
				.then(res => {
					if(this.page === 1){
						this.guessYouLikeList = res.content;
					}else {
						this.guessYouLikeList = this.guessYouLikeList.concat(res.content);
					}
					
					if(res.totalSize <= this.page * this.size){
						this.status = "noMore"
					}else{
						this.status = "more"
					}
				}).catch(err => {
					if(this.page > 1){
						this.status = "more";
						this.page -= 1;
					}
				});
		},
		
		/**
		 * 删除购物车中的商品
		 * @param {Object} goodId 商品ID
		 */
		deleteGoods(goodId){
			this.$http
				.post('/shopping/cart/deleteBatch', {shoppingCartId:[goodId]}, true)
				.then(res => {
					this.queryShoppintCar();
				});
		},
		
		/**
		 * 商家单选按钮点击
		 * @param {Object} item 商家信息
		 * @param {Object} index 索引
		 */
		chooseStore(item, index){
			let isSelect = !this.selectIndexs[index].isSelect;
			this.selectIndexs[index].isSelect = isSelect;
			// 让商家下面所有的商品也都选中或者取消选中
			this.selectIndexs[index].children = this.selectIndexs[index].children.map(function(value){
				return isSelect
			});
		},
		
		/**
		 * 商品单选按钮点击
		 * @param {Object} item 商品信息
		 * @param {Object} index 商品索引
		 * @param {Object} parentIndex 商品所属商家索引
		 */
		chooseGoods(item, index, parentIndex){
			this.selectIndexs[parentIndex].children[index] = !this.selectIndexs[parentIndex].children[index];
			// 如果所有商品都选中或者未选中，则让商家的单选按钮也选中或者未选中
			if(new Set(this.selectIndexs[parentIndex].children).size === 1){
				this.selectIndexs[parentIndex].isSelect = this.selectIndexs[parentIndex].children[0];
			}
			this.$forceUpdate();
		},
		
		/**
		 * 跳转到商品详情页
		 * @param {Object} goodsId 商品ID
		 */
		jumpGoodsDetail(goodsId){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
			});
		},
		
		goodsNumberChange(value, goodsId){
			
			// this.$http
			// 	.post('/shopping/cart/modify', {goodsNum:value,shoppingCartId: goodsId}, true)
			// 	.then(res => {
			// 		this.queryShoppintCar();
			// 	});
		}
		
		
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
