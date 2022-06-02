<template>
	<div class=" mt-10 py-10">
		<div id="regist">
			<div class="containner flex item-center justify-around">
				<img src="../../assets/img/login_bg.png" class="rounded box-shadow">
				<div>
					<div class="gray weight text-xl">注册新账户</div>
					<form>
						<div class="mt-20"><input v-model="usertel" type="text" placeholder="请输入手机号码" class="user_name hand"></div>
						<div class="mt-20"><input v-model="upwd" type="password" placeholder="请输入账户密码" class="user_pass hand"></div>
						<div class="mt-20"><input v-model="urpwd" type="password" placeholder="请再次确认密码" class="user_pass hand"></div>
						<div class="mt-20"><input v-model="usernick" type="text" placeholder="请输入用户昵称" class="user_name hand"></div>
						<div class="mt-20"><button @click="regist" type="button" class="btn-login hand"> 立即注册 </button></div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {doregist} from '@/api/UserApi.js'
	export default {
		data:function(){
			return{
				usertel:'',
				upwd:'',
				urpwd:'',
				usernick:''
			}
		},
		methods:{
			regist:function(){
				// 如果有一个为空，直接返回
				if(!this.usertel||!this.upwd||!this.urpwd||!this.usernick){return}
				if(this.upwd!=this.urpwd){return}
				
				console.log("开始注册")
				// 调用开始注册功能，p是需要的参数
				let p = {
					user_phone:this.usertel,
					user_password:this.upwd,
					user_name:this.usernick
				}
				doregist(p).then((res)=>{
					if(res.data.httpcode==401){
						alert("账户已存在，请重新注册")
					}
					if(res.data.httpcode==200){
						this.$router.push('/login')
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	/*注册----------------------------------*/
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
