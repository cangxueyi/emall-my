import { getuser } from "../../api/UserApi.js"
export default {
	// namespaced必须加上
	namespaced:true,
	state:{
		loginuser:{}
	},
	mutations:{
		// 给loginuser设置值
		set_loginuser:function(state,u){
			state.loginuser=u
		}
	},
	actions:{
		get_loginuser:function(context){
			getuser().then(function(res){
				context.commit('set_loginuser',res.data.data)
				window.sessionStorage.setItem('user_name',res.data.data.user_name)
			})
		}
	}
}
