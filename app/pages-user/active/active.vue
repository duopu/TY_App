<template>
	<view class="active-page">
		<view class="tabs fl aln">
			<view class="tab">
				<view class="">
					推荐
				</view>
			</view>
			<view class="tab act">
				<view class="">
					活动
				</view>
				<image class="underline" src="../../assets/imgs/login/underline.png" mode=""></image>
			</view>
			<view class="tab ">
				<view class="">
					高新转行
				</view>
			</view>
			<view class="tab">
				<view class="">
					认证
				</view>
			</view>
			<view class="tab">
				<view class="">
					提升
				</view>
			</view>
			<view class="tab">
				<view class="">
					好物
				</view>
			</view>
		</view>

		<!-- 轮播图 -->
		<view class="swiper">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<image class="swiper-img" src="../../assets/imgs/login/advert.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-img" src="../../assets/imgs/login/advert.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-img" src="../../assets/imgs/login/advert.png" mode=""></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 特殊选项卡 -->
		<view class="special-tabs">
			<view class="tab" :class="specialTab == 1?'act':''" @click="specialTabChange(1)">
				<view class="text">
					组团优惠
				</view>
				<view class="bg acbg1"></view>
			</view>
			<view class="tab" :class="specialTab == 2?'act':''" @click="specialTabChange(2)">
				<view class="text">
					坚持不懈
				</view>
				<view class="bg acbg2"></view>
			</view>
			<view class="tab" :class="specialTab == 3?'act':''" @click="specialTabChange(3)">
				<view class="text">
					分销大使
				</view>
				<view class="bg acbg3"></view>
			</view>
		</view>

		<view class="items" v-if="specialTab == 1">
			<view class="bea">
				<view class="item" v-for="i in 4" :key='i'>
					<view class="fl bet">
						<image class="preview" src="../../assets/imgs/index/smbanner.png" mode=""></image>
						<view class="info">
							<view class="title">
								5天英语全能挑战只等你来
							</view>
							<view class="process">
								<view class="process-info">
									当前优惠: <text class="price">￥23</text>
								</view>
								<view class="fl aln bet">
									<view class="ai">
										<AiProcess :percentage="40" :textInside='true' :strokeWidth='16'></AiProcess>
									</view>
									<view class="yh">
										预计优惠: <text class="youhui">￥1600</text>
									</view>
								</view>
								<view class="time">
									拼团时间:2020-04-17 10:00:00
								</view>
							</view>
						</view>
					</view>
					<view class="bottom fl aln flend">
						<view class="price txt-left">
							最低折扣价¥200
						</view>
						<view class="btn" v-if="i%2 == 0">
							参与拼团
						</view>
						<view class="default-btn" v-else>
							已参与，等待拼团完成
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="gift" v-if="specialTab == 2">
			<view class="item fl aln bet" v-for="item in 4" :key='item'>
					<view class="info">
						<view class="tit fs26">
							活动名称xxxx有奖竞争大赛
						</view>
						<view class="desc fs26">
							奖品：一台ipad2020
						</view>
					</view>
					<view class="btn" v-if="item%2 == 1">
						报名活动
					</view>
					<view class="default-btn" v-else>
						已报名
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AiProcess from '@/components/ai-progress/ai-progress.vue'
	export default {
		components: {
			AiProcess
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				interval: 4000,
				duration: 500,
				bgColor: 'linear-gradient(180deg, #FF6F5B 0%, #FFB8AE 100%);',
				specialTab: 2
			};
		},
		methods: {
			specialTabChange(f) {
				console.log(f)
				this.specialTab = f
			}
		}
	}
</script>

<style lang="less">
	@import url("../../assets/css/active.less");
</style>
