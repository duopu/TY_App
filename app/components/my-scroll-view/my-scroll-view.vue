<template>
	<scroll-view scroll-y="true"
	:refresher-enabled="refreshEnable" 
	:refresher-triggered="triggered" 
	:refresher-threshold="45"
	 @refresherrestore="onRestore" 
	@refresherrefresh="onRefresh"
	@scrolltolower="onScrollTolower">
	
		<!-- 这里需要包一层view，是为了处理当cell有margin样式时，会把刷新图标暴露出来一点位置 -->
		<view class="flex-column">
			<!-- 列表内容插槽， 可返回当前列表数据源 -->
			<slot name="list" :list="dataList"></slot>
		</view>
		
		<!-- 列表为空 -->
		<my-empty :show="!_freshing && dataList.length === 0" :text="noDataText"></my-empty>
		
		<!-- 加载更多 -->
		<uni-load-more v-show="pageEnable && dataList.length > 0"
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
   * @property {Boolean} refreshEnable 是否需要下拉刷新
   * @property {Boolean} pageEnable 是否分页
   * @property {String} noDataText 为空时显示的文案
   * @event {Function} loadData 触发加载数据事件，携带page、pageSize参数，同时根据回调返回网络请求数据结果，注意：如果网络接口失败，回调请传callback(null)
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
		refreshEnable:{ //是否需要下拉刷新
			type: Boolean,
			default: true
		},
		pageEnable: { //是否需要分页
			type: Boolean,
			default: true
		}, 
		noDataText: { //为空时显示的文案
			type: String,
			default: "暂无数据"
		}
	},
	data() {
		return {
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
			
			if(this.page > 1){
				this.status = "loading";
			}
			
			this.$emit('loadData',this.page,this.pageSize,(res)=>{
				if(res){
					if(this.page == 1){
						this.triggered = false;
						this._freshing = false;
						this.dataList = res.content;
					}else {
						this.dataList = this.dataList.concat(res.content);
					}
					if(res.totalSize <= this.page * this.pageSize){
						this.status = "noMore"
					}else{
						this.status = "more"
					}
				}else{
					if(this.page == 1){
						this.triggered = false;
						this._freshing = false;
					}else {
						this.status = "more";
						this.page -= 1;
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
			if(this.status !== 'noMore'){
				this.status = 'more';
				this.page += 1;
				this.getDataList();
			}
		},
		onRestore() {
		    this.triggered = 'restore'; // 需要重置
		    console.log("onRestore");
		},
		
	}
}
</script>

<style lang="scss" scoped>
	/deep/.uni-scroll-view-refresher {
		background-color: transparent!important;
	}
</style>