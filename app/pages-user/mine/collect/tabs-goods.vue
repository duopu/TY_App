<template>
	<view class="tab-content flex-column">
		<my-scroll-view ref="scrollView" @loadData="loadData" class="collect-content">
			<template v-slot:list="slotProps">
				<view class="goods-lists-item" v-for="(item, index) in slotProps.list" :key="`goods-${index}`">
					<view class="flex-center top">
						<view class="radio"></view>
						<view class="shop-name">{{item.storeName}}</view>
					</view>
					<!-- 多个商品 -->
					<view class="content flex-center">
						<!-- 选中效果 -->
						<view class="radio" :class="{ on: index === 0 }"></view>
						<image class="avatar-image" :src="item.thumbnail" mode="aspectFill"></image>
						<view class="flex-column-between flex-1">
							<view class="name">{{item.goodsName}}</view>
							<view class="price">
								<text class="unit">¥</text>
								{{item.price}}
							</view>
						</view>
						<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill" @click="deleteGoods(item.id)"></image>
					</view>
				</view>
			</template>
			<!-- 占位符 -->
			<view class="slot-item"></view>
		</my-scroll-view>

		<!-- 底部 -->
		<view class="collect-bottom flex-center-between">
			<view class="left flex-center">
				<view class="radio"></view>
				<text>全选</text>
			</view>
			<button class="btn">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabs-goods',
	data() {
		return {};
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
		 * 删除商品收藏
		 * @param {Object} id 收藏id
		 */
		deleteGoods(id){
			let idList = [id];
			this.$http
				.delete('/goods/collection/delete', {idList:idList}, true)
				.then(res => {
					this.$refs.scrollView.onRefresh();
				});
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
