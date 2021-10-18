<!-- 商品 拼团 -->
<template>
	<uni-popup class="custom-popup" ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="title text-bold">
				拼团详情
				<image @click="close()" class="icon-close" src="../../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="row">
				<text class="label text-bold">团购开始时间：</text>
				<text class="color-6">{{detail.startTime}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">团购结束时间：</text>
				<text class="color-6">{{detail.endTime}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">拼团规则：</text>
				<text class="color-6">{{detail.content}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">已参团人数：</text>
				<text class="color-6">{{detail.groupBuyNum}}</text>
			</view>
			<view class="row price">
				最低折扣：¥{{detail.minPrice}} - ¥{{detail.maxPrice}}
			</view>
			<view class="flex-center-between popup-bottom">
				<button class="btn flex-1" @click="openApp">{{`¥${detail.joinAmount}  打开App，查看更多内容`}}</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-group-popup',
	emits: ['openApp'],
	props: {
		data: {
			type: Object
		}
	},
	data() {
		return {
			detail: this.data
		};
	},
	watch: {
		data(newV, oldV){
			this.detail = newV;
		}
	},
	methods:{
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 打开App
		openApp(){
			this.$emit('openApp');
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
