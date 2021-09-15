<!-- 我要入驻 -->
<template>
	<view class="check-in">
		<image class="banner" src="../../../static/images/check-in-banner.png" mode="aspectFill"></image>
		<!-- 入驻介绍 -->
		<view class="box">
			<view class="title text-bold flex-center">入驻介绍</view>
			<view class="message">成为入驻商家，可享受xxxxxxxxxxxxx等福利，为您提供更多便利。</view>
		</view>
		<!--商家等级规则-->
		<view class="box">
			<view class="title text-bold flex-center">商家等级规则</view>
			<view class="lists">
				<view class="item flex-center" v-for="(item,index) in levelData" :key="index">
					<image class="image" :src="item.image" mode="aspectFill"></image>
					<view class="right flex-1">
						<view class="text-bold level-name">等级1</view>
						<view class="desc">
							总营业额达
							<text class="color-red">1</text>
							元
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 入驻button -->
		<view class="flex-center-between bottom-btn">
			<navigator url="../check-in-person/check-in-person" class="btn-block red text-bold" @click="toPerson">个人入驻</navigator>
			<navigator url="../check-in-merchant/check-in-merchant" class="btn-block blue text-bold" @click="toJigou">企业入驻</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			levelData: [
				{
					image:'../../../static/images/check-in-level.png',
					level:'等级1',
					number:'1'
				},
				{
					image:'../../../static/images/check-in-level.png',
					level:'等级2',
					number:'500'
				},
				{
					image:'../../../static/images/check-in-level.png',
					level:'等级3',
					number:'100'
				},
				{
					image:'../../../static/images/check-in-level.png',
					level:'等级4',
					number:'1000'
				}
			]
		};
	},
	methods: {
		// 个人入驻
		toPerson(){
			uni.navigateTo({
				url:'/pages-user/mine/check-in-person/check-in-person'
			})
		},
		// 机构入驻
		toJigou(){
			uni.navigateTo({
				url:'/pages-user/mine/check-in-merchant/check-in-merchant'
			})
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
