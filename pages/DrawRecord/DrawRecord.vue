<template>
	<view class="drawRecord">
		<view class="drawRecord-header" :style="{backgroundImage:`url(${backgroundImage})`}">
			<view class="drawRecord-header-avatar">
				<image :src="avatar == '' ? '@/static/image/ylc/11.png': avatar" mode=""></image>
			</view>
			<view class="drawRecord-header-name">{{userName}}</view>
			<view class="drawRecord-header-list">
				<view class="drawRecord-header-list-item">
					<view class="drawRecord-header-list-item-couter">{{count0}}</view>
					<view class="drawRecord-header-list-item-text">获奖次数</view>
				</view>
				<view class="shuxian"></view>
				<view class="drawRecord-header-list-item">
					<view class="drawRecord-header-list-item-couter">{{count3}}</view>
					<view class="drawRecord-header-list-item-text">获得积分</view>
				</view>
				<view class="shuxian"></view>
				<view class="drawRecord-header-list-item">
					<view class="drawRecord-header-list-item-couter">{{count2}}</view>
					<view class="drawRecord-header-list-item-text">获得赠豆</view>
				</view>
				<view class="shuxian"></view>
				<view class="drawRecord-header-list-item">
					<view class="drawRecord-header-list-item-couter">{{count1}}</view>
					<view class="drawRecord-header-list-item-text">获奖趣豆</view>
				</view>
			</view>
		</view>
		<view class="drawRecord-main">
			<view class="drawRecord-main-item" v-for="(item, index) in initAwardList" :key = "index">
				<view class="drawRecord-main-item-left">
					<view class="drawRecord-main-item-left-top">{{item.remark}}</view>
					<view class="drawRecord-main-item-left-bottom">{{item.createTime}}</view>
				</view>
				<view class="drawRecord-main-item-right">+{{item.amount}}{{listInfo[item.type]}}</view>
			</view>
		</view>
		<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initAwardHis()
		},
		data () {
			return {
				backgroundImage: '../../static/image/ych/else/drawheader.png',
				hasFlag: false,
				initAwardList: [],
				count0: 0,
				count1: 0,
				count2: 0,
				count3: 0,
				avatar: '',
				userName: '',
				listInfo: ['', '趣豆', '增豆', '积分', '佣金', '其他' ]
			}
		},
		methods:{
			async initAwardHis () {
				let res = await this.$fetch(this.$api.getAwardHistory, {}, 'GET', 'FORM')
				console.log(res)
				this.initAwardList = res.data.history
				this.count0 = res.data.count0
				this.count1 = res.data.count1
				this.count2 = res.data.count2
				this.count3 = res.data.count3
				this.avatar = res.data.avatar
				this.userName = res.data.userName
			}
		}
	}
</script>

<style lang="less">
	page::after {
		display: none;
	}
	.drawRecord{
		background-color: #fff;
		.drawRecord-header{
			width: 100%;
			height: 416rpx;
			background-color: #fff;
			background-repeat: no-repeat;
			background-size: cover;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			.drawRecord-header-avatar{
				padding-top: 50rpx;
				box-sizing: border-box;
				image{
					width: 120rpx;
					height: 120rpx;
					border: 4rpx solid #fff;
					border-radius: 50%;
					box-sizing: border-box;
				}
			}
			.drawRecord-header-name{
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #FFFFFF;
				padding-top: 10rpx;
				padding-bottom: 30rpx;
				box-sizing: border-box;
			}
			.drawRecord-header-list{
				display: flex;
				align-items: center;
				.drawRecord-header-list-item{
					width: 170rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					.drawRecord-header-list-item-couter{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #FFD47F;
					}
					.drawRecord-header-list-item-text{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FFFFFF;
					}
				}
				.shuxian{
					width: 2rpx;
					height: 40rpx;
					background: rgba(255,255,255,0.15);
					border-radius: 0.5px;
				}
			}
		}
		.drawRecord-main{
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			.drawRecord-main-item{
				height: 124rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #F3F3F3;
				&:last-child{
					border-bottom: 0
				}
				.drawRecord-main-item-left{
					display: flex;
					flex-direction: column;
					.drawRecord-main-item-left-top{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #000000;
					}
					.drawRecord-main-item-left-bottom{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #A2A2A2;
					}
				}
				.drawRecord-main-item-right{
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #C9281C;
				}
			}
		}
	}
</style>
