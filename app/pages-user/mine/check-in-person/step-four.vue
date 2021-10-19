<template>
	<view class="check-in-form">
		<view class="mesage text-bold">
			请先 <text class="download color-primary">下载承诺书</text> ，签署后，将本人手持承诺书的照片上
			传至系统。
		</view>
		<view class="image-lists flex-column-center">
			<view class="item upload-image" @click="selectCommitmentBook">
				<image class="image" v-if="contractInfo.commitmentBook" :src="contractInfo.commitmentBook" mode="aspectFill"></image>
				<image class="image-photo" v-else src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="text-bold">请上传手持承诺书照片</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'StepFour',
	props:{
		contractInfo:{
			type:Object,
			default:()=>{}
		}
	},
	data() {
		return {};
	},
	computed:{
		// commitmentBook(){
		// 	return this.contractInfo.commitmentBook || '../../../static/images/check-in-photo.png'
		// }
	},
	methods:{
		selectCommitmentBook(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: (e) => {
					let formData = { 
						file: e.tempFiles[0],
						path: e.tempFilePaths[0]
					}
					// 上传图片
					this.$http.upload(formData).then(res => {
						this.$emit('changeContractInfo',{commitmentBook:res})
					})
				}
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
