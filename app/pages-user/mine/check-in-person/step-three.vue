<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<check-in-form-item label="*头像" :arrow="true" class="m-top-60" @rowClick="selectAvatar">
			<image class="image-avatar" :src="avatar" mode="aspectFill" ></image>
		</check-in-form-item>
		<check-in-form-item label="*店铺名称">
			<input v-model="shopInfo.storeName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*主营类目" :align="'start'">
			<textarea v-model="shopInfo.mainDesc" type="text" class="input textarea h-180" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*店铺简介" :align="'start'">
			<textarea v-model="shopInfo.storeDesc" type="text" class="input textarea h-300" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
	</scroll-view>
</template>

<script>
export default {
	name: 'StepThree',
	props:{
		shopInfo:{
			type:Object,
			default:()=>{}
		}
	},
	data() {
		return {
		};
	},
	computed:{
		avatar(){
			return this.shopInfo.avatar || '../../../static/images/other/girl.png'
		}
	},
	methods:{
		selectAvatar(){
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
						this.$emit('changeShopInfo',{...this.shopInfo,avatar:res})
					})
				}
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
