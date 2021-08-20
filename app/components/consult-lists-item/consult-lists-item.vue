<!-- 最新资讯 列表 -->
<template>
	<view class="consult-lists-item" @click="itemOnClick()">
		<view class="name text-bold">{{data.title}}</view>
		<view class="flex-center-between">
			<view class="flex-center">
				<image class="avatar-image" src="../../static/images/other/demo.png" mode="aspectFill"></image>
				<text>{{data.userName}}</text>
			</view>
			<view class="flex-center">
				<image class="icon-image" src="../../static/images/icons/icon-eye.svg" mode="aspectFill"></image>
				<text class="number font-24">{{data.readNum}}</text>
				<text class="time font-24">{{data.createdTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"consult-lists-item",
		emits: ['clickItem'],
		props: {
			data: {
				type: Object,
				default () {
					return {
						articleId: undefined,
						title: '标题',
						userName: '昵称',
						readNum: 0,
						createdTime: '2021-08-20'
					}
				}
			}
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			itemOnClick(){
				console.log("data == ",this.data);
				this.$emit('clickItem', this.data.articleId);
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
