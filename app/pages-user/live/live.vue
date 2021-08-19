<template>
	<view class="live">
		<view class="info fl aln">
			<image class="icon" src="../../assets/imgs/index/new_live.png" mode=""></image>
			<view class="time">
				2021-04-21 18:00
			</view>
		</view>

		<view class="live-head bflex">
			<view class="title">
				直播名称吧啦吧啦
			</view>
			<view class="fl aln">
				<image class="avatar" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
				<view class="name">
					商家名
				</view>
			</view>
		</view>

		<view class="banner">
			<image class="ban" src="../../assets/imgs/login/advert.png" mode=""></image>
			<view class="btn">
				预约直播
			</view>
		</view>


		<!-- 往期回放 -->
		<view class="back">
			<view class="title">
				往期回放
			</view>
			<view class="item fl bet" v-for="index in 3" :key='index'>
				<image class="preview" src="../../assets/imgs/index/smbanner.png" mode=""></image>
				<view class="info">
					<view class="item-title">
						5天英语全能挑战
					</view>
					<view class="bottom bflex">
						<view class="fl aln">
							<image class="avatar" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
							<view class="">
								上架名
							</view>
						</view>
						<view class="back_btn">
							查看回放
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

			};
		}
	}
</script>

<style lang="less">
	@import url("../../assets/css/live.less");
</style>
