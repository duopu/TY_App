<!-- 店铺消息 -->
<template>
	<scroll-view scroll-y="true" class="store">
		<!-- 列表 -->
		<block v-for="(item, index) in dataList" :key="index">
			<trade-lists-item :dataItem="item" :state="0"></trade-lists-item>
		</block>
		<!-- 占位符 -->
		<view class="slot-item"></view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			dataList: []
		};
	},
	onLoad(){
		this.queryMessage();
	},
	methods:{
		// 查询消息
		queryMessage(){
			
			this.$http.get('/message/queryListByStoreId',{messageType: 2},true).then(res => {
				this.dataList = res;
			})
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
