<!-- 优惠券领取使用记录 -->
<template>
	<view class="history">
		<!-- 人数 -->
		<view class="flex-center-center top">
			<text class="item">总使用人数：1</text>
			<text class="on item">总领取人数：12</text>
		</view>
		<!-- 列表 -->
		<scroll-view class="list" scroll-y="true">
			<view class="item flex-center-between" v-for="(item,index) in ['','','']">
				<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>	
				<text class="name text-bold">用户名A</text>
				<text class="describe" :class="[index === 1 ? 'red':'blue']">使用优惠券</text>
				<text class="time">2021-12-12 12:00</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style src="./style.less" lang="less" scoped></style>
