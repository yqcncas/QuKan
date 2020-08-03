<template>
	<view class="lottery" :style="{backgroundImage: `url(${bgImg})`}">
		<scroll-view scroll-y="true" style="height: 100vh;">
			
		
			<view class="lottery-header">
				<view class="img-box" @click="back">
					<image src="../../static/image/ych/back.png" mode=""></image>
				</view>
				
				<view class="lottery-header-title">抽奖活动</view>
			</view> 
			<view class="rule" @click="goToAtricle(11)">规则</view>
			<view class="lottery-center">
			<view class="lottery-center-header">

			</view>
			<view class="lottery-center-center" @click="handleToCheckMyRecord">
				<view>我的抽奖记录</view>
				<image src="../../static/image/ych/index/more.png" mode=""></image>
			</view>
			<view class="lottery-center-counter">
				<text class="lottery-center-counter-text">消耗积分进行抽奖</text>
				<!-- <text class="lottery-center-counter-counter">1</text>
				<text class="lottery-center-counter-text">次免费抽奖机会</text> -->
			</view>
			<!-- <view class="choujiang" :style="{backgroundImage: `url(${choujiangImg})`}"> -->
			<view class="choujiang">
				<LuckDraw></LuckDraw>
				<!-- <view class="choujiang-list">
					<view class="choujiang-list-item" v-for="(item, index) in 9" :key = "index" :class="{choujiangButton: index == 4}">
						<view class="choujiang-list-item-info" v-if="index != 4" :class="{pink: index == 2, blue: index == 8, purple: index == 6}">
							<view class="choujiang-list-item-info-top">¥20</view>
							<view class="choujiang-list-item-info-bottom">优惠券</view>
						</view>
					</view>
				</view> -->
			</view>
			
			<view class="lottery-user">
				<swiper :autoplay="true" :interval="3000" :duration="1000" vertical disable-touch circular class="swiper-wrapper">
					<swiper-item v-for="(item,index) in msgList" :key="index">
						<view class="swiper-item">
							<text class="swiper-item-left mgr">刚刚</text>
							<text class="swiper-item-right">{{item.userName}}</text>
							<text class="swiper-item-left mgrr">抽中</text>
							<text class="swiper-item-right">{{item.amount}}{{item.itemName}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import LuckDraw from '@/components/luckdraw/luckdraw.vue'
	export default {
		components:{
			LuckDraw
		},
		data () {
			return {
				bgImg: "../../static/image/ych/else/choujiang.png",
				choujiangImg: '../../static/image/ych/else/choujiangzhuanpan.png',
				msgList:[]
			}
		},
		methods: {
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
			back () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 查看抽奖记录
			handleToCheckMyRecord(){
				uni.navigateTo({
					url:'../DrawRecord/DrawRecord'
				})
			},
			// 获取抽奖消息轮播
			async getLuckDraw(){
				let res = await this.$fetch(this.$api.getRollMessage,{type:1},'GET')
				console.log(res);
				this.msgList = res.data
			}
		},
		onLoad() {
			this.getLuckDraw()
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
		// background-image: url('../../static/image/ych/else/choujiang.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.lottery{
		width: 100%;
		// height: 100%;
		// background: #C9281C;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.lottery-header{
			width: 100%;
			display: flex;
			align-items: center;
			height: 42rpx;
			position: fixed;
			top: var(--status-bar-height);
			padding-left: 30rpx;
			padding-top: 16rpx;
			box-sizing: border-box;
			.img-box{
				width: 24rpx;
				height: 42rpx;
				position: relative;
				image{
					width: 24rpx;
					height: 42rpx;
				}
				&::after{
					content: '';
					position: absolute;
					left: -50rpx;
					top: -50rpx;
					bottom: -50rpx;
					right: -50rpx;
				}
			}
			
			.lottery-header-title{
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #FFFFFF;
				line-height: 32px;
				margin: 0 auto;
				transform: translateX(-24rpx);
			}
		}
		.rule{
			width: 98rpx;
			height: 62rpx;
			line-height: 62rpx;
			background-image: linear-gradient(180deg, #AA1ADC 0%, #710BB7 100%);
			border-radius: 100px 0 0 100px;
			position: fixed;
			right: 0;
			top: 96rpx;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #F7F7F7;
			text-align: center;
		}
		.lottery-center{
			width: 100%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			// top: 460rpx;
			bottom: 1%;
			z-index: 99;
			
			.lottery-center-header{
				image{
					width: 750rpx;
					height: 742rpx;
				}
			}
			.lottery-center-center{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 20rpx;
					height: 16rpx;
					margin-left: 10rpx;
					box-sizing: border-box;
				}
			}
			.lottery-center-counter{
				width: 426rpx;
				height: 124rpx;
				line-height: 86rpx;
				margin: 0 auto;
				text-align: center;
				background-image: url(../../static/image/ych/else/lotteryCount.png);
				background-repeat: no-repeat;
				background-size: cover;
				position: relative;
				z-index: 99;
				
				.lottery-center-counter-text{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
				}
				.lottery-center-counter-counter{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #FAF64D;
				}
			}
			.choujiang{
				width: 100%;
				height: 656rpx;
				// background-image: url(../../static/image/ych/else/choujiangzhuanpan.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				// transform: translateY(-60rpx);
				.choujiang-list{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 70rpx;
					box-sizing: border-box;
					
					.choujiang-list-item{
						width: 190rpx;
						height: 156rpx;
						margin-top: 20rpx;
						background: #FEFEFF;
						box-shadow: inset 0 -5px 0 0 #DEDCDE;
						border-radius: 11px;
						display: flex;
						justify-content: center;
						align-items: center;
						&:nth-child(1) {
							margin-top: 0;
						}
						&:nth-child(2) {
							margin-top: 0;
						}
						&:nth-child(3) {
							margin-top: 0;
						}
						.choujiang-list-item-info{
							width: 148rpx;
							height: 98rpx;
							// background-image: url(../../static/image/ych/else/green.png);
							background-repeat: no-repeat;
							background-size: 100% 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							&.pink{
								// background-image: url(../../static/image/ych/else/pink.png);
							}
							&.purple{
								// background-image: url(../../static/image/ych/else/purple.png);
							}
							&.blue{
								// background-image: url(../../static/image/ych/else/blue.png);
							}
							.choujiang-list-item-info-top{
								font-family: PingFangSC-Semibold;
								font-size: 17px;
								color: #FFFFFF;
								letter-spacing: 0;
								text-align: center;
								text-shadow: 0 1px 0 rgba(0,0,0,0.20);
							}
							.choujiang-list-item-info-bottom{
								font-family: PingFangSC-Semibold;
								font-size: 10px;
								color: #FFFFFF;
								letter-spacing: 0;
								text-align: center;
								text-shadow: 0 1px 0 rgba(0,0,0,0.20);
							}
						}
						&.choujiangButton{
							background-image: url(../../static/image/ych/else/jiang5.png);
							background-repeat: no-repeat;
							background-size: cover;
						}
					}
				}
			}
			.lottery-user{
				// width: 100%;
				background: #B10E02;
				border-radius: 13.5px;
				text-align: center;
				line-height: 54rpx;
				margin: 0 30rpx;
				box-sizing: border-box;
				.swiper-wrapper{
					width: 690rpx;
					height: 54rpx;
					.swiper-item{
						line-height: 40rpx;
						.swiper-item-left{
							font-family: PingFangSC-Semibold;
							font-size: 12px;
							color: #F7F7F7;
							&.mgr{
								margin-right: 30rpx;
								box-sizing: border-box;
							}
							&.mgrr{
								margin-left: 10rpx;
								margin-right: 10rpx;
								box-sizing: border-box;
							}
						}
						.swiper-item-right{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FAF64D;
						}
					}
				}
			}
		}
	
	}
</style>
