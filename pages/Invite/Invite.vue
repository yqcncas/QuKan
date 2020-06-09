<template>
	<view class="invite">
		<view class="invite-header">
			<view class="invite-header-top">分享趣砍APP给好友</view>
			<view class="invite-header-bottom">好友成功下载并成为您的下级即可获得佣金</view>
		</view>
		<!-- <view class="invite-main" :style="{backgroundImage:`url(${bgImg})`}">
			<view class="invite-main-box">
				<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3381390367,3810581293&fm=26&gp=0.jpg" mode=""></image>
				<view class="invite-main-bottom">更多精彩在趣砍App</view>
			</view>
		</view> -->
		 <canvas class="invite-main" canvas-id="firstCanvas">
			 
		 </canvas>
		<view class="invite-bottom" @click="saveCanvasImg">保存到相册</view>
		
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
	export default {
		onLoad() {
			uni.hideTabBar()
			
		},
		onReady() {
			this.QRcode()
			
		},
		data () {
			return {
				bgImg: '../../static/image/ych/else/invite.png',
				qrCode: '',
				myCode: ''
			}
		},
		methods: {
			async QRcode () {
				let res = await this.$fetch(this.$api.getQRCode, {}, "GET", "FORM")
				this.qrCode = baseURL.slice(0, baseURL.length - 1) +  res.msg
				if (uni.getStorageSync('myQrcode')) {
					this.myCode = uni.getStorageSync('myQrcode')
				}
				this.initCanvas()
			},
			initCanvas () {
				var context = uni.createCanvasContext('firstCanvas')
				let c_W = uni.upx2px(506)
				let c_H = uni.upx2px(902)
				context.drawImage(this.bgImg, 0, 0, c_W, c_H)
				context.drawImage(this.qrCode,c_W / 3, c_H / 1.4, 90, 90)
				context.setFontSize(10)
				context.setFillStyle('#fdd580')
				context.fillText('更多精彩在趣砍App', c_W / 3, c_H - 20)
				context.setFontSize(16)
				context.setFillStyle('#fdd580')
				context.fillText('邀请码' + this.myCode, c_W / 4, c_H / 1.7)
			    context.draw()
			},
			saveCanvasImg () {
				uni.canvasToTempFilePath({
				  canvasId: 'firstCanvas',
				  success: (res) => {
				    // 在H5平台下，tempFilePath 为 base64
				    console.log(res.tempFilePath)
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success:  () => {
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							})
						}
					});
				  } 
				})
			}
		}
	}
</script>

<style lang="less">
	.invite{
		height: 100%;
		background-color: #fff;
		.invite-header{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-family: PingFangSC-Regular;
			font-size: 17px;
			color: #000000;
			padding-top: 30rpx;
			box-sizing: border-box;
		}
		.invite-main{
			width: 506rpx;
			height: 902rpx;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-size: cover;
			margin: 0 auto;
			margin-top: 30rpx;
			box-sizing: border-box;
			position: relative;
			.invite-main-box{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				top: 70%;
				left: 50%;
				transform: translateX(-50%);
				image{
					width: 180rpx;
					height: 180rpx;
				}
				.invite-main-bottom{
					color: #fdd580;
					font-size: 12px;
					margin-top: 10rpx;
				}
			}
			
		}
		.invite-bottom{
			width: 750rpx;
			height: 118rpx;
			text-align: center;
			line-height: 118rpx;
			background-image: linear-gradient(180deg, #FFE38D 0%, #FFBD3F 100%);
			box-shadow: 0 2px 3px 0 rgba(203,41,16,0.50);
			position: fixed;
			bottom: 0;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #EC5237;
			letter-spacing: -0.34px;
		}
	}
</style>
