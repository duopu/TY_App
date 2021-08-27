<!-- 待发货 -->
<template>
	<scroll-view scroll-y="true" class="order-content">
		<order-delivery-lists-item  v-for="(item, index) in ['', '', '', '', '']" :key="index"></order-delivery-lists-item>
	</scroll-view>
</template>

<script>
export default {
	name: 'tabs-delivery',
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
