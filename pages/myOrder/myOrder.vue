<template>
	<view>
		<view class="order-type">
			<view>
				<view class="qukan" :class="orderType == 1 ?'chooseType':''" @click="changeType(1)">趣砍订单</view>
				<view class="dashichang" :class="orderType == 2 ?'chooseType':''" @click="changeType(2)">大市场订单</view>
			</view>
		</view>
		<!-- 选项卡 -->
		<view class="home-tab">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view v-for="(item,index) in tabList" :key="index" class="nav-item" :class="{current: index == tabCurrentIndex}"
				 :id="'tab'+index" @click="changeTab(index, item.id)">{{item.name}}</view>
			</scroll-view>
		</view>
		<!-- 订单列表 -->
		<swiper :current="tabCurrentIndex" duration="300" @change="changeTab" style="height: calc(100vh - 200rpx);padding-top: 200rpx;">
			<swiper-item class="orderList" v-for="(it,index) in tabList" :key="index" >
				<scroll-view scroll-y style="height: calc(100vh - 200rpx);" @scrolltolower="lower" class="orderInfo" v-if="!isEmpty">
					<view class="order-item" v-for="(item,index) in MyOrderArr" :key="item.id" @click="handleOpenOrderDetail(item.ordnum, index, item.queueId, type)">
						<view class="order-no">
							<view v-if="type == 2"><text>订单编号</text><text>{{item.ordnum}}</text></view>
							<view v-if="type == 1 && tabCurrentIndex == 3"><text>订单编号</text><text>{{item.ordnum}}</text></view>
						<!-- 	<view v-if="type == 1" class="order-no-userInfo">
								<image :src="item.avatar" mode=""></image>
								<view class="order-no-userInfo-text">{{item.userName}}</view>
							</view> -->
							<view class="red" v-if="item.status == 0 && orderType == 2">待付款</view>
							<view class="orange" v-if="item.status == 1 && orderType == 2">等待商家发货</view>
							<view class="gray" v-if="item.status == 2 && orderType == 2">待收货</view>
							<view class="green" v-if="item.status == 3 && orderType == 2">已完成</view>
		
		
							<view class="red" v-if="orderType == 1 && tabCurrentIndex == 0">待付款</view>
							<view class="orange" v-if="orderType == 1 && tabCurrentIndex == 1">正在砍</view>
							<view class="gray" v-if="orderType == 1 && tabCurrentIndex == 2">未砍中</view>
							
							<view class="red" style="text-align: right;" v-if="orderType == 1 && tabCurrentIndex == 3 && item.status == 0">待付款</view>
							<view class="orange" style="text-align: right;" v-if="orderType == 1 && tabCurrentIndex == 3 && item.status == 1">待发货</view>
							<view class="gray" style="text-align: right;" v-if="orderType == 1 && tabCurrentIndex == 3 && item.status == 2">待收货</view>
							<view class="green" style="text-align: right;" v-if="orderType == 1 && tabCurrentIndex == 3 && item.status == 3">已收货</view>
							<view class="gray" style="text-align: right;" v-if="orderType == 1 && tabCurrentIndex == 3 && item.status == 4">已完成</view>
							
						</view>
						<view class="order-info">
							<view class="goods-img">
								<image :src="item.image" mode="aspectFill"></image>
							</view>
							<view class="goods-info-1" v-if="orderType == 1">
								<view v-if="tabCurrentIndex != 3">{{item.qukanGoods.title}}</view>
								<view v-else>{{item.title}}</view>
								<view>
									<text>市场价</text>
									<text>¥{{item.price}}</text>
								</view>
								<view>
									<view>
										<text>成交价</text>
										<text>¥{{item.nowPrice}}</text>
									</view>
									<view class="goods-gray" v-if="orderType == 1 && tabCurrentIndex == 2">未砍中</view>
									<view class="goods-orange" v-if="orderType == 1 && tabCurrentIndex == 1">正在砍</view>
								</view>
							</view>
							<view class="goods-info-2" v-else>
								<view>{{item.title}}</view>
								<view>¥{{item.price}}</view>
								<view>
									<text>合计：</text><text>¥{{item.price}}</text><text>+{{item.point}}积分</text>
								</view>
							</view>
						</view>
						<view class="order-aciton" >
							<view class="white-button" v-if="item.status == 0 && type != 1" @click.stop="cancelOrder(item.ordnum, index)">取消订单</view>
							<view class="red-button" v-if="item.status == 0 && type != 1" @click.stop="showPayPop(item.ordnum, index)">立即付款</view>
							<view class="red-button" v-if="item.status == 2 && type != 1"  @click.stop="consignee(item.ordnum, index)">确认收货</view>
							
							
							
							<view class="red-button" v-if="type == 1 && item.status == 0 && tabCurrentIndex == 0">去支付</view>
							<view class="red-button" v-if="type == 1 && item.status == 0 && tabCurrentIndex == 3" @click.stop="showPayPop(item.ordnum, index)">立即付款</view>
							<view class="red-button" v-if="type == 1 && item.status == 2 && tabCurrentIndex == 3"  @click.stop="consignee(item.ordnum, index)">确认收货</view>
							<view class="red-button" v-if="type == 1 && item.status == 3 && tabCurrentIndex == 3"  @click.stop="goToEva(item.ordnum, index)">去评价</view>
						</view>
					</view>
					<!-- 加载 -->
					<uni-load-more bgColor="#f3f3f3" :status="hasFlag ? 'loading' : 'noMore'"></uni-load-more>
				</scroll-view>
				<u-empty :show="isEmpty" mode="order"></u-empty>
			</swiper-item>
		</swiper>
		
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
	let windowWidth = 0, scrollTimer = false,tabBar;		
	export default {
	
		onShow() {
			// 取消订单
			if (uni.getStorageSync('cancelFlag')) {
				this.MyOrderArr.splice(uni.getStorageSync('cancelFlag'), 1)
				uni.removeStorageSync('cancelFlag')
			}
			// 普通去评价
			if (uni.getStorageSync('evaFlag')) {
				this.MyOrderArr[uni.getStorageSync('evaFlag')].status = 4
				uni.removeStorageSync('cancelFlag')
			}
			// 详情内的支付
			if (uni.getStorageSync('paySuccess')) {
				this.MyOrderArr[uni.getStorageSync('paySuccess')].status = 2
				this.pageNum = 0
				this.hasFlag = true
				this.MyOrderArr = []
				this.initMyOrderList()
				uni.removeStorageSync('paySuccess')
			}
			// 详情内的确认收货
			if (uni.getStorageSync("consigneeFlag")) {
				this.pageNum = 0
				this.hasFlag = true
				this.MyOrderArr = []
				this.initMyOrderList()
				uni.removeStorageSync('consigneeFlag')
			}
			// 详情进的评价
			if (uni.getStorageSync('evaFlagRef')) {
				this.pageNum = 0
				this.hasFlag = true
				this.MyOrderArr = []
				this.initMyOrderList()
				uni.removeStorageSync('evaFlagRef')
			}
		},
		onBackPress (e) {
			console.log(e)
			uni.switchTab({
				url: '../My/My'
			})
		},
		data() {
			return {
				orderType:0,
				tabList:[{id:0,name:'待付款'},{id:1,name:'正在砍'},{id:2,name:'未砍中'},{id:3,name:'已砍中'}],
				tabCurrentIndex:0,
				scrollLeft:0,
				isEmpty:false,
				hasFlag:true,
				pageNum: 0,
				pageSize: 10,
				type: 1,
				MyOrderArr: [], // 数据
				showPayPopFlag: false, //显示支付弹框
				circleShowFlag: 0,
				status: 0,
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
				orderNum: null,
				orderIndex: null
			};
		},
		methods:{
			changeType(id, status){
				if(id != this.orderType){
					this.orderType = id 
					this.MyOrderArr = []
					if (status) {
						this.tabCurrentIndex = status
					} else {
						this.tabCurrentIndex = 0
					}
					
					this.status = 0
					this.hasFlag = true
					this.pageNum = 0
					if(id == 1){
						this.tabList = [{id:0,name:'待付款'},{id:1,name:'正在砍'},{id:2,name:'未砍中'},{id:3,name:'已砍中'}]
						
						this.status = 0
						
						this.hasFlag = true
						this.pageNum = 0
						this.type = 1
						this.MyOrderArr = []
						this.initMyOrderList()
					}else{
						this.tabList = [{id:0,name:'全部订单'},{id:1,name:'待付款'},{id:2,name:'待发货'},{id:3,name:'待收货'},{id:4,name:'已完成'}]
						
						this.status = 0
						
						this.hasFlag = true
						this.pageNum = 0
						this.type = 2
						this.MyOrderArr = []
						this.initMyOrderList()
					}
					
				}
			},
			// tab切换
			async changeTab(e, id){
				
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				this.hasFlag = true
				this.pageNum = 0
				this.MyOrderArr = []				
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				scrollTimer = setTimeout(() =>{
					if (width - nowWidth/2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
						console.log(this.scrollLeft);
					}else{
						this.scrollLeft = 0;
					}
					if(typeof e === 'object'){
						this.tabCurrentIndex = index; 
					}
					this.tabCurrentIndex = index; 
					this.status = index
					
					this.initMyOrderList()
				},300)
				
				
			},
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async handleOpenOrderDetail(ordnum, index, queueId, type){
				if (type == 2) {
					uni.navigateTo({
						url:'./orderDetail?ordnum=' + ordnum + '&index=' + index + '&queueId=' + queueId + '&type=' + type
					})
				} else {
					if (this.status == 0) {
						let res = await this.$fetch(this.$api.buyQukanGoods, {queueId: queueId}, "GET", "FORM")
						if (res.code == 500) {
							return uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
						uni.navigateTo({
							url: '../AffirmOrder/AffirmOrder?queueId=' + queueId + '&type=' + 1
						})
					}
					
					if (this.status == 3) {
						uni.navigateTo({
							url:'./orderDetail?ordnum=' + ordnum + '&index=' + index + '&queueId=' + queueId + '&type=' + type
						})
					}
					
					if (this.status == 1) {
						uni.navigateTo({
							url: '../QuKan/QuKan?id=' + queueId
						})
					}
					
					
				}
				
			},
			async initMyOrderList () {
				if(this.type == 1) {
					if (!this.hasFlag) return
					this.pageNum = ++this.pageNum
					let res = await this.$fetch(this.$api.getQukanOrderList, {pageNum: this.pageNum, pageSize: this.pageSize, type: this.status + 1}, "GET", "FORM")
					console.log(res)
					this.MyOrderArr = [...this.MyOrderArr, ...res.rows]
					if (res.total == 0) {
						this.isEmpty = true 
					} else {
						this.isEmpty = false
					}
								
					this.hasFlag = this.pageNum * 10 < res.total
				}
				
				if (this.type == 2) {
					if (!this.hasFlag) return
					this.pageNum = ++this.pageNum
					let res = await this.$fetch(this.$api.getOrderList, {pageNum: this.pageNum, pageSize: this.pageSize, status: this.status, type: this.type}, "GET", "FORM")
					console.log(res)
					this.MyOrderArr = [...this.MyOrderArr, ...res.rows]
					if (res.total == 0) {
						this.isEmpty = true 
					} else {
						this.isEmpty = false
					}
								
					this.hasFlag = this.pageNum * 10 < res.total
				}
		
			},
			// 显示弹框
			showPayPop (ordnum, index) {
				this.showPayPopFlag = true
				this.orderNum = ordnum
				this.orderIndex = index
			},
			// 支付方式切换
			handleCircle (index) {
				this.circleShowFlag = index
			},
			// 支付
			async payMoney () {
				if (this.circleShowFlag == 0) {
					let res = await this.$fetch(this.$api.appOrderPay, {ordnum: this.orderNum}, 'POST', 'FORM')
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
							if (this.type == 1) {
								this.MyOrderArr[this.orderIndex].status = 1
							} else if (this.type == 2 && this.tabCurrentIndex == 1) {
								this.MyOrderArr.splice(this.orderIndex, 1)
							} else if (this.type == 2 && this.tabCurrentIndex == 0) {
								this.MyOrderArr[this.orderIndex].status = 1
							}
							
							
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
					let res = await this.$fetch(this.$api.wxAppPay, {ordnum: this.orderNum}, 'POST', 'FORM')
					console.log(res)
					let wxpayInfo = JSON.parse(res.msg)
					console.log(wxpayInfo)
					uni.requestPayment({
					    provider: 'wxpay',
					    orderInfo: wxpayInfo,
					    success: (msg) => {
					        console.log('success:' + JSON.stringify(msg));
					    	uni.showToast({
					    		icon: 'none',
					    		title: '支付成功'
					    	})
					    	this.showPayPopFlag = false
					    	if (this.type == 1) {
					    		this.MyOrderArr[this.orderIndex].status = 1
					    	} else if (this.type == 2 && this.tabCurrentIndex == 1) {
					    		this.MyOrderArr.splice(this.orderIndex, 1)
					    	} else if (this.type == 2 && this.tabCurrentIndex == 0) {
					    		this.MyOrderArr[this.orderIndex].status = 1
					    	}
					    },
					    fail: (err) => {
					        uni.showToast({
					        	icon: 'none',
					        	title: '支付失败'
					        })
					    }
					});
					
					
					
				}
			},
			// 取消订单
			async cancelOrder (id, index) {
				console.log(index)
				
				// 仅限大市场订单
				uni.showModal({
				    title: '提示',
				    content: '确定取消该订单么',
				    success: async(res) => {
				        if (res.confirm) {
					
				           let res = await this.$fetch(this.$api.delMarketOrder, {ordnum: id}, "GET", "FORM")
				           console.log(res)
						   if (res.code == 0) {
							   uni.showToast({
							   	icon: 'success',
								title: res.msg
							   })
							this.MyOrderArr.splice(index, 1)
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
			// 下拉
			lower () {
				this.initMyOrderList()
			},
			// 确认收货
			async consignee (ordNum, index) {
				uni.showModal({
				    title: '提示',
				    content: '是否确认收货',
				    success: async(res) => {
				        if (res.confirm) {
							let msg
							if (this.type == 1) {
								msg =  await this.$fetch(this.$api.commitOrderQukan, {ordnum: ordNum}, 'GET', 'FORM')
								if (msg.code == 0) {
									uni.showToast({
										icon: 'success',
										title: '操作成功'
									})
									this.MyOrderArr[index].status = 3
								} else {
									uni.showToast({
										icon: 'none',
										title: msg.msg
									})
								}
							} else {
								msg = await this.$fetch(this.$api.commitOrderMarket, {ordnum: ordNum}, 'GET', 'FORM')
								
								if (msg.code == 0) {
									uni.showToast({
										icon: 'success',
										title: '操作成功'
									})
									this.MyOrderArr.splice(index, 1)
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
			// 去评价
			goToEva (id, index) {
				console.log(id)
				uni.navigateTo({
					url: './evaluate?id=' + id + '&index=' + index
				})
			}
			
		},
		onLoad(options) {
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			console.log(options)
			// this.orderType = options.orderType
			// 触发
			this.changeType(options.orderType, options.status)
			// this.initMyOrderList()
			// if (options.status) {
			// 	this.tabCurrentIndex = options.status
			// }
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		background: #f3f3f3;
	}
	.order-type{
		width: 100%;
		height: 110rpx;
		background: #FFFFFF;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		& > view{
			width: 560rpx;
			height: 70rpx;
			border-radius: 200rpx;
			background: #F3F3F3;
			display: flex;
			.qukan{
				flex: 1;
				height: 70rpx;
				border-radius: 100px 0 0 100px;
				font-size: 14px;
				color: #888888;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.dashichang{
				flex: 1;
				height: 70rpx;
				border-radius: 0 100px 100px 0;
				font-size: 14px;
				color: #888888;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.chooseType{
				background: #C9281C;
				font-size: 14px;
				color: #FFFFFF;
			}
		}
	}
	.home-tab{
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		position: fixed;
		z-index: 10;
		top: 110rpx;
	}
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90rpx;
		white-space: nowrap;
		background-color: #fff;
		
		.nav-item {
			display: inline-block;
			width: 25%;
			// width: 188rpx;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			font-size: 28rpx;
			color: #A6A6A6;
			position: relative;
		
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6rpx solid  #C9281C;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		
		.current {
			color: #C9281C;
			font-size: 14px;
			font-weight: bold;
		
			&:after {
				width: 20%;
			}
		}
	}
	.orderList{
		width: 100%;
		.orderInfo{
			width: 100%;
			.order-item{
				width: 690rpx;
				margin: 30rpx 30rpx;
				background: #FFFFFF;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				.order-no{
					width: 630rpx;
					margin: 0 30rpx;
					height: 90rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #F5F5F5;
					.order-no-userInfo{
						display: flex;
						align-items: center;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
						.order-no-userInfo-text{
							padding-left: 10rpx;
						}
					}
					& > view:first-child{
						flex: 2;
						font-size: 14px;
						color: #A2A2A2;
						& > text:first-child{
							margin-right: 30rpx;
						}
					}
					.red{
						display: flex;
						justify-content: flex-end;
						flex: 1;
						font-size: 14px;
						color: #C9281C;
					}
					.orange{
						display: flex;
						justify-content: flex-end;
						flex: 1;
						font-size: 14px;
						color: #FF9800;
					}
					.gray{
						display: flex;
						justify-content: flex-end;
						flex: 1;
						font-size: 14px;
						color: #A2A2A2;
					}
					.green{
						display: flex;
						justify-content: flex-end;
						flex: 1;
						font-size: 14px;
						color: #4E9800;
					}
				}
				.order-info{
					margin: 20rpx 30rpx;
					width: 630rpx;
					height: 200rpx;
					display: flex;
					align-items: center;
					.goods-img{
						width: 200rpx;
						height: 200rpx;
						margin-right: 20rpx;
						image{
							width: 200rpx;
							height: 200rpx;
						}
					}
					.goods-info-1{
						width: 410rpx;
						height: 200rpx;
						display: flex;
						flex-direction: column;
						& > view:first-child{
							font-weight: bold;
							width: 410rpx;
							font-size: 14px;
							color: #4A4A4A;
							text-overflow: ellipsis;
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 2;    //控制行数
							overflow: hidden;
							margin-bottom: 20rpx;
							box-sizing: border-box;
						}
						& > view:nth-child(2){
							width: 410rpx;
							font-size: 14px;
							color: #222222;
							margin-top: 20rpx;
							& > text:first-child{
								color: #A2A2A2;
								margin-right: 20rpx;
							}
						}
						& > view:last-child{
							width: 410rpx;
							display: flex;
							& > view:first-child{
								flex:1;
								font-size: 14px;
								color: #C9281C;
								& > text:first-child{
									color: #A2A2A2;
									margin-right: 20rpx;
								}
							}
							.goods-gray{
								// flex: 1;
								display: flex;
								justify-content: flex-end;
								font-size: 14px;
								color: #A2A2A2;
							}
							.goods-orange{
								justify-content: flex-end;
								font-size: 14px;
								color: #FF9800;
							}
						}
					}
					.goods-info-2{
						width: 410rpx;
						height: 200rpx;
						display: flex;
						flex-direction: column;
						& > view:first-child{
							width: 410rpx;
							font-size: 14px;
							color: #4A4A4A;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							// margin-bottom: 20rpx;
						}
						& > view:nth-child(2){
							width: 410rpx;
							font-size: 14px;
							color: #4A4A4A;
							margin-top: 10rpx;
						}
						& > view:last-child{
							width: 410rpx;
							margin-top: 16rpx;
							& > text:first-child{
								font-size: 14px;
								color: #939393;
							}
							& > text:nth-child(2){
								font-size: 17px;
								color: #C9281C;
							}
							& > text:last-child{
								font-size: 12px;
								color: #FFA900;
							}
						}
					}
				}
				.order-aciton{
					width: 630rpx;
					margin: 20rpx 30rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.white-button{
						width: 160rpx;
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #979797;
						border-radius: 15px;
						font-size: 14px;
						color: #9B9B9B;
						margin-right: 30rpx;
					}
					.red-button{
						width: 160rpx;
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						border-radius: 15px;
						color: #FFFFFF;
						background: #C9281C;
					}
				}
			}
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
