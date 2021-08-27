<!-- 介绍 -->
<template>
	<view class="tabs-brief">
		<!-- 店铺名称 -->
		<merchanism-lists-item :type="1"></merchanism-lists-item>
		<image class="product-image" src="../../../static/images/other/banner.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
export default {
	name: 'tabsBrief',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less" scoped>
</style>
