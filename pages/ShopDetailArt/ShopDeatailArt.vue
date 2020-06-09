<template>
	<view class="content">
		<jyf-parser :html="detail" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; 	
	export default {
		onLoad(options) {
			this.detail = options.detail
			this.title = options.title
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		data() {
			return {
				detail:'',
				title: '',
				articleId:null
			}
		},
		components: {
		    "jyf-parser": parser
		}
		
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
