
const debug = true
export default {
	
	// #ifdef H5
		baseUrl:debug ? '/api' : 'http://education.sinfinite.cn',
	// #endif
	
	// #ifndef H5
		baseUrl:debug ? 'http://education.sinfinite.cn' : '',
	// #endif
	
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey:'storageLoginUserKey',
		// 历史搜索
		historySearchKey:'storageHistorySearchKey'
	},
}