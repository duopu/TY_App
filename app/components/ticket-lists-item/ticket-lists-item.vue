<template>
	<view class="ticket-lists-item">
		<view class="left flex-column-center">
			<view class="price">
				<view>
					<text class="unit">¥</text>
					{{ data.couponAmount }}
				</view>
			</view>
			<view class="sum">{{ data.couponTypeContent }}</view>
		</view>
		<view class="right flex-center">
			<view class="flex-column flex-1">
				<view class="name">{{ data.couponName }}</view>
				<view class="flex-center desc">
					<image class="icon" src="../../static/images/icons/icon-gth.svg" mode="aspectFill"></image>
					<text>{{ data.ruleDescription }}</text>
				</view>
				<view class="time">有效期: {{ data.effectContent }}</view>
			</view>
			<!-- 商品未领取 -->
			<button v-if="data.userReceive === 1" class="btns text-bold" @click="collectCoupon">领取</button>
			<!-- 商品已领取 -->
			<button v-if="data.userReceive === 2" class="btns text-bold disabled">已领取</button>

			<!-- 选择优惠券 -->
			<!-- 选中 on -->
			<view class="flex-center-center select" v-if="canSelect">
				<view class="radio" :class="{on:select}" @click="setSelect"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ticket-lists-item',
	emits: ['collect', 'onSelect'],
	props: {
		data: {
			type: Object,
			required: true,
			default: () => ({
				couponAmount: 0, //优惠券面值
				couponName: undefined, //优惠券名称
				couponTypeContent: undefined, //优惠券类型说明
				effectContent: undefined, //优惠券生效内容（开始时间-结束时间）
				ruleDescription: undefined, //优惠券使用规则说明
				userReceive: 1 //用户是否已领取
			})
		},
		canSelect: { //是否需要选中优惠券的功能
			type: Boolean,
			default: false
		},
		isSelect: { //当前优惠券是否被选中
			type: Boolean,
			default: false
		}
	},
	watch: {
		isSelect(newV, oldV){
			this.select = newV
		}
	},
	data() {
		return {
			select:this.isSelect
		};
	},
	methods: {
		// 领取优惠券
		collectCoupon() {
			this.$emit('collect');
		},
		
		// 选中
		setSelect(){
			this.select = !this.select;
			this.$emit('onSelect',{...this.data, select:this.select});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
