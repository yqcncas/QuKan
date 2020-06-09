<template>
	<view>
		<view class="input-name">
			<input type="text" :placeholder="placeholder" placeholder-class="placeHolderClass" v-model="userName">
			<image src="../../static/image/ylc/25.png" mode="" v-if="userName"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder:'请输入昵称',
				userName:'',
				flag:0
			};
		},
		methods:{
			// 修改昵称
			async editUserName(){
				if(!this.userName) return uni.showToast({icon:'none',title:'请输入昵称！'})
				let res = await this.$fetch(this.$api.editUser,{userName:this.userName},'GET')
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 绑定上级
			async addUpcode(){
				if(!this.userName) return uni.showToast({icon:'none',title:'请输入上级邀请码'})
				let res = await this.$fetch(this.$api.addUpCode,{upCode:this.userName},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					uni.navigateBack({
						delta:1
					})
				}
			}
		},
		onLoad(options) {
			if(options.flag){
				this.flag = options.flag
				this.placeholder = '请输入上级邀请码'
				this.userName = options.upCode
				uni.setNavigationBarTitle({
					title:'绑定上级'
				})
			}
			if(options.name){
				this.userName = options.name
			}
		},
		onUnload() {
			uni.hideKeyboard()
		},
		onNavigationBarButtonTap() {
			if(this.flag == 0){
				this.editUserName()
			}else{
				this.addUpcode()
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.input-name{
		width: 750rpx;
		display: flex;
		align-items: center;
		height: 100rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
		input{
			margin-left: 30rpx;
			width: 660rpx;
			font-size: 14px;
			color: #222222;
		}
		image{
			width: 30rpx;
			height: 30rpx;
			margin-right: 30rpx;
		}
	}
</style>
