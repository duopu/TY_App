<!-- 活动拼团 -->
<template>
	<view class="activity-lists-item">
		<view class="flex item-top">
			<image :src="data.thumbnail" class="avatar-image" mode="aspectFill"></image>
			<view class="right">
				<view class="name text-bold">{{data.groupBuyName}}</view>
				<view class="time">开团时间:{{data.startTime}}</view>
				<view class="text-bold price">最低折扣价¥{{data.minPrice}}</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="flex-center-end item-bottom">
			<!-- 参与拼团 -->
			<button class="btn-block" @click="submit">参与拼团</button>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		name:"active-group-lists-item",
		emits: ['submit'],
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
				this.$emit('submit', this.data.groupBuyId)
			}
		}
	}
</script>

<style lang="less" src="./style.less">

</style>
