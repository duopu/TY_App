<!-- 订单 -->
<template>
	<view class="order">
		<!-- 导航 -->
		<business-common-navigation></business-common-navigation>
		<!-- 菜单 -->
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 待付款 -->
		<my-scroll-view ref="myScrollView" class="order-content" :pageSize="size" @loadData="onLoadData">
			<template v-slot:list="slotProps">

				<order-delivery-lists-item  v-for="(item, index) in slotProps.list"  :orderItemData="item" :key="index"></order-delivery-lists-item>
			</template>
		</my-scroll-view>
<!--		<tabs-payment v-if="tabsIndex === 0"></tabs-payment>-->
		<!-- 待发货 -->
<!--		<tabs-delivery v-else-if="tabsIndex === 1"></tabs-delivery>-->
	</view>
</template>

<script>
import TabsPayment from './tabs-payment.vue';
import TabsDelivery from './tabs-delivery.vue';
export default {
	components:{
		TabsPayment,
		TabsDelivery
	},
	data() {
		return {
			tabsData: ['待付款', '待发货', '待收货','待售后','已完成'],
			tabsIndex:0,
			size: 20
			// orderList: [],
		};
	},
	onLoad(options){
		this.tabsIndex = options.type;
		// this.queryOrderList();
	},
	methods: {
		//获取当前 tabs Index
		getTabsIndex(value) {
			this.tabsIndex = value;
			this.$refs.myScrollView.onRefresh();
		},
		onLoadData(pageNum = 1,callback){
			this.$http.get('/order/queryPage',{page: pageNum,orderState: this.tabsIndex,size: this.size},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
