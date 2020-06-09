<template>
	<view class="bids">
		<view class="bids-wrapper">
			<view class="line-30"></view>
			<view class="bids-wrapper-item" v-for="(item, index) in BidsListArr" :key = "index">
				<view class="bids-wrapper-item-left">
					<image :src="item.avatar" mode=""></image>
					<text>{{item.userName}}</text>
				</view>
				<view class="bids-wrapper-item-right">
					<text>出价</text>
					<text :class="{fitstPrice: index == 0}">¥{{item.nowPrice}}</text>
					<view v-if="index != 0">出局</view>
				</view>
				<view class="first-tip" v-if="index == 0">
					<view>领先</view>
				</view>
			</view>
		</view>
		<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			uni.hideTabBar()
			console.log(options)
			this.goodsId = options.id
			this.initBidsList()
		},
		data () {
			return {
				hasFlag: true,
				goodsId: 0,
				pageNum: 0,
				pageSize: 30,
				BidsListArr: [],
				dataShow: [],
				dataShowLength: 0,
				i: 0
			}
		},
		methods: {
			async initBidsList () {
				if (!this.hasFlag) return 
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.getFlowList, {id: this.goodsId, pageNum: this.pageNum, pageSize: this.pageSize}, 'GET', 'FORM')
				console.log(res)
				if (res.data.length == 0) {
					this.hasFlag = false
				}
				// this.BidsListArr = [...this.BidsListArr, res.rows]
				// this.hasFlag = this.pageNum * this.pageSize < res.total

				if (this.BidsListArr.length < res.data.length) {
					this.hasFlag = true
					// this.BidsListArr = []
					for (let i = 0; i < res.data.length; i++) {
						this.dataShow = res.data.slice(this.i,this.i+30)
					}
					this.dataShowLength += this.dataShow.length
					console.log(this.dataShowLength, res.data.length)
					if (this.dataShowLength <= res.data.length) {
						this.BidsListArr = [...this.BidsListArr, ...this.dataShow]
						console.log(this.BidsListArr)
						if(this.BidsListArr.length >= res.data.length){
							this.hasFlag = false
						}
					} else {
						this.hasFlag = false
					}
				}
			}
		},
		onReachBottom(){
		    //则在上拉加载时，slice的起始位置需要增加
		    this.i += 30
		    if(this.hasFlag){
				this.initBidsList()
		    }
		}
	}
</script>

<style lang="less">
	page::after {
		display: none;
	}
	.bids{
		.bids-wrapper{
			.line-30{
				width: 100%;
				height: 30rpx;
				background-color: #f3f3f3;
			}
			.bids-wrapper-item{
				width: 100%;
				height: 122rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				position: relative;
				display: flex;
				
				align-items: center;
				.bids-wrapper-item-left{
					display: flex;
					align-items: center;
					image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
					text{
						width: 142rpx;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #222222;
						letter-spacing: -0.29px;
						padding-left: 30rpx;
						box-sizing: border-box;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.bids-wrapper-item-right{
					flex: 1;
					display: flex;
					align-items: center;
					text{
						font-family: PingFangSC-Regular;
						&:nth-child(1) {
							font-size: 12px;
							color: #000000;
							font-weight: bold;
							padding-left: 130rpx;
							box-sizing: border-box;
						}
						&:nth-child(2) {
							font-size: 24px;
							color: #FF9800;
							font-weight: bold;
							padding-left: 20rpx;
							// padding-right: 76rpx;
							box-sizing: border-box;
							&.fitstPrice{
								font-size: 24px;
								color: #C9281C;
							}
						}
						&:nth-child(3) {
							display: flex;
							flex: 1;
							text-align: right;
							font-size: 14px;
							color: #A2A2A2;
						}
					}
					view{
						flex: 1;
						text-align: right;
						padding-right: 30rpx;
						box-sizing: border-box;
						font-size: 14px;
						color: #A2A2A2;
						
					}
				}
				.first-tip{
					width: 102rpx;
					height: 62rpx;
					text-align: center;
					line-height: 62rpx;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #FFFFFF;
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
		}
	}
</style>
