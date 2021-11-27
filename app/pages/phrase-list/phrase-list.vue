<template>
	<view class="phrase-page">
		<view class="phrase-cell" v-for="item in dataSource" @click="sendPhrase(item)">
			<view class="label">{{item.phraseContent}}</view>
			<view class="delete-btn" @click.stop="deletePhrase(item)">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataSource:[],
			};
		},
		onReady() {
			this.queryPhraseList()
		},
		onNavigationBarButtonTap() {
			uni.showModal({
				title:'提示',
				content:'新增快捷短语',
				editable:true,
				placeholderText:'请输入短语内容', 
				success: (res) => {
					if(res.confirm){
						const content = res.content
						this.$http.post('/quickPhrase/create',{phraseContent:content},true).then(res=>{
							this.$tool.showSuccess('新增成功')
							this.queryPhraseList()
						})
					}
				}
			})
		},
		methods:{
			queryPhraseList(){
				this.$http.get('/quickPhrase/queryList').then(res=>{
					this.dataSource = res;
				})
			},
			deletePhrase(item){
				uni.showModal({
					title:'提示',
					content:'您确定删除此快捷短语？',
					success: (res) => {
						if(res.confirm){
							this.$http.post('/quickPhrase/delete',{quickPhraseId:item.quickPhraseId},true).then(res=>{
								this.$tool.showSuccess('删除成功')
								this.queryPhraseList()
							})
						}
					}
				})
			},
			sendPhrase(item){
				uni.navigateBack({
				})
				uni.$emit('quickPhrase',item.phraseContent)
			}
		}
	}
</script>

<style lang="scss">
	.phrase-page{
		background-color: #F0F0F0;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		align-items:stretch;
		
		.phrase-cell{
			padding: 30rpx;
			flex-direction: row;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #c8c7cc;
			display: flex;
			box-sizing: border-box;
			flex-direction: row;
			align-items:center;
			.label{
				flex: 1;
				color: #333333;
				font-size: 28rpx;
			}
			.delete-btn{
				color: #dd524d;
				font-size: 24rpx;
			}
		}
	}

</style>
