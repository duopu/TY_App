<!-- 直播间 -->
<template>
	<view class="page-wrapper live-room">
		<view class="live-room-top">
			<!-- 直播间信息 -->
			<view class="flex-center-between row">
				<view class="flex-center">
					<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					<text>商家号</text>
					<button class="btn-border yellow">关注</button>
					<image class="icon-user" src="../../../static/images/icons/icon-user.svg" mode="aspectFill"></image>
					<text>492</text>
				</view>
				<image src="../../../static/images/icons/icon-close.svg" mode="aspectFill" class="icon-close"></image>
			</view> 
			<!-- 视频 直播 兼容-->
			<video class="video-wrapper" :src="pullUrl" :autoplay="true" controls></video>
			<!-- 菜单 -->
			<custom-horizontal-tabs :currentIndex="tabsIndex" :data="tabsData" @change="getCurrentIndex"></custom-horizontal-tabs>
		</view>
		<!-- 评论 -->
		<scroll-view v-if="tabsIndex === 0" scroll-y="true" class="live-room-content">
			<view class="chat-row">
				<text class="nickname">奔跑的草泥马:</text>
				<view>上个知识点没整明白呢老师</view>
			</view>
			<view class="chat-row">
				<text class="nickname">小星星:</text>
				<view>老师幸苦了！</view>
			</view>

			<view class="chat-row">
				<text class="nickname">曾曾曾神::</text>
				<view>解决了我多年的疑惑！</view>
			</view>
		</scroll-view>
		<!-- 简介 -->
		<scroll-view v-else-if="tabsIndex === 1" scroll-y="true" class="live-room-content">
			<view class="chat-row">
				<text class="label">直播名称:</text>
				<view>奥数竞赛知识体系讲解</view>
			</view>
			<view class="chat-row">
				<text class="label">直播老师:</text>
				<view>蒋欣、李四</view>
			</view>
		
			<view class="chat-row">
				<text class="label">直播说明:</text>
				<view>表情动作丰富 主播间就是主播和观众沟通互动最重要的桥梁,主播们除了要善于调动现场气氛,处变不惊,还要尽可能的增加与粉丝间的交流,提高每个人的参与感。多说礼貌感谢 当有粉丝送礼物给你时,无论数量于价值的多少,都要一视同仁,向送礼物的粉丝表达尊重,表示感谢:“谢谢××。让粉丝感受到主播的诚意与热情,并有意愿继续互动。</view>
			</view>
		</scroll-view>
		<!-- 底部 输入框 -->
		<view class="live-room-bottom flex-center">
			<input class="input" placeholder-class="input-placeholder" type="text" value="" placeholder="快来参与互动吧" />
			<image class="icon" src="../../../static/images/icons/icon-talk.svg" mode="aspectFill"></image>
			<image class="icon" src="../../../static/images/icons/icon-share.svg" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['评论', '简介'],
			pullUrl:'rtmp://live.sinfinite.cn/live/24',
			groupId: "@TGS#2XZIVENHN",
			
		};
	},
	onLoad() {
		// this.$tool.anchor()
		// 监听群消息
		uni.$on('GroupListen',this.getNewMessage)
	},
	onUnload() {
		uni.$off('GroupListen',this.getNewMessage)
	},
	methods:{
		// 切换 tab
		getCurrentIndex(value){
			this.tabsIndex = value;
		},
		// 收到新消息
		getNewMessage(message){
			
		}
		
	}
	
};
</script>

<style lang="less" src="./style.less"></style>
