<!-- 公告 -->
<template>
	<view class="notice-lists">
		<view class="notice-lists-item" :key="index" v-for="(item, index) in noticeList">
			<view class="flex-center">
				<text class="dot"></text>
				<text class="text">{{item.title}}</text>
			</view>
			<text class="content">{{item.content}}</text>
			<view class="time">{{ item.createTime }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			noticeList: []
		};
	},
	created(){
		this.queryNoticeList();
	},
	methods:{
		queryNoticeList(){
			this.$http.get('/announcement/queryPage',{page: 1, size: 3},false).then(res => {
				this.noticeList = res.content || [];
			})
		},
	}
};
</script>

<style src="./style.less" lang="less"></style>
