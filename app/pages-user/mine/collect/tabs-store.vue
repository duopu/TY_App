<template>
	<scroll-view class="collect-content" scroll-y="true">
		<view class="store-lists-item flex-center-center" v-for="(item, index) in ['', '', '']" :key="index">
			<!-- 选中效果 -->
			<view class="radio" :class="{ on: index === 0 }"></view>
			<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">店铺名称</view>
				<view class="desc">补充说明</view>
			</view>
			<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill"></image>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name:'tabs-store',
	data() {
		return {

		};
	}
}
</script>

<style lang="less" src="./style.less"></style>
