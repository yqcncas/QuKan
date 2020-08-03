<template>
	<view class="classify">
		<view class="classify-header" @click="goToSearch">
			<view class="classify-header-top">
				<view class="classify-header-top-box">
					<image src="../../static/image/ych/index/search.png" mode=""></image>
					<view class="classify-header-top-text">AirPods无线耳机低至5折</view>
				</view>
			</view>
			<view class="classify-header-bottom">
				<scroll-view scroll-x="true" style="width: 750rpx;" :scroll-into-view="tochildId" scroll-with-animation>
					<view class="classify-header-bottom-ul">
						<view class="classify-header-bottom-item" @click.stop="handleTab(index)" :id="item.childFlag" :class="{on: handleIndex == index}" v-for="(item, index) in headerTab" :key = "index">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="classify-list">
			<swiper style="height: calc(100vh - 160rpx);" @change="handleSwitch" :current="handleIndex">
				<swiper-item v-for="switchTab in headerTab" :key = "switchTab.id">
					<scroll-view scroll-y="true" style="height: calc(100vh - 160rpx);"  @scrolltolower="lower">
						<view class="classify-list-wrapper">
							<view class="classify-list-item" v-for="(item,index) in classflyArr" :key = "index" @click="goToQuKan(item.id)">
								<view class="classify-list-wrapper-item-top">
										<image :src="item.image" mode="aspectFill"></image>
								</view>
								<view class="classify-list-wrapper-item-center">
									<text class="classify-list-wrapper-item-center-left">趣砍爆款</text>
									<text class="classify-list-wrapper-item-center-right">{{item.title}}</text>
								</view>
								<view class="classify-list-wrapper-item-price">
									<view class="index-tabList-wrapper-item-price-left">¥{{item.nowPrice}}</view>
									<view class="index-tabList-wrapper-item-price-right">原价¥{{item.price}}</view>
								</view>
								<view class="classify-list-wrapper-item-bottom">立即趣砍</view>
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
		onLoad () {
			this.initQukanTab()
		},
		onPullDownRefresh() {
			this.classflyArr = []
			this.hasFlag = true
			this.pageNum = 0
			this.initClassFlyInfo()
			uni.stopPullDownRefresh()
		},
		data () {
			return {
				// classifyTab: ['为你推荐', '爆款巡礼', '百货生鲜', '3C家电', '居家日常','为你推荐', '爆款巡礼', '百货生鲜', '3C家电', '居家日常'],
				handleIndex: 0,
				hasFlag: true,
				scrollTop: -1,
				headerTab: [],
				tochildId: '',
				pageNum: 0,
				classflyArr: [],
				swiperFlag: true
			}
		},
		methods: {
			// 回到顶部
			goToTop () {
				this.scrollTop = 0
				setTimeout(() => {
					this.scrollTop = -1
				}, 700)
			},
			// 初始化头部tab
			async initQukanTab () {
				let res = await this.$fetch(this.$api.qukangetCategory, {pageNum: 1, pageSize: 100}, "GET", 'FORM')
				// console.log(res)
				res.data.forEach(item => {
					item.childFlag = 'child' + item.id
				})
				this.headerTab = res.data
				console.log(this.headerTab)
				this.initClassFlyInfo()
			},
			// 点击tab
			handleTab (index) {
				console.log(index)
				
				this.handleIndex = index
				this.tochildId = index == 0 ? this.headerTab[index].childFlag : this.headerTab[index - 1].childFlag
				// this.tochildId = this.headerTab[index].childFlag
				console.log(this.tochildId)
				this.classflyArr = []
				this.hasFlag = true
				this.pageNum = 0
				this.swiperFlag = false
				this.initClassFlyInfo()
			},
			// 初始化列表
			async initClassFlyInfo () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getQukanGoodsList, {pageNum: this.pageNum, pageSize: 10, categoryId: this.headerTab[this.handleIndex].id}, 'GET', 'FORM')
				this.classflyArr = [...this.classflyArr, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
				this.swiperFlag = true
			},
			// 滑动
			handleSwitch (e) {
				// console.log(e.detail.current)
				if (this.swiperFlag) {
					this.handleTab(e.detail.current)
				}
				
			},
			goToSearch () {
				uni.navigateTo({
					url: '../Search/Search'
				})
			},
			goToQuKan (id) {
				uni.navigateTo({
					url: '../QuKan/QuKan?id=' + id
				})
			},
			lower () {
		
				this.initClassFlyInfo()
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
				height: 90rpx;
				.classify-header-bottom-ul{
					width: 100%;
					height: 90rpx;
					display: inline-block;
					white-space: nowrap;
					.classify-header-bottom-item{
						// width: 174rpx;
						width: 25%;
						height: 90rpx;
						line-height: 90rpx;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #A2A2A2;
						text-align: center;
						letter-spacing: -0.34px;
						display: inline-block;
						// margin-right: 40rpx;
						box-sizing: border-box;
						position: relative;
						&::after{
							content: '';
							width: 0;
							height: 0;
							border-bottom: 2rpx solid #C9281C;
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							transition: .5s;
						}
						&.on{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							font-weight: bold;
							color: #C9281C;
							letter-spacing: -0.41px;
							&::after{
								width: 50%;
							}
						}
					}
				}
			}
		}
		.classify-list{
			padding: 30rpx;
			padding-top: 160rpx;
			padding-bottom: 0;
			// background-color: #f3f3f3;
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
						width: 100%;
						height: 106rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
					
						padding-left: 20rpx;
						padding-right: 20rpx;
						
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
						display: flex;
						align-items: center;
						padding-bottom: 20rpx;
						padding-top: 16rpx;
						box-sizing: border-box;
						.index-tabList-wrapper-item-price-left{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #C9281C;
							letter-spacing: -0.41px;
							padding-left: 20rpx;
							padding-right: 20rpx;
							box-sizing: border-box;
						}
						.index-tabList-wrapper-item-price-right{
							font-family: TaipeiSansTCBeta-Regular;
							font-size: 12px;
							color: #A2A2A2;
							letter-spacing: -0.29px;
							text-decoration: line-through;
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
			z-index: 99;
		}
	}
</style>
