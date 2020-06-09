<template>
	<view class="newBargin">
		<view class="newBargin-wrapper">
			<view class="newBargin-item" v-for="(item, index) in newBarginArr" :key = "index" @click="goToQk(item.queueId)">
				<view class="newBargin-item-header">
					<view class="newBargin-item-header-left">
						<view class="newBargin-item-header-left-userInfo">
							<view class="user-avatar">
								<image :src="item.avatar" mode=""></image>
							</view>
							<view class="user-name">{{item.userName}}</view>
						</view>
						<view class="newBargin-item-header-left-time">{{item.createTime}}</view>
					</view>
					<view class="newBargin-item-header-right">
						<view>{{myUserId == item.userId ? '已抢到' : '已被抢'}}</view>
					</view>
				</view>
				<view class="newBargin-item-center">
					<view class="newBargin-item-center-left">
						<image :src="item.qukanGoods.image" mode=""></image>
					</view>
					<view class="newBargin-item-center-right">
						<view class="newBargin-item-center-right-title">{{item.qukanGoods.title}}</view>
						<view class="marketPrice">
							<text>市场价</text>
							<text>¥{{item.qukanGoods.price}}</text>
						</view>
						<view class="payPrice">
							<text>成交价</text>
							<text>¥{{item.nowPrice}}</text>
						</view>
						<view class="newBargin-item-center-right-bottom">
							<view class="newBargin-item-center-right-bottom-left">
								<text class="newBargin-item-center-right-bottom-left-text save">节省</text>
								<text class="newBargin-item-center-right-bottom-left-price">{{item.saveBFB}}</text>
								<text class="newBargin-item-center-right-bottom-left-text">%</text>
							</view>
							<view class="newBargin-item-center-right-bottom-right">查看详情</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
	</view>
</template>

<script>
	export default {
		onLoad() {
			if (uni.getStorageSync('MyUserId')) {
				this.myUserId = uni.getStorageSync('MyUserId')
			}
			this.initNewBarginInfo()
		},
		data () {
			return {
				hasFlag:　true,
				pageNum: 0,
				pageSize: 10,
				newBarginArr: [],
				myUserId: ''
			}
		},
		methods: {
			async initNewBarginInfo () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getQukanLastest, {pageSize: 10, pageNum: this.pageNum}, "GET", 'FORM')
				console.log(res)
				res.rows.forEach(item => {
					
					item.saveBFB = (Number(1 - item.nowPrice / item.qukanGoods.price)* 100).toFixed(2)
				})
				this.newBarginArr = [...this.newBarginArr, ...res.rows]
				this.hasFlag = this.pageNum * this.pageSize < res.total
			},
			goToQk (id) {
				uni.navigateTo({
					url: '../QuKan/QuKan?id=' + id
				})
			}
		},
		onReachBottom () {
			this.initNewBarginInfo()
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	.newBargin{
		width: 100%;
		background-color: #f3f3f3;
		.newBargin-wrapper{
			display: flex;
			justify-content: center;
			align-items: center;
			padding-bottom: 30rpx;
			flex-wrap: wrap;
			box-sizing: border-box;
			.newBargin-item{
				width: 690rpx;
				// height: 310rpx;
				background: #FFFFFF;
				border-radius: 4px;
				padding: 30rpx;
				margin-top: 30rpx;
				box-sizing: border-box;
				overflow: hidden;
				position: relative;
				.newBargin-item-header{
					display: flex;
					justify-content: space-between;
					.newBargin-item-header-left{
						display: flex;
						align-items: center;
						.newBargin-item-header-left-userInfo{
							display: flex;
							align-items: center;
							.user-avatar{
								image{
									width: 40rpx;
									height: 40rpx;
									border-radius: 50%;
								}
							}
							.user-name{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #222222;
								padding-left: 12rpx;
								padding-right: 20rpx;
								box-sizing: border-box;
							}
						}
						.newBargin-item-header-left-time{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #A2A2A2;
						}
					}
					.newBargin-item-header-right{
						width: 102rpx;
						height: 62rpx;
						line-height: 62rpx;
						text-align: center;
						background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
						border-radius: 4px 0 18px 0;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FFFFFF;
						letter-spacing: -0.29px;
						transform: scaleX(-1);
						background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
						border-radius: 0 0 18px 0;
						position: absolute;
						right: 0;
						top: 0;
						view{
							transform: scaleX(-1);
						}
					}
				}
				.newBargin-item-center{
					padding-top: 28rpx;
					box-sizing: border-box;
					display: flex;
					.newBargin-item-center-left{
						image{
							width: 180rpx;
							height: 180rpx;
						}
					}
					.newBargin-item-center-right{
						flex: 1;
						padding-left: 20rpx;
						box-sizing: border-box;
						.newBargin-item-center-right-title{
							font-weight: bold;
							font-family: PingFangSC-Semibold;
							font-size: 14px;
							color: #222222;
							letter-spacing: -0.34px;
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    //控制行数
							overflow: hidden;
						}
						.marketPrice, .payPrice{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #A2A2A2;
						}
						.marketPrice{
							padding-top: 10rpx;
							box-sizing: border-box;
						}
						.payPrice{
							padding-top: 10rpx;
							box-sizing: border-box;
						}
						.newBargin-item-center-right-bottom{
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							.newBargin-item-center-right-bottom-left{
							
								.newBargin-item-center-right-bottom-left-text{
									font-family: PingFangSC-Semibold;
									font-size: 14px;
									color: #222222;
									&.save{
										letter-spacing: -0.34px;
										font-weight: bold;
									}
								}
								.newBargin-item-center-right-bottom-left-price{
									font-family: PingFangSC-Semibold;
									font-weight: bold;
									font-size: 17px;
									color: #C9281C;
									padding-left: 10rpx;
									padding-right: 6rpx;
									box-sizing: border-box;
								}
							}
							.newBargin-item-center-right-bottom-right{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #FFA900;
							}
						}
					}
				}
			}
		}
	}
</style>
