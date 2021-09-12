<template>
	<view id="botom" class="store-bottom flex-center">
		<view class="item flex flex-column-center" v-for="(item, index) in tabbarData" :key="index" @click="changeTabsContent(index)">
			<image class="image" :src="tabbarIndex === index ? item.iconSelectPath : item.iconPath" mode="aspectFill"></image>
			<text :class="{ on: tabbarIndex === index }">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:'bottom-tab',
		props:{
			tabbarIndex:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				tabbarData: [
					{
						iconPath: '../../../static/images/tabbars/store-tabbar-store.png',
						iconSelectPath: '../../../static/images/tabbars/store-tabbar-store-select.png',
						text: '店铺'
					},
					{
						iconPath: '../../../static/images/tabbars/store-tabbar-goods.png',
						iconSelectPath: '../../../static/images/tabbars/store-tabbar-goods-select.png',
						text: '商品'
					},
					{
						iconPath: '../../../static/images/tabbars/store-tabbar-kf.png',
						iconSelectPath: '',
						text: '客服'
					}
				]
			}
		},
		methods:{
			changeTabsContent(index){
				this.$emit('tabbarIndexChange',index)
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
