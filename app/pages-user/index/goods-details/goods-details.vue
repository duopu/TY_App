<template>
	<view class="goods">
		<scroll-view scroll-y="true" class="goods-content" @scroll="scrollHandle">
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
						<view class="price" v-if="priceArry.length>0">
							<text class="unit">¥</text>
							{{priceArry[0]}}
						</view>
						<text v-if="priceArry.length > 1" class="line">-</text>
						<view v-if="priceArry.length > 1" class="price">
							<text class="unit">¥</text>
							{{priceArry[1]}}
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
				<!-- 发货（只有实体商品才显示） -->
				<view v-if="entityGoodsCheck === 2" class="flex row">
					<text class="label color-9">发货</text>
					<view class="flex-1">
						<view class="flex-center-between">
							<text>{{goodsInfo.city}}{{goodsInfo.area}} 快递:免快递费</text>
							<image @click="goAddress()" class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
						</view>
						<view v-if="defaultAddress && defaultAddress.id" class="color-9 m-top-20">配送至：{{defaultAddress.provinceName}}{{defaultAddress.cityName}}{{defaultAddress.areaName}}{{defaultAddress.street}}</view>
					</view>
				</view>
				<!-- 保障 -->
				<view class="flex row">
					<text class="label color-9">保障</text>
					<view class="flex-1 flex-center-between">
						<view class="ensure-lists">
							<view v-if="goodsInfo.type === 2" class="item blue">企业认证</view>
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
						<view class="item" v-if="goodsInfo.courseVO && goodsInfo.courseVO.classNum > 0">课时</view>
						<view class="item" v-if="goodsInfo.courseVO && goodsInfo.courseVO.classNum > 0">课程方式</view>
						<view class="item" v-if="goodsInfo.questionBankVO && goodsInfo.questionBankVO.questionCount > 0">题库数量</view>
					</view>
					<image @click="openPopup('parameterPopup')" class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 横向菜单 -->
			<custom-horizontal-tabs id="custom-tabs"
			@change="getTabsIndex" 
			:currentIndex="tabsIndex" 
			:data="tabsData" 
			:class="{fixed:tabsFixed}"></custom-horizontal-tabs>
			<!-- Tabs内容 可左右滚动 -->
			<swiper :current="tabsIndex" 
			@change="menuSwiperChange"
			:style="{ height: swiperHeight + 'px' }">
				
				<swiper-item v-for="(item,index) in tabsData" 
				:key="`swiper-item-${index}`">
					<!--  tab 介绍 -->
					<tabs-brief v-if="item == '介绍'" 
					:id="`content-wrap-${index}`" 
					:goodsInfo="goodsInfo"></tabs-brief>
					
					<!--  tab 商品 -->
					<tabs-goods v-if="item == '商品'"  
					:id="`content-wrap-${index}`" 
					:entityGoodsVO="goodsInfo.entityGoodsVO"
					:entityCommentVOList="entityCommentVOList"></tabs-goods>
					
					<!--  tab 目录 -->
					<tabs-catalogue v-if="item == '目录'" 
					:id="`content-wrap-${index}`" 
					:courseVO="goodsInfo.courseVO"
					:courseCommentVOList="courseCommentVOList"></tabs-catalogue>
					
					<!--  tab 题库 -->
					<tabs-bank v-if="item == '题库'" 
					:id="`content-wrap-${index}`" 
					:questionBankVO="goodsInfo.questionBankVO"
					:questionCommentVOList="questionCommentVOList"></tabs-bank>
					
					<!--  tab 考试 -->
					<tabs-exam v-if="item == '考试'" 
					:id="`content-wrap-${index}`" 
					:examVO="goodsInfo.examVO" 
					:examCommentVOList="examCommentVOList"></tabs-exam>
					
					<!--  tab 推荐 -->
					<tabs-recommend v-if="item == '推荐'" 
					:id="`content-wrap-${index}`" 
					:goodsBottomHeight="goodsBottomHeight" 
					:tabsHeight="tabsHeight"></tabs-recommend>
			    </swiper-item>
			</swiper>
		</scroll-view>
		<!-- 底部 -->
		<view class="goods-bottom flex-center-between" id="goods-bottom">
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>店铺</text>
			</view>
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>客服</text>
			</view>
			<view class="flex-column">
				<image class="icons" v-if="goodsInfo.userCollection === 2" src="../../../static/images/icons/icon-star-selected.svg" mode="aspectFill" @click="collectClick(false)"></image>
				<image class="icons" v-else src="../../../static/images/icons/icon-star.svg" @click="collectClick(true)"></image>
				<text>收藏</text>
			</view>
			<!-- 拼团或正常购买 -->
			<block v-if="true">
				<button class="btn btn-light">加入购物车</button>
				<button class="btn btn-block" @click="jumpConfirm">立即购买</button>
			</block>
			<block v-if="false"><button @click="openPopup('groupPopup')" class="btn btn-block flex-1">参与拼团</button></block>
		</view>
		<!-- 弹窗 属性分类 -->
		<goods-classify-popup ref="classifyPopup" 
		:goodsInfo="goodsInfo" 
		@submit="goodsAttributesSubmit"></goods-classify-popup>
		<!-- 弹窗 保障 -->
		<goods-ensure-popup ref="ensurePopup" 
		:goodsInfo="goodsInfo" ></goods-ensure-popup>
		<!-- 弹窗 参数 -->
		<goods-parameter-popup ref="parameterPopup" 
		:goodsInfo="goodsInfo"></goods-parameter-popup>
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
import { mapState } from 'vuex'//引入mapState
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
			tabsData: ["介绍"], //tab数据
			tabsIndex: 0, //当前选中的tab下标
			goodsId:undefined, //商品ID
			goodsInfo:{ //商品详情
				img:[], //banner图
				goodsAttributesVOList:[], //商品属性
				entityGoodsVO:{}, //实体商品
				courseVO:{ //课程
					courseClassVOList:[]
				}, 
				questionBankVO:{}, //题库
				examVO:{} //考试
			},
			entityGoodsCheck:1, //是否包含实体商品资源
			swiperHeight: 0, //tab内容的高度
			goodsBottomHeight:0, //购物车工具条高度
			tabsTop:0, //TAB选项卡距离顶部的高度
			tabsHeight:0, //TAB选项卡高度
			tabsFixed:false, //TAB选项卡是否固定在顶部
			priceArry:[], //显示价格区间
			entityCommentVOList:[], //商品评论
			examCommentVOList:[], //考试评论
			questionCommentVOList:[], //题库评论
			courseCommentVOList:[] //课程评论
		};
	},
	computed: mapState(['defaultAddress']),
	watch:{
		"$store.state.goodsDetailsHeightChange":{
			handler:function(newVal,oldVal){
			    //动态设置swiper的高度
			    this.setSwiperHeight();
			}
		}
	},
	onLoad(option) {
		this.goodsId = option.goodsId;
		this.getTabsTopAndHeight();
		this.getGoodsBottomHeight();
		this.getGoodsResource();
		this.getGoodsInfo();
		this.getComment();
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
		// 获取Tab选项卡距离顶部的高度及自身高度
		getTabsTopAndHeight(){
			this.$nextTick(() => {
				let query = uni.createSelectorQuery().in(this);
				query.select("#custom-tabs").boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						this.tabsTop = res[0].top;
						this.tabsHeight = res[0].height;
					}
				});
			});
		},
		// 获取底部购物车工具类高度
		getGoodsBottomHeight(){
			this.$nextTick(() => {
				let query = uni.createSelectorQuery().in(this);
				query.select("#goods-bottom").boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						this.goodsBottomHeight = res[0].height;
					}
				});
			});
		},
		/**
		 * 滚动回调
		 * @param {Object} e
		 */
		scrollHandle(e){
			
			// 这里要实现页面上滑到tab时，tab进行固定的效果
			if(e.detail.scrollTop >= this.tabsTop && !this.tabsFixed){
				this.tabsFixed = true;
				return
			}
			
			if(e.detail.scrollTop < this.tabsTop && this.tabsFixed){
				this.tabsFixed = false;
				return
			}
		},
		//立即购买
		jumpConfirm(){
			uni.navigateTo({
				url:'../confirm/confirm'
			})
		},
		
		/**tab水平滚动回调
		 * @param {Object} e
		 */
		menuSwiperChange(e){
			this.tabsIndex = e.detail.current;
			//动态设置swiper的高度
			this.setSwiperHeight();
		},
		
		//动态设置swiper的高度
		setSwiperHeight() {
			this.$nextTick(() => {
				let element = "#content-wrap-" + this.tabsIndex;
				let query = uni.createSelectorQuery().in(this);
				query.select(element).boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						this.swiperHeight = res[0].height;
					}
				});
			});
		},    
		
		/**
		 * 查询商品包含资源（实体商品，课程，题库，考试）情况
		 */
		getGoodsResource(){
			this.$http
				.get('/goods/checkResource', {goodsId:this.goodsId}, true)
				.then(res => {
					this.tabsData = ["介绍"];
					this.entityGoodsCheck = res.entityGoodsCheck;
					if(res.entityGoodsCheck === 2){
						this.tabsData.push("商品");
					}
					if(res.courseCheck === 2){
						this.tabsData.push("目录");
					}
					if(res.questionCheck === 2){
						this.tabsData.push("题库");
					}
					if(res.examCheck === 2){
						this.tabsData.push("考试");
					}
					this.tabsData.push("推荐");
				});
		},
		
		
		/**
		 * 获取商品详情
		 */	
		getGoodsInfo(){
			this.$http
				.get('/goods/queryInfoByLogin', {goodsId:this.goodsId}, true)
				.then(res => {
					this.goodsInfo = res;
					if(res.minPrice && res.maxPrice && res.minPrice!== res.maxPrice ){
						this.priceArry = [res.minPrice, res.maxPrice];
					}else {
						this.priceArry = [res.price]
					}
					//动态设置swiper的高度
					this.setSwiperHeight();
				});
		},
		
		/**
		 * 获取商品评论信息
		 */
		getComment(){
			this.$http
				.get('/goods/queryCommentPage', {goodsId:this.goodsId}, true)
				.then(res => {
					this.entityCommentVOList = res.entityCommentVOList;
					this.courseCommentVOList = res.courseCommentVOList;
					this.examCommentVOList = res.examCommentVOList;
					this.questionCommentVOList = res.questionCommentVOList;
				});
		},
		
		/** 商品收藏
		 * @param {Object} isCollect  true 收藏/ false 取消收藏
		 */
		collectClick(isCollect){
			if(isCollect) {
				this.$http
					.post('/goods/collect', {goodsId:this.goodsId}, true)
					.then(res => {
						this.goodsInfo.userCollection = 2;
					});
			}else {
				this.$http
					.delete('/goods/collection/delete', {idList:[this.goodsId]}, true)
					.then(res => {
						this.goodsInfo.userCollection = 1;
					});
			}
		},
		
		/**
		 * 商品属性提交回调
		 */
		goodsAttributesSubmit({goodsAttributes,count}){
			console.log("商品属性 == ",goodsAttributes);
			console.log("商品数量 == ",count);
		},
		
		// 打开配送地址页面
		goAddress(){
			uni.navigateTo({
				url: `/pages-user/index/address/address`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
