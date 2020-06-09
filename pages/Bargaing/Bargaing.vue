<template>
	<view class="bargin">
		<view class="classify-list-wrapper">
			<view class="classify-list-item" v-for="(item,index) in QkArr" :key = "index" @click="goToQK(item.id)">
				<view class="classify-list-wrapper-item-top">
						<image :src="item.image" mode=""></image>
				</view>
				<view class="classify-list-wrapper-item-center">
					<text class="classify-list-wrapper-item-center-left">趣砍爆款</text>
					<text class="classify-list-wrapper-item-center-right">{{item.title}}</text>
				</view>
				<view class="classify-list-wrapper-item-price">
					<view class="index-tabList-wrapper-item-price-left">¥{{item.nowPrice}}</view>
					<view class="index-tabList-wrapper-item-price-right">原价¥{{item.realPrice}}</view>
				</view>
				<view class="classify-list-wrapper-item-bottom">立即趣砍</view>
			</view>
		</view>
		<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initQKShop()
		},
		data () {
			return {
				pageNum: 0,
				pageSize: 10,
				hasFlag:　true,
				QkArr: []
			}
		},
		methods: {
			async initQKShop () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getIndexQukanGoods, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				console.log(res)
				this.QkArr = [...this.QkArr, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
			},
			goToQK (id) {
				uni.navigateTo({
					url: '../QuKan/QuKan?id=' + id
				})
			}
		},
		onReachBottom () {
			if (this.hasFlag) {
				this.initQKShop()
			}
		},
		onPullDownRefresh () {
			
			this.pageNum = 0,
			this.pageSize = 10,
			this.hasFlag = true,
			this.QkArr = []
			this.initQKShop()
			uni.stopPullDownRefresh()
			
		}
	}
</script>

<style lang="less">
	.bargin{
		width: 100%;
		// height: 100%;
		background-color: #f3f3f3;
		.classify-list-wrapper{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 30rpx;
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
					height: 134rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;    
					-webkit-line-clamp: 2;    //控制行数
					overflow: hidden;
					padding-top: 18rpx;
					padding-bottom: 16rpx;
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
</style>
