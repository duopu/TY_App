<!-- 优惠活动 -->
<template>
	<view class="container">
	
		<image class="header-image" mode="aspectFill" src="../../static/images/ticket-share-header.png"></image>
		
		<view class="ticket">
			<!-- 优惠券 -->
			<ticket-lists-item :data="data" @collect="openApp"></ticket-lists-item>
			<!-- 适用商品 -->
			<block v-if="data.goodsDetailList && data.goodsDetailList.length > 0">
				<view class="sub-title"><text class="text">适用商品</text></view>
				<scroll-view class="goods-lists" scroll-x="true">
					<view class="flex-column goods-lists-item" v-for="(value, i) in data.goodsDetailList" :key="`goods-list-${i}`">
						<image class="goods-image" :src="value.thumbnail" mode="aspectFill"></image>
						<view class="text text-ellipsis">{{value.goodsName}}</view>
					</view>
				</scroll-view>
			</block>	
		</view>
		
		
		<!-- 底部 -->
		<view class="bottom">
			<button class="btn btn-light" @click="openApp">打开App，查看更多内容</button>
		</view>
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			couponId: undefined, //优惠券ID
			linkType: undefined, //链接类型
			data: {} //优惠券信息
		};
	},
	onLoad(option) {
		this.couponId = option.couponId;
		this.linkType = option.linkType;
		this.getCouponInfo();
	},
	methods:{
		
		/**
		 * 获取优惠券信息
		 */
		getCouponInfo(){
			this.$http
				.get('/coupon/queryDetail', {couponId:this.couponId}, true)
				.then(res => {
					this.data = res;
				});
		},
		
		/**
		 * 打开APP
		 */
		openApp(){
			const linkType = this.linkType; 
			const couponId = this.couponId;
			let url = `${config.schema}?linkType=${linkType}&couponId=${couponId}`;
			let shareMsg = `分享一张优惠券给你：${url}`;
			this.$tool.openApp(url)
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
