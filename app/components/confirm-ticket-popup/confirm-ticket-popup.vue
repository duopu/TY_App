<!-- 商家优惠券 弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-center">
				<text class="title text-bold">{{title}}</text>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view class="popup-content" scroll-y="true">
				<block v-for="(item, index) in dataList" :key="`store-coupon-${index}`">
					<ticket-lists-item :data="item" 
					:canSelect="true" 
					:isSelect="chooseStoreCouponId === item.couponId" 
					@onSelect="onSelect"></ticket-lists-item>
				</block>
			</scroll-view>
			<view class="popup-bottom"><button class="btn" @click="submit">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'confirm-ticket-popup',
	emits: ['submit'],
	props:{
		// 弹窗标题
		title: {
			type: String,
			required: true
		},
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
			couponId:this.selectCouponId, //一开始选中商品优惠券ID
			chooseStoreCouponId:this.selectCouponId //最终选择商品优惠券ID
		};
	},
	watch: {
		couponList(newV, oldV){
			this.dataList = newV;
		},
		selectCouponId(newV, oldV){
			this.couponId = newV;
			this.chooseStoreCouponId = newV;
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
		submit(){
			// 如果一开始选中的跟最终选中优惠券不是同一个，才触发提交的回调，避免重复去调接口
			if(this.couponId !== this.chooseStoreCouponId){
				this.$emit("submit",this.chooseStoreCouponId);
			}
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
