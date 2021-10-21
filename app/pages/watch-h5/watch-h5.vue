<template>
	<view class="h5-page">
		<view class="h5-content" v-html="content" v-if="type == 'content'">
		</view>
		<web-view class="web-view" :src="link" v-if="type == 'link'"></web-view>
	</view>
</template>

<script>
	import config from '../../utils/config.js';

	export default {
		data() {
			return {
				code: '',
				content: '',
				// H5的来源模式  content：通过code获取html字符串  link：通过链接展示
				type: 'content',
				link: '',
			};
		},
		onLoad(option) {
			this.code = option.code;
			this.type = option.type || 'content'


		},
		onReady() {
			if (this.type == 'content') {
				this.queryDictInfo()
			} else if (this.type == 'link') {
				uni.setNavigationBarTitle({
					title: config.H5Obj.title
				})
				this.link = config.H5Obj.link
			}
		},
		methods: {
			// 查询字段详情
			queryDictInfo() {
				this.$http.post('/value/config/batchQuery', {
					codeList: [this.code]
				}).then(res => {
					const data = res[0];
					uni.setNavigationBarTitle({
						title: data.name
					})
					this.content = data.content;
				})
			}
		}
	}
</script>

<style lang="scss">
	.h5-page{
		height: 100%;
	}
	.h5-content {
		height: 100%;
		line-height: 50rpx;
		font-size: 28rpx;
	}

	.web-view {
		height: 100%;
	}
</style>
