<!-- 金币抵扣 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-center">
				<text class="title text-bold">金币抵扣</text>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view class="popup-content" scroll-y="true">
				<view class="row flex-center-between" @click="changeDiscount(1)">
					<view class="text">{{goldCoin}}金币 可抵扣{{goldDeductionAmount}}元</view>
					<view class="radio" :class="{ on: isUseGoldCoin === 1 }"></view>
				</view>
				<view class="row flex-center-between" @click="changeDiscount(0)">
					<view class="text">不使用金币抵扣</view>
					<view class="radio" :class="{ on: isUseGoldCoin === 0 }"></view>
				</view>
			</scroll-view>
			<view class="popup-bottom"><button class="btn" @click="submit()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'confirm-dicount-popup',
	emits: ['submit'],
	props: {
		useGoldCoin: { //是否使用金币  0不使用  1使用
			type: Number,
			default: 0
		},
		goldCoin: { //能使用金币数量
			type: Number,
			default: 0
		},
		goldDeductionAmount: { //金币抵扣金额
			type: Number,
			default: 0
		}
	},
	data() {
		return{
			isUseGoldCoin: this.useGoldCoin //是否使用金币
		}
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 选择折扣
		changeDiscount(value) {
			this.isUseGoldCoin = value;
		},
		// 提交
		submit() {
			if(this.useGoldCoin !== this.isUseGoldCoin){
				this.$emit('sbumit',this.isUseGoldCoin);
			}
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
