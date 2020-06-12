<template>
	<view class="qukan" v-if="!isLoading">
		
		<view class="qukan-wrapper">
			<swiper :indicator-dots="true"  style="height: 710rpx;">
				<swiper-item class="qukan-swiper-item" v-for="(goodsImg,goodsIndex) in goodsDetail.images " :key="goodsIndex">
					<view class="swiper-item">
							<image :src="goodsImg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="qukan-time-box" style="background-image: url(../../static/image/11.png) ;">
				<view class="qukan-time-left">
					<view class="qukan-time-left-top">
						<view class="qukan-time-left-top-price">¥{{goodsPriceNow}}</view>
						<view class="qukan-time-left-top-right">当前价</view>
					</view>
					<view class="qukan-time-left-bottom">
						<text>市场价</text>
						<text>¥{{goodsDetail.price}}</text>
					</view>
				</view>
				<view class="qukan-time-right">
					<view class="qukan-time-right-top">距离结束仅有</view>
					<view class="qukan-time-right-bottom">
						<text class="qukan-time-right-bottom-time">00</text>
						<text class="qukan-time-right-bottom-maohao">:</text>
						<text class="qukan-time-right-bottom-time">{{second}}</text>
						<text class="qukan-time-right-bottom-maohao">:</text>
						<text class="qukan-time-right-bottom-time">{{count}}</text>
					</view>
				</view>
			</view>
			<view class="shop-box">
				<view class="shop-title">
					<text>趣砍爆款</text>
					<text>{{goodsDetail.title}}</text>
				</view>
				<view class="shop-center">
					<view class="shop-center-left"><span>{{focusCount}}</span>人已收藏</view>
					<view class="shop-center-right">
						<view class="shop-center-right-text" @click="goToShopDeatailArt(goodsDetail.qukanGoods.detail, goodsDetail.qukanGoods.title)">商品详情</view>
						<image src="../../static/image/ych/right-sanjiao.png" mode=""></image>
					</view>
				</view>
				<view class="shop-bottom">
					<swiper vertical disable-touch>
						<swiper-item>
							<view class="shop-bottom-swiper-item">
								<view class="shop-bottom-swiper-item-left">
									<image src="../../static/image/laba.png" mode=""></image>
								</view>
								<view class="shop-bottom-swiper-item-right">
									若无人出价,<text>{{recentCutUsersName}}</text>将以<text>{{goodsPriceNow}}</text>元获得此物
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="line-30"></view>
			<view class="pay-price-rank"  @click="goToBids">
				<view class="pay-price-rank-title">
					<view class="pay-price-rank-title-left">出价记录</view>
					<view class="pay-price-rank-title-right">
						<image src="../../static/image/ych/index/right.png" mode=""></image>
					</view>
				</view>
				<view class="pay-price-rank-center">
					<view class="pay-price-rank-center-item" :class="{rankTop: index == 0}" v-for="(item, index) in recentCutUsers" :key = "index">
						<view class="pay-price-rank-center-title" :class="{rankTopTitle: index == 0}">{{index == 0 ? '领先': '出局'}}</view>
						<view class="pay-price-rank-center-user">
							<view class="pay-price-rank-center-user-avatar">
								<image :src="item.image" mode=""></image>
							</view>
							<view class="pay-price-rank-center-user-name">{{item.name}}</view>
							<view class="pay-price-rank-center-user-price">¥{{item.price}}</view>
						</view>
					</view>
				</view>
				<view class="pay-price-rank-bottom">
					<image src="../../static/image/ych/qukan/bianzu1.png" mode=""></image>
					<view class="pay-price-rank-bottom-pay">已消耗<span>{{myCount}}</span>趣币/赠币</view>
				</view>
			</view>
			<view class="line-30"></view>
			<view class="qukan-tip">
				<view class="qukan-tip-item">
					<image src="../../static/image/ych/qukan/bianzu5.png" mode=""></image>
					<view class="qukan-tip-item-text">零风险</view>
				</view>
				<view class="qukan-tip-item">
					<image src="../../static/image/ych/qukan/bianzu4.png" mode=""></image>
					<view class="qukan-tip-item-text">正品保证</view>
				</view>
				<view class="qukan-tip-item">
					<image src="../../static/image/ych/qukan/bianzu2.png" mode=""></image>
					<view class="qukan-tip-item-text">极速发货</view>
				</view>
				<view class="qukan-tip-item">
					<image src="../../static/image/ych/qukan/bianzu3.png" mode=""></image>
					<view class="qukan-tip-item-text">公平公正</view>
				</view>
			</view>
			<view class="line-30"></view>
			<view class="qukan-introduce">
				<view class="qukan-introduce-left">
					<view class="qukan-introduce-left-item">
						<text>起砍价</text>
						<text>¥{{goodsDetail.price}}</text>
					</view>
					<view class="qukan-introduce-left-item">
						<text>网服费</text>
						<text>¥1趣币</text>
					</view>
					<view class="qukan-introduce-left-item">
						<text>退币比例</text>
						<text>100%</text>
					</view>
					
				</view>
				<view class="qukan-introduce-right">
					<view class="qukan-introduce-right-item">
						<text>砍价幅度</text>
						<text>¥0.10</text>
					</view>
					<view class="qukan-introduce-right-item">
						<text>倒计时</text>
						<text>10秒</text>
					</view>
				</view>
			</view>
			<view class="line-30"></view>
			<view class="qukan-tablist">
				<view class="qukan-tablist-item" @click="handleTabIndex(index)" :class="{on: index == qukanTablistIndex}" v-for="(item, index) in qukanTablist" :key = "index">{{item}}</view>
			</view>
			<view class="line-30"></view>
			
			<view class="qukan-tablist-main">
				<view class="qukan-tablist-main-title" v-if="qukanTablistIndex != 2">{{qukanTablistIndex == 0 ? `晒单评价（${QuKanCommentTotal}）` : qukanTablistIndex == 1 ? `往期成交（${QkHisTotal}）` : ''}}</view>
			
				<view class="qukan-tablist-main-list">
					<view class="qukan-tablist-main-list-item" v-if="qukanTablistIndex == 0" v-for="(item, index) in QuKanCommentArr" :key = "index">
						<view class="qukan-tablist-main-list-top">
							<view class="qukan-tablist-main-list-top-left">
								<image :src="item.avatar" mode=""></image>
								<text>{{item.userName}}</text>
							</view>
							<view class="qukan-tablist-main-list-top-right">{{item.createTime}}</view>
						</view>
						<view class="qukan-tablist-main-list-center">{{item.content}}</view>
						<view class="qukan-tablist-main-list-footer" v-if="hideComment">
							<view class="qukan-tablist-main-list-footer-box" v-for="(footerImg, i) in item.image" :key = "i" @click="priveImage(item.image, i)">
								<image :src="footerImg" mode=""></image>
							</view>
						</view>
					</view>
					
					<view class="qukan-tablist-main-list-item" v-if="qukanTablistIndex == 1" v-for="(item, index) in QKHistoryArr" :key = "index">
						<view class="qukan-tablist-main-list-top">
							<view class="qukan-tablist-main-list-top-left">
								<image :src="item.avatar" mode=""></image>
								<text>{{item.userName}}</text>
							</view>
							<view class="qukan-tablist-main-list-top-right">{{item.createTime}}</view>
						</view>
						<view class="qukan-tablist-main-list-center-two">
							<view class="qukan-tablist-main-list-center-two-left">
								<view class="qukan-tablist-main-list-center-two-left-top-item">
									<text>市场价</text>
									<text>¥{{item.qukanGoods.price}}</text>
								</view>
								<view class="qukan-tablist-main-list-center-two-left-bottom-item">
									<text>成交价</text>
									<text>¥{{item.nowPrice}}</text>
								</view>
							</view>
							<view class="qukan-tablist-main-list-center-two-right">
								<text>节省</text>
								<text>{{item.savePercent}}</text>
								<text>%</text>
							</view>
						</view>
					</view>
					<view class="qukan-tablist-main-list-item" v-if="qukanTablistIndex == 2">
						<jyf-parser :html="richText" ref="article"></jyf-parser>
					</view>
				</view>
	
			</view>
		
			<view class="line-30"></view>
		</view>
		
		<view class="qukan-button-wrapper">
			<view class="qukan-button-left">
				<view class="qukan-button-left-item" @click.stop="callPhone">
					<view class="qukan-button-left-item-top">
						<image src="../../static/image/phone.png" mode=""></image>
					</view>
					<view class="qukan-button-left-item-bottom">电话</view>
				</view>	
				<view class="qukan-button-left-item" @click="handleChangeFocus">
					<view class="qukan-button-left-item-top">
						<image src="../../static/image/bianzu10.png" mode="" v-if="isFocus == 'false'"></image>
						<image src="../../static/image/bianzu11.png" mode="" v-else></image>
					</view>
					<view class="qukan-button-left-item-bottom">收藏</view>
				</view>
			</view>
			<view class="qukan-button-right">
				<view class="qukan-button-right-left">
					<u-number-box :value="value"  @change="valChange" :min="1" color="#C9281C" class="number-box"></u-number-box>
				</view>
				<view class="qukan-button-right-right" @click="cutPrice">出价</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; 	
	export default {
		data () {
			return {
				qukanTablist: ['晒单评价', '往期成交', '趣砍规则'],
				qukanTablistIndex: 0,
				value:1,
				goodsDetail:{},
				goodsId:'',
				socketTask:null,
				timer:null,
				recentCutUsers:[],
				goodsPriceNow:"获取中...",
				cutCount:0,
				second:'09',
				count:100,
				seconds:9,
				isFocus:'false',
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				QuKanCommentArr: [],
				myCount:0,
				isLoading:true,
				recentCutUsersName:'',
				userId: 0,
				richText: '',
				QKHistoryArr: [],
				QuKanCommentTotal: 0,
				QkHisTotal: 0,
				cutFlag: true,
				errorMsg: null,
				phoneNumber: '',
				hideComment: true,
				focusCount: 0
			}
		},
		components: {
		    "jyf-parser": parser
		},
		methods: {
			// 去商品详情
			goToShopDeatailArt (info, title) {
				uni.navigateTo({
					url: '../ShopDetailArt/ShopDeatailArt?detail=' + info + "&title=" + title
				})
			},
			// 更换tab
			async handleTabIndex (index) {
				this.qukanTablistIndex = index
				this.hasFlag = true 
				this.pageNum = 0,
				this.QuKanCommentArr = []
				this.QKHistoryArr = []
				// 获取评价
				if (index == 0) {
					this.initQuKanComment()
				} else if (index == 1) { // 获取记录
					this.initQKHistory()
				} else { // 富文本
					let res = await this.$fetch(this.$api.getArticle,{id: 8},'GET')
					this.richText = res.data.content
				}
			},
			// 步进器
			valChange(e) {
				console.log(e);
				this.value = e.value
			},
			async initQKHistory () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getQukanHistory, {id: this.goodsId, pageNum: this.pageNum, pageSize: 10}, 'GET', 'FORM')
				console.log(res)
				this.QkHisTotal = res.total
				this.QKHistoryArr = [...this.QKHistoryArr, ...res.rows]
				this.QKHistoryArr.forEach(item => {
					item.savePercent = Number((1 - item.nowPrice / item.qukanGoods.price) * 100).toFixed(2)
				})
				this.hasFlag = this.pageNum * 10 < res.total
			},
			// 跳转出价记录
			goToBids () {
				if (this.second == 0 && this.count <= 0) {
					return uni.showToast({
						icon: 'none',
						title: '该趣砍商品已结束, 请等待最新一期'
					})
				}
				uni.navigateTo({
					url: '../Bids/Bids?id=' + this.goodsId
				})
			},
			// 获取趣砍商品详情
			async getQuKanGoodsDetail(){
				let res 
				if (uni.getStorageSync('searchToQk')) {
					res = await this.$fetch(this.$api.getQukanGoods,{id:this.goodsId, type: 1},'GET')
					uni.removeStorageSync('searchToQk')
				} else {
					res = await this.$fetch(this.$api.getQukanGoods,{id:this.goodsId},'GET')
				}
				
				console.log(res);
				if (res.code != 0) {
					uni.showToast({
						 icon: 'none',
						 title: res.msg
					})
					this.second = 0
					this.count = 0
					clearInterval(this.timer)
					this.timer = null
					this.goodsPriceNow = "已结束"
				} else {
					res.data.goods.images = res.data.goods.images.split(",")
					// this.goodsPriceNow = res.data.goods.nowPrice.toFixed(2)
					this.goodsDetail  = res.data.goods
					this.isFocus = res.data.isFocus
					this.focusCount = res.data.focusCount
					let newRecentCutUsers = res.data.cutList
					newRecentCutUsers.forEach(item => {
						item.name = item.userName
						item.image = item.avatar
						item.price = item.nowPrice
						item.userId = item.userId
					})
					
					this.recentCutUsers = newRecentCutUsers
					this.goodsPriceNow = res.data.nowPrice
					this.goodsId = res.data.goods.id
					this.phoneNumber = res.data.phonenumber
					this.connectWebSocket()
				}
				
				
				
			},
			initTimer(){
				// 计时器正在进行中，退出函数
				if (this.timer != null) { 
				  return 
				};
				// 计时器为空，操作
				this.timer = setInterval(() => {
				  this.count --
				  if(this.count==0){
					  if(this.seconds == 0){
						  this.seconds = 0
						  this.second = '00'
						  if(this.count <= 0){
							  this.count = '00'
							  clearInterval(this.timer)
						  }
						  // this.seconds = 9
						  // this.second= '09';
					  }else{
						  this.count=100;
						  this.seconds --
						  this.second = '0'+ this.seconds;
					  }
				  }
				}, 10)          
			
			},
			cutPrice(){
				if (this.second == 0 && this.count <= 0) {
					return uni.showToast({
						icon: 'none',
						title: '该趣砍商品已结束, 请等待最新一期'
					})
				}
				if (this.recentCutUsers.length) {
					console.log(this.recentCutUsers)
					// console.log(uni.getStorageSync('MyUserId'))
					// console.log(this.recentCutUsers[0].userId)
					if (uni.getStorageSync('MyUserId') == this.recentCutUsers[0].userId) {
						return uni.showToast({
							icon: 'none',
							title: '您已处于领先位置, 请耐心等候'
						})
					}
				}
				
				
				if (this.second == 0 && this.count == 0) {
					return uni.showToast({
						icon: 'none',
						title: '该趣砍商品已结束, 请等待最新一期'
					})
				}
				 
				if (this.cutFlag) {
					uni.sendSocketMessage({
						data:'cut:'+this.goodsId + ':' + this.value,
						success: async (res) => {
							this.cutFlag = false
							console.log(this.errorMsg)
							let msg = await this.$fetch(this.$api.checkQukanStatus, {num: this.value}, "GET", "FORM")
							console.log(msg)
							
							uni.showToast({
								icon: 'none',
								title: msg.msg
							})
							this.value = 1
							setTimeout(() => {
								this.cutFlag = true
							}, 1500)
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作过快, 请稍后再试'
					})
				}
			
			},
			closeWebSocket(){
				uni.closeSocket({
					complete: (res) => {
						console.log(res)
					}
				})
			},
			connectWebSocket() {
				console.log(this.goodsId);
				let token = uni.getStorageSync('token')
				let userId = uni.getStorageSync('userId')
				console.log(userId);
				console.log(`ws://qukan.bajiaostar.com:8082/websocket/${userId}?token=${token}`)
				this.socketTask=uni.connectSocket({
				  url: `ws://qukan.bajiaostar.com:8082/websocket/${userId}?token=${token}`,
				  // url: `ws://60.180.141.124:8083/websocket/${userId}?token=${token}`,
				  complete: () => {
					  console.log('成功连接');
				  },
				  fail:(err) =>{
					  console.log(err);
				  }
				});
				
				uni.onSocketOpen(res => {
					console.log('WebSocket连接打开成功')
					uni.sendSocketMessage({
						data:'enter:'+ this.goodsId,
						success: (res) => {
							console.log(res);
						}
					})
				});
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！');
				  this.second = 0
				  this.count = 0
				  this.goodsPriceNow = "已结束"
				  clearInterval(this.timer)
				  this.timer = null
				  uni.showToast({
				  	icon: 'none',
					title: '网络连接中断, 请稍后再试'
				  })
				  setTimeout(() => {
					  uni.navigateBack({
					  	delta: 1
					  })
				  }, 1000)
				});
				uni.onSocketMessage(res => {
					console.log(res);
					var dataObject = JSON.parse(res.data);
					console.log(res.data)
					this.errorMsg = dataObject.msg
					//console.log(dataObject.goodsId+"匹配"+this.goodsId)
					if(dataObject.goodsId == this.goodsId){
						if(dataObject.command == "cut"){
							this.second= '09'
							this.seconds = 9
							this.count=100
							console.log(dataObject);
							if(!dataObject.image){
								dataObject.image = '../../static/image/ylc/11.png'
							}
							this.recentCutUsers.unshift({"name":dataObject.name,"image":dataObject.image,"price":dataObject.nowPrice, "userId": dataObject.userId})
							this.userId = dataObject.userId
							this.recentCutUsersName = dataObject.name
							if (this.recentCutUsers.length > 2) {
								this.recentCutUsers.splice(3, this.recentCutUsers.length)
							}
							
							this.goodsPriceNow= Number(dataObject.nowPrice).toFixed(2)
							
							if(dataObject.myCount){
								//自己的砍价次数
								this.myCount = dataObject.myCount
							}
						}
						else if(dataObject.command=="enter"){
							console.log(dataObject)
							console.log('_______________________')
							this.goodsId = dataObject.goodsId
							this.goodsPriceNow = dataObject.nowPrice
							this.myCount = dataObject.myCount
							// this.getQuKanGoodsDetail()
							this.second = '0' + dataObject.endTime
							this.seconds = dataObject.endTime
						
						}
						else if(dataObject.command=="error0"){
							if(uni.getStorageSync('MyUserId')) {
								if (this.userId == uni.getStorageSync('MyUserId')) {
									uni.showToast({
										icon:'none',
										title:dataObject.msg
									})
									setTimeout(() => {
									  uni.navigateBack({
										delta: 1
									  })
									}, 1000)
								}
							}
							
						
						}else if(dataObject.command=="error1"){
							if(uni.getStorageSync('MyUserId')) {
								if (this.userId == uni.getStorageSync('MyUserId')) {
									uni.showToast({
										icon:'none',
										title:dataObject.msg
									})
								}
							}
							
							// setTimeout(() => {
							//   uni.navigateBack({
							// 	delta: 1
							//   })
							// }, 1000)
						}
						else if(dataObject.command=="order"){
							uni.showToast({
								icon:'none',
								title:'竞拍结束！恭喜'+this.recentCutUsersName+'以'+this.goodsPriceNow+'砍到'
							})
							if (uni.getStorageSync('MyUserId')) {
								console.log(this.userId)
								console.log(uni.getStorageSync('MyUserId'))
								
								if (this.userId == uni.getStorageSync('MyUserId')) {
									setTimeout(() => {
										uni.redirectTo({
											url: '../myOrder/myOrder?orderType=' + 1
										})
									}, 1000)
								} else {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							}
							
						}

						
						//console.log("匹配"+dataObject.cutCount)
					}
					//console.log(dataObject.goodsId+'+'+this.goodsId)
				})
			},
			// 改变商品收藏状态
			async handleChangeFocus(){
				if(this.isFocus == 'false'){
					let res = await this.$fetch(this.$api.addFocusQukan,{id:this.goodsId},'GET')
					console.log(res);
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0){
						this.isFocus = 'true'
					}
				}else{
					let res = await this.$fetch(this.$api.delFocusQukan,{id:this.goodsId},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0){
						this.isFocus = 'false'
					}
				}
			},
			async initQuKanComment () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getMarketComment, {goodsId: this.goodsId, pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				res.rows.forEach((item) => {
					if(item.image != null) {
						if (item.image.indexOf(',') != -1) {
							item.image = item.image.split(',')
						} else {
							item.image = [item.image]
							if (item.image[0] == "[]") {
								this.hideComment = false
							}
						}
					}
					
				})
				this.QuKanCommentArr = [...this.QuKanCommentArr, ...res.rows]
				console.log(this.QuKanCommentArr)
				this.QuKanCommentTotal = res.total
				this.hasFlag = this.pageNum * 10 < res.total
			},
			priveImage (imgArr, index) {
				uni.previewImage({
				    //urls:图片数组   current:当前图片的url 可从e中获取
					urls:imgArr,
					current:index
				})
			},
			// 获取出价记录
			async initBidsList () {
				let res = await this.$fetch(this.$api.getFlowList, {id: this.goodsId}, 'GET')
				console.log(res)
				res.data.forEach((item,index) =>{
					if(index < 3){
						if(!item.avatar){
							item.avatar = '../../static/image/ylc/11.png'
						}
						this.recentCutUsersName = item.userName
						this.recentCutUsers.push({"name":item.userName,"image":item.avatar,"price":item.nowPrice})
					}
				})
			},
			callPhone () {
				if (this.phoneNumber == '') {
					return uni.showToast({
						icon: 'none',
						title: "暂未开通"
					})
				}
				uni.makePhoneCall({
				    phoneNumber: this.phoneNumber //仅为示例
				});
			}
		},
		onReachBottom () {
			if (this.hasFlag && this.qukanTablistIndex == 0) {
				this.initQuKanComment()
			} else if (this.hasFlag && this.qukanTablistIndex == 1) {
				this.initQKHistory()
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中...'
			})
			this.goodsId = options.id
			// this.initBidsList()
			this.getQuKanGoodsDetail()
			this.initTimer()
			// this.connectWebSocket()
			this.initQuKanComment()
			this.isLoading = false
			uni.hideLoading()
		},
		onUnload() {
			this.closeWebSocket()
			clearInterval(this.timer)
		}
		
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		width: 100%;
		height: 100%;
	}
	.qukan{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.line-30{
			height: 100%;
			height: 30rpx;
			background-color: #f7f7f7;
		}
		.qukan-wrapper{
			width: 100%;
			// height: 710rpx;
			background-color: #fff;
			position: absolute;
			top: var(--status-bar-height);
			padding-bottom: 100rpx;
			box-sizing: border-box;
			.qukan-swiper-item{
				height: 100%;
				.swiper-item{
					height: 100%;
					image{
						width: 100%;
						// height: 626rpx;
						height: 100%;
					}
				}
			}
			.qukan-time-box{
				width: 100%;
				height: 140rpx;
				background-image: url(../../static/image/11.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: space-between;
				.qukan-time-left{
					width: 414rpx;
					height: 140rpx;
					padding-left: 30rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					.qukan-time-left-top{
						display: flex;
						align-items: center;
						.qukan-time-left-top-price{
							font-family: PingFangSC-Medium;
							font-size: 28px;
							color: #FFFFFF;
							letter-spacing: -0.67px;
							font-weight: bold;
							margin-right: 30rpx;
							box-sizing: border-box;
						}
						.qukan-time-left-top-right{
							width: 90rpx;
							height: 52rpx;
							line-height: 52rpx;
							text-align: center;
							background: #FFFFFF;
							border-radius: 4px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #C9281C;
							letter-spacing: -0.29px;
							box-sizing: border-box;
						}
					}
					.qukan-time-left-bottom{
						text{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FFFFFF;
							letter-spacing: -0.29px;
				
							&:nth-child(2) {
								text-decoration: line-through;
								padding-left: 10rpx;
								box-sizing: border-box;
							}
						}
					}
				}
				.qukan-time-right{
					width: 336rpx;
					height: 140rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.qukan-time-right-top{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #C9281C;
						letter-spacing: -0.29px;
						text-align: justify;
					}
					.qukan-time-right-bottom{
						padding-top: 10rpx;
						.qukan-time-right-bottom-time{
							width: 60rpx;
							height: 60rpx;
							background: #C9281C;
							border-radius: 4px;
							box-sizing: border-box;
							text-align: center;
							line-height: 60rpx;
							font-family: PingFangSC-Medium;
							font-size: 17px;
							color: #FFFFFF;
							letter-spacing: -0.41px;
							font-weight: bold;
							// padding: 0 10rpx;
							display: inline-block;
						}
						.qukan-time-right-bottom-maohao{
							font-family: PingFangSC-Medium;
							font-size: 17px;
							color: #C9281C;
							letter-spacing: -0.41px;
							padding: 0 8rpx;
						}
					}
				}
			}
			.shop-box{
				padding-bottom: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				.shop-title{
					padding: 0 30rpx;
					
					text{
						&:nth-child(1) {
							width: 92rpx;
							height: 32rpx;
							font-family: PingFangSC-Regular;
							font-size: 10px;
							color: #FFFFFF;
							letter-spacing: -0.24px;
							background: #C9281C;
							border-radius: 2px;
							box-sizing: border-box;
							padding: 0 6rpx;
							box-sizing: border-box;
						}
						&:nth-child(2) {
							margin-left: 20rpx;
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: #222222;
							letter-spacing: 0;
							text-align: justify;
							font-weight: bold;
						}
					}
				}
				.shop-center{
					display: flex;
					justify-content: space-between;
					padding: 0 30rpx;
					padding-top: 24rpx;
					padding-bottom: 34rpx;
					box-sizing: border-box;
					.shop-center-left{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #A2A2A2;
						letter-spacing: -0.29px;
						text-align: justify;
						span{
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: #C9281C;
							letter-spacing: -0.34px;
						}
					}
					.shop-center-right{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 136rpx;
						height: 42rpx;
						line-height: 42rpx;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #C9281C;
						letter-spacing: -0.29px;
						text-align: center;
						border: 1px solid #C9281C;
						border-radius: 10.5px;
						box-sizing: border-box;
						
						image{
							width: 16rpx;
							height: 16rpx;
						}
					}
				}
				.shop-bottom{
					width: 690rpx;
					height: 52rpx;
					line-height: 52rpx;
					padding: 0rpx 42rpx 0rpx 30rpx;
					box-sizing: border-box;
					background: #FFEDEB;
					border-radius: 13px;
					margin: 0 auto;
					.shop-bottom-swiper-item{
						display: flex;
						align-items: center;
						.shop-bottom-swiper-item-left{
							image{
								width: 44rpx;
								height: 38rpx;
								transform: translateY(4rpx);
							}
						}
						.shop-bottom-swiper-item-right{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #222222;
							letter-spacing: 0;
							text-align: justify;
							padding-left: 20rpx;
							box-sizing: border-box;
							text{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #C9281C;
								letter-spacing: 0;
								text-align: justify;
							}
						}
					}
				}
			}
			
			.pay-price-rank{
				width: 100%;
				height: 508rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				position: relative;
				z-index: 10;
				.pay-price-rank-title{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 30rpx;
					box-sizing: border-box;
					.pay-price-rank-title-left{
						font-family: PingFangSC-Medium;
						font-size: 17px;
						color: #222222;
						letter-spacing: -0.41px;
						font-weight: bold;
					}
					.pay-price-rank-title-right{
						image{
							width: 16rpx;
							height: 26rpx;
						}
					}
				}
				.pay-price-rank-center{
					width: 100%;
					height: 288rpx;
					display: flex;
					.pay-price-rank-center-item{
						width: 222rpx;
						height: 288rpx;
						position: relative;
						background-image: linear-gradient(0deg, rgba(235,235,235,0.10) 0%, #EBEBEB 100%);
						border-radius: 4px;
						margin-right: 12rpx;
						box-sizing: border-box;
						&:nth-child(3){
							margin-top: 0;
						}
						&.rankTop{
							background-image: linear-gradient(0deg, rgba(255,201,195,0.10) 0%, #FFC9C3 100%);
						}
					}
					.pay-price-rank-center-title{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FFFFFF;
						letter-spacing: -0.29px;
						text-align: center;
						width: 72rpx;
						height: 42rpx;
						line-height: 42rpx;
						background-image: linear-gradient(180deg, #DFDFDF 0%, #BFBFBF 100%);
						border-radius: 4px 0 11px 0;
						position: absolute;
						left: 0;
						top: 0;
						&.rankTopTitle{
							background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
						}
					}
					.pay-price-rank-center-user{
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding-top: 50rpx;
						box-sizing: border-box;
						.pay-price-rank-center-user-avatar{
							image{
								width: 110rpx;
								height: 110rpx;
								border-radius: 50%;
							}
							
						}
						.pay-price-rank-center-user-name{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #222222;
							letter-spacing: -0.29px;
							text-align: center;
						}
						.pay-price-rank-center-user-price{
							font-weight: bold;
							font-family: PingFangSC-Medium;
							font-size: 17px;
							color: #C9281C;
							letter-spacing: -0.41px;
							text-align: center;
							padding-top: 6rpx;
							box-sizing: border-box;
						}
					}
				}
				.pay-price-rank-bottom{
					display: flex;
					align-items: center;
					padding-top: 44rpx;
					box-sizing: border-box;
					image{
						width: 42rpx;
						height: 42rpx;
					}
					.pay-price-rank-bottom-pay{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #A2A2A2;
						letter-spacing: -0.29px;
						margin-left: 22rpx;
						box-sizing: border-box;
						span{
							color: #C9281C;
							margin: 0 10rpx;
							box-sizing: border-box;
						}
					}
				}
			}
			.qukan-tip{
				width: 100%;
				height: 90rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				box-sizing: border-box;
				.qukan-tip-item{
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					.qukan-tip-item-text{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #222222;
						letter-spacing: -0.29px;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}
			}
			.qukan-introduce{
				width: 750rpx;
				height: 220rpx;
				display: flex;
				padding: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				.qukan-introduce-left{
					.qukan-introduce-left-item{
						text{
							&:nth-child(1) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #A2A2A2;
								letter-spacing: -0.34px;
							}
							&:nth-child(2) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #222222;
								letter-spacing: -0.34px;
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
					}
				}
				.qukan-introduce-right{
					padding-left: 186rpx;
					box-sizing: border-box;
					.qukan-introduce-right-item{
						text{
							&:nth-child(1) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #A2A2A2;
								letter-spacing: -0.34px;
							}
							&:nth-child(2) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #222222;
								letter-spacing: -0.34px;
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
					}
				}
			}
			.qukan-tablist{
				width: 100%;
				height: 90rpx;
				display: flex;
				
				background-color: #fff;
				.qukan-tablist-item{
					flex: 1;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #A2A2A2;
					letter-spacing: -0.34px;
					position: relative;
					&::after{
						content: '';
						width: 0;
						height: 0;
						border-bottom: 4rpx solid #C9281C;
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
					}
					&.on{
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #C9281C;
						letter-spacing: -0.34px;
						&::after{
							width: 30%;
						}
					}
				}
			}
			.qukan-tablist-main{
				width: 100%;
				.qukan-tablist-main-title{
					width: 100%;
					height: 98rpx;
					line-height: 98rpx;
					padding-left: 30rpx;
					width: 100%;
					background-color: #fff;
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #222222;
					letter-spacing: -0.41px;
					font-weight: bold;
					box-sizing: border-box;
				}
				.qukan-tablist-main-list{
					background-color: #fff;
					.qukan-tablist-main-list-item{
						padding: 30rpx;
						border-top: 2rpx solid #F3F3F3;
						.qukan-tablist-main-list-top{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.qukan-tablist-main-list-top-left{
								display: flex;
								align-items: center;
								image{
									width: 60rpx;
									height: 60rpx;
									border-radius: 50%;
								}
								text{
									font-family: PingFangSC-Regular;
									font-size: 12px;
									color: #222222;
									letter-spacing: -0.29px;
									padding-left: 30rpx;
									box-sizing: border-box;
								}
							}
							.qukan-tablist-main-list-top-right{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #A2A2A2;
								letter-spacing: -0.29px;
							}
						}
						.qukan-tablist-main-list-center{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #222222;
							letter-spacing: -0.34px;
							padding-top: 30rpx;
							padding-bottom: 20rpx;
							box-sizing: border-box;
							
						}
						.qukan-tablist-main-list-footer{
							display: flex;
							flex-wrap: wrap;
							
							.qukan-tablist-main-list-footer-box{
								// flex: 1;
								// width: 100%;
								margin-left: 30rpx;
								box-sizing: border-box;
								&:nth-child(1) {
									margin-left:0
								}
								&:nth-child(4) {
									margin-left:0
								}
								&:nth-child(7) {
									margin-left:0
								}
								image{
									width: 200rpx;
									height: 200rpx;
								}
							}
						}
						.qukan-tablist-main-list-center-two{
							width: 100;
							height: 84rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.qukan-tablist-main-list-center-two-left{
								.qukan-tablist-main-list-center-two-left-top-item{
									text{
										font-family: PingFangSC-Regular;
										font-size: 14px;
										color: #A2A2A2;
										&:nth-child(2) {
											font-family: PingFangSC-Regular;
											font-size: 14px;
											color: #222222;
											padding-left: 20rpx;
											box-sizing: border-box;
										}
									}
								}
								.qukan-tablist-main-list-center-two-left-bottom-item{
									text{
										font-family: PingFangSC-Regular;
										font-size: 14px;
										color: #A2A2A2;
										&:nth-child(2) {
											font-family: PingFangSC-Regular;
											font-size: 14px;
											color: #C9281C;
											padding-left: 20rpx;
											box-sizing: border-box;
										}
									}
								}
							}
							.qukan-tablist-main-list-center-two-right{
								text{
									font-family: PingFangSC-Semibold;
									font-size: 14px;
									color: #222222;
									letter-spacing: -0.34px;
									font-weight: bold;
									&:nth-child(2){
										font-size: 17px;
										color: #C9281C;
										padding-left: 10rpx;
										padding-right: 6rpx;
										box-sizing: border-box;
									}
								}
							}
						}
					}
				
				}
			}
			
		}
		.qukan-button-wrapper{
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 99;
			.qukan-button-left{
				display: flex;
				padding-left: 50rpx;
				padding-top: 12rpx;
				padding-bottom: 4rpx;
				box-sizing: border-box;
				.qukan-button-left-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.qukan-button-left-item-top{
						image{
							width: 42rpx;
							height: 42rpx;
						}
					}
					.qukan-button-left-item-bottom{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #4E9800;
						letter-spacing: -0.29px;
					}
					&:nth-child(2) {
						padding-left: 76rpx;
						box-sizing: border-box;
						.qukan-button-left-item-bottom{
							color: #A2A2A2;
						}
					}
				}
			}
			.qukan-button-right{
				display: flex;
				align-items: center;
				.qukan-button-right-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: -0.34px;
					width: 210rpx;
					height: 100%;
					line-height: 100rpx;
					text-align: center;
					background: #C9281C;
					margin-left: 30rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
<style>
	.number-box .u-icon-plus, .u-icon-disabled, .u-icon-minus{
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 100%;
	}
</style>