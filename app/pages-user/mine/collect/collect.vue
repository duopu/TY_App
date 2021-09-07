<!-- 收藏或足迹 -->
<template>
	<view class="collect">
		<!-- top -->
		<custom-horizontal-tabs class="collect-top" :data="tabsData" :currentIndex="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		<swiper class="flex-1" :current="tabsIndex" @change="swiperChange">
			<!-- 商品收藏 -->
			<swiper-item>
				<tabs-goods></tabs-goods>
			</swiper-item>
			<!-- 店铺收藏 -->
			<swiper-item>
				<tabs-store></tabs-store>
			</swiper-item>
			<!-- 足迹 -->
			<swiper-item>
				<tabs-history>这里是足迹</tabs-history>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import TabsGoods from './tabs-goods.vue';
import TabsStore from './tabs-store.vue';
import TabsHistory from'./tabs-history.vue';
export default {
	components: {
		TabsStore,
		TabsGoods,
		TabsHistory
	},
	data() {
		return {
			tabsData: ['商品收藏', '店铺收藏', '我的足迹'],
			tabsIndex: 0
		};
	},
	methods: {
		// 获取 tabs Index
		getTabsIndex(value) {
			this.tabsIndex = value;
		},
		
		swiperChange(e){
			this.tabsIndex = e.detail.current;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
