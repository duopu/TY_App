<!-- 发布直播 -->
<template>
	<view class="live publish">
		<view class="form-row">
			<text class="label">直播名称</text>
			<input placeholder-class="input-placeholder" class="input" type="text" v-model="liveName" placeholder="请输入" />
		</view>
		<view class="form-row">
			<text class="label">直播简介</text>
			<textarea placeholder-class="input-placeholder" class="textarea"  v-model="liveIntro" placeholder="请输入"></textarea>
		</view>
		<view class="form-row"><button class="btn" @click="getLivePushUrl">下一步</button></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			courseId:3,
			courseClassId:1,
			liveName:'',
			liveIntro:''
			
		};
	},
	methods:{
		getLivePushUrl(){
			const param = {
				courseId:this.courseId,
				liveName:this.liveName,
				liveIntro:this.liveIntro,
				courseClassId:this.courseClassId
			}
			
			this.$http.get('/live/getPushUrl',param,true).then(res=>{
				const pushUrl = res.pushUrl;
				const navUrl = `/pages-business/index/live/live-broadcast?pushUrl=${pushUrl}&courseId=${this.courseId}&liveName=${this.liveName}&liveIntro=${this.liveIntro}&courseClassId=${this.courseClassId}`
				console.log('导航去直播页面',navUrl);
				uni.navigateTo({
					url:navUrl
				})
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
