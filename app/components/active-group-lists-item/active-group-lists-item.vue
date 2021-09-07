<!-- 活动拼团 -->
<template>
	<view class="activity-lists-item">
		<view class="flex-center item-top">
			<image :src="data.thumbnail" class="avatar-image" mode="aspectFill"></image>
			<view class="right">
				<view class="name text-bold">{{data.goodsName}}</view>
				<!-- 拼团进度条 -->
				<view class="process-wrapper flex-center">
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
				</view>
				<view class="time">拼团时间:{{data.startTime}}</view>
			</view>
		</view>
		<!-- 底部，最低折扣 -->
		<view class="flex-center-end item-bottom">
			<view class="text-bold price">最低折扣价¥{{data.minPrice}}</view>
			<!-- 参与拼团  这里几个不同状态的文案要怎么展示 -->
			<button class="btn-block"  v-if="data.joinFlag === 3">参与拼团</button>
			<button class="btn-block disable" v-else-if="data.joinFlag === 2">已参与，等待拼团完成</button>
			<button class="btn-block disable" v-else-if="data.joinFlag === 1">已参与，去支付</button>
		</view>
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
				
			};
		}
	}
</script>

<style lang="less" src="./style.less">

</style>
