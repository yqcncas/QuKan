<template>
	<view class="register">
		<view class="login-center">
			<view class="login-center-top">
				<image src="../../static/image/login-phone.png" mode=""></image>
				<input type="number" v-model="userNum" maxlength = "11" placeholder="请输入您的手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
			</view>
			<view class="login-center-bottom">
				<view class="login-center-bottom-left">
					<image src="../../static/image/login-slock.png" mode=""></image>
					<input type="number" v-model="userPwd" placeholder="请输入验证码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
				</view>
				<view class="getQrCode" :class="{ getQrCodeing: !getYzm }" @click="handleGetYzm">{{getYzm ? '获取验证码' : countTimer + 's'}}</view>
			</view>
		</view>
		<view class="login-button" @click="login">绑定手机号</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.openId = options.openId
			console.log(this.openId)
		},
		data () {
			return {
				userNum: '',
				userPwd: '',
				getYzm: true,
				countTimer: 60,
				openId: ''
			}
		},
		methods: {
			async handleGetYzm () {
				if(!this.$u.test.mobile(this.userNum)) return uni.showToast({icon:'none',title:'请输入正确的手机号'})
				if (!this.getYzm) return
				let res = await this.$fetch(this.$api.sendVerification,{mobile:this.userNum},'GET')
				console.log(res);
				this.countTimer = 60
				this.getYzm = false
				const timer = setInterval(() => {
					if (this.countTimer <= 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.countTimer--
					}
				}, 1000)
			},
			async login () {
				if(!this.$u.test.mobile(this.userNum)) return uni.showToast({icon:'none',title:'请输入正确的手机号'})
				if (this.userPwd.trim() == '') return uni.showToast({
					icon: 'none',
					title: '请输入验证码'
				})
				let res = await this.$fetch(this.$api.login, {openId: this.openId, phonenumber: this.userNum, verification: this.userPwd}, 'GET', 'FORM')
				console.log(res)
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					uni.setStorageSync('loginName',this.userNum)
					uni.setStorageSync('token',res.data.token)
					uni.setStorageSync('userId',res.data.user.userId)
					setTimeout(() => {
						uni.reLaunch({
							url:'../index/index'
						})
					}, 500)
					
				}
			}
		}
	}
	
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.login-center{
		margin-left: 82rpx;
		margin-right: 78rpx;
		box-sizing: border-box;
		background-color: #fff;
		input{
			font-family: PingFangSC-Regular;
			font-size: 14px;
			
		}
		image{
			width: 44rpx;
			height: 44rpx;
			margin-right: 30rpx;
			box-sizing: border-box;
		}
		.login-center-top{
			height: 118rpx;
			line-height: 118rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #F3F3F3;
			input{
				flex: 1;
			}
		}
		.login-center-bottom{
			height: 118rpx;
			line-height: 118rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #F3F3F3;
			.login-center-bottom-left{
				display: flex;
				input{
					flex: 1;
				}
			}
			.getQrCode{
				width: 134rpx;
				height: 48rpx;
				text-align: center;
				line-height: 48rpx;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #FF9800;
				border: 2rpx solid #FF9800;
				border-radius: 2px;
				&.getQrCodeing{
					color: #909399;
					border: 2rpx solid #909399;
				}
			}
		}
	}
	.login-button{
		width: 590rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 0 auto;
		margin-top: 60rpx;
		box-sizing: border-box;
		background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
		border-radius: 22.5px;
		text-align: center;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #FFFFFF;
	}
</style>
