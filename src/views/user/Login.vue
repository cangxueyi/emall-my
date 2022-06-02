<template>
	<div class=" mt-10 py-10">
		<div id="login">
			<div class="containner flex item-center justify-around">
				<img src="../../assets/img/login_bg.png" class="rounded box-shadow">
				<div>
					<div class="gray weight text-xl">客户登录</div>
					<form>
						<div class="mt-20"><input v-model="user.username" type="text" placeholder="请输入手机号码" class="user_name hand"></div>
						<div class="my-20"><input v-model="user.password" type="password" placeholder="请输入账户密码" class="user_pass hand"></div>
						<div><button type="button" class="btn-login hand" @click="login"> 登 录 </button></div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {dologin} from '@/api/UserApi.js'
	export default {
		data:function(){
			return{
				user:{
					username:'',
					password:''
				}
			}
		},
		methods:{
			login:function(){
				let _this = this
				// 调用登录方法
				dologin(this.user).then(function(res){
					if(res.data.httpcode==401){
						alert("用户名或密码输入错误")
					}
					if(res.data.httpcode==200){
						// 将数据保存在sessionStorage和vuex中
						window.sessionStorage.setItem("token",res.data.data)
						// 登录成功跳转到用户中心
						_this.$router.push("/pri/usercenter")
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	/*登录----------------------------------*/
	.user_name,
	.user_pass {
		width: 560px;
		padding: 9px 20px;
		outline: none;
		border: 1px solid #ccc;
		border-radius: 6px;
	}
	.btn-login {
		width: 600px;
		padding: 8px 20px;
		outline: none;
		border: 1px solid #c33;
		background-color: #c33;
		color: #fff;
		border-radius: 6px;
	}
	.btn-login:hover {
		background-color: #d33;
	}
</style>
