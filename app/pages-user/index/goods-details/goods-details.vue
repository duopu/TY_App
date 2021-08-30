<template>
	<view class="goods">
		<scroll-view scroll-y="true" class="goods-content">
			<!-- banner -->
			<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true">
			    <swiper-item v-for="(item,index) in goodsInfo.img" :key="`banner-${index}`">
			        <image class="banner-image" :src="item" mode="aspectFill"></image>
			    </swiper-item>                                      
			</swiper>
			<!-- 具体信息 -->
			<view class="box">
				<view class="flex-center-between">
					<view class="name text-bold">{{goodsInfo.goodsName}}</view>
					<view class="text color-9">{{goodsInfo.sales}}人学习</view>
				</view>
				<view class="flex-center-between m-top-20">
					<view class="flex-center">
						<view class="price">
							<text class="unit">¥</text>
							500
						</view>
						<text class="line">-</text>
						<view class="price">
							<text class="unit">¥</text>
							500
						</view>
					</view>
					<!-- 分销申请审核中 -->
					<view v-if="false" class="state">分销申请审核中</view>
					<view @click="openPopup('distributePopup')" v-if="true" class="state color-2 flex-center">
						<image class="icon-share" src="" mode="aspectFill"></image>
						申请分销
					</view>
				</view>
			</view>
			<!-- 选择 -->
			<view class="box">
				<!-- 选择 -->
				<view class="flex row">
					<text class="label color-9">选择</text>
					<view class="flex-1">
						<view class="flex-center-between">
							<text>属性分类</text>
							<image @click="openPopup('classifyPopup')" class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
						</view>
						<view class="checkbox-lists">
							<view v-for="(item,index) in goodsInfo.goodsAttributesVOList" :key="`goodsAttribute-${index}`" class="item">{{item.attributesName}}</view>
							<view class="item">共{{goodsInfo.goodsAttributesVOList.length}}种型号可选</view>
						</view>
					</view>
				</view>
				<!-- 发货 -->
				<view class="flex row">
					<text class="label color-9">发货</text>
					<view class="flex-1">
						<view class="flex-center-between">
							<text>{{goodsInfo.city}}{{goodsInfo.area}} 快递:免快递费</text>
							<image class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
						</view>
						<view class="color-9 m-top-20">配送至：江苏省南京市江宁区雨花街道</view>
					</view>
				</view>
				<!-- 保障 -->
				<view class="flex row">
					<text class="label color-9">保障</text>
					<view class="flex-1 flex-center-between">
						<view class="ensure-lists">
							<view class="item blue">企业认证</view>
							<view class="item yellow">平台认证</view>
							<view class="item red">保证金</view>
						</view>
						<image @click="openPopup('ensurePopup')" class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 参数 -->
				<view class="flex">
					<text class="label color-9">参数</text>
					<view class="params-lists flex-1">
						<view class="item">课时</view>
						<view class="item">课程方式</view>
						<view class="item">题库数量</view>
						<view class="item">有效时长</view>
					</view>
					<image @click="openPopup('parameterPopup')" class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 横向菜单 -->
			<custom-horizontal-tabs @change="getTabsIndex" :currentIndex="tabsIndex" :data="tabsData"></custom-horizontal-tabs>
			<!--  tab 介绍 -->
			<tabs-brief v-if="tabsIndex === 0"></tabs-brief>
			<!-- tab 商品 -->
			<tabs-goods v-if="tabsIndex === 1"></tabs-goods>
			<!-- tab 目录 -->
			<tabs-catalogue v-if="tabsIndex === 2"></tabs-catalogue>
			<!-- tab 题库 -->
			<tabs-bank v-if="tabsIndex === 3"></tabs-bank>
			<!-- tab 考试 -->
			<tabs-exam v-if="tabsIndex === 4"></tabs-exam>
			<!-- tab 推荐-->
			<tabs-recommend v-if="tabsIndex === 5"></tabs-recommend>
		</scroll-view>
		<!-- 底部 -->
		<view class="goods-bottom flex-center-between">
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>店铺</text>
			</view>
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>客服</text>
			</view>
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>收藏</text>
			</view>
			<!-- 拼团或正常购买 -->
			<block v-if="false">
				<button class="btn btn-light">加入购物车</button>
				<button class="btn btn-block">立即购买</button>
			</block>
			<block v-if="true"><button @click="openPopup('groupPopup')" class="btn btn-block flex-1">参与拼团</button></block>
		</view>
		<!-- 弹窗 属性分类 -->
		<goods-classify-popup ref="classifyPopup" 
		:attributes="goodsInfo.goodsAttributesVOList" 
		:thumbnail="goodsInfo.thumbnail" 
		@submit="goodsAttributesSubmit"></goods-classify-popup>
		<!-- 弹窗 保障 -->
		<goods-ensure-popup ref="ensurePopup"></goods-ensure-popup>
		<!-- 弹窗 参数 -->
		<goods-parameter-popup ref="parameterPopup"></goods-parameter-popup>
		<!-- 弹窗 分销 -->
		<goods-distribute-popup ref="distributePopup"></goods-distribute-popup>
		<!-- 弹窗 参与拼团 -->
		<goods-group-popup ref="groupPopup"></goods-group-popup>
	</view>
</template>

<script>
import TabsBrief from './tabs-brief.vue';
import TabsGoods from './tabs-goods.vue';
import TabsBank from './tabs-bank.vue';
import TabsExam from './tabs-exam.vue';
import TabsCatalogue from './tabs-catalogue.vue';
import TabsRecommend from './tabs-recommend.vue';
export default {
	components: {
		TabsBrief,
		TabsGoods,
		TabsBank,
		TabsExam,
		TabsRecommend,
		TabsCatalogue
	},
	data() {
		return {
			tabsData: ['介绍', '商品', '目录', '题库', '考试', '推荐'],
			tabsIndex: 2,
			goodsId:undefined,
			goodsInfo:{
				img:[], //banner图
				goodsAttributesVOList:[] //商品属性
			}
		};
	},
	onLoad(option) {
		this.goodsId = option.goodsId;
		this.getGoodsInfo();
	},
	methods: {
		// 获取当前 tab index
		getTabsIndex(index) {
			this.tabsIndex = index;
		},
		//打开弹窗；参数：弹窗的ref名
		openPopup(value) {
			this.$refs[value].open();
		},
		
		/**
		 * 获取商品详情
		 */	
		getGoodsInfo(){
			this.$http
				.get('/goods/queryInfoByLogin', {goodsId:this.goodsId}, true)
				.then(res => {
					this.goodsInfo = res;
				});
		},
		
		/**
		 * 商品属性提交回调
		 */
		goodsAttributesSubmit({goodsAttributes,count}){
			console.log("商品属性 == ",goodsAttributes);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
