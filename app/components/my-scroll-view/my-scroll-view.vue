<template>
	<scroll-view scroll-y="true"
	:refresher-enabled="true" 
	:refresher-triggered="triggered" 
	:refresher-threshold="45"
	@refresherrefresh="onRefresh"
	@scrolltolower="onScrollTolower">
		<slot name="list" :list="dataList"></slot>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText"></uni-load-more>
	</scroll-view>
</template>

<script>
export default {
	name: 'my-scroll-view',
	emits:['loadData'],
	props: {
		pageSize: {
			type: Number,
			default: 20
		}
	},
	data() {
		return {
			_freshing:false,
			triggered:false,
			page: 1,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			
			dataList:[] //数据源
		};
	},
	
	created(){
		this.onRefresh();
	},
	
	methods: {
		getDataList(){
			
			let that = this;
			
			if(this.page > 1){
				this.status = "loading";
			}
			
			this.$emit('loadData',this.page,(res)=>{
				if(res){
					if(that.page == 1){
						that.triggered = false;
						that._freshing = false;
						that.dataList = res.content;
					}else {
						that.dataList = that.dataList.concat(res.content);
					}
					if(res.totalSize <= that.page * that.pageSize){
						that.status = "noMore"
					}else{
						that.status = "more"
					}
				}else{
					if(that.page == 1){
						that.triggered = false;
						that._freshing = false;
					}else {
						that.status = "more";
						that.page -= 1;
					}
				}
			})
		},
		onRefresh(){
			console.log("onRefresh");
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) this.triggered = true;
			this.page = 1;
			this.getDataList();
		},
		onScrollTolower(){
			console.log("onScrollTolower");
			this.status = 'more';
			this.page += 1;
			this.getDataList();
			
		}
	}
}
</script>

<style>
</style>
