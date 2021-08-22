<!-- 消息 -->
<template>
	<tab-message-index v-if="!showAccount" @change="onChange"></tab-message-index>
	<tab-switch-account v-else @change="onChange"></tab-switch-account>
</template>

<script>
import TabMessageIndex from './tab-message.vue';
import TabSwitchAccount from './tab-switch-account.vue';
export default {
	name: 'messageIndex',
	components: {
		TabMessageIndex,
		TabSwitchAccount
	},
	data() {
		return {
			showAccount: false //false-默认消息界面 true-其他账号信息界面
		};
	},
	methods: {
		// 切换页面
		onChange() {
			this.showAccount = !this.showAccount;
		}
	}
};
</script>
