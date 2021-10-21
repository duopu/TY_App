<template>
	<view class="check-in-form">
		<view class="mesage text-bold">
			请先 <text class="download color-primary" @click="downloadCommitment">下载承诺书</text> ，签署后，将本人手持承诺书的照片上
			传至系统。
		</view>
		<view class="image-lists flex-column-center">
			<view class="item" @click="selectCommitmentBook">
				<image class="image" v-if="contractInfo.commitmentBook" :src="contractInfo.commitmentBook"
					mode="aspectFill"></image>
				<image class="image-photo" v-else src="../../../static/images/check-in-photo.png" mode="aspectFill">
				</image>
			</view>
			<view class="text-bold">请上传手持承诺书照片</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'StepFour',
		props: {
			contractInfo: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {};
		},
		computed: {
			// commitmentBook(){
			// 	return this.contractInfo.commitmentBook || '../../../static/images/check-in-photo.png'
			// }
		},
		methods: {
			selectCommitmentBook() {
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
							this.$emit('changeContractInfo', {
								commitmentBook: res
							})
						})
					}
				});
			},
			downloadCommitment() {
				this.$http.post('/value/config/batchQuery', {
					codeList: ['UNDERTAKING']
				}).then(res => {
					const data = res[0];
					const content = data.content;
					this.downLoadAction(content);
				})
			},
			downLoadAction(url) {
				uni.showLoading()
				var name = '承诺书模板.docx'; //文件名称可以在上传时进行保存，下载时取出，当文件名称中存在单双引号时，要做好处理，否则会报错
				var dtask = plus.downloader.createDownload(url, {
					filename: "_downloads/" + name //利用保存路径，实现下载文件的重命名
				}, function(d, status) {
					uni.hideLoading()
					
					//d为下载的文件对象
					if (status == 200) {
						console.log('下载成功')
						//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
						this.localPath = plus.io.convertLocalFileSystemURL(d.filename);

						plus.runtime.openFile(d.filename); //选择软件打开文件
					} else { 
						console.log('下载失败')
						//下载失败
						plus.downloader.clear(); //清除下载任务
					}
				})
				dtask.start();
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
