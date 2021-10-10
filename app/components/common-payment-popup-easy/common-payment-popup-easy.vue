<!-- 支付方式弹窗 -->
<template>
	<uni-popup ref="popup" class="popup">
		<view class="popup-main">
			<view class="popup-title flex-center-between">
				<view class="title">支付方式</view>
				<image @click="closePay" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="popup-content">
				<view class="flex-center-center row" @click="selectPay(2)">
					<image class="image" src="../../static/images/login/wx.png" mode="aspectFill"></image>
					<text class="text flex-1">微信支付</text>
					<view class="radio" :class="{ on: payIndex === 2 }"></view>
				</view>
				<view class="flex-center-center row" @click="selectPay(1)">
					<image class="image" src="../../static/images/login/zfb.png" mode="aspectFill"></image>
					<text class="text flex-1">支付宝支付</text>
					<view class="radio" :class="{ on: payIndex === 1 }"></view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'common-payment-popup-easy',
	emits: ['cancelPay'],
	
	data() {
		return {
			payIndex: undefined, //支付类型  1支付宝  2微信
			submitOrderVO: this.data //提交订单接口返回的对象
		};
	},
	watch: {
		data: {
			handler(newV, oldV){
				this.submitOrderVO = newV;
			},
			deep: true
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
		// 选择支付方式
		selectPay(value) {
			console.log('选择支付方式',value);
			this.$emit('setOrderPaytypeSelect',value);
			this.close()
		},
		// 关闭支付弹窗
		closePay(){
			uni.showModal({
			    title: '提示',
			    content: '是否取消支付',
			    success: (res) => {
			        if (res.confirm) {
			            this.close()
			        } 
			    }
			});
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
