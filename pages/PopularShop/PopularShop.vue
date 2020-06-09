<template>
	<view class="popularShop" >
		<view class="popularShop-wrapper" :style="{backgroundImage:`url(${bgImg})`}">
			<view class="popularShop-header" >
				<view class="img-box" @click="back">
					<image src="../../static/image/ych/back.png" mode="" ></image>
				</view>
				<view class="popularShop-header-title">人气拍品</view>
			</view>
			<view class="popularShop-main">
				<view class="popularShop-tablist">
					<view class="popularShop-tablist-item" @click.stop="handleTabIndex(index)" :class="{on: tabIndex == index}" v-for="(tab, index) in tabListItem" :key = "index" >{{tab}}</view>
				</view>
				<view class="user-avatar">
					<image src="../../static/image/huangguan.png" mode=""></image>
					<view class="six-wrapper" >
						<view class="six-box">
							<view class="six-bg" :style="{backgroundImage: `url(${popularInfo.avatar})`}"></view>
						</view>
					</view>
					<view class="user-conter">
						<view class="user-conter-item">
							<view class="user-conter-item-top">{{popularInfo.sumCount}}<span>次</span></view>
							<view class="user-conter-item-bottom">累计拍中</view>
						</view>
						<view class="user-conter-item">
							<view class="user-conter-item-top">{{popularInfo.sumPrice}}<span>元</span></view>
							<view class="user-conter-item-bottom">累计拍中</view>
						</view>
						<view class="user-conter-item">
							<view class="user-conter-item-top">{{rate}}</view>
							<view class="user-conter-item-bottom">省钱比例</view>
						</view>
					</view>
				</view>
				
				
			</view>
			<view class="popularShop-footer">
				<view class="popularShop-footer-header">
					<view class="randomRedBag-list-header-box">
						<view class="small-circle"></view>
						<view class="big-circle mgl"></view>
						<view class="randomRedBag-list-header-text">他还拍中了</view>
						<view class="big-circle mgr"></view>
						<view class="small-circle"></view>
					</view>
				</view>
				<scroll-view scroll-x="true" >
					<view class="popularShop-footer-bottom">
						<view class="popularShop-footer-bottom-item" v-for="(item, index) in popularShop" :key = "index">
							<view class="popularShop-footer-bottom-item-title">节省 ¥{{item.saveMoney}}</view>
							<view class="popularShop-footer-bottom-item-shop">
								<view class="popularShop-footer-bottom-item-shop-top">
									<image :src="item.qukanGoods.image" mode=""></image>
								</view>
								<view class="popularShop-footer-bottom-item-shop-bottom">
									<view class="popularShop-footer-bottom-item-shop-bottom-top">{{item.qukanGoods.title}}</view>
									<view class="popularShop-footer-bottom-item-shop-bottom-bottom">
										<view class="popularShop-footer-bottom-item-shop-bottom-bottom-left">¥{{item.nowPrice}}</view>
										<view class="popularShop-footer-bottom-item-shop-bottom-bottom-right">原价¥{{item.qukanGoods.price}}</view>
									</view>
									
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.hideTabBar()
			this.initPopularInfo()
			
		},
		data () {
			return {
				bgImg: '../../static/image/ych/else/popularshop.png',
				tabListItem: ['本周大神', '本月大神', '本季大神'],
				tabIndex: 0,
				popularInfo: {},
				rate: 0,
				popularShop: []
			}
		},
		methods: {
			back () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 切换tab
			handleTabIndex (index) {
				this.tabIndex = index
				this.popularInfo = {}
				this.initPopularInfo()
			},
			async initPopularInfo () {
				let res = await this.$fetch(this.$api.getRankList, {type: this.tabIndex}, 'GET', 'FORM')
				console.log(res)
				this.popularInfo = res.data.data
				this.rate = res.data.rate
				this.popularShop = res.data.list
				this.popularShop.forEach(item => {
					item.saveMoney = Math.floor(item.qukanGoods.price - item.nowPrice)	
				})
			}
		}
	}
</script>

<style lang="less">
	page::after {
		display: none;
	}
	.popularShop{
		width: 100%;
		height: 100%;
		background-color: #c9281c;
		.popularShop-wrapper{
			width: 100%;
			height: 872rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.popularShop-header{
				position: fixed;
				top: var(--status-bar-height);
				width: 100%;
				display: flex;
				align-items: center;
				.img-box{
					width: 24rpx;
					height: 42rpx;
					position: relative;
					z-index: 999;
					image{
						width: 24rpx;
						height: 42rpx;
						margin-left: 30rpx;
						box-sizing: border-box;		
					}
					&::after{
						content: '';
						position: absolute;
						top: -50rpx;
						left: -50rpx;
						bottom: -50rpx;
						right: -50rpx;
					}
				}
			
				.popularShop-header-title{
					flex: 1;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					line-height: 32px;
					transform: translateX(-24rpx);
				}
			}
			.popularShop-main{
				position: absolute;
				top: var(--status-bar-height);
				transform: translateY(42rpx);
				.popularShop-tablist{
					display: flex;
					.popularShop-tablist-item{
						width: 250rpx;
						height: 90rpx;
						line-height: 90rpx;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(255,255,255,0.70);
						letter-spacing: -0.34px;
						text-align: center;
						position: relative;
						&::after{
							content: '';
							width: 0;
							height: 0;
							position: absolute;
							border-bottom: 4rpx solid #FFD47F;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							transition: .5s;
						}
						&.on {
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #FFD47F;
							letter-spacing: -0.41px;
							&::after{
								width: 30%;
							}
						}
					}
				}
				.user-avatar{
					width: 100%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					image{
						width: 52rpx;
						height: 50rpx;
						transform: translate(10rpx,18rpx);
						position: relative;
						z-index: 99;
					}
					.six-wrapper, .six-box, .six-bg{
						width: 180rpx;
						height: 230rpx;
						overflow: hidden;
					}
					.six-wrapper{
						 transform: rotate(120deg);
						 float: left;
						 margin-left: 10px;
						 -ms-transform: rotate(120deg);
						 -moz-transform: rotate(120deg);
						 -webkit-transform: rotate(120deg);
					}
					.six-box{
						transform: rotate(-60deg);
						-ms-transform: rotate(-60deg);
						-moz-transform: rotate(-60deg);
						-webkit-transform: rotate(-60deg);
					}
					.six-bg{
						transform: rotate(-60deg);
						background: no-repeat 50% center;
						background-size: 125% auto;
						-ms-transform: rotate(-60deg);
						-moz-transform: rotate(-60deg);
						-webkit-transform: rotate(-60deg);
						visibility: visible;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
					
					.user-conter{
						width: 100%;
						padding-top: 40rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-around;
						align-items: center;
						.user-conter-item{
							display: flex;
							flex-direction: column;
							align-items: center;
							&:nth-child(2) {
								transform: translateX(20rpx);
							}
							.user-conter-item-top{
								font-family: PingFangSC-Medium;
								font-size: 22px;
								color: #FFD47F;
								letter-spacing: 0;
								font-weight: bold;
								span{
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: rgba(255,255,255,0.70);
									letter-spacing: -0.34px;
									font-weight: normal;
								}
							}
							.user-conter-item-bottom{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #FFFFFF;
								letter-spacing: -0.29px;
							}
						}
					}
				}
		
			}
			.popularShop-footer{
				width: 750rpx;
				height: 634rpx;
				background-image: linear-gradient(180deg, #FFE7B7 0%, #FFCB80 100%);
				border-radius: 15px 15px 0 0;
				position: absolute;
				bottom: 0;
				.popularShop-footer-header{
					height: 110rpx;
					display: flex;
					align-items: center;
					justify-content: center;
		
					.randomRedBag-list-header-box{
						display: flex;
						align-items: center;
						justify-content: center;
						.small-circle{
							width: 8rpx;
							height: 8rpx;
							border-radius: 50%;
							background: #E88A00;
						}
						.big-circle{
							width: 12rpx;
							height: 12rpx;
							border-radius: 50%;
							background: #E88A00;
							&.mgl{
								margin-left: 10rpx;
							}
							&.mgr{
								margin-right: 10rpx;
							}
						}
						.randomRedBag-list-header-text{
							
							height: 40rpx;
							text-align: center;
							line-height: 40rpx;
							font-family: PingFangSC-Semibold;
							font-size: 14px;
							color: #E88A00;
							letter-spacing: -0.34px;
							margin: 0 20rpx;
						}
					}
				}
				.popularShop-footer-bottom{
					display: inline-block;
					white-space: nowrap;
					padding-right: 30rpx;
					.popularShop-footer-bottom-item{
						width: 300rpx;
						height: 450rpx;
						background-color: #fff;
						box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
						border-radius: 7px;
						overflow: hidden;
						position: relative;
						margin-left: 30rpx;
						box-sizing: border-box;
						display: inline-block;
						
						.popularShop-footer-bottom-item-title{
							width: 136rpx;
							height: 62rpx;
							line-height: 62rpx;
							text-align: center;
							font-size: 12px;
							color: #FFFFFF;
							letter-spacing: -0.29px;
							background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
							border-radius: 7px 0 18px 0;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 99;
						}
						.popularShop-footer-bottom-item-shop{
							
							.popularShop-footer-bottom-item-shop-top{
								image{
									width: 300rpx;
									height: 300rpx;
								}
							}
							.popularShop-footer-bottom-item-shop-bottom{
								padding: 10rpx 20rpx 14rpx 20rpx;
								box-sizing: border-box;
								.popularShop-footer-bottom-item-shop-bottom-top{
									height: 66rpx;
									font-family: PingFangSC-Regular;
									font-size: 12px;
									color: #222222;
									letter-spacing: -0.29px;
									white-space: normal;
									display: -webkit-box;    
									-webkit-box-orient: vertical;    
									-webkit-line-clamp: 2;    //控制行数
									overflow: hidden;
								}
								.popularShop-footer-bottom-item-shop-bottom-bottom{
									display: flex;
									align-items: center;
									padding-top: 10rpx;
									box-sizing: border-box;
									.popularShop-footer-bottom-item-shop-bottom-bottom-left{
										font-family: PingFangSC-Semibold;
										font-size: 17px;
										color: #C9281C;
										letter-spacing: -0.41px;
										font-weight: bold;
									}
									.popularShop-footer-bottom-item-shop-bottom-bottom-right{
										font-family: TaipeiSansTCBeta-Regular;
										font-size: 12px;
										color: #A2A2A2;
										letter-spacing: -0.29px;
										text-decoration: line-through;
										padding-left: 20rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	
	}
</style>
