<!-- 商品 参数 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="title flex-center">参数</view>
				<view v-if="classNum > 0" class="flex-center row-item">
					<text class="label">课时：</text>
					<text class="text">{{classNum}}课时</text>
				</view>
				<view v-if="classNum > 0" class="flex-center row-item">
					<text class="label">课程方式：</text>
					<text class="text">{{type}}</text>
				</view>
				<view v-if="questionCount > 0" class="flex-center row-item">
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
		goodsInfo:{ //商品信息
			type:Object,
			required:true
		}
	},
	data() {
		return {
			classNum:0, //课时
			type:"", //课程方式
			questionCount:0 //题库数量
		};
	},
	watch:{
		goodsInfo(newV,oldV){
			if(newV.courseVO && newV.courseVO.classNum > 0){
				this.classNum = newV.courseVO.classNum;
				switch(newV.courseVO.type){
					case 1 :
						this.type = "录播课";
					case 2 :
						this.type = "线下课";
					case 2 :
						this.type = "直播课"
				}
			}
			if(newV.questionBankVO && newV.questionBankVO.questionCount > 0){
				this.questionCount = newV.questionBankVO.questionBankVO;
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
