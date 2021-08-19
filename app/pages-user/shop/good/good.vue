<template>
	<view class="shop-page">
		<view class="banner">
			<image src="../../../assets/imgs/shop/good_banner.png" mode=""></image>
		</view>
		<view class="info">
			<view class="it bflex">
				<view class="name">
					2021教师资格证-全程VIP班
				</view>
				<view class="nums">
					1500人学习
				</view>
			</view>
			<view class="it bflex">
				<view class="price">
					￥500 - ¥600
				</view>
				<view class="share fl aln" @click="retailOpen">
					<image src="../../../assets/imgs/shop/share.png" mode=""></image>
					<view class="">
						申请分销
					</view>
				</view>
			</view>
		</view>


		<view class="mg bgw shoppd noptm">
			<view class="item" @click="modelOpen">
				<view class="label">
					选择
				</view>
				<view class="center">
					<view class="fl bet">
						<view class="title">
							属性分类
						</view>
						<image class="point" src="../../../assets/imgs/shop/point.png" mode=""></image>
					</view>
					<view class="models">
						<view class="model" v-for="i in 4" :key='i'>
							型号一
						</view>
					</view>
				</view>
			</view>

			<view class="item">
				<view class="label">
					发货
				</view>
				<view class="center">
					<view class="fl bet">
						<view class="title">
							广东广州 快递:免快递费
						</view>
						<image class="point" src="../../../assets/imgs/shop/point.png" mode=""></image>
					</view>
					<view class="address">
						配送至：江苏省南京市江宁区雨花街道
					</view>
				</view>
			</view>

			<view class="item">
				<view class="label">
					保障
				</view>
				<view class="center">
					<view class="fl bet">
						<view class="title">
							<view class="tags">
								<view class="tag qy">
									企业认证
								</view>
								<view class="tag pt">
									平台认证
								</view>
								<view class="tag bz">
									保证金
								</view>
							</view>
						</view>
						<image class="point" src="../../../assets/imgs/shop/point.png" mode=""></image>
					</view>
				</view>
			</view>


			<view class="item">
				<view class="label">
					参数
				</view>
				<view class="center">
					<view class="fl bet">
						<view class="title">
							课时 课程方式 题库数量 有效时长
						</view>
						<image class="point" src="../../../assets/imgs/shop/point.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<view class="mg bgw shoppd">
			<view class="tabs">
				<view class="tab" :class="tab == index?'act':''" @click="tabChange(index)" v-for="(item, index) in tabs"
					:key='index'>
					{{item}}
				</view>
			</view>

			<!-- 介绍 -->
			<view class="shop_desc" v-if="tab == 0">
				<view class="shop_info">
					<image class="avatar" src="../../../assets/imgs/index/girl.png" mode=""></image>
					<view class="shop_info_content">
						<view class="name">
							<view class="">
								店铺名称
							</view>
							<!-- <image src="" mode=""></image> -->
						</view>
						<view class="desc">
							补充说明
						</view>
						<view class="bottom">
							<view class="ms">
								综合评分
							</view>
							<uni-rate :value="1.35" :size='14' :margin="10" />
							<view class="">
								1.35
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 商品 -->
			<view class="shop_desc" v-if="tab == 1 || tab == 3 || tab == 4">
				<view class="good_info">
					<view class="bflex bet fs28">
						<view class="">
							全部评论(20)
						</view>
						<view class="rate">
							<uni-rate :value="1.35" :size='14' :margin="10" />
						</view>
						<view class="">
							更多
						</view>
					</view>
					<view class="rates">
						<view class="rate" v-for="item in 4" :key='item'>
							<view class="bflex">
								<view class="bflex">
									<image class="good_info_avatar" src="../../../assets/imgs/index/girl.png" mode="">
									</image>
									<view class="info">
										<view class="name">
											意中人
										</view>
										<view class="star">
											※
										</view>
									</view>
								</view>
								<view class="time">
									2020-04-18
								</view>
							</view>
							<view class="msg">
								宝贝到手了，还没用，期待出来好效果～
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 目录 -->
			<view class="shop_desc" v-if="tab == 2">
				<view class="good_info">
					<view class="mus">
						<view class="mu ft fl bet fs28">
							<view class="">
								1. 教师资格证笔试
							</view>
							<view class="fl bet aln">
								<image class="play" src="../../../assets/imgs/shop/play.png" mode=""></image>
								观看
							</view>
						</view>
						<view class="mu fl bet">
							<view class="">
								1. 教师资格证笔试
							</view>
							<view class="fl bet aln">
								<image class="play" src="../../../assets/imgs/shop/play.png" mode=""></image>
								观看
							</view>
						</view>
						<view class="mu ft fl bet fs28">
							<view class="">
								1. 教师资格证笔试
							</view>
							<view class="fl bet aln">
								<image class="play" src="../../../assets/imgs/shop/play.png" mode=""></image>
								观看
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="shop_desc" v-if="tab == 5">
			<view class="tuij">
				<view class="item fl aln bet" v-for="index in 3" :key='index'>
					<image class="preview" src="../../../assets/imgs/index/smbanner.png" mode=""></image>
					<view class="info-bx">
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


		<!-- 弹窗 -->
		<!-- 选择规格 -->
		<uni-popup ref="model" type="bottom">
			<view class="modelPopup">
				<view class="info fl">
					<image class="good_preview" src="../../../assets/imgs/shop/good_banner.png" mode=""></image>
					<view class="price">
						￥500
					</view>
				</view>

				<view class="types">
					<view class="title">
						属性分类
					</view>
					<view class="fl">
						<view class="type" :class="i == 2?'act':''" v-for="i in 6" :key='i'>
							型号一
						</view>
					</view>
				</view>
				<view class="number">
					<view class="title">
						数量
					</view>
					<view class="fl aln">
						<image class="ico" src="../../../assets/imgs/shop/minus.png" mode=""></image>
						<view class="ip">
							1
						</view>
						<image class="ico" src="../../../assets/imgs/shop/plus.png" mode=""></image>
					</view>
				</view>
				<view class="btn" @click="modelClose">
					确定
				</view>
			</view>
		</uni-popup>

		<!-- 分销 -->
		<uni-popup ref="retail" type="center">
			<view class="retail">
				<image class="status_icon" src="../../../assets/imgs/shop/gou.png" mode=""></image>
				<view class="title">
					分销申请已提交成功！
				</view>
				<view class="sub">
					后台审核通过后，即可进行分销
				</view>
				<view class="btn" @click="retailClose">
					确定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['介绍', '商品', '目录', '题库', '考试', '推荐'],
				tab: 0
			};
		},
		created() {
			this.$nextTick(function() {
				// 规格弹窗
				// this.$refs.model.open()
				// 分销弹窗
				// this.$refs.retail.open();
			})
		},
		methods: {
			// 选项切换
			tabChange(i) {
				this.tab = i
			},
			retailOpen() {
				this.$refs.retail.open();
			},
			retailClose() {
				this.$refs.retail.close();
			},
			modelOpen() {
				this.$refs.model.open();
			},
			modelClose() {
				this.$refs.model.close();
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}


	@import url("../../../assets/css/shop.less");
</style>
