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
							<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill" @click.stop="deleteGoods(subItem.id)"></image>
						</view>
						<view class="tag"><view v-if="subItem.attributesId" class="tag-item">{{subItem.attributeName}}</view></view>
						<view class="flex-center-between">
							<view class="price">
								<text class="unit">¥</text>
								{{subItem.price}}
							</view>
							<uni-number-box :min="1" class="com-nunmber-box" :value="subItem.goodsNum" @change="(value)=>{goodsNumberChange(value, subItem.id)}"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
			
			<my-empty :show="carList.length === 0"></my-empty>

			<!-- 猜你喜欢 -->
			<view class="title text-bold">猜你喜欢</view>
			<view class="favorite-lists">
				<view class="item" v-for="(item, index) in guessYouLikeList" :key="`guess-goods-${index}`" @click="jumpGoodsDetail(item.goodsId)">
					<image class="image" :src="item.thumbnail" mode="aspectFill"></image>
					<view class="text text-bold">{{ spliceStr(item.goodsName) }}</view>
					<view class="price text-bold">
						<text class="unit">￥</text>
						<text>{{item.minPrice || item.price}}</text>
					</view>
				</view>
			</view>
			<!-- 占位符 -->
			<view class="slot-item"></view>
			
			<!-- 加载更多 -->
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText"></uni-load-more>
		</scroll-view>
		<!-- 底部 -->
		<view v-if="carList.length > 0" class="cart-bottom flex-center-between">
			<view class="flex-center">
				<view class="radio" :class="{on: isSelectAll}" @click="selctAll"></view>
				<text>全选</text>
			</view>
			<view class="right flex-center">
				<view class="pay-amount flex-column">
					<view class="flex-center">
						<text class="color-6">合计：</text>
						<text class="price">￥{{orderVO.payAmount}}</text>
					</view>
					<text v-if="discountMoney > 0" class="discount-price">共减 ￥{{discountMoney}}</text>
				</view>
				<button class="btn" @click="jumpGoodsConfirm">{{goodsList.length > 0 ? `结算(${goodsList.length})` : '结算'}}</button>
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
			guessYouLikeList: [], //猜你喜欢商品
			carList: [], //购物车
			selectIndexs: [], //购物车选中的索引 //{isSelect:true,children:[true, false, false]}
			goodsList: [], //最终选择的结算商品
			orderVO: { //结算时订单对象
				payAmount:0
			} 
		};
	},
	onLoad() {
		this.queryShoppintCar();
		this.queryGuessYouLike();
	},
	onShow() {
		this.queryShoppintCar();
	},
	computed: {
		isSelectAll(){
			let selectAll = false;
			let storeSelects = this.selectIndexs.map(function(value){
				return value.isSelect
			})
			if(new Set(storeSelects).size === 1){
				selectAll = this.selectIndexs[0].isSelect;
			}
			return selectAll
		},
		// 优惠的金额
		discountMoney(){
			let price = 0;
			// 优惠金额 = 订单原始金额 - 支付金额
			if(this.orderVO.orderAmount != null && this.orderVO.payAmount != null){
				price = this.orderVO.orderAmount - this.orderVO.payAmount;
			}
			return price
		}
	},
	watch: {
		selectIndexs:{ 
			deep:true, 
			handler:function(newV,oldV){
				this.getOrderDetail();
			}
	    }
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
					
					for(var i=0; i< res.length; i++){
						
						// 这里要处理一下如果购物车页面已经勾选了一些商品，要恢复到之前勾选的效果
						let isSelect = false;
						if(this.selectIndexs.length - 1 >= i){
							isSelect = this.selectIndexs[i].isSelect;
						}
						
						let children = [];
						for(var j=0; j< res[i].shoppingCartItemVOList.length; j++){
							let result = false;
							if(this.selectIndexs[i] && this.selectIndexs[i].children && this.selectIndexs[i].children.length - 1 >= j){
								result = this.selectIndexs[i].children[j];
							}
							children.push(result);
						}
						
						this.selectIndexs[i] = {
							isSelect: isSelect,
							children:children
						};
					}
					
					this.carList = res || [];
					
					this.getOrderDetail();
					
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
		 * @param {Object} shoppingCartId 商品购物车ID
		 */
		deleteGoods(shoppingCartId){
			this.$http
				.post('/shopping/cart/deleteBatch', {shoppingCartId:[shoppingCartId]}, true)
				.then(res => {
					this.queryShoppintCar();
				});
		},
		
		// 获取订单信息
		getOrderDetail(){
			
			let goodsList = [];
			  
			for(var i=0; i<this.selectIndexs.length; i++){
				for(var j=0; j<this.selectIndexs[i].children.length; j++){
					if(this.selectIndexs[i].children[j]){
						let goods = this.carList[i].shoppingCartItemVOList[j];
						goodsList.push({
							attributesId: goods.attributesId,
							goodsId: goods.goodsId,
							goodsNum: goods.goodsNum
						})
					}
				}
			}
			
			if(goodsList.length === 0){ return }
			
			this.goodsList = goodsList;
			
			if(goodsList.length > 0){
				this.$http
					.post('/order/getDetail', {goodsList:goodsList}, true)
					.then(res => {
						this.orderVO = res;
					});
			}
		},
		
		/**
		 * 商家单选按钮点击
		 * @param {Object} item 商家信息
		 * @param {Object} index 索引
		 */
		chooseStore(item, index){
			let isSelect = !this.selectIndexs[index].isSelect;
			// 让商家下面所有的商品也都选中或者取消选中
			let children = this.selectIndexs[index].children.map(function(value){
				return isSelect
			});
			let obj = {
				isSelect: isSelect,
				children: children
			}
			this.$set(this.selectIndexs, index, obj);
		},
		
		/**
		 * 商品单选按钮点击
		 * @param {Object} item 商品信息
		 * @param {Object} index 商品索引
		 * @param {Object} parentIndex 商品所属商家索引
		 */
		chooseGoods(item, index, parentIndex){
			let obj = this.selectIndexs[parentIndex];
			obj.children[index] = !obj.children[index];
			
			// 如果所有商品都选中或者未选中，则让商家的单选按钮也选中或者未选中
			if(new Set(this.selectIndexs[parentIndex].children).size === 1){
				obj.isSelect = obj.children[0];
			}
			
			this.$set(this.selectIndexs, parentIndex, obj);
		},
		
		// 全选
		selctAll(){
			let selectIndexs = [];
			for(var i=0; i<this.selectIndexs.length; i++){
				let children = [];
				for(var j=0; j< this.selectIndexs[i].children.length; j++){
					children.push(!this.isSelectAll);
				};
			
				let obj = {
					isSelect:!this.isSelectAll,
					children:children
				}
				selectIndexs.push(obj);
			}
			this.selectIndexs = selectIndexs;
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
		
		/**
		 * 商品数量改变
		 * @param {Object} value 数量
		 * @param {Object} shoppingCartId  购物商品ID
		 */
		goodsNumberChange(value, shoppingCartId){
			
			this.$http
				.post('/shopping/cart/modify', {goodsNum:value,shoppingCartId: shoppingCartId}, true)
				.then(res => {
					this.queryShoppintCar();
				});
		},
		
		// 跳转到下订单页面
		jumpGoodsConfirm(){
			if(this.goodsList.length === 0){
				this.$tool.showToast("您还没有选择宝贝哦");
				return
			}
	
			// 设置下单时要购买的商品
			this.$store.commit('setStoreGoodsList',this.goodsList);
					
			// 跳转到下单页面（会额外携带参数告诉是从购物车下的订单）	
			uni.navigateTo({
				url: `/pages-user/index/confirm/confirm?pageFrom=car`
			});
		}
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
