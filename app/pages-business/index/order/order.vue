<!-- 订单 -->
<template>
	<view class="order">
		<!-- 导航 -->
		<business-common-navigation></business-common-navigation>
		<!-- 菜单 -->
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 待付款 -->
		<scroll-view scroll-y="true" class="order-content">
			<order-delivery-lists-item  v-for="(item, index) in orderList" :key="index"></order-delivery-lists-item>
		</scroll-view>
<!--		<tabs-payment v-if="tabsIndex === 0"></tabs-payment>-->
		<!-- 待发货 -->
<!--		<tabs-delivery v-else-if="tabsIndex === 1"></tabs-delivery>-->
	</view>
</template>

<script>
import TabsPayment from './tabs-payment.vue';
import TabsDelivery from './tabs-delivery.vue';
let page = 1, size = 10;
export default {
	components:{
		TabsPayment,
		TabsDelivery
	},
	data() {
		return {
			tabsData: ['待付款', '待发货', '待收货','待售后','已完成'],
			tabsIndex:0,
			orderList: []
		};
	},
	onShow(options){
		this.tabsIndex = options.type;
		this.queryOrderList();
	},
	methods: {
		//获取当前 tabs Index
		getTabsIndex(value) {
			this.tabsIndex = value;
		},
		queryOrderList(params){
			this.$http.get('/order/queryPage',{page: this.page,size: this.size,...params},true).then(res =>{
				this.orderList = res.content;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
