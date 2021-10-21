<!-- 我要入驻 -->
<template>
	<view class="check-in">
		<image class="banner" src="../../../static/images/check-in-banner.png" mode="aspectFill"></image>
		<!-- 入驻介绍 -->
		<view class="box">
			<view class="title text-bold flex-center">入驻介绍</view>
			<view class="message">{{desc}}</view>
		</view>
		<!--商家等级规则-->
		<view class="box">
			<view class="title text-bold flex-center">商家等级规则</view>
			<view class="lists">
				<view class="item flex-center" v-for="(item,index) in levelData" :key="index">
					<image class="image" :src="item.image" mode="aspectFill"></image>
					<view class="right flex-1">
						<view class="text-bold level-name">等级{{item.level}}</view>
						<view class="desc">
							成长值达到
							<text class="color-red">{{item.growth}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 入驻button -->
		<view class="flex-center-between bottom-btn">
			<button  class="btn-block red text-bold" @click="toPerson">个人入驻
			</button>
			<button  class="btn-block blue text-bold" @click="toJigou">
				企业入驻</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				desc: '',
				levelData: []
			};
		},
		onReady() {
			this.queryDesc();
			this.queryStoreLiveInfo();
		},
		methods: {
			// 个人入驻
			toPerson() {
				this.checkState(() => {
					uni.navigateTo({
						url: '/pages-user/mine/check-in-person/check-in-person'
					})
				})
			},
			// 机构入驻
			toJigou() {
				this.checkState(() => {
					uni.navigateTo({
						url: '/pages-user/mine/check-in-merchant/check-in-merchant'
					})
				})
			},
			// 检查入驻情况
			checkState(callback) {
				this.$http.get('/merchantSettle/check').then(res => {
					// state	integer($int32)
					// 是否入驻 0:未入驻 1:已入驻
					// status	integer($int32)
					// 审核状态 1审核成功 2审核失败 3待审核
					if (res.state == 1) {
						this.$tool.showToast('您已入驻，请退出登录切换商家版登录')
					} else if (res.status == 3) {
						this.$tool.showToast('已申请入驻，等待后台审核')
					} else {
						callback && callback()
					}
				})
			},
			// 查询入驻介绍信息
			queryDesc() {
				this.$http.post('/value/config/batchQuery', {
					codeList: ['SETTLED_DESC']
				}).then(res => {
					const data = res[0];
					this.desc = data.content;
				})
			},
			// 查询店铺权益
			queryStoreLiveInfo() {
				this.$http.get('/store/queryLevelList').then(res => {
					this.levelData = res.storeLevelVOList
				})
			}

		}
	};
</script>

<style src="./style.less" lang="less"></style>
