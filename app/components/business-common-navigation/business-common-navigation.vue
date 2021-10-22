<!-- 商家端-头部导航栏 -->
<template>
	<view class="goods-top flex-center">
		<image @click="onBack" mode="aspectFill" src="../../static/images/icons/icon-back.svg" class="icon-back"></image>
		<view class="flex-center flex-1 search-box">
			<image mode="aspectFill" src="../../static/images/icons/icon-search1.svg" class="icons"></image>
			<input class="input" @confirm="onSearch"  placeholder-class="input-placeholder" type="text" placeholder="搜索" />
		</view>
		<image @click="onJump" mode="aspectFill" src="../../static/images/icons/icon-message3.svg" class="icons"></image>
	</view>
</template>

<script>
export default {
	name: 'business-common-navigation',
	emits:['search'],
	data() {
		return {};
	},
	methods: {
		// 返回上一级
		onBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		onSearch(event) {
			this.$emit('search',event.detail.value)
		},
		onJump(event) {
			this.$emit('jump')
		},
	}
};
</script>

<style lang="less" src="./style.less"></style>
