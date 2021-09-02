<template>
	<view class="ticket-lists-item">
		<view class="left flex-column-center">
			<view class="price">
				<view><text class="unit">¥</text> {{data.couponAmount}}</view>
			</view>
			<view class="sum">{{data.couponTypeContent}}</view>
		</view>
		<view class="right flex-center">
			<view class="flex-column flex-1">
				<view class="name">{{data.couponName}}</view>
				<view class="flex-center desc">
					<image class="icon" src="../../static/images/icons/icon-gth.svg" mode="aspectFill"></image>
					<text >{{data.ruleDescription}}</text>
				</view>
				<view class="time">{{data.effectContent}} 12454444444444444444</view>
			</view>
			<!-- 商品未领取 -->
			<button v-if="data.userReceive === 1" class="btns text-bold" @click="collectCoupon">领取</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ticket-lists-item',
	emits:['collect'],
	props:{
		data:{
			type:Object,
			required:true,
			default:{
				couponAmount:0 ,//优惠券面值
				couponName:undefined, //优惠券名称
				couponTypeContent:undefined, //优惠券类型说明
				effectContent:undefined, //优惠券生效内容（开始时间-结束时间）
				ruleDescription:undefined, //优惠券使用规则说明
				userReceive:1 //用户是否已领取
			}
		}
	},
	data() {
		return {};
	},
	methods:{
		// 领取优惠券
		collectCoupon(){
			this.$emit("collect");
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
