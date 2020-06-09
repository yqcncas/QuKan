<template>
	<view>
		<view class="line-30"></view>
		<view class="setting">
			<view class="setting-item" @click="handleToFeedback">
				<view>意见反馈</view>
				<view><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
			<view class="setting-item" @click="clearCacheModal">
				<view>清理缓存</view>
				<view><text>{{fileSizeString}}</text><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
			<view class="setting-item" @click="goToArt(19)">
				<view>用户服务协议</view>
				<view><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
			<view class="setting-item" @click="goToArt(20)">
				<view>隐私政策</view>
				<view><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
			<view class="setting-item" @click="goToArt(21)">
				<view>关于我们</view>
				<view><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
			<view class="setting-item" @click="checkVersions">
				<view>检查版本</view>
				<view><text>{{version}}</text><image src="../../static/image/ylc/17.png" mode=""></image></view>
			</view>
		</view>
		<view class="line-30"></view>
		<view class="loginOut" @click="handleToLoginOut">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileSizeString:'',
				version:'',
				platInfo: ''
			};
		},
		methods:{
			goToArt (id) {
				uni.navigateTo({
					url: '../article/article?id=' + id
				})
			},
			// 意见反馈
			handleToFeedback(){
				uni.navigateTo({
					url:'problem'
				})
			},
			// 清除缓存
			clearCacheModal(){
				uni.showModal({
					title:'提醒',
					content:'你确定要清除缓存吗？',
					success: (res) => {
						if(res.confirm){
							console.log('清除缓存');
							this.clearCache()
						}
					}
				})
			},
			// 计算缓存大小
			formatSize() {  
			    let that = this;  
			    plus.cache.calculate(function(size) {  
			        let sizeCache = parseInt(size);  
			        if (sizeCache == 0) {  
			            that.fileSizeString = "0B";  
			        } else if (sizeCache < 1024) {  
			            that.fileSizeString = sizeCache + "B";  
			        } else if (sizeCache < 1048576) {  
			            that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
			        } else if (sizeCache < 1073741824) {  
			            that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
			        } else {  
			            that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
			        }
					  console.log(that.fileSizeString);
			    });  
			},
			clearCache() {  
			        let that = this;  
			        let os = plus.os.name;  
			        if (os == 'Android') {  
			            let main = plus.android.runtimeMainActivity();  
			            let sdRoot = main.getCacheDir();  
			            let files = plus.android.invoke(sdRoot, "listFiles");  
			            let len = files.length;  
			            for (let i = 0; i < len; i++) {  
			                let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
			                plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
			                    if (entry.isDirectory) {  
			                        entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
			                            uni.showToast({  
			                                title: '缓存清理完成',  
			                                duration: 2000  
			                            });  
			                            that.formatSize(); // 重新计算缓存  
			                        }, function(e) {  
			                            console.log(e.message)  
			                        });  
			                    } else {  
			                        entry.remove();  
			                    }  
			                }, function(e) {  
			                    console.log('文件路径读取失败')  
			                });  
			            }  
			        } else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
			            plus.cache.clear(function() {  
			                uni.showToast({  
			                    title: '缓存清理完成',  
			                    duration: 2000  
			                });  
			                that.formatSize();  
			            });  
			        }  
			    },
				// 登出
				handleToLoginOut(){
					uni.removeStorageSync('token')
					uni.reLaunch({
						url:'../Login/Login'
					})
				},
				// 更新
				async checkVersions () {
					let res = await this.$fetch(this.$api.getVersion, {}, "GET", "FORM")
					
					let nowVersion = plus.runtime.version.split('.').join('')
					let futureVersion = res.data.version.split('.').join('')
					console.log(nowVersion, futureVersion)
					if (nowVersion == futureVersion) {
						return uni.showToast({
							icon: 'none',
							title: '已经是最新版本, 无需更新'
						})
					} else {
						uni.showModal({
						    title: '提示',
						    content: '检测到新版本, 是否更新',
						    success: (msg) => {
						        if (msg.confirm) {
									if (this.platInfo == 'ios') {
										plus.runtime.openURL(res.data.ios) 
									} else {
										plus.runtime.openURL(res.data.apk) 
									}
						           
						        } else if (msg.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				
				}
		},
		onLoad() {
			this.formatSize()
			this.version = plus.runtime.version
			this.platInfo = uni.getSystemInfoSync().platform
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.setting{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		.setting-item{
			width: 720rpx;
			margin-left: 30rpx;
			height: 100rpx;
			background: #FFFFFF;
			border-bottom: 2rpx solid #F4F4F5;
			display: flex;
			align-items: center;
			font-size: 14px;
			color: #222222;
			& > view:first-child{
				flex: 1;
			}
			& > view:last-child{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				image{
					width: 16rpx;
					height: 26rpx;
					margin-right: 30rpx;
				}
				text{
					font-size: 14px;
					color: #A2A2A2;
					margin-right: 30rpx;
				}
			}
		}
	}
	.loginOut{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #C9281C;
		background: #FFFFFF;
	}
</style>
