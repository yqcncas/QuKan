<script>
	export default {
		onLaunch: function() {
			//锁定屏幕
			plus.screen.lockOrientation('portrait-primary');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	page{
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;
	}
	/* 顶部阴影 */
	page::after {
		content: "";
		position: fixed;
		top: 0;
		/*  #ifdef H5 */
		top: 44px;
		/*  #endif  */
		left: 0;
		box-shadow: inset 0 4upx 8upx 0 rgb(244, 244, 244);
		z-index: 9;
		width: 750upx;
		height: 8upx;
	}
	.placeHolderClass{
		font-size: 14px;
		color: rgba(9,2,62,0.30);
	}
	.bottomRedButton{
		width: 750rpx;
		height: 90rpx;
		background: #C9281C;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	.line-30{
		height: 30rpx;
		width: 100%;
	}
	swiper .wx-swiper-dot,
	swiper .a-swiper-dot,
	swiper .uni-swiper-dot {
		background: rgba(0,0,0,0.20);
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		box-sizing: border-box;
		margin: 0 8rpx !important;
	}

	swiper .wx-swiper-dot.wx-swiper-dot-active,
	swiper .a-swiper-dot.a-swiper-dot-active,
	swiper .uni-swiper-dot.uni-swiper-dot-active {
		background: #EC584E;
		border: 1px solid #EC584E;
		box-sizing: border-box;
	}
	
	::-webkit-scrollbar {
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    color: transparent;
	    background: transparent;  
	}
	
	.uni-system-preview-image {
			display: block;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			width: 100%;
			height: 100%;
			background: #000;
		}
	/* #endif */
	
</style>
