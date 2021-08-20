<template>
	<view class="news-page">
		<view class="tabs fl aln">
			<view class="tab">
				<view class="">
					热门
				</view>
			</view>
			<view class="tab">
				<view class="">
					经济
				</view>
			</view>
			<view class="tab act">
				<view class="">
					科技
				</view>
				<!-- <image class="underline" src="../../assets/imgs/login/underline.png" mode=""></image> -->
			</view>
			<view class="tab">
				<view class="">
					教育
				</view>
			</view>
			<view class="tab">
				<view class="">
					体育
				</view>
			</view>
			<view class="tab">
				<view class="">
					健康
				</view>
			</view>
		</view>

		<view class="news">
			<view class="item" v-for="index in 6" :key='index'>
				<view class="title">
					华为自动驾驶实力超特斯拉？优势和困局都很明显
				</view>
				<view class="bottom bflex">
					<view class="fl aln">
						<image class="avatar" src="../../static/images/index/avatar.jpg" mode=""></image>
						<view class="name">
							商家有山
						</view>
					</view>
					<view class="fl aln">
						<image class="eye" src="../../static/images/index/eye.png" mode=""></image>
						<view class="nums">
							28267
						</view>
						<view class="">
							2021-10-10
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
				categoryList:[] //资讯分类数据
			};
		},
		onLoad() {
			// 发送验证码
			this.$http.get('/article/queryCategoryList',{},true).then(res=>{
				this.categoryList = res
			})
		}
	}
</script>

<style lang="less">
	.news-page {
		padding: 24upx 20upx;

		.tabs {
			flex-wrap: wrap;

			.tab {
				margin-right: 28upx;
				color: #222222;
				font-size: 26upx;
				position: relative;
			}

			.act {
				color: #FFB55B;
				font-size: 26upx;
				font-weight: bold;
			}

			.underline {
				width: 20upx;
				height: 6upx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 10upx;
			}
		}

		.news {
			margin-top: 10upx;
			.item {
				padding: 22upx 0;
				border-bottom: 1px solid #DFE0E6;
				.title {
					color: #222222;
					font-size: 28upx;
					font-weight: bold;
				}

				.bottom {
					margin-top: 40upx;

					.avatar {
						width: 72upx;
						height: 72upx;
						border-radius: 72upx;
						margin-right: 16upx;
					}

					.name {
						color: #222222;
						font-size: 26upx;
					}

					.eye {
						width: 48upx;
						height: 48upx;
					}
					
					.nums {
						margin: 0 26upx 0 8upx;
					}
				}
			}
		}
	}
</style>
