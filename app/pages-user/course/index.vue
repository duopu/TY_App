<template>
	<view class="course-page">
		<view class="pdhead head">
			<view class="bigtitle fs34 pd">
				课程表
			</view>
			<view class="course-info">
				<view class="item">
					<view class="top">
						<text class="number fs60">20</text>
						<text>分钟</text>
					</view>
					<view class="bom mt10 color66">
						今日学习
					</view>
				</view>
				<view class="item">
					<view class="top">
						<text class="number fs60">4%</text>
						<text>学员</text>
					</view>
					<view class="bom mt10 color66">
						超过平台
					</view>
				</view>
				<view class="item">
					<view class="top">
						<text class="number fs60">10</text>
						<text>金币</text>
					</view>
					<view class="bom mt10 color66">
						获得金币
					</view>
				</view>
			</view>
		</view>

		<view class="pdlr">
			<view class="bigtabs fl ard aln mt40">
				<view class="tab" :class="tab == 1?'act':''" @click="tabChange(1)">
					<view class="">
						我的课程
					</view>
					<image v-if="tab == 1" class="underline" src="../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
				<view class="tab" :class="tab == 2?'act':''" @click="tabChange(2)">
					<view class="">
						我的题库
					</view>
					<image v-if="tab == 2" class="underline" src="../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
				<view class="tab" :class="tab == 3?'act':''" @click="tabChange(3)">
					<view class="">
						缓存课程
					</view>
					<image v-if="tab == 3" class="underline" src="../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
			</view>


			<view class="bea">
				<view class="item fl aln bet" v-for="item in 3" :key='item'>
					<image class="preview" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
					<view class="info-bx">
						<view class="title">
							幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
						</view>
						<view class="bottom fl aln bet">
							<view class="fl aln">
								<image class="ico48" src="../../assets/imgs/course/shop.png" mode=""></image>
								商家平
							</view>
							<view class="btn mr20">
								观看课程
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
				tab: 1,
			};
		},
		methods: {
			tabChange(f) {
				this.tab = f;
			}
		}
	}
</script>

<style lang="less">
	@import url('../../assets/css/course.less');
</style>
