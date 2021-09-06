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
								{{goodsVO.price}}
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
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
				<view class="image-lists">
					<view class="flex-center-center image-item"><image class="icon-carme" src="../../../static/images/icons/icon-carme.svg" mode="aspectFill"></image></view>
					<!-- 显示上传后的照片 -->
					<view v-if="false" class="image-item flex-center-center">
						<image class="upload-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- 课程评价 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">课程评价</text>
					<rate :readonly="false" @change="(num)=>{rateChange(2, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
			</view>
			<!-- 题库评分 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">题库评分</text>
					<rate :readonly="false" @change="(num)=>{rateChange(3, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
			</view>
			<!-- 考试评分 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">考试评分</text>
					<rate :readonly="false" @change="(num)=>{rateChange(4, num)}"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
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
				goodsScore: 0,
				courseScore: 0,
				questionScore: 0,
				examScore: 0
			},
			goodsVO: {} //商品对象
		};
	},
	onLoad(option){
		this.goodsVO = JSON.parse(decodeURIComponent(option.goodsVO));
		this.evaluateVO.goodsId = option.goodsId;
		this.evaluateVO.orderNum = this.goodsVO.goodsId;
	},
	methods: {
		
		goBack(){
			uni.navigateBack();
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
