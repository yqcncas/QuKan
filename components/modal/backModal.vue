<template>
	<view>
		<view class="modal" :class="[show ?'modalShow':'']">
			<view class="closeIcon" @click="handleClose"><image src="../../static/image/ylc/3.png" mode="" class="close-img"></image></view>
			<view class="modal-title">提醒</view>
			<view class="modal-input">
				<text>你已经输入了部分信息，确定要返回吗？</text>
			</view>
			<view class="modal-button">
				<view class="cancelButton" @click="handleClose">取消</view>
				<view class="confirmButton" @click="confirm">确定</view>
			</view>
		</view>
		<view class="mask" :class="{ maskShow: show === true }" @click="handleClose"></view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['show'],
		methods:{
			// 关闭
			handleClose(){
				this.$emit('close',false)
			},
			// 确定
			confirm(){
				this.$emit('confirm',1)
			}
		}
	}
</script>

<style lang="less">
	.modal{
		width: 540rpx;
		height: 332rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 328rpx;
		left: 108rpx;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		z-index: 999;
		.closeIcon{
			width: 26rpx;
			height: 28rpx;
			position: absolute;
			top: 13.4rpx;
			right: 26.8rpx;
			.close-img{
				width: 26rpx;
				height: 28rpx;
			}
		}
		.modal-title{
			width: 100%;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #2B2925;
			font-weight: bold;
		}
		.modal-input{
			width: 480rpx;
			height: 80rpx;
			margin: 40rpx 30rpx;
			border-radius: 4rpx;
			font-size: 14px;
			color: #2B2925;
			display: flex;
			align-items: center;
		}
		.modal-button{
			width: 100%;
			display: flex;
			height: 90rpx;
			border-top: 1px solid #F5F5F5;
			.cancelButton{
				flex: 1;
				height: 90rpx;
				border-right: 1px solid #F5F5F5;
				font-size: 14px;
				color: #939393;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.confirmButton{
				font-size: 14px;
				color: #508CF6;
				flex: 1;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.modalShow{
		visibility: visible;
		opacity: 1;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.maskShow {
		opacity: 1;
		visibility: visible;
	}
</style>
