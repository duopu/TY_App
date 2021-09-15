<!-- 电子凭证弹窗 -->
<template>
	<uni-popup ref="popup">
		<view class="popup-main">
			<view class="text-bold title">查看电子凭证</view>
			
			<!-- 文本 -->
			<view v-if="examVO.type === 1" class="msg">{{examVO.examVoucher}}</view>
			
			<!-- 图片 -->
			<swiper v-if="examVO.type === 2" class="pictures" :indicator-dots="true">
				<swiper-item v-for="(value,index) in examVO.examImg" :key="`exam-img-${index}`">
					<image :src="value" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			
			<!-- 文件 -->
			<view v-if="examVO.type === 3" class="file" @click="download">{{examVO.fileName}}</view>
			
			<button class="btn" @click="close()">确定</button>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'order-exam-certificate',
	props: {
		data: {
			teyp: Object,
			default: {
				examId: undefined,
				type: 1,
				examVoucher: undefined,
				examImg: [],
				fileName: undefined,
				filePath: undefined
			}
		}
	},
	data() {
		return {
			examVO: this.data
		};
	},
	watch: {
		data(newV, oldV){
			this.examVO = newV;
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
		// 文件下载
		download(){
			uni.downloadFile({
			    url: this.examVO.filePath, 
			    success: (res) => {
			        if (res.statusCode === 200) {
			            this.$tool.showSuccess("文件下载成功");
			        }
			    }
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
