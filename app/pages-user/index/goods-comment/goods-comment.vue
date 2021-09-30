<template>
	<view class="goods-comment">
		<block v-for="(item,index) in commentList"
		:key="`comment-entity-${index}`">
			<comment-lists-item :data="item"></comment-lists-item>
		</block>
		<my-empty :show="commentList.length === 0" text="暂无评论"></my-empty>
	</view>
</template>

<script>
export default {
	data(){
		return {
			commentList:[]
		}
	},
	onLoad(option) {
		 
		const eventChannel = this.getOpenerEventChannel();
		let that = this;
		// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		eventChannel.on('commentList', function(data) {
			that.commentList = data.commentList;
			uni.setNavigationBarTitle({
			    title: `${data.type}评论（${data.commentList.length}）`
			});
		})
	}
}
</script>
<style lang="less" src="./style.less"></style>