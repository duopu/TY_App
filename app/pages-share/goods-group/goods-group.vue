<template>
	<view>
		<my-scroll-view ref="scroll" class="lists" @loadData="onLoadGoodsData">
			<template v-slot:list="slotProps">
				<active-group-lists-item class="activity-lists-item" 
				v-for="(item, index) in slotProps.list"
				:key="`goods-${index}`" 
				:data="item" 
				@submit="openGoodsGroupPopup"></active-group-lists-item>
			</template>
		</my-scroll-view>
		
		<!-- 弹窗 参与拼团 -->
		<goods-group-popup ref="groupPopup" 
		:data="groupBuyVO" 
		@openApp="openApp"></goods-group-popup>
	</view>
</template>

<script>
	import activeGroupListsItem from'./active-group-lists-item/active-group-lists-item.vue';
	import goodsGroupPopup from './goods-group-popup/goods-group-popup.vue';
	import config from '../../utils/config.js';
	export default {
		components: {
			activeGroupListsItem,
			goodsGroupPopup
		},
		data() {
			return {
				linkType: undefined,
				userId: undefined,
				groupBuyVO: {}
			}
		},
		onLoad(option) {
			this.linkType = option.linkType;
			this.userId = option.userId;
		},
		methods: {
			/** 查询组团优惠
			 * @param {Object} page
			 * @param {Object} pageSize
			 * @param {Object} callback
			 */
			onLoadGoodsData(page, pageSize, callback){
				this.$http.get('/groupBuy/queryPage',{page:page, size:pageSize},true).then(res=>{
					callback(res);
				}).catch( err => {
					callback(null);
				})
			},
			
			/**
			 * 打开参与拼团的弹窗
			 * @param {Object} groupBuyId 组团优惠ID
			 */
			openGoodsGroupPopup(groupBuyId){
				this.$http.get('/groupBuy/queryInfo', { groupBuyId: groupBuyId }, true).then(res => {
					this.groupBuyVO = res;
					this.$refs.groupPopup.open();
				});
			},
			
			/**
			 * 打开App
			 */
			openApp(){
				let url = `${config.schema}?linkType=${this.linkType}&goodsId=${this.groupBuyVO.goodsId}&userId=${this.userId}`;
				let shareMsg = `推荐一个超划算的活动给你：${url}`;
				this.$tool.openApp(shareMsg)
			}
		}
	}
</script>

<style>

</style>
