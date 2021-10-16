
const debug = true
export default {
	
	// #ifdef H5
		baseUrl:debug ? '/api' : 'http://education.sinfinite.cn',
	// #endif
	
	// #ifndef H5
		baseUrl:debug ? 'http://education.sinfinite.cn' : 'http://education.sinfinite.cn',
	// #endif
	
	
	
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey:'storageLoginUserKey',
		// 历史搜索
		historySearchKey:'storageHistorySearchKey'
	},
	// 各种链接地址
	urlLink:{
		// 分享的普通商品详情
		shareGoodsDetailUrl:'https://static-71d6e5c1-8785-439f-bc7a-d627a1930796.bspapp.com/#/pages-share/goods-details/goods-details',
		// 分享的坚持不懈商品详情
		shareGoodsUnremittinglyDetailUrl:'https://static-71d6e5c1-8785-439f-bc7a-d627a1930796.bspapp.com/#/pages-share/goods-details/goods-details-unremittingly',
		// 分享的店铺详情
		shareShopDetailUrl:'https://static-71d6e5c1-8785-439f-bc7a-d627a1930796.bspapp.com/#/pages-share/store-details/store-details',
		// 分享邀请注册
		shareRegisterUrl:'https://static-71d6e5c1-8785-439f-bc7a-d627a1930796.bspapp.com/#/pages-share/register/register'
	},
	// 复制链接的固定头部地址
	copyUrl: 'https://tengyunjiaoyu.com.cn/app'
}