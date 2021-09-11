<!-- 站内消息 -->
<template>
	<scroll-view scroll-y="true" class="message-scroll-content">
		<view class="inside-item flex-center-between" v-for="(item,index) in insideData" :key="index">
			<image :src="item.image" mode="aspectFill" class="image"></image>
			<view class="flex-column-between flex-1">
				<view class="name text-bold">{{item.name}}</view>
				<text class="color-9 font-24 desc">{{item.desc}}</text>
			</view>
			<text class="color-9 font-24 time">{{item.time}}</text>
			<view class="message-tag" v-if="item.number > 0">{{item.number}}</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'tab-inside',
	data() {
		return {
			insideData:[
				{
					image:'../../../static/images/order-message.png',
					name:'订单通知',
					desc:'您在xx商家的订单下单成功！',
					time:'2020-12-21',
					number:3
				},
				{
					image:'../../../static/images/other/girl.png',
					name:'订单通知',
					desc:'您在xx商家的订单下单成功！',
					time:'2020-12-21',
					number:3
				},
				{
					image:'../../../static/images/other/girl.png',
					name:'订单通知',
					desc:'您在xx商家的订单下单成功！',
					time:'2020-12-21',
					number:0
				}
			]
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
