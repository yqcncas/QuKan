<template>
	<view>
		<view class="line-30"></view>
		<view class="editAddress">
			<view class="edit-input">
				<view>收货人姓名</view>
				<view><input type="text" placeholder="请输入收货人姓名" placeholder-class="placeHolderClass" v-model="name"></view>
			</view>
			<view class="edit-input">
				<view>收货电话</view>
				<view><input type="number" placeholder="请输入收货电话" placeholder-class="placeHolderClass" v-model="phone"></view>
			</view>
			<view class="edit-input">
				<view>省市区</view>
				<view @tap="openAddres">
					<text :class="areaChoose == false ? 'grayFont':''">{{area}}</text>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="edit-textarea">
				<view>详细地址</view>
				<view>
					<textarea  placeholder="请填写详细地址到街道、门牌号等" placeholder-class="placeholderClass" v-model="detailAddress" />
				</view>
			</view>
		</view>
		<view class="line-30"></view>
		<view class="default">
			<view>设置为默认地址</view>
			<view>
				<switch :checked="isDefault" @change="switchChange" color="#C9281C" />
			</view>
		</view>
		<view class="line-30"></view>
		<view class="delButton" @click="handleToDelAddrss" v-if="addressId">
			<text>删除</text>
		</view>
		<backModal :show="backShow" @close="modalClose" @confirm="confirmBack"></backModal>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#333333'></simple-address>		
		<view class="bottomRedButton" @click="sumbitAddressInfo">
			保存
		</view>
	</view>
</template>

<script>
	import simpleAddress from "@/components/simple-address/simple-address.nvue"		
	import backModal from '../../components/modal/backModal.vue'
	export default {
		data() {
			return {
				name:'',
				phone:'',
				area:'请选择省市区',
				areaChoose:false,
				cityPickerValueDefault: [0, 0, 1],
				detailAddress:'',
				addressId:'',
				isDefault:0,
				isChecked:false,
				isSumbit:true,
				backShow:false
			};
		},
		components:{
			simpleAddress,backModal
		},
		methods:{
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				console.log(e);
				this.area = e.label
				this.areaChoose = true
			},
			switchChange(e){
				console.log(e);
				this.isChecked = e.target.value
				if(this.isChecked){
					this.isDefault = 1
				}else{
					this.isDefault = 0
				}
			},
			async sumbitAddressInfo(){
				if(!this.name || !this.phone || !this.area || !this.detailAddress) return uni.showToast({icon:'none',title:'请填写完整！'})
				if (!this.$u.test.mobile(this.phone)) return uni.showToast({icon: 'none',title: '请检查手机号是否输入正确'})
				if(!this.isSumbit) return
				this.isSumbit = false
				setTimeout(()=>{
					this.isSumbit = true
				},1000)
				if(this.addressId){
					let res = await this.$fetch(this.$api.editAddress,{
						userName:this.name,phonenumber:this.phone,province:this.area,isdefault:this.isDefault,detail:this.detailAddress,id:this.addressId},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				}else{
					let res = await this.$fetch(this.$api.addAddress,{
						userName:this.name,phonenumber:this.phone,province:this.area,isdefault:this.isDefault,detail:this.detailAddress},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				}
				
			},
			// 删除收货地址
			handleToDelAddrss(){
				if(!this.isSumbit) return
				this.isSumbit = false
				setTimeout(()=>{
					this.isSumbit = true
				},1000)
				uni.showModal({
					title:'删除地址',
					content:'确定要删除地址吗？',
					success: async (res) => {
						if(res.confirm){
							let res = await this.$fetch(this.$api.delAddress,{id:this.addressId},"GET")
							console.log(res);
							uni.showToast({
								icon:'none',
								title:res.msg
							})
							if(res.code == 0){
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
							}
						}
					}
				})
			},
			// 关闭弹窗
			modalClose(data){
				this.backShow = false
			},
			// 确认返回
			confirmBack(data){
				this.backShow = false
				if(data){
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 获取收货地址详情
			async getAddressDetail(){
				let res = await this.$fetch(this.$api.getAddress,{id:this.addressId},'GET')
				console.log(res);
				this.name = res.data.userName
				this.phone = res.data.phonenumber
				this.area = res.data.province
				this.detailAddress = res.data.detail
				this.isDefault = res.data.isdefault
				if(this.isDefault == 1){
					this.isChecked = true
				}else{
					this.isChecked = false
				}
				this.areaChoose = true
			}
		},
		onLoad(options) {
			if(options.id){
				this.addressId = options.id
				uni.setNavigationBarTitle({
					title:'编辑收货地址'
				})
				this.getAddressDetail()
			}
		},
		onBackPress(options) {
			if(options.from === 'backbutton'){
				//添加收货地址时且有填写了信息的情况下
				if((!this.addressId)&&(this.name || this.phone || this.areaChoose || this.detailAddress)){
					this.backShow = true
					return true
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f5f5f8;
	}
	.editAddress{
		width: 750rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		.edit-input{
			width: 690rpx;
			margin: 0 30rpx;
			height: 110rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				flex: 1;
				font-size: 14px;
				display: flex;
				align-items: center;
				color: #333333;
			}
			& > view:last-child{
				flex: 1;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: #333333;
				input{
					flex: 1;
					text-align: right;
				}
				image{
					width: 16rpx;
					height: 26rpx;
					margin-left: 30rpx;
				}
				.grayFont{
					font-size: 14px;
					color: rgba(9,2,62,0.30);
				}
			}
		}
		.edit-input + .edit-input{
			border-top: 1px solid #F5F5F5;
		}
		.edit-textarea{
			width: 690rpx;
			height: 200rpx;
			margin: 0 30rpx;
			border-top: 1px solid #F5F5F5;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				margin-top: 30rpx;
				font-size: 14px;
				color: #333333;
			}
			& > view:last-child{
				margin-top: 20rpx;
				font-size: 14px;
				color: #333333;
				textarea{
					height: 80rpx;
				}
			}
		}
	}
	.placeholderClass{
		font-size: 14px;
		color: #9B9B9B;
	}
	.default{
		width: 690rpx;
		padding: 0 30rpx;
		background: #FFFFFF;
		display: flex;
		height: 110rpx;
		align-items: center;
		& > view:first-child{
			font-size: 14px;
			color: #333333;
			flex: 1;
			display: flex;
			align-items: center;
		}
		& > view:last-child{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
	.delButton{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #DD524D;
		background: #FFFFFF;
		height: 100rpx;
	}
</style>
