<!-- 我的订单 -->
<template>
	<view class="order flex-column">
		<view class="order-top">
			<!-- 导航 -->
			<view class="flex-center">
				<image class="icon-arrow" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
				<custom-search @search="getSearchInput"></custom-search>
				<image class="icon-message" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
			</view>
			<!-- 菜单 -->
			<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :currentIndex="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		</view>
		
		<swiper :current="tabsIndex" @change="swiperChange" class="order-content">
			<swiper-item v-for="(item, index) in tabsData" :key="`swiper-item-${index}`">
				<!-- 待付款 -->
				<my-scroll-view class="order-content" @loadData="(page,pageSize,callback)=>{queryOrderList(page,pageSize,callback,index)}">
					<template v-slot:list="slotProps">
						<merchanism-order-lists-item v-for="(subItem, subIndex) in slotProps.list" 
						:key="`order-list-${subIndex}`" 
						:storeGoodsVO="subItem"></merchanism-order-lists-item>
					</template>
					<!-- 商家列表 -->
					<!-- <block v-for="(item, index) in ['', '', '', '','','']" :key="index">
						<merchanism-order-lists-item :state="index"></merchanism-order-lists-item>
					</block> -->
				</my-scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['全部','待付款', '待发货', '待收货', '待评价', '已完成'],
			tabsIndex: 0,
			searchInput:''
		};
	},
	methods: {
		// 获取当前id
		getTabsIndex(value) {
			this.tabsIndex = value;
		},
		// 获取输入的内容
		getSearchInput(value){
			this.searchInput = value;
			console.log(this.searchInput);
		},
		
		swiperChange(e){
			this.tabsIndex = e.detail.current
		},
		
		/**
		 * 查询订单列表
		 * @param {Object} page
		 * @param {Object} pageSize
		 * @param {Object} callback
		 * @param {Object} index
		 */
		queryOrderList(page,pageSize,callback,index){
			
			// 订单状态 -1:已取消 0:待支付 1:已支付 2:已发货 3:已完成 4:已评价 
			let orderState = undefined;
			switch(index){
				case 0 : orderState = undefined; break;
				case 1 : orderState = 0; break;
				case 2 : orderState = 1; break;
				case 3 : orderState = 2; break;
				case 4 : orderState = 3; break;
				case 5 : orderState = 4; break;
			}
			
			this.$http
				.get('/order/queryPage', {orderState:orderState, page:page, size:pageSize, searchText:undefined}, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
