<!-- 物流弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<!-- 标题 -->
			<view class="title text-bold">
				物流跟踪
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="lists">
				<view class="item flex-center-between" :class="{ on: index === 0 }" v-for="(item, index) in logisticData" :key="index">
					<text class="circle"></text>
					<view class="flex-1">{{ item.name }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="flex-center-between popup-bottom"><button class="btn flex-1">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'order-logistic-popup',
	data() {
		return {
			logisticData: [
				{
					name: '订单已提交',
					time: '03-09 14:06'
				},
				{
					name: '付款成功',
					time: '03-09 14:06'
				},
				{
					name: '卖家已发货',
					time: '03-09 14:06'
				},
				{
					name: '开始派送',
					time: '03-09 14:06'
				},
				{
					name: '包裹已签收',
					time: '03-09 14:06'
				}
			]
		};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
