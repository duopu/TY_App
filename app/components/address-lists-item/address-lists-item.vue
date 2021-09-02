<!-- 收货地址 -->
<template>
	<!-- 地址 -->
	<view class="address-item">
		<view class="flex-center" @click="itemClick">
			<image src="../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">{{data.name}} {{data.phone}}</view>
				<view class="desc">{{data.provinceName}} {{data.cityName}} {{data.areaName}} {{data.streetName}} {{data.address}}</view>
			</view>
			<image class="icons" src="../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
		</view>
		<view class="flex-center-between item-bottom">
			<!-- 选中 on -->
			<view class="radio":class="{on:data.isDefault === 1}" @click="setDefault()"></view>
			<text class="flex-1">默认地址</text>
			<image mode="aspectFill" class="icons" src="../../static/images/icons/icon-black-clear.svg" @click="deleteAddress()"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'address-lists-item',
	emits:['deleteAddress','setDefault','itemClick'],
	props:{
		data:{
			type:Object,
			required:true
		}
	},
	data() {
		return {};
	},
	methods:{
		// 设置为默认地址
		setDefault(){
			if(this.data.isDefault === 0){
				this.$emit("setDefault");
			}
		},
		/**
		 * 删除地址
		 */
		deleteAddress(){
			this.$emit("deleteAddress")
		},
		
		// 配送地址点击事件
		itemClick(){
			this.$emit("itemClick")
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
