<!-- 商家优惠券 弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-center">
				<text class="title text-bold">商家优惠券</text>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view class="popup-content" scroll-y="true">
				<block v-for="(item, index) in couponList" :key="`store-coupon-${index}`">
					<ticket-lists-item :data="item" 
					:canSelect="true" 
					:isSelect="selectCouponId === item.couponId" 
					@onSelect="onSelect"></ticket-lists-item>
				</block>
			</scroll-view>
			<view class="popup-bottom"><button class="btn" @click="sumbit">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'confirm-ticket-popup',
	emits: ['submit'],
	props:{
		// 可使用的优惠券
		couponList: {
			type: Array,
			default:()=>[]
		},
		// 选中的优惠券ID
		selectCouponId: {
			type: Number,
			default: undefined
		}
	},
	data() {
		return {
			dataList:this.couponList,
			couponId:this.selectCouponId,
			chooseStoreCouponId:this.selectCouponId //最终选择商品优惠券ID
		};
	},
	watch: {
		couponList(newV, oldV){
			this.dataList = newV;
		},
		selectCouponId(newV, oldV){
			this.couponId = newV;
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
		// 优惠券被选中/取消选中
		onSelect(item){
			if(item.select){
				this.chooseStoreCouponId = item.couponId;
			}else {
				this.chooseStoreCouponId = undefined;
			}
		},
		// 确定
		sumbit(){
			this.$emit("sumbit",this.chooseStoreCouponId);
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
