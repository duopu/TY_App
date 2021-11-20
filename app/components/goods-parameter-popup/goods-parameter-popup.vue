<!-- 商品 参数 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="title flex-center">参数</view>
				<view v-if="showCourse && classNum !== null" class="flex-center row-item">
					<text class="label">课时：</text>
					<text class="text">{{classNum}}课时</text>
				</view>
				<view v-if="showCourse && type !== null" class="flex-center row-item">
					<text class="label">课程方式：</text>
					<text class="text">{{type}}</text>
				</view>
				<view v-if="showQuestion && questionCount !== null" class="flex-center row-item">
					<text class="label">题库数量：</text>
					<text class="text">{{questionCount}}题</text>
				</view>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom"><button class="btn btn-block" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>
<script>
export default {
	name: 'goods-parameter-popup',
	props: {
		goodsInfo: { //商品信息
			type: Object,
			required: true
		},
		courseCheck: { // 是否包含课程资源 1 未包含 2 包含
			type: Number,
			required: true
		},
		questionCheck: { // 是否包含题库资源 1 未包含 2 包含
			type: Number,
			required: true
		}
	},
	data() {
		return {
			showCourse: false,
			showQuestion: false,
			classNum:null, //课时
			type:null, //课程方式
			questionCount:null //题库数量
		};
	},
	watch:{
		goodsInfo: {
			immediate: true,
			deep: true,
			handler(newV, oldV){
				if(newV.courseVO){
					this.classNum = newV.courseVO.classNum || 0;
					switch(newV.courseVO.type){
						case 1 :
							this.type = "录播课";
						case 2 :
							this.type = "线下课";
						case 3 :
							this.type = "直播课"
					}
				}
				if(newV.questionBankVO){
					this.questionCount = newV.questionBankVO.questionCount || 0;
				}
			}
		},
		courseCheck(newV, oldV){
			this.showCourse = newV == 2
		},
		questionCheck(newV, oldV){
			this.showQuestion = newV == 2
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
