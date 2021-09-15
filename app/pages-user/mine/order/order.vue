<!-- 我的订单 -->
<template>
	<view class="order flex-column">
		<view class="order-top">
			<!-- 导航 -->
			<view class="flex-center">
				<image class="icon-arrow" src="../../../static/images/icons/icon-back.svg" mode="aspectFill" @click="goBack"></image>
				<custom-search @search="getSearchInput"></custom-search>
				<image class="icon-message" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
			</view>
			<!-- 菜单 -->
			<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :currentIndex="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		</view>
		
		<swiper :current="tabsIndex" @change="swiperChange" class="order-content">
			<swiper-item v-for="(item, index) in tabsData" :key="`swiper-item-${index}`">
				<my-scroll-view :ref="`scrollView${index}`" class="order-content" @loadData="(page,pageSize,callback)=>{queryOrderList(page,pageSize,callback,index)}">
					<template v-slot:list="slotProps">
						<goods-order-list-item v-for="(subItem, subIndex) in slotProps.list" 
						:key="`order-list-${subIndex}`" 
						:storeGoodsVO="storeGoodsVOInit(subItem)" 
						@goodsClick="goodsClick(subItem.orderNum)"
						@queryLogistics="queryLogistics"
						@queryExam="queryExam"></goods-order-list-item>
					</template>
				</my-scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 物流 弹窗 -->
		<order-logistic-popup ref="logisticPopup" 
		:data="logisticsVO"></order-logistic-popup>
		
		<!-- 电子凭证 弹窗 -->
		<order-exam-certificate ref="examPop" 
		:data="examVO"></order-exam-certificate>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['全部','待付款', '待发货', '待收货', '待评价', '退款中', '已完成'],
			tabsIndex: 0,
			searchInput: undefined,
			orderNum: undefined, //订单ID
			logisticsVO: {}, //物流对象
			examVO: {} //电子凭证对象
		};
	},
	watch:{
		'$store.state.orderChange': function(){
			this.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
		}
	},
	methods: {
		// 返回
		goBack(){
			uni.navigateBack();
		},
		// 获取当前id
		getTabsIndex(value) {
			this.tabsIndex = value;
		},
		// 获取输入的内容
		getSearchInput(value){
			this.searchInput = value;
			this.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
		},
		// 水平轮播切换回调
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
			
			
			let orderState = undefined;
			switch(index){
				case 0 : orderState = undefined; break;
				case 1 : orderState = 0; break;
				case 2 : orderState = 1; break;
				case 3 : orderState = 2; break;
				case 4 : orderState = 3; break;
				case 5 : orderState = 5; break;
				case 6 : orderState = 4; break;
			}
			
			this.$http
				.get('/order/queryPage', {orderState:orderState, page:page, size:pageSize, searchText:this.searchInput}, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		},
		
		/**
		 * 订单对象初始化
		 * @param {Object} item 订单对象
		 */
		storeGoodsVOInit(item){
			// 这里因为接口返回的跟组件中orderItemList的命名不一样
			item.orderItemList = item.orderItemVOList;
			return item;
		},
		
		/**
		 * 订单点击
		 * @param {Object} orderNum 订单编号
		 */
		goodsClick(orderNum){
			uni.navigateTo({
				url: `/pages-user/mine/order-details/order-details?orderNum=${orderNum}`
			});	
		},
		
		/**
		 * 查询物流
		 * @param {Object} logisticsVO 物流对象
		 */
		queryLogistics(logisticsVO){
			this.logisticsVO = logisticsVO;
			this.$refs.logisticPopup.open();
		},
		
		/**
		 * 电子凭证点击
		 * @param {Object} data 电子凭证对象
		 */
		queryExam(data){
			this.examVO = data;
			this.$refs.examPop.open();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
