<!-- 关联账号 -->
<template>
	<view class="relate-account">
		<view class="title text-bold">
			关联其他账号
		</view>
		<!-- 列表 -->
		<view class="lists-item flex-center-between" v-for="(item,index) in ['','','','']" :key="index">
			<image class="item-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name text-bold">管理员1号</view>
				<view class="account">1584678225</view>
			</view>
			<view class="custom-normal-switch flex-center" :class="{'on':currentIndex === index}" @click="changeSwicth(index)">
				<view class="circle"></view>
			</view>
		</view>
		<!-- button -->
		<button class="btn-light text-bold">+ 添加关联账号</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentIndex:0,
		};
	},
	methods:{
		changeSwicth(value){
			if(value === this.currentIndex) this.currentIndex = -1;
			this.currentIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less">

</style>
