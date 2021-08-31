<!-- 保障 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="title flex-center">保障</view>
				<view v-if="detail.type === 2" class="flex text-end row-item">
					<text class="label">企业认证：</text>
					<image class="auth-image" :src="detail.businessLicense" mode="aspectFill" @click="previewImg()"></image>
				</view>
				<view class="flex-center row-item">
					<text class="label">平台认证：</text>
					<text class="text">{{detail.platformAuthenticationContent}}</text>
				</view>
				<view class="flex-center row-item">
					<text class="label">保证金：</text>
					<text class="text">{{detail.bondContent}}</text>
				</view>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom"><button class="btn btn-block" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-ensure-popup',
	props:{
		goodsInfo:{
			type:Object,
			default:{
				businessLicense:"", //营业执照
				bondContent:"", //保证金
				platformAuthenticationContent:"", //平台认证
				type:1 //店铺类型
			}
		}
	},
	data() {
		return {
			detail:{
				businessLicense:this.goodsInfo.businessLicense,
				bondContent:this.goodsInfo.bondContent,
				platformAuthenticationContent:this.goodsInfo.platformAuthenticationContent,
				type:this.goodsInfo.type
			}
		};
	},
	watch:{
		goodsInfo(newV, oldV){
			this.detail = {
				businessLicense:newV.businessLicense,
				bondContent:newV.bondContent,
				platformAuthenticationContent:newV.platformAuthenticationContent,
				type:newV.type
			}
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
		// 预览图片
		previewImg(){
			uni.previewImage({
			    urls: [this.detail.businessLicense]   
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
