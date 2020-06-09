<template>
	<view>
		<!-- 待付款 -->
		<view class="waitForPay" v-if="orderDetailInfo.status == 0">
			<view class="waitForPay-left">
				<view>
					等待付款
				</view>
				<view>
					<text>订单金额</text><text>¥{{type == 1 ? orderDetailInfo.nowPrice : orderDetailInfo.price}}</text>
				</view>
				<view>
					<!-- <text>剩余时间</text><text>4小时24分33秒</text> -->
				</view>
			</view>
			<view class="waitForPay-right">
				<image src="../../static/image/ylc/29.png" mode=""></image>
			</view>
		</view>
		<!-- 待发货 -->
		<view class="waitForSend " v-if="orderDetailInfo.status == 1">
			<view class="waitForSend-left">
				<view>
					等待商家发货
				</view>
				<view>
					<text>订单金额</text><text>¥{{orderDetailInfo.price}}</text>
				</view>
			</view>
			<view class="waitForSend-right">
				<image src="../../static/image/ylc/30.png" mode=""></image>
			</view>
		</view>
		<!-- 待收货 -->
		<view class="Sended " v-if="orderDetailInfo.status == 2">
			<view class="Sended-left">
				<view>等待买家收货</view>
				<view><text>订单金额</text><text>¥{{orderDetailInfo.price}}</text></view>
			</view>
			<view class="Sended-right">
				<image src="../../static/image/ylc/31.png" mode=""></image>
			</view>
		</view>
		<!-- 待评价 -->
		<view class="waitForEvaluate " v-if="orderDetailInfo.status == 3">
			<view class="waitForEvaluate-left">
				<view v-if="type == 1">等待买家评价</view>
				<view v-if="type == 2">已完成</view>
				<view><text>订单金额</text><text>¥{{orderDetailInfo.price}}</text></view>
			</view>
			<view class="waitForEvaluate-right">
				<image src="../../static/image/ylc/32.png" mode=""></image>
			</view>
		</view>
		<!-- 已完成 -->
		<view class="completed " v-if="orderDetailInfo.status == 4">
			<view class="completed-left tui-skeleton-rect">
				<view>已完成</view>
				<view><text>订单金额</text><text>¥{{orderDetailInfo.price}}</text></view>
			</view>
			<view class="completed-right tui-skeleton-rect">
				<image src="../../static/image/ylc/32.png" mode=""></image>
			</view>
		</view>
		<!-- 地址 -->
		<view class="line-30"></view>
		<view class="receiveAddress ">
			<view class="address-icon">
				<image src="../../static/image/ylc/33.png" mode=""></image>
			</view>
			<view class="address-detail">
				<view>
					<text>{{orderDetailInfo.userName}}</text><text>{{orderDetailInfo.phonenumber}}</text>
				</view>
				<view>
					{{orderDetailInfo.addressDetail}}
				</view>
			</view>
		</view>
		<view class="line-30"></view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="goods-img">
				<image :src="orderDetailInfo.image" mode="aspectFill"></image>
			</view>
			<view class="goods-info">
				<view>
					{{orderDetailInfo.title}}
				</view>
				<view>¥{{orderDetailInfo.price}}</view>
				<view class="realPay">
					<text>实付：</text><text>¥{{type == 1 ? orderDetailInfo.nowPrice : orderDetailInfo.price}}</text>
				</view>
<!-- 				<view class="totalPay">
					<text>合计：</text><text>¥238</text><text>+3000积分</text>
				</view> -->
			</view>
		</view>
		<view class="line-30"></view>
		<view class="orderNo">
			<view class="orderNo-item ">
				<text>订单编号</text><text>{{orderDetailInfo.ordnum}}</text>
			</view>
			<view class="orderNo-item">
				<text>创建时间</text><text>{{orderDetailInfo.createTime}}</text>
			</view>
		</view>
		<view class="bottomButton" v-if="orderDetailInfo.status == 0">
			<view class="whiteButton " v-if="type == 2" @click.stop="handleToCancelOrder">取消订单</view>
			<view class="redButton " @click.stop="handleShowPopup">立即付款</view>
		</view>
		<view class="bottomButton" v-if="orderDetailInfo.status == 2">
			<view class="redButton" @click="consignee(orderDetailInfo.ordnum)">确认收货</view>
		</view>
		<view class="bottomButton" v-if="orderDetailInfo.status == 3 && type == 1" >
			<view class="redButton" @click="handleToEvaluate(orderDetailInfo.ordnum)">去评价</view>
		</view>
		
		
		<u-popup v-model="showPayPopFlag" mode="bottom" border-radius="14">
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
		onLoad (options) {
			console.log(options)
			this.ordnum = options.ordnum
			this.orderIndex = options.index
			this.queueId = options.queueId
			this.type = options.type
			this.initOrderDetail()
		},
		data() {
			return {
				// orderStatus:1,
				showPayPopFlag: false, //显示支付弹框
				circleShowFlag: 0,
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
				ordnum: 0,
				orderIndex: 0,
				orderDetailInfo: {},
				queueId: '',
				type: ''
			};
		},
		methods:{
			handleToEvaluate(id){
				uni.redirectTo({
					url:'./evaluate?id=' + id
				})
			},
			// 显示弹框
			handleShowPopup () {
				this.showPayPopFlag = true
			},
			// 支付方式切换
			handleCircle (index) {
				this.circleShowFlag = index
			},
			// 确认收货
			async consignee (ordnum) {
				console.log(ordnum)
				uni.showModal({
				    title: '提示',
				    content: '是否确认收货',
				    success: async(res) => {
				        if (res.confirm) {
							let msg
							if (this.type == 1) {
								msg  =  await this.$fetch(this.$api.commitOrderQukan, {ordnum: ordnum}, 'GET', 'FORM')
								if (msg.code == 0) {
									uni.showToast({
										icon: 'success',
										title: '操作成功'
									})
									this.orderDetailInfo.status = 3
									uni.setStorageSync('consigneeFlag', true)
								} else {
									uni.showToast({
										icon: 'none',
										title: msg.msg
									})
								}
							} else {
								msg = await this.$fetch(this.$api.commitOrderMarket, {ordnum: ordnum}, 'GET', 'FORM')
								
								if (msg.code == 0) {
									uni.showToast({
										icon: 'success',
										title: '操作成功'
									})
									this.orderDetailInfo.status = 3
									uni.setStorageSync('consigneeFlag', true)
								} else {
									uni.showToast({
										icon: 'none',
										title: msg.msg
									})
								}
							}
				           console.log(msg)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 支付
			async payMoney () {
				if (this.circleShowFlag == 0) {
					let res = await this.$fetch(this.$api.appOrderPay, {ordnum: this.ordnum}, 'POST', 'FORM')
					uni.requestPayment({
					    provider: 'alipay',
					    orderInfo: res.msg, //微信、支付宝订单数据
					    success: (msg) => {
					        console.log('success:' + JSON.stringify(msg));
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							this.showPayPopFlag = false
							this.orderDetailInfo.status = 1
							// if (this.type == 2) {
								uni.setStorageSync('paySuccess', this.orderIndex)
							// } 

							
							
					    },
					    fail: function (err) {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
					    }
					});
				}
				if (this.circleShowFlag == 1) {
					console.log('微信支付')
				}
			},
			// 取消
			handleToCancelOrder () {
				uni.showModal({
				    title: '提示',
				    content: '确定取消该订单么',
				    success: async(res) => {
				        if (res.confirm) {
				           let res = await this.$fetch(this.$api.delMarketOrder, {ordnum: this.ordnum}, "GET", "FORM")
				           console.log(res)
						   if (res.code == 0) {
							   uni.showToast({
							   	icon: 'success',
								title: res.msg
							   })
							uni.setStorageSync('cancelFlag', this.orderIndex)
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
							
						   } else {
							   uni.showToast({
							   	icon: 'none',
								title: res.msg
							   })
						   }
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//订单详情
			async initOrderDetail () {
				if (this.type == 2) {
					let res = await this.$fetch(this.$api.getMarketOrderInfo, {ordnum: this.ordnum}, "GET", 'FORM')
					console.log(res)
					this.orderDetailInfo = res.data
					this.orderDetailInfo.addressDetail = res.data.province + res.data.detail
				} else {
					let res = await this.$fetch(this.$api.getQukanOrderInfo, {ordnum: this.ordnum}, "GET", 'FORM')
					console.log(res)
					this.orderDetailInfo = res.data[0]
					this.orderDetailInfo.addressDetail = this.orderDetailInfo.province + this.orderDetailInfo.detail
					
				}
				
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.waitForPay{
		width: 100%;
		height: 270rpx;
		display: flex;
		background: #FFFFFF;
		.waitForPay-left{
			flex: 2;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				margin: 38rpx 0 0 70rpx;
				font-size: 28px;
				color: #E51200;
				font-weight: bold;
			}
			& > view:nth-child(2){
				margin: 20rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:nth-child(2){ 
					font-size: 14px;
					color: #333333;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #888888;
				}
			}
			& > view:nth-child(3){
				margin: 10rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:last-child{
					font-size: 14px;
					color: #333333;
				}
			}
		}
		.waitForPay-right{
			flex: 1;
			display: flex;
			align-items: center;
			image{
				width: 210rpx;
				height: 210rpx;
			}
		}
	}
	.waitForSend{
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;
		display: flex;
		.waitForSend-left{
			flex: 2;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				font-size: 28px;
				color: #FF9800;
				margin: 50rpx 0 0 70rpx;
				font-weight: bold;
			}
			& > view:last-child{
				margin: 20rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:nth-child(2){ 
					font-size: 14px;
					color: #333333;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #888888;
				}
			}
		}
		.waitForSend-right{
			flex: 1;
			display: flex;
			align-items: center;
			image{
				width: 210rpx;
				height: 210rpx;
			}
		}
	}
	.Sended{
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;
		display: flex;
		.Sended-left{
			flex: 2;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				font-size: 28px;
				color: #FF9800;
				margin: 50rpx 0 0 70rpx;
				font-weight: bold;
			}
			& > view:last-child{
				margin: 20rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:nth-child(2){ 
					font-size: 14px;
					color: #333333;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #888888;
				}
			}
		}
		.Sended-right{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 210rpx;
				height: 210rpx;
			}
		}
	}
	.receiveAddress{
		width: 100%;
		height: 150rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		.address-icon{
			width: 64rpx;
			display: flex;
			align-items: center;
			margin: 0 30rpx;
			image{
				width: 64rpx;
				height: 64rpx;
			}
		}
		.address-detail{
			width: 596rpx;
			margin: 30rpx 30rpx 30rpx 0;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				width: 596rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #333333;
					margin-right: 30rpx;
				}
				& > text:last-child{
					font-size: 14px;
					color: #939393;
				}
			}
			& > view:last-child{
				width: 596rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333333;
			}
		}
	}
	.waitForEvaluate{
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;
		display: flex;
		.waitForEvaluate-left{
			flex: 2;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				font-size: 28px;
				color: #2B2925;
				margin: 50rpx 0 0 70rpx;
				font-weight: bold;
			}
			& > view:last-child{
				margin: 20rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:nth-child(2){ 
					font-size: 14px;
					color: #333333;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #888888;
				}
			}
		}
		.waitForEvaluate-right{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 210rpx;
				height: 210rpx;
			}
		}
	}
	.completed{
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;
		display: flex;
		.completed-left{
			flex: 2;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				font-size: 28px;
				color: #939393;
				margin: 50rpx 0 0 70rpx;
				font-weight: bold;
			}
			& > view:last-child{
				margin: 20rpx 0 0 70rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				& > text:nth-child(2){ 
					font-size: 14px;
					color: #333333;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #888888;
				}
			}
		}
		.completed-right{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 210rpx;
				height: 210rpx;
			}
		}
	}
	.order-info{
		width: 100%;
		height: 260rpx;
		display: flex;
		// align-items: center;
		background: #FFFFFF;
		.goods-img{
			width: 200rpx;
			height: 200rpx;
			margin: 30rpx 20rpx 30rpx 30rpx;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.goods-info{
			width: 470rpx;
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;
			& > view:first-child{
				width: 470rpx;
				font-size: 14px;
				color: #4A4A4A;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-weight: bold;
			}
			& > view:nth-child(2){
				font-size: 14px;
				color: #222222;
				width: 470rpx;
			}
			.realPay{
				width: 470rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #A2A2A2;
				& > text:last-child{
					font-size: 17px;
					color: #C9281C;
				}
			}
			.totalPay{
				width: 470rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #A2A2A2;
				& > text:nth-child(2){
					font-size: 17px;
					color: #C9281C;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #FFA900;
				}
			}
		}
	}
	.orderNo{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx 30rpx;
		background: #FFFFFF;
		.orderNo-item{
			flex: 1;
			display: flex;
			align-items: center;
			& > text:first-child{
				font-size: 14px;
				color: #939393;
				margin-right: 30rpx;
			}
			& > text:last-child{
				font-size: 14px;
				color: #4A4A4A;
			}
		}
		.orderNo-item + .orderNo-item{
			margin-top: 10rpx;
		}
	}
	.bottomButton{
		width: 690rpx;
		height: 100rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		.whiteButton{
			border: 1px solid #ABABAB;
			border-radius: 15px;
			width: 160rpx;
			height: 60rpx;
			font-size: 14px;
			color: #939393;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 40rpx;
		}
		.redButton{
			background: #C9281C;
			border-radius: 15px;
			width: 160rpx;
			height: 60rpx;
			font-size: 14px;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
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
</style>
