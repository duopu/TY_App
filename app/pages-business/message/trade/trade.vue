<!-- 交易消息 -->
<template>
	<scroll-view scroll-y="true" class="trade">
		<!-- 列表 -->
		<block v-for="(item, index) in ['', '','','','']" :key="index">
			<trade-lists-item></trade-lists-item>
		</block>
		<!-- 占位符 -->
		<view class="slot-item"></view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
