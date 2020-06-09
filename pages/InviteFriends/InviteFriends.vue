<template>
	<view class="inviteFriends" :style="{backgroundImage:`url(${bgImg})`}">
		<view class="code">邀请码：290979</view>
		<view class="invite-main-box">
			<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3381390367,3810581293&fm=26&gp=0.jpg" mode=""></image>
			<view class="invite-main-bottom">更多精彩在趣砍App</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.hideTabBar()
		},
		data () {
			return {
				bgImg: '../../static/image/ych/else/invite.png'
			}
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	.inviteFriends{
		width: 100%;
		height: 100%;	
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.code{
			font-family: PingFangSC-Medium;
			font-size: 24px;
			color: #FFD47F;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 780rpx);
			top: var(--status-bar-height);
			font-weight: bold;
		}
		.invite-main-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			bottom: 80rpx;
			left: 50%;
			transform: translateX(-50%);
			image{
				width: 290rpx;
				height: 290rpx;
			}
			.invite-main-bottom{
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #FFD47F;
				margin-top: 20rpx;
			}
		}
	}
</style>
