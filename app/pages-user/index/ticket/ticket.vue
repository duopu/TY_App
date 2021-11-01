<!-- 优惠活动 -->
<template>
	<scroll-view scroll-y="true" class="ticket">
		<view class="title">商家优惠券</view>
		
		<block v-for="(item, index) in storeCouponList" :key="`store-coupon-${index}`">
			<!-- 优惠券 -->
			<ticket-lists-item :data="item" @collect="collectCoupon(item.couponId)"></ticket-lists-item>
			<!-- 适用商品 -->
			<block v-if="item.goodsDetailList && item.goodsDetailList.length > 0">
				<view class="sub-title"><text class="text">适用商品</text></view>
				<scroll-view class="goods-lists" scroll-x="true">
					<view class="flex-column goods-lists-item" 
					v-for="(value, i) in item.goodsDetailList" 
					:key="`goods-list-${i}`" 
					@click="jumpGoodsDetail(value.goodsId)">
						<image class="goods-image" :src="value.thumbnail" mode="aspectFill"></image>
						<view class="text text-ellipsis">{{value.goodsName}}</view>
					</view>
				</scroll-view>
			</block>
		</block>
		<view class="title">平台优惠券</view>
		<block v-for="(item, index) in couponList" :key="`coupon-${index}`">
			<ticket-lists-item  :data="item" @collect="collectCoupon(item.couponId)"></ticket-lists-item>
		</block>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			goodsId:undefined, //商品ID
			couponList:[], //平台优惠券
			storeCouponList:[] //商品优惠券
		};
	},
	onLoad(option) {
		this.goodsId = option.goodsId;
		this.getCouponList();
	},
	methods:{
		
		/**
		 * 获取优惠券信息
		 */
		getCouponList(){
			this.$http
				.get('/coupon/queryListByLogin', {goodsId:this.goodsId}, true)
				.then(res => {
					this.couponList = res.couponList || [];
					this.storeCouponList = res.storeCouponList || [];
				});
		},
		
		/**
		 * 领取优惠券
		 * @param {Object} couponId 优惠券ID
		 */
		collectCoupon(couponId){
			this.$http
				.post('/userCoupon/create', {couponId:couponId}, true)
				.then(res => {
					this.getCouponList();
				});
		},
		
		/**
		 * 跳转到商品详情
		 * @param {Object} goodsId 商品ID
		 */
		jumpGoodsDetail(goodsId){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
