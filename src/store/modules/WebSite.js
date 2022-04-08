import { get_all_category,get_tuijain_spu_list_api } from '../../api/WebSiteApi.js'
export default {
	namespaced:true,
	state:{
		//保存首页分类，所有的分类列表
		all_cate_list:[],
		// 发哦村四种不同推荐分类得到的商品列表
		tuijian_spu_list:[]
	},
	mutations:{
		// 改变all_cate_list的值得一个mutation
		set_all_cate_list:function(state,list){
			state.all_cate_list=list
		}
	},
	actions:{
		//异步操作，调用api获取分类列表
		get_all_cate_list(context){
			//调用WebSiteApi中的已经封装好的函数
			get_all_category().then(function(res){
				let obj = res.data
				context.commit("set_all_cate_list",obj.data)
			})
		},
		// 获取所有推荐分类的spu列表，根据分类list进行获取
		get_tuijian_spu_list:function(context,list){
			// 每次属性先置空
			context.state.tuijian_spu_list=[]
			
			for(let c of list){
				let params = {
					cate_id:c.cate_id,
					start:0,
					length:5
				}
				// 封装每个分类
				let obj = {cate_id:c.cate_id,cate_name:c.cate_name,spulist:[]}
				get_tuijain_spu_list_api(params).then(function(res){
					obj.spulist = res.data.data
					context.state.tuijian_spu_list.push(obj)
				})
			}
		}
	}
}