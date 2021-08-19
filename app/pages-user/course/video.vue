<template>
	<view class="course-page">
		<view class="video">
			<video id="myVideo"
				src='https://vd3.bdstatic.com/mda-meses8n29jzpv1dc/fhd/cae_h264_nowatermark/1622111630301075398/mda-meses8n29jzpv1dc.mp4?v_from_s=hkapp-haokan-hnb&auth_key=1627405935-0-0-c0a1eee8216e47078a62d8318e0ed121&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=3000156_3'
				@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
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
			};
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
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
@import url('../../assets/css/course.less');

#myVideo {
	width: 100%;
}
</style>
