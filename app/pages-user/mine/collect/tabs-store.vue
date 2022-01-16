<template>
	<view class="tab-content flex-column">
		<my-scroll-view class="collect-content" ref="scrollView" @loadData="loadData">
			<template v-slot:list="slotProps">
				<view class="store-lists-item flex-center-center" v-for="(item, index) in slotProps.list" :key="`store-${index}`" @click="jumpStoreInfo(item.storeId)">
					<!-- 选中效果 -->
					<view class="radio" :class="{ on: idList.includes(item.id) }" @click.stop="chooseStores(item.id)"></view>
					<image class="avatar-image" :src="item.avatar" mode="aspectFill"></image>
					<view class="flex-column flex-1">
						<view class="name">{{item.storeName}}</view>
						<view class="desc">{{item.storeDesc}}</view>
					</view>
					<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill" @click.stop="deleteStores(item.id)"></image>
				</view>
			</template>
		</my-scroll-view>
		<!-- 底部 -->
		<view class="collect-bottom flex-center-between">
			<view class="left flex-center">
				<view class="radio" :class="{on: isSelectAll}" @click="chooseAll"></view>
				<text>全选</text>
			</view>
			<button class="btn" @click="deleteStores()">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	name:'tabs-store',
	data() {
		return {
			idList: [], //要删除的店铺收藏ID
			isSelectAll:false,
		};
	},
	watch:{
		idList(newV, oldV){
			if (this.$refs.scrollView) {
				this.isSelectAll = newV.length === this.$refs.scrollView.dataList.length
			}
		}
	},
	methods: {
		/**
		 * 加载商品收藏
		 * @param {Object} page
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		loadData(page, pageSize, callback){
			this.$http
				.get('/store/collection/queryPage', {page:page, size:pageSize}, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		},
		
		/**
		 * 店铺单选按钮点击
		 * @param {Object} id
		 */
		chooseStores(id){
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
		 * 删除店铺收藏
		 * @param {Object} id 收藏id
		 */
		deleteStores(id){
			let idList = id ? [id] : this.idList;
			if(idList.length === 0){
				this.$tool.showToast("请选择要删除的店铺");
				return
			}
			
			if(this.isSelectAll){ //是否全选，是的话直接调用全删的接口
				this.$http
					.delete('/store/collection/deleteAll', {type: 2}, true)
					.then(res => {
						this.isSelectAll = false;
						this.$refs.scrollView.onRefresh();
					});
			}else {
				this.$http
					.delete('/store/collection/delete', {idList:idList}, true)
					.then(res => {
						this.$refs.scrollView.onRefresh();
					});
			}
			
		},
		
		/**
		 * 跳转到店铺详情
		 * @param {Object} storeId 店铺ID
		 */
		jumpStoreInfo(storeId){
			uni.navigateTo({
				url:`/pages-user/index/store-details/store-details?storeId=${storeId}`
			})
		}
	}
}
</script>

<style lang="less" src="./style.less"></style>
