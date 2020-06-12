// 请在此对象写后端的请求接口列表
export default {
	// dev:'http://60.180.141.124:8083/',
	// pro: 'http://60.180.141.124:8083/',
	// pro: 'http://60.180.141.116:8082/',
	
	dev:'http://qukan.bajiaostar.com/',
	pro: 'http://qukan.bajiaostar.com/',
	
	/**
	 * 用户
	 */
	getUserInfo:'api/mine/getUserInfo',//获取用户信息
	editUser:'api/mine/editUser',//修改用户信息
	addUpCode:'api/mine/addUpCode',//提交上级邀请码
	getAddressList:'api/mine/getAddressList',//获取收货地址列表
	addAddress:'api/mine/addAddress',//添加收货地址
	getAddress:'api/mine/getAddress',//获取收货地址详情
	editAddress:'api/mine/editAddress',//修改收货地址
	delAddress:'api/mine/delAddress',//删除收货地址
	addDraw:'api/mine/addDraw',//提现
	getTeam:'api/mine/getTeam',//我的团队
	getSign:'api/mine/getSign',//获取签到信息
	addSign:'api/mine/addSign',//签到
	getFocus:'api/qukan/getFocusQukan',//获取收藏列表
	addComplaint:'api/mine/addComplaint',//意见反馈
	getFlowLists:'api/mine/getFlowList',//获取流水明细列表
	getOrderList: "/api/mine/getOrderList", // 查看订单列表
	getBeanList: "/api/mine/getBeanList", // 明细-获取豆豆明细列表
	getDefaultAddress: "/api/mine/getDefaultAddress", // 收货地址-获取默认收货地址信息
	delFocusQukan: "/api/qukan/delFocusQukan", // 关注商品-移除关注商品
	getPhonenumber: "/index/getPhonenumber", // 客服-获取客服电话
	getMessage: "/api/mine/getMessage", //消息-获取平台消息
	
	/**
	 * 注册与登录
	 */
	sendVerification:'anon/sms',//发送验证码
	login:'anon/login',//登录
	
	/**
	 * 七牛
	 */
	baseLocation: 'https://img.bajiaostar.com/', 
	unloadLocation: 'https://upload.qiniup.com/', 
	getQiniuToken:'api/mine/getQiniuToken', //获取七牛token	
	
	/**
	 * 抽奖
	 */
	getAwardList:'api/index/getAwardList',//获取抽奖商品列表
	executeAward:'api/index/executeAward',//执行抽奖
	getAwardHistory: "/api/index/getAwardHistory", //抽奖-获取抽奖记录

	/**
	 * 首页
	 */
	drawActivity: "/api/index/drawActivity", // 邀请有奖-提取活动奖励
	executeAward: "/api/index/executeAward", // 抽奖-执行抽奖操作
	getActivity: "/api/index/getActivity", // 邀请有奖-打开活动界面
	getAwardList: "/api/index/getAwardList", // 抽奖-获取奖品列表
	setActivity: "/api/index/setActivity", // 邀请有奖-获取活动奖励
	getArticle: "/index/getArticle", // 文章-获取文章详情
	getIndex: "/index/getIndex", // 首页-获取首页信息
	getIndexGoods: "/index/getIndexGoods", // 首页-获取分类商品
	getPicasaList: "/index/getPicasaList", // 轮播图
	getSearch: "/index/getSearch", // 搜索-获取热门搜索信息
	setSearch: "/index/setSearch", // 搜索-提交搜索信息
	getIndexQukanGoods: "/index/getIndexQukanGoods", // 首页-获取正在砍商品
	getActivityCode:'api/index/getActivityCode',//获取分享口令
	getRollMessage: "/index/getRollMessage", // 轮播-获取轮播消息
	checkActivity:'api/index/checkActivity',//邀请有奖-确认活动状态
	doShare:'api/index/doShare',//执行分享
	getIndexQukanGoodsList: "/index/getIndexQukanGoods", //首页-根据分类获取趣砍商品列表
	getRankList: "/index/getRankList", // 榜单-获取王者榜单
	getActivityAward: "/api/index/getActivityAward", // 邀请有奖-提取活动奖励
	getQukanLastest: "/index/getQukanLastest", // 轮播-获取最新成交
	checkActivityCode: "/api/index/checkActivityCode", //活动-检测活动码
	getQRCode: "/api/index/getQRCode", //邀请-获取分享二维码
	
	/**
	 * 大市场
	 */
	getCategory: "/market/getCategory", // 大市场-获取分类列表
	getMarketGoodsList: "/market/getMarketGoodsList", // 大市场-获取分类与商品列表
	getMarketGoods: "/market/getMarketGoods", // 大市场-获取商品详情
	addMarketOrder: "/api/market/addMarketOrder", // 大市场-生成大市场商品订单
	buyMarketGoods: "/api/market/buyMarketGoods", // 大市场-购买大市场商品
	delMarketOrder: "/api/market/delMarketOrder", // 大市场-取消大市场订单
	payMarketOrder: "/api/market/payMarketOrder", // 大市场-支付大市场订单
	getMarketOrderInfo: "/api/market/getMarketOrderInfo", // 查看大市场订单
	commitOrderQukan: "/api/qukan/commitOrderQukan", // 趣砍确认收货
	commitOrderMarket: "/api/market/commitOrderMarket",  // 大市场确认收货


	/**
	 * 趣砍
	 */
	getQukanGoods:'/api/qukan/getQukanGoods',//获取趣砍详情
	addFocusQukan:'api/qukan/addFocusQukan',//收藏商品
	delFocusQukan:'api/qukan/delFocusQukan',//取消收藏
	addMarketOrder: "/api/market/addMarketOrder", // 大市场-生成大市场商品订单
	buyMarketGoods: "/api/market/buyMarketGoods", // 大市场-购买大市场商品
	delMarketOrder: "/api/market/delMarketOrder", // 大市场-取消大市场订单
	payMarketOrder: "/api/market/payMarketOrder", // 大市场-支付大市场订单
	getMarketOrderInfo: "/api/market/getMarketOrderInfo", // 查看大市场订单
	

	/**
	 * 趣砍详情
	 */
	qukangetCategory: "/qukan/getCategory", // 趣砍-获取分类列表
	getQukanGoodsList: "/qukan/getQukanGoodsList", // 趣砍-获取分类与商品列表
	getFlowList: "/api/qukan/getFlowList", // 明细-获取出价记录
	getQukanOrderList: "/api/mine/getQukanOrderList", // 趣砍-趣砍订单明细
	getQukanOrderInfo: "/api/qukan/getQukanOrderInfo", // 查看趣砍订单
	buyQukanGoods: "/api/qukan/buyQukanGoods", // 趣砍-砍中商品
	initQukanOrder: "/api/qukan/initQukanOrder", // 趣砍-生成趣砍订单
	// getQukanGoods:　"/qukan/getQukanGoods", // 趣砍-获取商品详情
	getQukanHistory: "/api/qukan/getQukanHistory", // 趣砍-获取往期成交
	addQukanComment: "/api/qukan/addQukanComment", // 评价-评价趣砍商品


	/**
	 * 邀请活动 活动专区
	 */
	getActivity: "/api/index/getActivity", // 邀请有奖-打开活动界面
	setActivity: "/api/index/setActivity", // 邀请有奖-获取活动奖励
	drawActivity: "/api/index/drawActivity", // 邀请有奖-提取活动奖励
	
	/**
	 * 支付
	 */
	alPay: "/api/aliPay/appPay", // 支付宝app支付
	appPayRecharge: "/api/aliPay/appPayRecharge", // 充值
	alCodePay: "/api/aliPay/codePay", // 阿里扫码支付 flag：1.订单 2.充值
	wxPay: "/api/wxPay/appPay", // 微信app支付
	wxCodePay: "/api/wxPay/codePay", // 微信扫码支付 flag：1.订单 2.充值
	appOrderPay: "/api/aliPay/appOrderPay", // 订单支付
	wxAppPay: "/api/wxPay/appOrderPay", // 微信app订单支付
	
	
	/**
	 * 趣砍详情
	 */
	qukangetCategory: "/qukan/getCategory", // 趣砍-获取分类列表
	getQukanGoodsList: "/qukan/getQukanGoodsList", // 趣砍-获取分类与商品列表
	getMarketComment: "/api/qukan/getMarketComment", // 评价-获取趣砍商品评价
	checkQukanStatus: "/api/qukan/checkQukanStatus", // 趣砍-检查能否出价
	
	/**
	 * 充值
	 */
	getPayList:'api/mine/getPayList',//获取充值列表

	/**
	 * 富文本
	 */
	getArticle: "/index/getArticle", // 文章-获取文章详情
	
	getVersion: "/anon/getVersion",  //"获取最新版本号"
}
