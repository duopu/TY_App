<template>
	<scroll-view scroll-y="true"
	:refresher-enabled="true" 
	:refresher-triggered="triggered" 
	:refresher-threshold="45"
	@refresherrefresh="onRefresh"
	@scrolltolower="onScrollTolower">
	    <!-- 列表内容插槽， 可返回当前列表数据源 -->
		<slot name="list" :list="dataList"></slot>
		
		<!-- 加载更多 -->
		<uni-load-more v-if="pageEnable"
		:status="status" 
		:icon-size="16" 
		:content-text="contentText"></uni-load-more>
	</scroll-view>
</template>

<script>
	
  /**
   * 带下拉刷新和上拉加载的滚动视图
   * @description 带下拉刷新和上拉加载的滚动视图
   * @property {Number} pageSize 分页大小
   * @property {Boolean} pageEnable 是否分页
   * @event {Function} loadData 触发加载数据事件，携带page参数，同时根据回调返回网络请求数据结果，注意：如果网络接口失败，回调请传callback(null)
   * @example 
   * <my-scroll-view :pageSize="20" @loadData="onLoadData">
		<template v-slot:list="slotProps">
			<custom-view :state="1"
			v-for="(item, index) in slotProps.list"
			:key="index" 
			:data="item"
			 @clickItem="itemClick"></custom-view>
		</template>
	</my-scroll-view>
   */
export default {
	name: 'my-scroll-view',
	emits:['loadData'],
	props: {
		pageSize: { //分页大小
			type: Number,
			default: 20
		},
		pageEnable: { //是否分页
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			_freshing:false,
			triggered:false, //刷新标志位
			page: 1, //页码
			status: 'more', //加载更多状态
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
				console.log("res ==== ",res);
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
		/**
		 * 下拉刷新
		 */
		onRefresh(){
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) this.triggered = true;
			this.page = 1;
			this.getDataList();
		},
		
		/**
		 * 上拉加载
		 */
		onScrollTolower(){
			this.status = 'more';
			this.page += 1;
			this.getDataList();
			
		}
	}
}
</script>

<style>
</style>
