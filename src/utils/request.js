import axios from "axios"
import qs from 'qs'

// 先创建一个实例
let request = axios.create({
	baseURL:'/api',
	// 超时时间
	timeout:24000,
	// `transformRequest` 允许在向服务器发送前，修改请求数据
	// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
	// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
	transformRequest:function(data){
		return qs.stringify(data)
	}
})
// 请求拦截器
request.interceptors.request.use(function(config){
	// 获取登录的token，带到请求中去
	config.headers.Authorization=window.sessionStorage.getItem("token")
	return config
},function(err){
	// 请求失败
	console.log(err)
})
// 响应拦截器
request.interceptors.response.use(function(res){
	// 获取一下httpmessage
	let httpmessage = res.data.httpmessage
	if(!httpmessage){
		return res;
	}
	// 对响应的数据做判断
	console.log("---响应拦截器中输出------------")
	console.log(res.data)
	let httpcode = res.data.httpcode
	switch(httpcode){
		case 401:
			alert("请先登录")
			return res;
	}
	return res
},function(error){
	console.log(err)
});
// 封装get请求，按需导出
export let get = function(url,params={}){
	// 虽然没有用then，但是返回的是promise对象
	let p = request({
		method:'GET',
		url:url,
		params:params
	})
	return p
}
// 封装post请求，按需导出
export let post = function(url,params={}){
	// 没有使用then，但返回的是promise对象
	// params传递json格式，接口方不一定也是，需要传递传统参数，并作转换
	let p = request({
		method:'POST',
		url:url,
		data:params
	})
	return p
}
// 封装put请求
export let put = function(url,params={}){
	// 没有使用then，但返回的是promise对象
	// params传递json格式，接口方不一定也是，需要传递传统参数，并作转换
	let p = request({
		method:'PUT',
		url:url,
		data:params
	})
	return p
}
// 封装delete请求
export let del = function(url,params={}){
	// 没有使用then，但返回的是promise对象
	// params传递json格式，接口方不一定也是，需要传递传统参数，并作转换
	let p = request({
		method:'DELETE',
		url:url,
		data:params
	})
	return p
}
