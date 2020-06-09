<template>
	<view class="optimizationshop" >
		<!-- <Status></Status> -->
		<view class="optimizationshop-top">
			<swiper :indicator-dots="true" style="height: 750rpx;">
				<swiper-item class="optimizationshop-banner" v-for="(item, index) in marketDetail.images" :key = "index">
					<view class="swiper-item optimizationshop-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="optimizationshop-center">
				<view class="optimizationshop-center-top">{{marketDetail.title}}</view>
				<view class="optimizationshop-center-bottom">
					<view class="optimizationshop-center-bottom-left">¥{{marketDetail.price}}</view>
					<view class="optimizationshop-center-bottom-right">+{{marketDetail.point}}积分</view>
				</view>
			</view>
			<view class="shopDetail">
				<view class="shopDetail-line"></view>
				<view class="shopDetail-text">商品详情</view>
				<view class="shopDetail-line"></view>
			</view>
			<view class="rich-text">
				<jyf-parser :html="marketDetail.detail" ref="article"></jyf-parser>
			</view>
			
		</view>
		<!-- 富文本开始 -->
		
		<!-- 富文本结束 -->
		<view class="optimizationshop-footer">
			<view class="optimizationshop-footer-left">
				<view class="optimizationshop-footer-left-img" @click="callPhone">
					<image src="../../static/image/phone1.png" mode=""></image>
				</view>
				<view class="optimizationshop-footer-left-right">
					<view class="optimizationshop-footer-left-right-top">
						<text>总计</text>
						<text>¥{{marketDetail.price}}</text>
					</view>
					<view class="optimizationshop-footer-left-right-bottom">
						<text>价格</text>
						<text>¥{{marketDetail.price}}</text>
						<text>积分</text>
						<text>¥{{marketDetail.point}}</text>
					</view>
				</view>
			</view>
			<view class="optimizationshop-footer-right" @click="goToOrderDetail">立即购买</view>
		</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; 
	export default {
		onLoad(options) {
			uni.hideTabBar()
			this.goodsId = options.goodId
			this.initMarketDetail()
			uni.setNavigationBarTitle({
				title: '商品详情'
			})
		},
		data () {
			return {
				goodsId: 0,
				marketDetail: {},
				phoneNumber: ''
			}
		},
		components: {
		    "jyf-parser": parser
		},
		methods: {
			async initMarketDetail () {
				// 数据
				let res = await this.$fetch(this.$api.getMarketGoods, {goodId: this.goodsId}, "GET", "FORM")
				
				res.data.goods.images = res.data.goods.images.split(',')
				this.marketDetail = res.data.goods
				this.phoneNumber = res.data.phonenumber
				console.log(this.marketDetail)
				
			},
			// 去支付详情页
			async goToOrderDetail () {
				console.log(this.marketDetail.id)
				let res = await this.$fetch(this.$api.buyMarketGoods, {goodsId: this.marketDetail.id}, "GET", "FORM")
				console.log(res)
				
				let marketInfo = {
					title: this.marketDetail.title,
					image: this.marketDetail.images,
					id: this.marketDetail.id,
					price: this.marketDetail.price,
					point: this.marketDetail.point,
					ordnum: res.data.ordnum
				}
				uni.navigateTo({
					url: '../AffirmOrder/AffirmOrder?marketInfo=' + JSON.stringify(marketInfo) + '&type=' + 2 + '&marketFlag=' + 1
				})
			},
			// 打电话
			callPhone () {
				if (this.phoneNumber) {
					uni.makePhoneCall({
					    phoneNumber: this.phoneNumber //仅为示例
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '该商家暂未开通'
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		background-color: #fff;
	}
	.optimizationshop{
		width: 100%;
		height: 100%;
		padding-bottom: 142rpx;
		.optimizationshop-top{
			width: 100%;
			height: 750rpx;
			position: absolute;
			// top: var(--status-bar-height);
			background-color: #fff;
			.optimizationshop-banner{
				height: 750rpx;
				.optimizationshop-item{
					image{
						width: 750rpx;
						height: 700rpx;
					}
				}
			}
			.optimizationshop-center{
				background-color: #fff;
				padding: 30rpx;
				padding-top: 0;
				box-sizing: border-box;
				.optimizationshop-center-top{
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #222222;
					letter-spacing: -0.41px;
					font-weight: bold;
					display: -webkit-box;    
					-webkit-box-orient: vertical;    
					-webkit-line-clamp: 3;    //控制行数
					overflow: hidden;
				}
				.optimizationshop-center-bottom{
					
					display: flex;
					align-items: center;
					padding-top: 22rpx;
					box-sizing: border-box;
					.optimizationshop-center-bottom-left{
						font-family: PingFangSC-Semibold;
						font-size: 22px;
						color: #C9281C;
						letter-spacing: -0.53px;
					}
					.optimizationshop-center-bottom-right{
						font-family: TaipeiSansTCBeta-Regular;
						font-size: 14px;
						color: #FFA900;
						letter-spacing: -0.34px;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}
			}
			.shopDetail{
				width: 100%;
				height: 112rpx;
				background-color: #f7f7f7;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				.shopDetail-line{
					width: 40rpx;
					height: 2rpx;
					background: #D8D8D8;
					border-radius: 0.5px;
				}
				.shopDetail-text{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #222222;
					padding: 0 20rpx;
					box-sizing: border-box;
				}
			}
			.rich-text{
				padding-bottom: 130rpx;
			}
		}
		.optimizationshop-footer{
			width: 100%;
			height: 112rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.optimizationshop-footer-left{
				padding-left: 30rpx;
				padding-right: 30rpx;

				box-sizing: border-box;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.optimizationshop-footer-left-img{
					image{
						width: 82rpx;
						height: 82rpx;
					}
				}
				.optimizationshop-footer-left-right{
					
					.optimizationshop-footer-left-right-top{
						display: flex;
						align-items: center;
						justify-content: flex-end;
						text{
							&:nth-child(1) {
								font-family: TaipeiSansTCBeta-Regular;
								font-size: 12px;
								color: #A2A2A2;
								letter-spacing: -0.29px;
								text-align: justify;
								
							}
							&:nth-child(2) {
								font-family: PingFangSC-Semibold;
								font-size: 17px;
								color: #C9281C;
								letter-spacing: -0.41px;
								text-align: justify;
								font-weight: bold;
								margin-left: 20rpx;
							}
						}
					}
					.optimizationshop-footer-left-right-bottom{
						text{
							&:nth-child(1), &:nth-child(3){
								font-family: TaipeiSansTCBeta-Regular;
								font-size: 12px;
								color: #A2A2A2;
								letter-spacing: -0.29px;
								text-align: justify;
								margin-right: 10rpx;
							}
							&:nth-child(2), &:nth-child(4) {
								font-family: TaipeiSansTCBeta-Regular;
								font-size: 12px;
								color: #222222;
								letter-spacing: -0.29px;
								text-align: justify;
							}
							&:nth-child(3){
								margin-left: 20rpx;
							}
						}
					}
				}
			}
			.optimizationshop-footer-right{
				width: 250rpx;
				height: 100%;
				line-height: 112rpx;
				text-align: center;
				background: #C9281C;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
		}
	}
</style>
