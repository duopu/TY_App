<template>
	<view class="live room">
		<view class="room_head bflex">
			<view class="fl aln">
				<image class="avatar" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
				<view class="name">
					商家名
				</view>
				<view class="guanzhu">
					关注
				</view>
				<!-- <image class="man" src="../../assets/imgs/index/man.png" mode=""></image> -->
				<view class="peoples">
					2020-12-21
				</view>
			</view>
			<image class="close" src="../../assets/imgs/index/close.png" mode=""></image>
		</view>


		<view class="video">
			<video id="myVideo"
				src='https://vd3.bdstatic.com/mda-meses8n29jzpv1dc/fhd/cae_h264_nowatermark/1622111630301075398/mda-meses8n29jzpv1dc.mp4?v_from_s=hkapp-haokan-hnb&auth_key=1627405935-0-0-c0a1eee8216e47078a62d8318e0ed121&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=3000156_3'
				@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
		</view>
		<view class="tabs fl">
			<view class="tab" :class="type == 0?'act':''" @click="typeIt(0)">
				评论
				<image v-if='type ==0' class="underline" src="../../assets/imgs/login/underline.png" mode=""></image>
			</view>
			<view class="tab" :class="type == 1?'act':''" @click="typeIt(1)">
				简介
				<image v-if="type == 1" class="underline" src="../../assets/imgs/login/underline.png" mode=""></image>
			</view>
		</view>
		<!-- 评论 -->
		<view class="records" v-if="type == 0">
			<view class="rec" v-for="index in 6" :key='index'>
				<text class="name">职业法师: </text>
				<text class="cnt">上个知识点没整明白呢老师，能再讲一遍吗老师</text>
			</view>
			<view class="enter bflex">
				<input class="enter-input" type="text" value="" placeholder="快来参与互动吧" />
				<view class="bflex btns">
					<image src="../../assets/imgs/index/yuyin.png" mode=""></image>
					<image src="../../assets/imgs/index/share.png" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 简介 -->
		<view class="desc records" v-else>
			<view class="rec">
				<view class="name">直播名称: </view>
				<view class="cnt">上个知识点没整明白呢老师，能再讲一遍吗老师</view>
			</view>
			<view class="rec">
				<view class="name">直播老师: </view>
				<view class="cnt">上个知识点没整明白呢老师，能再讲一遍吗老师</view>
			</view>
			<view class="rec">
				<view class="name">直播说明: </view>
				<view class="cnt">表情动作丰富 主播间就是主播和观众沟通互动最重要的桥梁,主播们除了要善于调动现场气氛,处变不惊,还要尽可能的增加与粉丝间的交流,提高每个人的参与感。多说礼貌感谢
					当有粉丝送礼物给你时,无论数量于价值的多少,都要一视同仁,向送礼物的粉丝表达尊重,表示感谢:“谢谢××。让粉丝感受到主播的诚意与热情,并有意愿继续互动。</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				type: 1
			};
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			typeIt(f) {
				this.type = f
			},
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style lang="less">
	@import url("../../assets/css/live.less");

	page {
		background-color: #F8F8F8;
	}
</style>
