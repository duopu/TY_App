<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<view class="popup-content">
			<view :class="{ on: currentIndex === index }" 
			class="sort-item flex-center" 
			@click="onSelectIndex(item, index)" 
			v-for="(item, index) in data" 
			:key="`sort-list-${index}`">
				<view class="slot-image"><image class="icon-dui" src="../../static/images/icons/icon-dui.svg" mode="aspectFill"></image></view>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-sort-popup',
	data() {
		return {
			show: false,
			currentIndex: 0,
			data: [
				{name:'综合排序',value:1}, 
				{name:"销量降序",value:2},
				{name:"销量升序",value:3},
				{name:"价格降序",value:4},
				{name:"价格升序",value:5}
			]
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
		toggle() {
			this.show ? this.close() : this.open();
		},
		// 获取当前弹窗状态
		onChangePopup(e) {
			this.show = e.show;
			this.$emit('change',this.show)
		},
		//选择排序方式
		onSelectIndex(item, index) {
			this.currentIndex = index;
			this.$emit('select', item);
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
