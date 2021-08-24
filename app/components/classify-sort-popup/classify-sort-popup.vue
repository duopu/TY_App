<!-- 综合排序 -->
<template>
	<uni-popup :class="popup" ref="popup" type="top" :safeArea="false">
		<view class="popup-content">
			<view :class="{on:currentIndex === index + 1 
			}" class="sort-item flex-center" @click="onSelectIndex(index + 1)" v-for="(item, index) in data" :key="index">
				<view class="slot-image"><image class="icon-dui" src="../../static/images/icons/icon-dui.svg" mode="aspectFill"></image></view>
				<text>{{ item }}</text>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-sort-popup',
	props:{
		currentIndex:{
			type:Number,
			default:0
		}
	},
	data() {
		return {
			data: ['综合', '销售降序', '销售升序', '价格降序', '价格升序']
		};
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 关闭弹窗
		open() {
			this.$refs.popup.open();
		},
		//选择排序方式
		onSelectIndex(value){
			this.$emit('select',value);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>

