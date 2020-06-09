<template>
	<view class="content">
		<jyf-parser :html="detail" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; 	
	export default {
		data() {
			return {
				detail:'',
				articleId:null
			};
		},
		components: {
		    "jyf-parser": parser
		},
		methods:{
			// 获取新手指南
			async getArticle(){
				let res = await this.$fetch(this.$api.getArticle,{id:this.articleId},'GET')
				console.log(res)
				if(res.code == 0){
					uni.setNavigationBarTitle({
						title: res.data.title
					})
					this.detail = res.data.content
					
				}else{
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			}
		},
		onLoad(options) {
			this.articleId = options.id
			this.getArticle()
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
