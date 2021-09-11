<!-- 发表评价 -->
<template>
	<view class="evaluate flex-column">
		<!-- 头部 -->
		<view class="evaluate-top flex-center-between">
			<image class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill" @click="goBack"></image>
			<text class="title text-bold flex-1">发表评价</text>
			<button class="btn" @click="submit">发布</button>
		</view>
		<scroll-view scroll-y="true" class="evaluate-content">
			<!-- 评价的商品 -->
			<view class="store">
				<view class="flex-center-between top">
					<view class="name">评价商品</view>
				</view>
				<view class="content flex">
					<image class="avatar-image" :src="goodsVO.thumbnail" mode="aspectFill"></image>
					<view class="flex-column flex-1 right">
						<view class="title">{{goodsVO.goodsName}}</view>
						<view class="tag"><view v-if="goodsVO.attributesId" class="tag-item">{{goodsVO.attributesName}}</view></view>
						<view class="flex-center-between">
							<view class="price">
								<text class="unit">¥</text>
								{{goodsVO.goodsPrice}}
							</view>
							<view class="number">×{{goodsVO.goodsNum}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 商品评价 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">商品评分</text>
					<rate :readonly="false" @change="(num)=>{rateChange(1, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" v-model="evaluateVO.goodsEvaluation" :maxlength="200"/>
				<uni-file-picker  limit="9" mode="grid" :image-styles="{width:84, height:84}" @select="selectGoodsImg" @delete="deleteGoodsImg">
					<view class="flex-center-center image-item">
						<image class="icon-carme" src="../../../static/images/icons/icon-carme.svg" mode="aspectFill"></image>
					</view>
				</uni-file-picker>	
			</view>
			
			<!-- 课程评价 -->
			<view class="box" v-if="checkGoodsRexourceVO.courseCheck === 2">
				<view class="flex-center">
					<text class="text-bold box-title">课程评价</text>
					<rate :readonly="false" @change="(num)=>{rateChange(2, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" v-model="evaluateVO.courseEvaluation" :maxlength="200"/>
			</view>
			<!-- 题库评分 -->
			<view class="box" v-if="checkGoodsRexourceVO.questionCheck === 2">
				<view class="flex-center">
					<text class="text-bold box-title">题库评分</text>
					<rate :readonly="false" @change="(num)=>{rateChange(3, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" v-model="evaluateVO.questionEvaluation" :maxlength="200"/>
			</view>
			<!-- 考试评分 -->
			<view class="box" v-if="checkGoodsRexourceVO.examCheck === 2">
				<view class="flex-center">
					<text class="text-bold box-title">考试评分</text>
					<rate :readonly="false" @change="(num)=>{rateChange(4, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" v-model="evaluateVO.examEvaluation" :maxlength="200"/>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			evaluateVO: { //评价对象
				goodsId: undefined,
				orderNum: undefined,
				evaluateImg: [], //商品评论图片
				goodsEvaluation: undefined, 
				goodsScore: 0,
				courseScore: 0,
				courseEvaluation: undefined,
				questionEvaluation: undefined,
				questionScore: 0,
				examEvaluation: undefined,
				examScore: 0
			},
			goodsVO: {}, //商品对象
			goodsEvaluateImgs:[], //要上传的商品评论图片
			checkGoodsRexourceVO:{
				courseCheck: 1, //是否包含课程资源 1 未包含 2 包含
				entityGoodsCheck: 1, //是否包含实体商品资源 1 未包含 2 包含
				examCheck: 1, //是否包含考试资源 1 未包含 2 包含
				questionCheck: 1 //是否包含题库资源 1 未包含 2 包含
			}
		};
	},
	onLoad(option){
    console.log(1,option.goodsVO);
		this.goodsVO = JSON.parse(decodeURIComponent(option.goodsVO));
		this.evaluateVO.goodsId = this.goodsVO.goodsId;
		this.evaluateVO.orderNum = this.goodsVO.orderNum;
		this.checkGoodsResource();
	},
	methods: {
		
		// 返回上个页面
		goBack(){
			uni.navigateBack();
		},
		
		// 查询商品包含资源（实体商品，课程，题库，考试）情况
		checkGoodsResource(){
			this.$http
				.get('/goods/checkResource', {goodsId:this.goodsVO.goodsId}, true)
				.then(res => {
					this.checkGoodsRexourceVO = res;
				});
		},
		
		/**
		 * 评分变化时
		 * @param {Object} type 评分类型  1商品评分 2课程评分 3题库评分 4考试评分
		 * @param {Object} num 当前分数
		 */
		rateChange(type, num){
			if(type === 1){
				this.evaluateVO.goodsScore = num;
			}else if(type === 2){
				this.evaluateVO.courseScore = num;
			}else if(type === 3){
				this.evaluateVO.questionScore = num;
			}else if(type === 4){
				this.evaluateVO.examScore = num;
			}
		},
		
		// 图片选择回调
		selectGoodsImg(e){
			let formData = {
				file: e.tempFiles[0].file,
				path: e.tempFilePaths[0]
			}
			this.$http
				.upload(formData, true)
				.then(res => {
					this.goodsEvaluateImgs.push({
						tempFilePath: formData.path, //本地文件路径
						serviceFilePath: res, //上传到服务器后的文件路径
					});
				});
		},
		
		// 图片删除回调
		deleteGoodsImg(e){
			for(var i=0; i<this.goodsEvaluateImgs.length; i++){
				if(this.goodsEvaluateImgs[i].tempFilePath === e.tempFilePath) {
					this.goodsEvaluateImgs.splice(i, 1);
				}
			}
		},
		
		// 发布评价
		submit(){
			if(this.evaluateVO.goodsScore === 0){
				this.$tool.showToast("请给商品打分");
				return
			}
			
			if(this.evaluateVO.courseScore === 0){
				this.$tool.showToast("请给课程打分");
				return
			}
			
			if(this.evaluateVO.questionScore === 0){
				this.$tool.showToast("请给题库打分");
				return
			}
			
			if(this.evaluateVO.examScore === 0){
				this.$tool.showToast("请给考试打分");
				return
			}
			
			this.evaluateVO.evaluateImg = this.goodsEvaluateImgs.map(function(value){
				return value.serviceFilePath
			});
			
			this.$http
				.post('/order/evaluate', this.evaluateVO, true)
				.then(res => {
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('onRefresh'); //通知上个页面刷新
					uni.navigateBack(); //返回到上个页面
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
