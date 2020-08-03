<template>
	<view class="content">
		<jyf-parser :html="detail" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		onLoad(options) {
			uni.showLoading({
				title: '加载中'
			})
			if (uni.getStorageSync('DetailInfo')) {
				this.detail = uni.getStorageSync('DetailInfo')
				uni.removeStorageSync('DetailInfo')
				
			} else {
				this.detail = options.detail
			}
	
			this.title = options.title
			uni.setNavigationBarTitle({
				title: this.title
			})
			uni.hideLoading()
		},
		data() {
			return {
				detail:'',
				title: '',
				articleId:null
			}
		},
		components: {
		    jyfParser
	    },
		
	}
</script>

<style lang="less">
	page{
		background: #FFFFFF;
	}
	.content{
		width: 750rpx;
		padding: 30rpx 0;
	}
</style>
