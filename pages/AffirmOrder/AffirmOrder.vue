<template>
	<view class="affirmorder">
		<view class="affirmorder-header" @click="goToMyAddress">
			<view class="affirmorder-header-left">
				<view class="affirmorder-header-left-location">
					<image src="../../static/image/location.png" mode=""></image>
				</view>
				<view class="affirmorder-header-left-info">
					<view class="affirmorder-header-left-info-top">
						<text>收货人</text>
						<text>{{AddressInfo.userName}}</text>
						<text>{{AddressInfo.phonenumber}}</text>
					</view>
					<view class="affirmorder-header-left-info-bottom">
						<text>收货地址：</text>
						<text>{{AddressInfo.province + AddressInfo.detail}}</text>
					</view>
				</view>
			</view>
			<view class="affirmorder-header-right">
				<image src="../../static/image/ych/index/right.png" mode=""></image>
			</view>
		</view>
		<view class="affirmorder-shop">
			<view class="affirmorder-shop-item">
				<view class="affirmorder-shop-left">
					<image :src="type == 1 ? markeyInfo.image : markeyInfo.image[0]" mode=""></image>
				</view>
				<view class="affirmorder-shop-right">
					<view class="affirmorder-shop-right-top">
						{{markeyInfo.title}}
					</view>
					<view class="affirmorder-shop-right-bottom">¥{{markeyInfo.price}}</view>
				</view>
			</view>
			<view class="affirmorder-shop-price">
				<view class="affirmorder-shop-price-top">
					<view class="affirmorder-shop-price-top-left">商品金额</view>
					<view class="affirmorder-shop-price-top-right">¥{{markeyInfo.price}}</view>
				</view>
				<view class="affirmorder-shop-price-center" v-if="type == 2">
					<view class="affirmorder-shop-price-center-left">所需积分</view>
					<view class="affirmorder-shop-price-center-right">¥{{markeyInfo.point}}</view>
				</view>
				<view class="affirmorder-shop-price-bottom">
					<view class="affirmorder-shop-price-bottom-left">总计: </view>
					<view class="affirmorder-shop-price-bottom-right">¥{{type == 1 ? markeyInfo.nowPrice : markeyInfo.price}}</view>
				</view>
			</view>
			
		</view>
		<view class="affirmorder-bottom">
			<view class="affirmorder-bottom-left">
				<text>需支付</text>
				<text>¥{{type == 1 ? markeyInfo.nowPrice : markeyInfo.price}}</text>
			</view>
			<view class="affirmorder-bottom-right" @click="showPayPop">去支付</view>
		</view>
		
		<u-popup v-model="showPopPay" mode="bottom" border-radius="14">
				<view class="popupPay-header">
					<view class="popupPay-header-left">请选择支付方式</view>
					<!-- <view class="popupPay-header-right">¥{{ orderComputed.payAmount ? orderComputed.payAmount : 0 }}</view> -->
				</view>
			<!-- 	<view class="popupPay-middle">
					<view class="popupPay-middle-left">支付剩余时间</view>
					<view class="popupPay-middle-right">{{ minutes }}:{{ seconds }}</view>
				</view> -->
				<view class="popupPay-item" v-for="(popPay, index) in payInfo" :key="index" @tap="handleCircle(index)">
					<view class="circle">
						<view class="n-circle" v-show="circleShowFlag == index"></view>
					</view>
					<image :src="popPay.image" mode="aspectFill"></image>
					<view class="pay-way">
						{{ popPay.text }}
						<!-- <view class="pay-way-sectext" v-if="popPay.sectext">{{ popPay.sectext }}</view> -->
					</view>
				</view>
				<view class="popupPay-button" @click="payMoney">确认支付</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			uni.hideTabBar()
			console.log(options)
			this.type = options.type
			if (this.type == 2) {
				this.markeyInfo = JSON.parse(options.marketInfo)
			} else {
				this.queueId = options.queueId
				this.initQkShopDetai()
			}
			
			if (options.marketFlag == 1) {
				this.marketFlag = 1  // 判断是否从大市场界面进入
			} else { 
				this.marketFlag = 0 // 订单页面进入
			}
			
			
			this.initGetPhoneInfo()
			 
			console.log(this.markeyInfo)
			this.GetDefaultAddress()
		},
		onShow() {
			if (uni.getStorageSync('chooseAddress')) {
				this.AddressInfo = uni.getStorageSync('chooseAddress')
			}
		},
		
		data () {
			return {
				AddressInfo: {  // 地址信息
					id: 0,
					userName: '',
					phonenumber: '',
					province: '',
					detail: '',
				},
				markeyInfo: {}, // 商品信息
				showPopPay: false, // 弹框
				payInfo: [
					{
						image: '../../static/image/ych/pay/1.png',
						text: '支付宝支付',
						sectext: ''
					},
					{
						image: '../../static/image/ych/pay/2.png',
						text: '微信支付',
						sectext: ''
					}
				],
				circleShowFlag: 0,
				type: 0, // 1趣砍 2大市场
				queueId: 0,
				marketFlag: 0
			}
		},
		methods: {
			// 我的地址
			goToMyAddress () {
				uni.navigateTo({
					url: '../My/myAddress?flag=' + 1
				})
			},
			// 支付弹框 生成订单
			async showPayPop () {
				if (!this.AddressInfo.phonenumber) {
					return uni.showToast({
						icon: 'none',
						title: '请先输入地址'
					})
				}
				this.showPopPay = true
				
				
			},
			// 获取手机
			initGetPhoneInfo () {
				console.log(uni.getSystemInfoSync())
				this.platform = uni.getSystemInfoSync().platform
			},
			// 支付方式
			handleCircle (index) {
				console.log(index)
				this.circleShowFlag = index
			},
			// 支付
			async payMoney () {
				if (this.type == 2) {
					let res = await this.$fetch(this.$api.addMarketOrder, {addressId: this.AddressInfo.id, goodsId: this.markeyInfo.id, ordnum: this.markeyInfo.ordnum}, "GET", "FORM")
					console.log(res)
				} else {
					let res = await this.$fetch(this.$api.initQukanOrder, {addressId: this.AddressInfo.id, queueId: this.markeyInfo.queueId, ordnum: this.markeyInfo.ordnum}, "GET", "FORM")
					console.log(res)
				}
				
				if (this.circleShowFlag == 0) {
					// console.log('支付宝支付')
					// console.log(this.markeyInfo.ordnum)
					let res = await this.$fetch(this.$api.appOrderPay, {ordnum: this.markeyInfo.ordnum}, 'POST', 'FORM')
					console.log(res)
					uni.requestPayment({
					    provider: 'alipay',
					    orderInfo: res.msg, //微信、支付宝订单数据
					    success: (msg) => {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							uni.removeStorageSync('chooseAddress')
							this.showPopPay = false
							if (this.platform == 'ios' && this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('iosFlag', true)
									uni.switchTab({
										url: '../My/My'
									})
								}, 1000)
							}else if (this.platform == 'ios' && !this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('consigneeFlag', true)
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							} else {
								setTimeout(() => {
									if (this.type == 1) { //趣砍
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 1 + '&status=' + 3
										})
									} else if (this.type == 2) {
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 2 + '&status=' + 2
										})
									}
								}, 1000)
							}
							
					    },
					    fail: (err) => {
					        console.log('fail:' + JSON.stringify(err));
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
							uni.removeStorageSync('chooseAddress')
							this.showPopPay = false
							if (this.platform == 'ios' && this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('iosFlag', true)
									uni.switchTab({
										url: '../My/My'
									})
								}, 1000)
							} else if (this.platform == 'ios' && !this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('consigneeFlag', true)
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}else {
								setTimeout(() => {
									if (this.type == 1) { //趣砍
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 1 + '&status=' + 0
										})
									} else if (this.type == 2) {
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 2 + '&status=' + 1
										})
									}
								}, 1000)
							}
							
							
					    }
					});
				}
				if (this.circleShowFlag == 1) {
					let res = await this.$fetch(this.$api.wxAppPay, {ordnum: this.markeyInfo.ordnum}, 'POST', 'FORM')
					console.log(res)
					
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: res.timestamp,
					    nonceStr: res.noncestr,
					    package: res.package,
					    signType: 'MD5',
					    paySign: res.sign,
					    success: (msg) => {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
						uni.removeStorageSync('chooseAddress')
						this.showPopPay = false
						if (this.platform == 'ios' && this.marketFlag) {
							setTimeout(() => {
								uni.setStorageSync('iosFlag', true)
								uni.switchTab({
									url: '../My/My'
								})
							}, 1000)
						}else if (this.platform == 'ios' && !this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('consigneeFlag', true)
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
						} else {
							setTimeout(() => {
								if (this.type == 1) { //趣砍
									uni.navigateTo({
										url: '../myOrder/myOrder?orderType=' + 1 + '&status=' + 3
									})
								} else if (this.type == 2) {
									uni.navigateTo({
										url: '../myOrder/myOrder?orderType=' + 2 + '&status=' + 2
									})
								}
							}, 1000)
						}
						
					   },
					    fail: (err) => {
					        uni.showToast({
					        	icon: 'none',
					        	title: '支付失败'
					        })
							uni.removeStorageSync('chooseAddress')
							this.showPopPay = false
							if (this.platform == 'ios' && this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('iosFlag', true)
									uni.switchTab({
										url: '../My/My'
									})
								}, 1000)
							}else if (this.platform == 'ios' && !this.marketFlag) {
								setTimeout(() => {
									uni.setStorageSync('consigneeFlag', true)
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							} else {
								setTimeout(() => {
									if (this.type == 1) { //趣砍
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 1 + '&status=' + 0
										})
									} else if (this.type == 2) {
										uni.navigateTo({
											url: '../myOrder/myOrder?orderType=' + 2 + '&status=' + 1
										})
									}
								}, 1000)
							}
							
					    }
					});
					
				}
			},
			// 获取默认地址
			async GetDefaultAddress () {
				let res = await this.$fetch(this.$api.getDefaultAddress, {}, "GET", "FORM")
				console.log(res)
				if (res.data.id) {
					this.AddressInfo = res.data
				}
				
			},
			// 趣砍商品
			async initQkShopDetai () {
				let res = await this.$fetch(this.$api.buyQukanGoods, {queueId: this.queueId}, "GET", "FORM")
				console.log(res)
				this.markeyInfo = res.data
			}
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	.affirmorder{
		width: 100%;
		padding-bottom: 142rpx;
		box-sizing: border-box;
		.affirmorder-header{
			width: 100%;
			height: 160rpx;
			margin: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;
			.affirmorder-header-left{
				display: flex;
				align-items: center;
				.affirmorder-header-left-location{
					image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				.affirmorder-header-left-info{
					padding-left: 30rpx;
					box-sizing: border-box;
					.affirmorder-header-left-info-top{
		
						text{
							&:nth-child(1) {
								width: 110rpx;
								height: 40rpx;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #9B9B9B;
								letter-spacing: -0.34px;
							}
							&:nth-child(2), &:nth-child(3) {
								font-family: PingFangSC-Medium;
								font-size: 14px;
								color: #333333;
								letter-spacing: -0.34px;
								padding-left: 20rpx;
								box-sizing: border-box;
							}
							&:nth-child(3){
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
					}
					.affirmorder-header-left-info-bottom{
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 1;    //控制行数
						overflow: hidden;
						text{
							&:nth-child(1) {
								width: 138rpx;
								height: 40rpx;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #9B9B9B;
								letter-spacing: -0.34px;
							}
							&:nth-child(2) {
								font-family: PingFangSC-Medium;
								font-size: 14px;
								color: #333333;
								letter-spacing: -0.34px;
								text-align: justify;
							}
						}
					}
				}
			}
			.affirmorder-header-right{
				image{
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		.affirmorder-shop{
			.affirmorder-shop-item{
				width: 750rpx;
				height: 260rpx;
				background-color: #fff;
				display: flex;
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #F3F3F3;
				.affirmorder-shop-left{
					image{
						width: 200rpx;
						height: 200rpx;
					}
				}
				.affirmorder-shop-right{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					padding-left: 30rpx;
					box-sizing: border-box;
					.affirmorder-shop-right-top{
						width: 100%;
						display: -webkit-box;
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #4A4A4A;
						letter-spacing: -0.34px;
						font-weight: bold;
					}
					.affirmorder-shop-right-bottom{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #4A4A4A;
						letter-spacing: -0.34px;
						padding-top: 30rpx;
						box-sizing: border-box;
					}
				}
			}
			.affirmorder-shop-price{
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				padding: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				.affirmorder-shop-price-top{
					display: flex;
					align-items: center;
					.affirmorder-shop-price-top-left{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #9B9B9B;
						letter-spacing: 0.14px;
					}
					.affirmorder-shop-price-top-right{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #4A4A4A;
						letter-spacing: -0.34px;
						padding-left: 20rpx;
						box-sizing: border-box;
					}
				}
				.affirmorder-shop-price-center{
					display: flex;
					align-items: center;
					padding-top: 10rpx;
					padding-bottom: 10rpx;
					box-sizing: border-box;
					.affirmorder-shop-price-center-left{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #9B9B9B;
						letter-spacing: 0.14px;
					}
					.affirmorder-shop-price-center-right{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #4A4A4A;
						letter-spacing: -0.34px;
						padding-left: 20rpx;
						box-sizing: border-box;
					}
				}
				.affirmorder-shop-price-bottom{
					display: flex;
					align-items: center;
					.affirmorder-shop-price-bottom-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #9B9B9B;
						letter-spacing: 0.17px;
					}
					.affirmorder-shop-price-bottom-right{
						font-family: PingFangSC-Medium;
						font-size: 18px;
						color: #C9281C;
						letter-spacing: -0.43px;
						font-weight: bold;
						padding-left: 28rpx;
						box-sizing: border-box;
					}
				}
			}
			
		}
		.affirmorder-bottom{
			width: 100%;
			height: 112rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			.affirmorder-bottom-left{
				flex: 1;
				text-align: right;
				padding-right: 30rpx;
				box-sizing: border-box;
				text{
					&:nth-child(1) {
						font-family: TaipeiSansTCBeta-Regular;
						font-size: 12px;
						color: #A2A2A2;
						letter-spacing: -0.29px;
						padding-right: 10rpx;
						box-sizing: border-box;
					}
					&:nth-child(2) {
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #C9281C;
						letter-spacing: -0.41px;
						font-weight: bold;
					}
				}
			}
			.affirmorder-bottom-right{
				width: 250rpx;
				height: 112rpx;
				line-height: 112rpx;
				text-align: center;
				background: #C9281C;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
		}
		.popupPay-header {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding-top: 60rpx;
			box-sizing: border-box;
			.popupPay-header-left {
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023e;
				letter-spacing: -0.41px;
				font-weight: bold;
				margin-right: 20rpx;
				box-sizing: border-box;
			}
			.popupPay-header-right {
				font-family: PingFangSC-Semibold;
				font-size: 24px;
				color: #ff8516;
				letter-spacing: -0.58px;
			}
		}
		.popupPay-middle {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding-top: 28rpx;
			box-sizing: border-box;
			.popupPay-middle-left {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9, 2, 62, 0.3);
				letter-spacing: -0.34px;
			}
			.popupPay-middle-right {
				margin-left: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468ff;
				letter-spacing: -0.34px;
			}
		}
		.popupPay-item {
			width: 100%;
			display: flex;
			margin-top: 60rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			.circle {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 1px solid rgba(9, 2, 62, 0.3);
				position: relative;
				.n-circle {
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
					background: #5468ff;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;
				box-sizing: border-box;
			}
			.pay-way {
				display: flex;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #333333;
				letter-spacing: -0.34px;
				.pay-way-sectext {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: -0.34px;
				}
			}
		}
		.popupPay-button {
			margin: 30rpx;
			box-sizing: border-box;
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #5468ff;
			border-radius: 4px;
			border-radius: 4px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #ffffff;
			letter-spacing: -0.34px;
		}
	}
</style>
