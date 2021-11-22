<!-- 保证金 -->
<template>
	<view class="money">
		<view class="title text-bold">保证金总额</view>
		<!-- 金额 -->
		<view class="block-box">
			<view class="flex sum-money">
				<text class="unit">¥</text>
				{{ info.cashDepositAmount || 0 }}
			</view>
			<view class="flex-center-center">
				<button class="btn btn-block" v-if="!info.cashDepositState" @click="depositPay">立即缴纳</button>
				<!-- <button class="btn btn-light" v-else>保证金退款</button> -->
			</view>
		</view>
		<!-- 保证金说明 -->
		<view class="block-box">
			<view>保证金说明</view>
			<view class="describe">
				<view class="text">1.缴纳保证金后，方可使用商城功能</view>
				<view class="text">2.请按约定额度及时间缴纳保证金</view>
				<view class="text">3.可申请退还保证金</view>
			</view>
		</view>
		<common-payment-popup-easy ref="payment" @setOrderPaytypeSelect="setOrderPaytypeSelect"></common-payment-popup-easy>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			submitOrderVO:{},
		};
	},
	onLoad(){
		this.queryInfo();
	},
	methods:{
		queryInfo(){
			this.$http.get('/cash/deposit/queryInfo').then(res => {
				this.info = res;
			})
		},
		// 缴纳保证金 - 选择支付方式
		depositPay(){
			this.$refs.payment.open();
		},
		// 支付方式确定 ，拉起支付
		setOrderPaytypeSelect(paytype){
			console.log('支付方式确定',paytype);
			if(paytype == 1){ // 支付宝
				this.$http.post('/cash/deposit/aliPay',{},true).then(res=>{
					uni.requestPayment({
					    provider: 'alipay',
					    orderInfo: res.payContent, 
					    success:  (res)=> {
					        this.queryInfo();
					    },
					    fail:  (err)=> {
					        console.log('fail:' + JSON.stringify(err));
					    }
					});
				})
			}else{ //  微信支付
				this.$http.post('/cash/deposit/wechatPay',{},true).then(res=>{
					const param = {
							appid: res.appId,
							noncestr: res.nonceStr,
							package: res.pkg,
							partnerid: res.partnerId,
							prepayid: res.prepayId,
							timestamp: parseInt(res.timeStamp),
							sign: res.paySign
						}
					console.log('微信支付参数', param);
					uni.requestPayment({
					    provider: "wxpay", 
					    orderInfo: param,
					    success:  (res) =>{
							console.log('微信支付成功:' + JSON.stringify(res));
							this.queryInfo();
						},
					    fail:  (err) =>{
							console.log('微信支付失败:' + JSON.stringify(err));
						}
					})
				})
			}
		}
		
	}
};
</script>

<style src="./style.less" lang="less"></style>
