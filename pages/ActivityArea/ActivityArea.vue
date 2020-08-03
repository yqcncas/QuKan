<template>
	<view class="activityArea" :style="{backgroundImage:`url(${bgImg})`}">
		<view class="activityArea-header">
			<view class="img-box" @click="goBack">
				<image src="../../static/image/ych/back.png" mode="" @click="goBack"></image>
			</view>
			<view class="activityArea-header-title">活动专区</view>
		</view>
		<view class="activityArea-center" @click="handleOpenRedBag">
			<view class="activityArea-center-header">
				<image :src="avatar ? avatar : '@/static/ylc/11.png'" mode=""></image>
			</view>
			<view class="activityArea-center-center">你有现金红包待领取，最低50元</view>
			<view class="activityArea-center-footer">恭喜发财，大吉大利</view>
			<view style="width: 550rpx;height: 300rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				bgImg: '../../static/image/activeArea.png',
				avatar:'../../static/image/ylc/11.png',
				code: ''
			}
		},
		methods:{
			goBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 打开红包
			async handleOpenRedBag(){
				let res = await this.$fetch(this.$api.getActivity, {code: this.code}, 'GET', 'FORM')
				console.log(res)
				
				uni.navigateTo({
					url:'../RandomRedBag/RandomRedBag'
				})
			},
			// 获取用户信息
			async getUserInfo(){
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				console.log(res);
				if(res.data.avatar){
					this.avatar  = res.data.avatar
				}
			}
		},
		onLoad(options) {
			this.getUserInfo()
			this.code = options.code
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.activityArea{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		.activityArea-header{
			position: fixed;
			top: var(--status-bar-height);
			width: 100%;
			display: flex;
			align-items: center;
			.img-box{
				width: 24rpx;
				height: 42rpx;	
				padding-left: 30rpx;
				position: relative;
				z-index: 999;
				&::after{
					content: '';
					position: absolute;
					left: -100rpx;
					top: -50rpx;
					right: -100rpx;
					bottom: -50rpx;
				}
				image{
					width: 24rpx;
					height: 42rpx;
					// margin-left: 30rpx;
					box-sizing: border-box;
				}
				
			}
			
			.activityArea-header-title{
				flex: 1;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #FFFFFF;
				line-height: 32px;
				transform: translateX(-24rpx);
			}
		}
		.activityArea-center{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 50%;
			// top:var(--status-bar-height);
			// transform: translate(-50%, 120%);
			transform: translateX(-50%);
			top: 22%;
			.activityArea-center-header{
				image{
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}
			}
			.activityArea-center-center{
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #FFD133;
				padding-top: 24rpx;
				padding-bottom: 10rpx;
				box-sizing: border-box;
			}
			.activityArea-center-footer{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #FFD133;
			}
		}
	}
</style>
