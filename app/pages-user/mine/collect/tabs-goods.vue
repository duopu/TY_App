<template>
	<view class="tab-content flex-column">
		<my-scroll-view ref="scrollView" @loadData="loadData" class="collect-content">
			<template v-slot:list="slotProps">
				<view class="goods-lists-item" v-for="(item, index) in slotProps.list" :key="`goods-${index}`">
					<view class="flex-center top">
						<view class="shop-name">{{item.storeName}}</view>
					</view>
					<!-- 商品 -->
					<view class="content flex-center" @click="jumpGoodsInfo(item.goodsId)">
						<view class="radio" :class="{ on: idList.includes(item.id) }" @click.stop="chooseGoods(item.id)"></view>
						<image class="avatar-image" :src="item.thumbnail" mode="aspectFill"></image>
						<view class="flex-column-between flex-1">
							<view class="name">{{item.goodsName}}</view>
							<view class="price">
								<text class="unit">¥</text>
								{{item.price}}
							</view>
						</view>
						<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill" @click.stop="deleteGoods(item.id)"></image>
					</view>
				</view>
			</template>
			<!-- 占位符 -->
			<view class="slot-item"></view>
		</my-scroll-view>

		<!-- 底部 -->
		<view class="collect-bottom flex-center-between">
			<view class="left flex-center">
				<view class="radio" :class="{on: isSelectAll}" @click="chooseAll"></view>
				<text>全选</text>
			</view>
			<button class="btn" @click="deleteGoods()">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabs-goods',
	data() {
		return {
			idList: [], //要删除的商品收藏ID
			isSelectAll: false //是否全选
		};
	},
	watch:{
		idList(newV, oldV){
			if(this.$refs.scrollView){
				this.isSelectAll = newV.length === this.$refs.scrollView.dataList.length;
			}
		}
	},
	methods:{
		
		/**
		 * 加载商品收藏
		 * @param {Object} page
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		loadData(page, pageSize, callback){
			this.$http
				.get('/goods/collection/queryPage', {page:page, size:pageSize}, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		},
		
		/**
		 * 商品单选按钮点击
		 * @param {Object} id
		 */
		chooseGoods(id){
			if(this.idList.includes(id)){
				 this.idList.splice(this.idList.findIndex(item => item === id), 1);
			}else { 
				this.idList.push(id);
			}
		},
		
		// 全选
		chooseAll(){
			if(this.idList.length === this.$refs.scrollView.dataList.length){
				this.idList = [];
			}else {
				this.idList = this.$refs.scrollView.dataList.map(function(value){
					return value.id
				});
			}
		},
		
		/**
		 * 删除商品收藏
		 * @param {Object} id 收藏id
		 */
		deleteGoods(id){
			let idList = id ? [id] : this.idList;
			if(idList.length === 0){
				this.$tool.showToast("请选择要删除的商品");
				return
			}
			
			if(this.isSelectAll){ //是否全选，是的话直接调用全删的接口
				this.$http
					.delete('/goods/collection/deleteAll', {type: 1}, true)
					.then(res => {
						this.isSelectAll = false;
						this.$refs.scrollView.onRefresh();
					});
			}else {
				this.$http
					.delete('/goods/collection/delete', {idList:idList}, true)
					.then(res => {
						this.$refs.scrollView.onRefresh();
					});
			}
			
		},
		
		/**
		 * 跳转到商品详情
		 * @param {Object} goodsId 商品ID
		 */
		jumpGoodsInfo(goodsId){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
			});
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
