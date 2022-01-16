<template>
	<view class="tab-content flex-column">
		<my-scroll-view ref="scrollView" @loadData="loadData" class="collect-content">
			<template v-slot:list="slotProps">
				<view class="flex-column" v-for="(item, index) in slotProps.list" :key="`history-${index}`">
					<text class="history-time">{{item.footprintDate}}</text>
					<view class="goods-lists-item" v-for="(subItem, subIndex) in item.goodsVOList"
						:key="`goods-history-${index}-${subIndex}`">
						<view class="flex-center top" @click="jumpStore(subItem.storeId)">
							<view class="shop-name">{{subItem.storeName}}</view>
						</view>
						<!-- 商品 -->
						<view class="content flex-center" @click="jumpGoodsInfo(subItem.goodsId)">
							<view class="radio" :class="{ on: idList.includes(subItem.id) }"
								@click.stop="chooseGoods(subItem.id)"></view>
							<image class="avatar-image" :src="subItem.thumbnail" mode="aspectFill"></image>
							<view class="flex-column-between flex-1">
								<view class="name">{{subItem.goodsName}}</view>
								<view class="price">
									<text class="unit">¥</text>
									{{subItem.minPrice || subItem.price}}
								</view>
							</view>
							<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg"
								mode="aspectFill" @click.stop="deleteGoods(subItem.id)"></image>
						</view>
					</view>
				</view>
			</template>
		</my-scroll-view>

		<!-- 底部 -->
		<view class="collect-bottom flex-center-between">
			<view class="left flex-center" @click="chooseAll">
				<view class="radio" :class="{on: isSelectAll}" ></view>
				<text>全选</text>
			</view>
			<button class="btn" @click="deleteGoods()">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabs-history',
		data() {
			return {
				idList: [], //要删除的商品收藏ID
				isSelectAll: false //是否全选
			};
		},
		watch: {
			idList(newV, oldV) {
				if (this.$refs.scrollView) {
					this.isSelectAll = newV.length === this.allItemIdList.length;
				}
			}
		},
		computed: {
			allItemIdList() {
				const idList = [];
				for (let i = 0; i < this.$refs.scrollView.dataList.length; i++) {
					const goods = this.$refs.scrollView.dataList[i];
					for (let j = 0; j < goods.goodsVOList.length; j++) {
						idList.push(goods.goodsVOList[j].id)
					}
				}
				return idList;
			},
		},
		methods: {

			/**
			 * 加载商品收藏
			 * @param {Object} page
			 * @param {Object} pageSize
			 * @param {Object} callback
			 */
			loadData(page, pageSize, callback) {
				this.$http
					.get('/goods/footprint/queryList', {
						page: page,
						size: pageSize
					}, true)
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
			chooseGoods(id) {
				if (this.idList.includes(id)) {
					this.idList.splice(this.idList.findIndex(item => item === id), 1);
				} else {
					this.idList.push(id);
				}
			},

			// 全选
			chooseAll() {
				if (this.isSelectAll) {
					this.idList = [];
				} else {
					this.idList = this.allItemIdList;
				}
			},

			/**
			 * 删除商品收藏
			 * @param {Object} id 收藏id
			 */
			deleteGoods(id) {
				let idList = id ? [id] : this.idList;
				if (idList.length === 0) {
					this.$tool.showToast("请选择要删除的商品");
					return
				}

				if (this.isSelectAll) { //是否全选，是的话直接调用全删的接口
					this.$http
						.delete('/goods/footprint/deleteAll', {
							type: 1
						}, true)
						.then(res => {
							this.isSelectAll = false;
							this.$refs.scrollView.onRefresh();
						});
				} else {
					this.$http
						.delete('/goods/footprint/delete', {
							idList: idList
						}, true)
						.then(res => {
							this.$refs.scrollView.onRefresh();
						});
				}

			},

			/**
			 * 跳转到商品详情
			 * @param {Object} goodsId 商品ID
			 */
			jumpGoodsInfo(goodsId) {
				uni.navigateTo({
					url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
				});
			},

			/**
			 * 跳转到店铺详情
			 * @param {Object} storeId 店铺ID
			 */
			jumpStore(storeId) {
				uni.navigateTo({
					url: `/pages-user/index/store-details/store-details?storeId=${storeId}`
				})
			}
		}
	};
</script>

<style src="./style.less" lang="less"></style>
