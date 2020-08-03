<template>
	<view class="newInvite">
		<view class="newInvite-wrapper">
			<view class="newInvite-title">
				<view class="newInvite-title-left" @click="back">
					<image src="../../static/image/ych/back.png" mode=""></image>
				</view>
				<view class="newInvite-title-center">邀请好友</view>
			</view>
			<view class="line-40"></view>
			<view class="newInvite-center" :style="{backgroundImage: `url(${bgimg})`}">
				<view class="rule" @click="goToAtricle(12)">
					<view>活动规则</view>
					<image src="../../static/image/ych/index/more.png" mode="" style="width: 20rpx;height: 16rpx;"></image>
				</view>
				<view class="newInvite-info">
					<view class="newInvite-info-top">
						<view class="newInvite-info-top-left">
								<image :src="userAvatar ? userAvatar : '../../static/image/ylc/11.png'" mode=""></image>
						</view>
						<view class="newInvite-info-top-right">
							<view class="newInvite-info-top-right-top">{{userName}}</view>
							<view class="newInvite-info-top-right-bottom">佣金金额：¥{{reward}}</view>
						</view>
					</view>
					<view class="newInvite-info-bottom" @click="handleToCash">
						<image src="../../static/image/ych/invite/2.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="rank">
				<view class="rank-title">
					<image src="../../static/image/ych/invite/3.png" mode=""></image>
				</view>
				<view class="rank-list">
					<scroll-view scroll-y="true" style="height: 410rpx;">
						<view class="rank-list-item" v-for="(item, index) in rankList" :key = "index">
							<view class="rank-list-item-left">
								<image :src="item.avatar" mode="aspectFill" class="rank-list-item-left-avatar"></image>
								<view class="rank-list-item-left-text">{{item.userName}}</view>
							</view>
							<view class="rank-list-item-right">¥{{item.amount}}</view>
						</view>
				
						<view class="loadMore">已经到底啦</view>
					</scroll-view>
				</view>
			</view>
			<view class="subMit-button" @click="goToInviet">立即邀请</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initRank()
		},
		onShow() {
			this.initMyInfo()
		},
		data () {
			return {
				bgimg: '../../static/image/ych/invite/1.png',
				rankList: [],
				userAvatar: '',
				userName: '',
				reward: 0
				
			}
		},
		methods: {
			back () {
				uni.navigateBack({
					delta: 1
				})
			},
			goToInviet () {
				uni.navigateTo({
					url: '../Invite/Invite'
				})
			},
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
			// 去提现
			handleToCash(){
				uni.navigateTo({
					url:'../cash/cash?reward='+this.reward
				})
			},
			async initRank () {
				let res = await this.$fetch(this.$api.getInviteRank, {}, "GET", "FORM")
				console.log(res)
				this.rankList = res.rows
			},
			async initMyInfo () {
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				console.log(res)
				this.userAvatar = res.data.avatar
				this.userName = res.data.userName
				this.reward = res.data.userInfo.reward
			}
			
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
		overflow: hidden;
		background-color: #d23427;
	}
	.newInvite{
		
		.newInvite-wrapper{
			padding-top: var(--status-bar-height);
			.newInvite-title{
				width: 100%;
				height: 64rpx;
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				box-sizing: border-box;
				.newInvite-title-left{
					width: 24rpx;
					height: 42rpx;
					position: relative;
					&::after{
						content: '';
						position: absolute;
						left: -50rpx;
						right: -50rpx;
						bottom: -50rpx;
						top: -50rpx;
					}
					image{
						width: 24rpx;
						height: 42rpx;
						transform: translateY(6rpx);
					}
				}
				.newInvite-title-center{
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;	
					padding-left: 256rpx;
					box-sizing: border-box;
				}
			}
			.line-40{
				width: 100%;
				height: 40rpx;
				background-color: #d23427;
			}
			.newInvite-center{
				// padding-top: 40rpx;
				padding-top: 40rpx;
				width: 100%;
				height: 608rpx;
				background-image: url(../../static/image/ych/invite/1.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-color: #d23427;
				box-sizing: border-box;
				.rule{
					padding-top: 60rpx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					view{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FFFFFF;
						padding-right: 17rpx;
						box-sizing: border-box;
					}
				}
				.newInvite-info{
					padding-top: 72rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.newInvite-info-top{
						display: flex;
						align-items: center;
						.newInvite-info-top-left{
							padding-right: 30rpx;
							box-sizing: border-box;
							image{
								width: 94rpx;
								height: 94rpx;
								border-radius: 50%;
							}
						}
						.newInvite-info-top-right{
							display: flex;
							flex-direction: column;
							justify-content: center;
							.newInvite-info-top-right-top{
								padding-bottom: 20rpx;
								box-sizing: border-box;
								font-family: PingFangSC-Regular;
								font-size: 17px;
								color: #C9281C;
							}
							.newInvite-info-top-right-bottom{
								font-family: PingFangSC-Regular;
								font-size: 17px;
								color: #C9281C;
								// padding-bottom: 40rpx;
								box-sizing: border-box;
							}
						}
					}
					.newInvite-info-bottom{
						margin-top: 40rpx;
						box-sizing: border-box;
						image{
							width: 340rpx;
							height: 74rpx;
						}
					}
				}
			}
			.rank{
				width: 690rpx;
				height: 620rpx;
				background: #FDF5E3;
				border: 3px solid #E34542;
				border-radius: 17px;
				margin: 0 auto;
				transform: translateY(-65rpx);
				
				box-sizing: border-box;
				.rank-title{
					width: 100%;
					padding-top: 30rpx;
					padding-bottom: 50rpx;
					text-align: center;
					box-sizing: border-box;
					image{
						width: 470rpx;
						height: 44rpx;
					}
				}
				.rank-list{
					.rank-list-item{
						padding-left: 40rpx;
						padding-right: 40rpx;
						padding-bottom: 40rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.rank-list-item-left{
							display: flex;
							align-items: center;
							image{
								width: 60rpx;
								height: 60rpx;
								border-radius: 50%;
							}
							.rank-list-item-left-text{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #FF9800;
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
						.rank-list-item-right{
							font-family: PingFangSC-Semibold;
							font-size: 14px;
							color: #FF9800;
						}
					}
					.loadMore{
						width: 100%;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FF9800;
						padding-bottom: 20rpx;
					}
				}
			}
			.subMit-button{
				width: 750rpx;
				height: 118rpx;
				line-height: 118rpx;
				background-image: linear-gradient(180deg, #FFE38D 0%, #FFBD3F 100%);
				box-shadow: 0 2px 3px 0 rgba(203,41,16,0.50);
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #EC5237;
				letter-spacing: -0.34px;
				text-align: center;
				position: fixed;
				bottom: 0;
			}
		}
	}
</style>
