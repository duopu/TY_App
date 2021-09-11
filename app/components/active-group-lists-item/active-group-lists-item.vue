<!-- 活动拼团 -->
<template>
	<view class="activity-lists-item">
		<view class="flex item-top" @click="jumpGoodsDetail">
			<image :src="data.thumbnail" class="avatar-image" mode="aspectFill"></image>
			<view class="right">
				<view class="name text-bold">{{data.groupBuyName}}</view>
				<!-- 拼团进度条 -->
				<!-- <view class="process-wrapper flex-center">
					<view class="process-discount" :style="{left: '20%'}">
						<text class="text">当前优惠:</text>
						<text class="price">¥23</text>
					</view>
					<view class="process flex-1">
						<view class="process-bar text-bold" :style="{width: '40%'}">40%</view>
					</view>
					<view class="process-text flex-center">
						<text class="text">预计优惠:</text>
						<text class="price">¥16</text>
					</view>
				</view> -->
				<view class="time">开团时间:{{data.startTime}}</view>
				<view class="text-bold price">最低折扣价¥{{data.minPrice}}</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="flex-center-end item-bottom">
			<!-- 参与拼团 -->
			<button class="btn-block"  v-if="data.joinFlag === 3" @click="submit">参与拼团</button>
			<button class="btn-block disable" v-else>已参与，等待拼团完成</button>
		</view>
		
		
		<!-- 弹窗 参与拼团 -->
		<goods-group-popup ref="groupPopup" :data="groupBuyVO"></goods-group-popup>
		
	</view>
</template>

<script>
	export default {
		name:"active-group-lists-item",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				groupBuyVO:{} //组团优惠详情对象
			};
		},
		methods: {
			// 参与拼团按钮点击
			submit(){
				this.$http.get('/groupBuy/queryInfoByLogin', { groupBuyId: this.data.groupBuyId }, true).then(res => {
					this.groupBuyVO = res;
					this.$refs.groupPopup.open();
				});
			},
			// 跳转到组团优惠商品下订单页面
			jumpGroupBuyConfirm(){
				this.$store.commit('setGroupBuyGoodsVO', this.groupBuyVO);
				uni.navigateTo({
					url: `/pages-user/index/confirm/confirm-groupbuy`
				});
			},
			
			// 跳转到商品详情页
			jumpGoodsDetail(){
				uni.navigateTo({
					url: `/pages-user/index/goods-details/goods-details?goodsId=${this.data.goodsId}`
				});
			}
		}
	}
</script>

<style lang="less" src="./style.less">

</style>
