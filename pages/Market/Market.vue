<template>
	<view class="classify">
		<view class="classify-header">
			<view class="classify-header-top" @click="goToSearch">
				<view class="classify-header-top-box">
					<image src="../../static/image/ych/index/search.png" mode=""></image>
					<view class="classify-header-top-text">AirPods无线耳机低至5折</view>
				</view>
			</view>
			<view class="classify-header-bottom">
				<scroll-view scroll-x="true" style="width: 750rpx;" :scroll-into-view="tochildId" scroll-with-animation>
					<view class="classify-header-bottom-ul">
						<view class="classify-header-bottom-item" :id="item.childFlag" @click="handleMarketIndex(index)" :class="{on: handleIndex == index}" v-for="(item, index) in classifyTab" :key = "index">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="classify-list">
			<swiper style="height: calc(100vh - 160rpx);" @change="handleSwiper" :current="handleIndex">
				<swiper-item v-for="(item, index) in classifyTab" :key = "index">
					<scroll-view scroll-y="true" style="height: calc(100vh - 160rpx);"  @scrolltolower="lower">
					<view class="classify-list-wrapper">
						<view class="classify-list-item" v-for="(item,index) in BigMarketList" :key = "index" @click="goToMarketShopDetail(item.id)">
							<view class="classify-list-wrapper-item-top">
									<image :src="item.image" mode="aspectFill"></image>
							</view>
							<view class="classify-list-wrapper-item-center">
								<text class="classify-list-wrapper-item-center-left">趣砍爆款</text>
								<text class="classify-list-wrapper-item-center-right">{{item.title}}</text>
							</view>
							<view class="classify-list-wrapper-item-price">
								<view class="index-tabList-wrapper-item-price-left">¥{{item.price}}</view>
								<view class="index-tabList-wrapper-item-price-right">+{{item.point}}积分</view>
							</view>
							<!-- <view class="classify-list-wrapper-item-bottom">立即趣砍</view> -->
						</view>
					</view>
						<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
					</scroll-view>
				
				</swiper-item>
			</swiper>	
		</view>
		<!-- <image src="../../static/image/ych/gototop.png" mode="" class="goTopimg" @click="goToTop"></image> -->
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initBigMarket()
			
		},
		data () {
			return {
				classifyTab: [], // tab内容
				handleIndex: 0,
				tochildId: '',
				hasFlag: true,
				scrollTop: 0,
				pageNum: 0,
				pageSize: 10,
				BigMarketList: [], // 列表
				swiperFlag: true
			}
		},
		methods: {
			// 回到顶部
			goToTop () {
				console.log('123')
				this.scrollTop = -100
				// setTimeout(() => {
				// 	this.scrollTop = -1
				// }, 700)
			},
			goToSearch () {
				uni.navigateTo({
					url: '../Search/Search'
				})
			},
			//　初始化数据
			async initBigMarket () {
				let res = await this.$fetch(this.$api.getCategory, {}, "GET", "FORM")
				console.log(res)
				res.data.forEach(item => {
					item.childFlag = 'child' + item.id
				})
				this.classifyTab = res.data
				this.initBigMarketList()
			},
			// 点击tab
			handleMarketIndex (index) {
				this.handleIndex = index
				this.tochildId = index == 0 ? this.classifyTab[index].childFlag : this.classifyTab[index - 1].childFlag
				this.BigMarketList = []
				this.hasFlag = true
				this.pageNum = 0
				this.scrollTop = 0
				this.swiperFlag = false
				console.log(this.handleIndex)
				this.initBigMarketList()
				
			},
			// 获取列表数据
			async initBigMarketList () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getMarketGoodsList, {categoryId: this.classifyTab[this.handleIndex].id, pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")

				this.BigMarketList = [...this.BigMarketList, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
				this.swiperFlag = true
			},
			// 滑动
			handleSwiper (e) {
				if(this.swiperFlag) {
					this.handleMarketIndex(e.detail.current)
				}
				
			},
			handleScroll (e) {
				this.scrollTop = e.detail.scrollTop
			},
			goToMarketShopDetail (id) {
				uni.navigateTo({
					url: '../OptimizationShop/OptimizationShop?goodId=' + id
				})
			},
			lower () {
				this.initBigMarketList()
			}
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	.classify{
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;
		// padding-bottom: 100rpx;
		.classify-header{
			// padding: 0 30rpx;
			// padding-top: 14rpx;
			box-sizing: border-box;
			background-color: #fff;
			position: fixed;
			z-index: 999;
			.classify-header-top{
				width: 690rpx;
				height: 70rpx;
				background: #F7F7F7;
				border-radius: 17.5px;
				padding: 12rpx 30rpx;
				margin-left: 30rpx;
				box-sizing: border-box;
				
				.classify-header-top-box{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					
					image{
						width: 28rpx;
						height: 30rpx;
					}
					.classify-header-top-text{
						padding-left: 26rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #888888;
						letter-spacing: -0.34px;
						line-height: 22px;
					}
				}
			}
			.classify-header-bottom{
				width: 100%;
				.classify-header-bottom-ul{
					width: 100%;
					display: inline-block;
					white-space: nowrap;
					.classify-header-bottom-item{
						// width: 174rpx;
						width: 25%;
						box-sizing: border-box;
						height: 90rpx;
						line-height: 90rpx;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #A2A2A2;
						text-align: center;
						// text-align: left;
						letter-spacing: -0.34px;
						display: inline-block;
						// margin-right: 40rpx;
						box-sizing: border-box;
						position: relative;
						
						&::after{
							content: '';
							width: 0;
							height: 0;
							// border: 4rpx solid #C9281C;
							border-bottom: 4rpx solid #C9281C;
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							transition: 0.5s;
						}
						&.on{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							font-weight: bold;
							color: #C9281C;
							letter-spacing: -0.41px;
							
							&::after{
								width: 40%;
							}
						}
					}
				}
			}
		}
		.classify-list{
			padding: 30rpx;
			// padding-top: 176rpx;
			padding-top: 160rpx;
			padding-bottom: 0;
			background-color: #f3f3f3;
			.classify-list-wrapper{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.classify-list-item{
					width: 340rpx;
					// height: 610rpx;
					box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
					border-radius: 7px;
					background-color: #fff;
					box-sizing: border-box;
					margin-bottom: 10rpx;
					padding-bottom: 30rpx;
					overflow: hidden;
					&:nth-child(1), &:nth-child(2) {
						margin-top: 30rpx;
						box-sizing: border-box;
					}
					.classify-list-wrapper-item-top{
						image{
							width: 340rpx;
							height: 340rpx;
						}
					}
					.classify-list-wrapper-item-center{
						// height: 88rpx;
						width: 100%;
						height: 106rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
						// padding-top: 18rpx;
						// padding-bottom: 16rpx;
						padding-left: 20rpx;
						padding-right: 20rpx;
						// margin-bottom: 16rpx;
						box-sizing: border-box;
						.classify-list-wrapper-item-center-left{
							height: 32rpx;
							background: #C9281C;
							border-radius: 2px;
							font-family: PingFangSC-Regular;
							font-size: 10px;
							color: #FFFFFF;
							letter-spacing: -0.24px;
							padding: 2rpx 6rpx;
							margin-right: 14rpx;
							box-sizing: border-box;
						}
						.classify-list-wrapper-item-center-right{
							height: 84rpx;
							
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #222222;
							letter-spacing: -0.34px;
						}
					}
					.classify-list-wrapper-item-price{
						padding-top: 16rpx;
						display: flex;
						align-items: center;
						// padding-bottom: 20rpx;
						box-sizing: border-box;
						.index-tabList-wrapper-item-price-left{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #C9281C;
							letter-spacing: -0.41px;
							padding-left: 20rpx;
							padding-right: 10rpx;
							box-sizing: border-box;
							font-weight: bold;
						}
						.index-tabList-wrapper-item-price-right{
							font-family: TaipeiSansTCBeta-Regular;
							font-size: 12px;
							color: #FFA900;
							letter-spacing: -0.29px;
						}
					}
					.classify-list-wrapper-item-bottom{
						width: 300rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						background: #C9281C;
						border-radius: 15px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: -0.34px;
						margin: 0 auto;
					
					}
				}
			}
		}
		.goTopimg{
			width: 106rpx;
			height: 106rpx;
			position: fixed;
			right: 30rpx;
			bottom: 30rpx;
		}
	}
</style>
