<template>
	<view class="search-page">
		<view class="head bflex">
			<input class="search-input" confirm-type="search" type="text" value="" />
			<view class="search-btn" @click="searched = 1;">
				搜索
			</view>
		</view>
		
		
		<!-- 未搜索 -->
		<view class="" v-if="searched == 0">

			<!-- 历史搜索 -->
			<view class="history">
				<view class="title bflex">
					<view class="text">
						历史搜索
					</view>
					<image class="img48" src="../../assets/imgs/index/close.png" mode=""></image>
				</view>
				<view class="items fl aln">
					<view class="item" v-for="index in 6" :key='index'>
						一级建造师
					</view>
				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="history">
				<view class="title bflex">
					<view class="text">
						热门搜索
					</view>
				</view>
				<view class="items fl aln">
					<view class="item" v-for="index in 6" :key='index'>
						一级建造师
					</view>
				</view>
			</view>

			<!-- 推荐 -->
			<view class="tuijian">
				<view class="slide">
					<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
						:display-multiple-items="2" style="height: 660upx;" next-margin='30rpx'>
						<swiper-item v-for="index in 3" :key='index'>
							<view class="z-item">
								<view class="title">
									<image class="hot" src="../../assets/imgs/search/hot1.png" mode=""></image>
									<image class="hot-title" src="../../assets/imgs/search/hotkc.png" mode=""></image>
								</view>
								<view class="list">
									<view class="li" v-for="index in 10" :key='index'>
										<text class="num">{{index}}</text>
										<text class="name">教师资格证基础</text>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 已搜索 -->
		<view class="searched" v-else>
			<view class="tabs fl aln">
				<view class="tab act">
					<view class="">
						课程
					</view>
					<image class="underline" src="../../assets/imgs/login/underline.png" mode=""></image>
				</view>
				<view class="tab">
					<view class="">
						机构
					</view>
				</view>
				<view class="tab">
					<view class="">
						老师
					</view>
				</view>
			</view>
			
			
			
			<view class="kcb">
				<view class="live kec">
					<view class="bea">
						<view class="item fl aln bet" v-for="index in 3" :key='index'>
							<image class="preview" src="../../assets/imgs/index/smbanner.png" mode=""></image>
							<view class="info">
								<view class="title">
									幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
								</view>
								<view class="bottom fl aln">
									<view class="price">
										￥500
									</view>
									<view class="desc">
										最近30人报名
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="jgb shop">
				<view class="item fl" v-for="index in 3" :key='index'>
					<image class="logo" src="../../assets/imgs/index/girl.png" mode=""></image>
					<view class="info">
						<view class="shopname">
							店铺名称
						</view>
						<view class="desc">
							店铺简介
						</view>
						<view class="bottom fl aln">
							<view class="zhis">
								店铺推荐指数
							</view>
							<uni-rate :size="16" :value="2"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="jsb shop">
				<view class="item fl" v-for="index in 3" :key='index'>
					<image class="logo" src="../../assets/imgs/index/girl.png" mode=""></image>
					<view class="info">
						<view class="shopname">
							老师名称
						</view>
						<view class="desc">
							补充说明
						</view>
						<view class="bottom fl aln">
							<view class="zhis">
								<text class="num">30</text>
								<text>个课程</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searched: 1
			};
		}
	}
</script>

<style lang="less">
	@import url("../../assets/css/search.less");
</style>
