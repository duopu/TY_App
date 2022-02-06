// 是否开启debug
const debug = true; 
// H5地址
const h5Url = 'https://static-6379cc60-5114-44a4-bc2b-f3bdfb1a6061.bspapp.com'

export default {
	
	// 接口地址
	baseUrl:debug ? 'https://education.sinfinite.cn' : 'https://api.quickcer.com',
	
	// 打开H5页面的数据，存放此处，H5页面打开后从这里拿数据
	H5Obj:{},
	
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey:'storageLoginUserKey',
		// 历史搜索 
		historySearchKey:'storageHistorySearchKey',
		// 引导页面
		guideKey:'guideKey',
	},
	
	// 各种链接地址
	urlLink:{
		// 分享的普通商品详情
		shareGoodsDetailUrl:`${h5Url}/#/pages-share/goods-details/goods-details`,
		// 分享的店铺详情
		shareShopDetailUrl:`${h5Url}/#/pages-share/store-details/store-details`,
		// 分享邀请注册
		shareRegisterUrl:`${h5Url}/#/pages-share/register/register`,
		// 分享的坚持不懈列表
		shareGoodsUnremittinglyListUrl:`${h5Url}/#/pages-share/goods-unremittingly/goods-unremittingly`,
		// 分享的组团优惠列表
		shareGoodsGroupListUrl:`${h5Url}/#/pages-share/goods-group/goods-group`,
		// 分享的优惠券
		shareTicketUrl: `${h5Url}/#/pages-share/ticket/ticket`
	},
	
	// 链接类型
	linkType:{
		// 邀请好友注册
		inviteUserRegister: 1,
		// 邀请好友参加组团优惠
		inviteUserGroup: 2,
		// 邀请好友参加坚持不懈
		inviteUserUnremittingly: 3,
		// 商品分销
		goodsDistribute: 4,
		// 店铺分销
		storeDistribute: 5,
		// H5商品分享（普通商品/组团优惠）
		goodsShare: 6,
		// H5店铺分享
		storeShare: 7,
		// H5优惠券分享
		ticketShare: 8
	},
	
	// 复制链接的固定头部地址
	copyUrl: h5Url,
	
	// SCHEMA，专门用来生成打开APP时的头部固定地址
	schema: 'tyjy://open',
	
	// 是否上线
	isOnline:false,
	
	// iOS下载地址  ***是上线之后的appId
	iosDownloadUrl: 'http://itunes.apple.com/app/******',
	
	// Android下载地址   目前写的是应用宝下载地址，pkgname跟的是包名
	androidDownloadUrl: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ihomefnt.tyjy'
}