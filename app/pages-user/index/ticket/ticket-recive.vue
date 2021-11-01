<!-- 优惠活动 -->
<template>
	
	<view class="ticket">
		<!-- 优惠券 -->
		<ticket-lists-item :data="data" @collect="collectCoupon"></ticket-lists-item>
		<!-- 适用商品 -->
		<block v-if="data.goodsDetailList && data.goodsDetailList.length > 0">
			<view class="sub-title"><text class="text">适用商品</text></view>
			<scroll-view class="goods-lists" scroll-x="true">
				<view class="flex-column goods-lists-item" 
				v-for="(value, i) in data.goodsDetailList" 
				:key="`goods-list-${i}`"
				@click="jumpGoodsDetail(value.goodsId)">
					<image class="goods-image" :src="value.thumbnail" mode="aspectFill"></image>
					<view class="text text-ellipsis">{{value.goodsName}}</view>
				</view>
			</scroll-view>
		</block>	
	</view>		
		
</template>

<script>
export default {
	data() {
		return {
			couponId: undefined, //优惠券ID
			data: {} //优惠券信息
		};
	},
	onLoad(option) {
		this.couponId = option.couponId;
		this.getCouponInfo();
	},
	methods:{
		
		/**
		 * 获取优惠券信息
		 */
		getCouponInfo(){
			this.$http
				.get('/coupon/queryDetailByLogin', {couponId:this.couponId}, true)
				.then(res => {
					this.data = res;
				});
		},
		
		/**
		 * 领取优惠券
		 */
		collectCoupon(){
			this.$http
				.post('/userCoupon/create', {couponId:this.couponId}, true)
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
