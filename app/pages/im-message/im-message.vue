<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 群组id
				groupId:'',
				// 用户名称
				userName:'',
				// 用户头像
				userPortrait:'',
				// 商家名称
				storeName:'',
				// 商家头像
				storePortrait:''
			};
		},
		onLoad(option) {
			this.groupId = option.groupId;
			this.userName = option.userName;
			this.userPortrait = option.userPortrait;
			this.storeName = option.storeName;
			this.storePortrait = option.storePortrait;
			
			console.log(this.$data);
		}
	}
</script>

<style lang="scss">

</style>
