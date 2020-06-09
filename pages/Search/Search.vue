<template>
	<view class="search">
		<view class="search-header">
			<view class="search-title">
				<image src="../../static/image/search.png" mode=""></image>
				<input type="text" placeholder="AirPods无线耳机低至5折" @confirm = "handleSearch" v-model="searchText" confirm-type= "search" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #888888;letter-spacing: -0.34px;line-height: 22px;"/>
			</view>
		</view>
		
		<view class="search-main" v-if="searchMainShow">
			<view class="line" ></view>
			<view class="search-main-header">
				<view class="search-main-header-left">热门搜索</view>
				<!-- <image src="../../static/image/ych/search/bianzu8.png" mode="" :class="{refreshAni: refresh}" @click="handleReAnimate"></image> -->
				
			</view>
			<view class="search-main-center">
				<view class="search-main-center-item" v-for="(item, index) in hotSearch" :key = "index" @click="handleHotSearch(item.title)">{{item.title}}</view>
			</view>
			
			<view class="search-main-header lishi">
				<view class="search-main-header-left">历史搜索</view>
				<image src="../../static/image/ych/search/bianzu9.png" mode="" @click="removeHistory"></image>
			</view>
			<view class="search-main-center">
				<view class="search-main-center-item" @click="handleHotSearch(item)" v-for="(item, index) in searchHistoryArr" :key = "index">{{item}}</view>
			</view>
		</view>
		
		<view class="search-success" v-if="!searchMainShow && searchArr.length > 0">
			<view class="classify-list-wrapper">
				<view class="classify-list-item" v-for="(item,index) in searchArr" :key = "index" @click="goToQuKan(item.id)">
					<view class="classify-list-wrapper-item-top">
							<image :src="item.image" mode=""></image>
					</view>
					<view class="classify-list-wrapper-item-center">
						<text class="classify-list-wrapper-item-center-left">趣砍爆款</text>
						<text class="classify-list-wrapper-item-center-right">{{item.title}}</text>
					</view>
					<view class="classify-list-wrapper-item-price">
						<view class="index-tabList-wrapper-item-price-left">¥{{item.price}}</view>
						<view class="index-tabList-wrapper-item-price-right">原价¥4210</view>
					</view>
					<view class="classify-list-wrapper-item-bottom">立即趣砍</view>
				</view>
				
				
			</view>
			
		</view>
		<u-empty  mode="search" v-if="!searchMainShow && searchArr.length ==  0"></u-empty>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initGetHotSearch()
			this.getHistory()
		},
		onUnload () {
			uni.hideKeyboard()
		},
		data () {
			return {
				searchText: '', // 搜索内容
				searchMainShow: true, 
				animationData: {},
				refresh: false,
				refreshFlag: true,
				hotSearch: [], // 热门搜索
				searchArr: [],
				searchHistoryArr: []
			}
		},
		watch:{
			searchText (newVal) {
				if (newVal.trim() == '') {
					this.searchMainShow = true
				}
			}
		},
		methods: {
			// 搜索按钮点击
			handleSearch () {
				this.searchMainShow = false
				this.handleHotSearch()
			},
			// 刷新动画
			handleReAnimate () {
				if (this.refreshFlag) {
					this.refresh = true
					this.refreshFlag = false
					setTimeout(() => {
						this.refresh = false
						this.refreshFlag = true
					}, 1000)
				}
			},
			async initGetHotSearch () {
				let res = await this.$fetch(this.$api.getSearch, {}, "GET", "FORM")
				console.log(res)
				this.hotSearch = res.data
			},
			async handleHotSearch (title) {
				if (title) {
					this.searchText = title
				}
				
				let res = await this.$fetch(this.$api.setSearch, {content: this.searchText}, 'GET', 'FORM')

				if(this.searchHistoryArr.indexOf(this.searchText) == -1) {
					this.searchHistoryArr.push(this.searchText)
					uni.setStorageSync('searchHistoryArr', JSON.stringify(this.searchHistoryArr))
				}

				this.searchArr = res.data
			
				this.searchMainShow = false
			
				
			},
			// 获取历史消息
			getHistory () {
				if (uni.getStorageSync('searchHistoryArr')) {
					this.searchHistoryArr = JSON.parse(uni.getStorageSync('searchHistoryArr'))
				}
			},
			// 删除历史
			removeHistory () {
				if (this.searchHistoryArr.length == 0) {
					return uni.showToast({
						icon: 'none',
						title: '暂无历史搜索记录'
					})
				}
				uni.showModal({
				    title: '提示',
				    content: '确定删除历史搜索记录么',
				    success:  (res) => {
				        if (res.confirm) {
				           this.searchHistoryArr = []
				           uni.removeStorageSync('searchHistoryArr')
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			goToQuKan (id) {
				uni.setStorageSync('searchToQk', true)
				uni.navigateTo({
					url: '../QuKan/QuKan?id='+id
				})
			} 
		}
	}
</script>

<style lang="less" >
	page{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	page::after{
		display: none;
	}
	
	.search{
		.search-header{
			height: 114rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999;
			.search-title{
				width: 690rpx;
				height: 70rpx;
				background: #F7F7F7;
				border-radius: 17.5px;
				display: flex;
				align-items: center;
				padding: 14rpx 30rpx 12rpx 30rpx;
				box-sizing: border-box;
				image{
					width: 28rpx;
					height: 30rpx;
					margin-right: 22rpx;
				}
				input{
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					letter-spacing: -0.34px;
					line-height: 22px;
				}
			}
		}
		.line{
			box-shadow: inset 0 4upx 8upx 0 rgb(244, 244, 244);
			width: 750upx;
			height: 8upx;
		}
		.search-main{
			transform: translateY(114rpx);
			background-color: #fff;
			.search-main-header{
				padding: 40rpx 30rpx 0rpx 30rpx;
				height: 40rpx;
				display: flex;
				justify-content: space-between;
				font-weight: bold;
				&.lishi{
					padding-top: 92rpx;
				}
				.search-main-header-left{
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #222222;
					letter-spacing: -0.34px;
				}
				image{
					width: 36rpx;
					height: 36rpx;
				}
				.refreshAni{
					animation: imgRefresh .5s linear 0s 1 normal;
					
				}
				
			
			}
			.search-main-center{
				display: flex;
				flex-wrap: wrap;
				.search-main-center-item{
					padding: 8rpx 30rpx;
					background: #F3F3F3;
					border-radius: 13.5px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #888888;
					letter-spacing: -0.34px;
					text-align: center;
					margin-left: 30rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
				}
			}
		}
		.search-success{
			padding: 30rpx;
			transform: translateY(114rpx);
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
	}
	@keyframes imgRefresh {
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
