<!-- 提现弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<!-- 头部 -->
			<view class="popup-title flex-center-between text-bold">
				<custom-horizontal-tabs class="flex-1" :data="tabsData" :currentIndex="tabIndex" @change="getTabIndex"></custom-horizontal-tabs>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill" />
			</view>
			<!-- 内容 -->
			<view class="popup-content">
				<view class="row-item flex-center-between">
					<text class="lable">{{tabIndex | filterName}}账号名称：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" v-model="form.receiptAccountName" />
				</view>
				<view class="row-item flex-center-between">
					<text class="lable">{{tabIndex | filterName}}账号：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" v-model="form.receiptAccount" />
				</view>
				<view class="row-item flex">
					<text class="lable">支付款收款码：</text>
					<view class="upload-image small" @click="_upload">
						<!-- 上传后的图片 -->
            <image v-if="form.receiptQrImg" class="img" :src="form.receiptQrImg" />
						<image v-else class="image-photo" src="../../static/images/check-in-photo.png" mode="aspectFill" />
					</view>
				</view>
			</view>
			<view class="flex-center-between popup-bottom"><button class="btn flex-1" @click="submit">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'wallet-withdrawal-popup',
	data() {
		return {
			tabIndex: 0,
			tabsData: ['支付宝提现', '微信提现'],
      form:{
        receiptAccount:'', // 收款账户
        receiptAccountName:'', // 收款账号名称
        receiptQrImg:'', // 收款码
      }
		};
	},
  filters:{
    filterName(tabIndex){
      return tabIndex === 0 ? '支付宝' : '微信'
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
    _upload(){
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
            this.form.receiptQrImg = res
					})
				}
			});
    },
		// 确定
		submit() {
      const form = {...this.form,receiptAccountType:this.tabIndex + 1}
      this.$emit('submit',form)
      this.close();
      this.form = {}
    },

		// 获取index
		getTabIndex(index) {
			this.tabIndex = index;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
