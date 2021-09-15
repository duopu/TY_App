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
						@cancelOrder="cancelOrder(subItem.orderNum)" 
						@payOrder="payOrder(subItem)"
						@deletOrder="deletOrder(subItem.orderNum)"
						@queryLogistics="queryLogistics(subItem)"
						@applyRefund="applyRefund(subItem)" 
						@evaluateOrder="evaluateOrder(subItem)"
						@receivedOrder="receivedOrder(subItem)"></goods-order-list-item>
					</template>
				</my-scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 取消订单提示弹窗 -->
		<uni-popup ref="cancelOrderConfimPop" type="dialog">
		    <uni-popup-dialog content="是否确认取消订单？" 
			:duration="2000" 
			@confirm="()=>{$refs.cancelOrderPop.open()}"></uni-popup-dialog>
		</uni-popup>
		
		<!-- 删除订单提示弹窗 -->
		<uni-popup ref="deleteOrderConfimPop" type="dialog">
		    <uni-popup-dialog content="是否确认删除订单？" 
			:duration="2000" 
			@confirm="deleteOrderConfim()"></uni-popup-dialog>
		</uni-popup>
		
		<!-- 取消订单原因弹窗 -->
		<uni-popup ref="cancelOrderPop" type="dialog">
		    <uni-popup-dialog mode="input" 
			:value="cancelMsg"
			title="取消原因" 
			placeholder="请输入取消原因" 
			:before-close="true" 
			@confirm="cancelOrderConfirm"></uni-popup-dialog>
		</uni-popup>
		
		<!-- 物流 弹窗 -->
		<order-logistic-popup ref="logisticPopup" 
		:orderNum="currentOrderNum"></order-logistic-popup>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['全部','待付款', '待发货', '待收货', '待评价', '已完成'],
			tabsIndex: 0,
			searchInput:undefined,
			cancelMsg:undefined, //取消订单原因
			orderNum:undefined, //订单ID
			currentOrderNum:undefined //当前选中的订单编号
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
		 * 取消订单点击
		 * @param {Object} orderNum 订单编号
		 */
		cancelOrder(orderNum){
			this.orderNum = orderNum;
			this.$refs.cancelOrderConfimPop.open();
		},
		
		/**
		 * 取消订单原因弹窗确定按钮点击
		 * @param {Object} value 输入框内容
		 */
		cancelOrderConfirm(value){
			this.cancelMsg = value;
			this.$http
				.post('/order/cancel', {cancelMsg:this.cancelMsg, orderNum:this.orderNum}, true)
				.then(res => {
					this.$store.commit('setOrderChange');
					this.cancelMsg = undefined;
					this.$refs.cancelOrderPop.close();
					this.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
				});
		},
		
		/**
		 * 支付订单
		 * @param {Object} orderVO 订单对象
		 */
		payOrder(orderVO){
			//TODO: 这里需要掉支付接口
		},
		
		/**
		 * 删除订单
		 * @param {Object} orderNum 订单编号
		 */
		deletOrder(orderNum){
			this.orderNum = orderNum;
			this.$refs.deleteOrderConfimPop.open();
		},
		
		// 确认删除订单
		deleteOrderConfim(){
			this.$http
				.post('/order/cancel', {cancelMsg:this.cancelMsg, orderNum:this.orderNum}, true)
				.then(res => {
					this.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
				});
		},
		
		/**
		 * 申请退款按钮点击
		 * @param {Object} goodsVO 当前商品对象
		 */
		applyRefund(goodsVO){
			uni.navigateTo({
				url: `/pages-user/mine/refund/refund?orderNum=${goodsVO.orderNum}`
			});
		},
		
		/**
		 * 商品评价
		 * @param {Object} goodsVO 当前商品对象
		 */
		evaluateOrder(goodsVO){
			let that = this;
			uni.navigateTo({
				url: `/pages-user/mine/evaluate/evaluate?goodsVO=${encodeURIComponent(JSON.stringify(goodsVO))}`,
				events: {
					onRefresh: function(){
						that.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
					}
				}
			});
		},
		
		/**
		 * 查询物流
		 * @param {Object} goodsVO 当前商品对象
		 */
		queryLogistics(goodsVO){
			this.currentOrderNum = goodsVO.orderNum;
			this.$refs.logisticPopup.open();
		},
		
		/**
		 * 确认收货
		 * @param {Object} goodsVO 当前商品对象
		 */
		receivedOrder(goodsVO){
			this.$http
				.get('/order/received', {orderNum:goodsVO.orderNum, goodsId:goodsVO.goodsId}, true)
				.then(res => {
					this.$refs[`scrollView${this.tabsIndex}`][0].onRefresh();
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
