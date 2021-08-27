<!-- 待付款 -->
<template>
	<!-- 列表 -->
	<scroll-view scroll-y="true" class="order-content">
		 <order-payment-lists-item  v-for="(item, index) in ['', '', '', '', '']" :key="index"></order-payment-lists-item>
	</scroll-view>
</template>

<script>
	export default {
		name:'tabs-payment',
		data() {
			return {
				
			};
		}
	}
</script>

<style>
</style>
