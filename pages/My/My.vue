<template>
	<view>
		<!-- 顶部 -->
		<view class="my-top">
			
			<view class="my-title">
				<view>我的</view>
				<view>
					<image src="../../static/image/ylc/9.png" mode="" class="msg-icon" @click="handleToMsg"></image>
					<image src="../../static/image/ylc/10.png" mode="" class="setting-icon" @click="handleToSetting"></image>
				</view>
			</view>
			<view class="mt-top-transLa">
				<view class="user-info" @click="handleToEditUserInfo">
					<view class="avatar">
						<image :src="avatar" mode=""></image>
					</view>
					<view class="info-content">
						<view>
							<view class="user-name">{{userName}}</view>
							<view class="user-phone"><text>手机号</text><text>{{phonenumber}}</text></view>
							<view class="user-code"><text @click.stop="copyCode">邀请码</text><text @click.stop="copyCode">{{code}}</text><image src="../../static/image/ylc/12.png" mode="" @click.stop="copyCode"></image></view>
						</view>
						<view>
							<image src="../../static/image/ylc/13.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="user-commiss">
				<view @click="handleToCommission">
					<text>总佣金（元）</text>
					<text>{{reward}}</text>
					<image src="../../static/image/ylc/14.png" mode=""></image>
				</view>
				<view>
					<view @click="handleToCash">提现</view>
				</view>
			</view>
			</view>
		</view>
		<!-- 趣豆赠豆 -->
		<view class="bean-card">
			<view class="card-left">
				<view>
					<view class="bean-count">{{beanDirect}}</view>
					<view class="bean-title">趣豆</view>
				</view>
				<view>
					<view class="bean-count">{{beanIndirect}}</view>
					<view class="bean-title">赠豆</view>
				</view>
			</view>
			<view class="card-right">
				<view @click="handleToCheckDetail(beanDirect, beanIndirect)">查看明细</view>
				<view @click="handleToRecharge">立即充值</view>
			</view>
		</view>
		<!-- 操作栏 -->
		<view class="action-list">
			<view class="action-item" @click="handleToMyOrder">
				<view>
					<image src="../../static/image/ylc/16.png" mode=""></image>
					<text>我的订单</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleToIntegral">
				<view>
					<image src="../../static/image/ylc/18.png" mode=""></image>
					<text>我的积分</text>
				</view>
				<view>
					<text>{{beanPoint}}</text>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleToMyTeam">
				<view>
					<image src="../../static/image/ylc/19.png" mode=""></image>
					<text>我的团队</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleToMyCollection">
				<view>
					<image src="../../static/image/ylc/20.png" mode=""></image>
					<text>我的收藏</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleToInvite">
				<view>
					<image src="../../static/image/ylc/21.png" mode=""></image>
					<text>邀请分享</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleToPunch">
				<view>
					<image src="../../static/image/ylc/22.png" mode=""></image>
					<text>打开签到</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="goToAtricle(2)">
				<view>
					<image src="../../static/image/ylc/23.png" mode=""></image>
					<text>新手指南</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="action-item" @click="handleCallPhone">
				<view>
					<image src="../../static/image/ylc/24.png" mode=""></image>
					<text>我的客服</text>
				</view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="line-30"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userInfo:{},
				avatar:'../../static/image/ylc/11.png',
				userName:'未登录',
				phonenumber:'',
				code:'',
				reward:0,
				beanDirect:0,
				beanIndirect:0,
				beanPoint:0,
				kfPhone: ''
			}
		},
		methods:{
			// 修改个人信息
			handleToEditUserInfo(){
				uni.navigateTo({
					url:'userInfo'
				})
			},
			// 查看消息
			handleToMsg(){
				uni.navigateTo({
					url:'message'
				})
			},
			// 跳转到设置
			handleToSetting(){
				uni.navigateTo({
					url:'setting'
				})
			},
			// 复制邀请码
			copyCode(){
				uni.setClipboardData({
					data:this.code
				})
			},
			// 查看佣金明细
			handleToCommission(){
				uni.navigateTo({
					url:'commission?reward='+this.reward
				})
			},
			// 去提现
			handleToCash(){
				uni.navigateTo({
					url:'../cash/cash?reward='+this.reward
				})
			},
			// 去充值
			handleToRecharge(){
				uni.switchTab({
					url:'../Find/Find'
				})
			},
			// 查看明细
			handleToCheckDetail(beanDirect, beanIndirect){
				uni.navigateTo({
					url:'beanDetail?beanDirect=' + beanDirect + '&beanIndirect=' + beanIndirect
				})
			},
			// 我的积分
			handleToIntegral(){
				uni.navigateTo({
					url:'integral?points='+this.beanPoint
				})
			},
			// 我的订单
			handleToMyOrder(){
				uni.navigateTo({
					url:'../myOrder/myOrder?orderType=' + 1
				})
			},
			// 我的团队
			handleToMyTeam(){
				uni.navigateTo({
					url:'../myTeam/myTeam'
				})
			},
			// 我的收藏
			handleToMyCollection(){
				uni.navigateTo({
					url:'../myCollection/myCollection'
				})
			},
			// 打开签到
			handleToPunch(){
				uni.navigateTo({
					url:'../Punch/Punch'
				})
			},
			async getPhNum () {
				let res = await this.$fetch(this.$api.getPhonenumber, {}, "GET", 'FORM')
				console.log(res)
				this.kfPhone = res.msg
			},
			// 联系客服
			handleCallPhone(){
				if (this.kfPhone) {
					uni.showModal({
						title:'我的客服',
						content:'客服电话：' + this.kfPhone,
						success: (res) => {
							if(res.confirm){
								uni.makePhoneCall({
									phoneNumber:'1388888888'
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂未开通'
					})
				}
			},
			handleToInvite () {
				uni.navigateTo({
					url: '../Invite/Invite'
				})
			},
			// 获取用户信息
			async getUserInfo(){
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				console.log(res);
				if(res.data.avatar){
					this.avatar  = res.data.avatar
				}
				this.phonenumber = res.data.phonenumber
				this.userName = res.data.userName
				this.reward = res.data.userInfo.reward
				this.code = res.data.userInfo.code
				this.beanDirect = res.data.userInfo.beanDirect
				this.beanIndirect = res.data.userInfo.beanIndirect
				this.beanPoint = res.data.userInfo.beanPoint
				uni.setStorageSync('MyUserId', res.data.userId)
				uni.setStorageSync('myQrcode', this.code)
				
			},
			// 跳转到新手指南
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
		},
		onShow() {
			this.getUserInfo()
			if (uni.getStorageSync('iosFlag')) {
				uni.removeStorageSync('iosFlag')
				this.handleToMyOrder()
			}
		},
		onLoad() {
			this.getPhNum()
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		background: #f3f3f3;
	}
	.my-top{
		width: 750rpx;
		height: 486rpx;
		background-image: url(../../static/image/ylc/8.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.my-title{
			width: 100%;
			height: 64rpx;
			display: flex;
			align-items: center;
			padding-top: 52rpx;
			& > view:first-child{
				height: 64rpx;
				margin-left: 342rpx;
				display: flex;
				align-items: center;
				font-size: 17px;
				color: #FFFFFF;
			}
			& > view:last-child{
				display: flex;
				margin-left: 208rpx;
				align-items: center;
				.msg-icon{
					width: 32rpx;
					height: 38rpx;
				}
				.setting-icon{
					margin-left: 30rpx;
					width: 40rpx;
					height: 34rpx;
				}
			}
		}
		.user-info{
			width: 750rpx;
			display: flex;
			margin-top: 30rpx;
			.avatar{
				width: 180rpx;
				display: flex;
				justify-content: center;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
			.info-content{
				width: 570rpx;
				display: flex;
				align-items: center;
				& > view:first-child{
					width: 524rpx;
					display: flex;
					flex-direction: column;
					.user-name{
						flex: 1;
						font-size: 17px;
						color: #FFFFFF;
					}
					.user-phone{
						flex: 1;
						font-size: 14px;
						display: flex;
						align-items: center;
						margin-top: 10rpx;
						color: #FFFFFF;
						& > text:first-child{
							color: rgba(255,255,255,0.70);
							margin-right: 20rpx;
						}
					}
					.user-code{
						flex: 1;
						font-size: 14px;
						display: flex;
						align-items: center;
						margin-top: 10rpx;
						color: #FFFFFF;
						& > text:first-child{
							color: rgba(255,255,255,0.70);
							margin-right: 20rpx;
						}
						image{
							margin-left: 10rpx;
							width: 26rpx;
							height: 26rpx;
						}
					}
				}
				& > view:last-child{
					display: flex;
					align-items: center;
					image{
						width: 16rpx;
						height: 26rpx;
					}
				}
			}
		}
		.user-commiss{
			margin-left: 180rpx;
			width: 540rpx;
			display: flex;
			margin-top: 14rpx;
			align-items: center;
			& > view:first-child{
				width: 446rpx;
				display: flex;
				align-items: center;
				& > text:first-child{
					font-size: 14px;
					color: rgba(255,255,255,0.70);
					margin-right: 20rpx;
				}
				& > text:nth-child(2){
					font-size: 17px;
					color: #FFD47F;
					margin-right: 10rpx;
				}
				image{
					width: 12rpx;
					height: 22rpx;
				}
			}
			& > view:last-child{
				width: 94rpx;
				height: 42rpx;
				border: 1px solid #FFFFFF;
				border-radius: 10.5px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: #FFFFFF;
			}
		}
	}
	.bean-card{
		width: 690rpx;
		height: 182rpx;
		border-radius: 7px;
		background-image: url(../../static/image/ylc/15.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 384.3rpx;
		display: flex;
		align-items: center;
		left: 30rpx;
		.card-left{
			flex: 1;
			display: flex;
			align-items: center;
			view{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.bean-count{
					font-size: 22px;
					color: #FF9800;
					font-weight: bold;
				}
				.bean-title{
					font-size: 12px;
					color: #222222;
				}
			}
		}
		.card-right{
			flex: 1;
			display: flex;
			align-items: flex-end;
			flex-direction: column;
			justify-content: center;
			& > view:first-child{
				width: 136rpx;
				height: 46rpx;
				border: 1px solid #C9281C;
				border-radius: 11.5px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: #C9281C;
				margin-right: 40rpx;
			}
			& > view:last-child{
				margin-top: 36rpx;
				width: 136rpx;
				height: 46rpx;
				background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
				border-radius: 11.5px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: #FFFFFF;
				margin-right: 40rpx;
			}
		}
	}
	.action-list{
		width: 690rpx;
		margin: 108rpx 30rpx 30rpx 30rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		.action-item{
			width: 630rpx;
			margin: 0 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333540;
				image{
					width: 60rpx;
					height: 60rpx;
					margin-right: 46rpx;
				}
			}
			& > view:last-child{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				image{
					width: 16rpx;
					height: 26rpx;
				}
				text{
					margin-right: 30rpx;
					font-size: 14px;
					color: #A2A2A2;
				}
			}
		}
	}
</style>