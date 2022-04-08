//Vuex的一个模块存放跟商品相关的数据
import {get_spu_list,get_filter_attr_list} from '../../api/SpuApi.js'

export default {
	namespaced: true,
	state: {
		//查询到的商品列表
		spu_list:[],//
		spuAttrList:[],// 列表页面 需要筛选的选项和值
		params:{
			cate_id:-1,
			start:0,
			valueList:''
		},
		sx_value_list:[],
		// 搜索时的条件
		sparams:{
			spu_name:'',
			start:0
		}
	},
	mutations:{
		set_SParams:function(state,params){
			// 传值进行赋值
			state.sparams = params
			console.log(state.sparams)
		},
		set_spulist_null:function(state){
			state.spu_list=[]
		},
		//设置上面state中的值的
		set_Params:function(state,params){
			state.params.cate_id=params.cate_id
			state.params.start=params.start
			state.params.valueList=params.valueList
		}
	},
	actions:{
		//点击下一页获取商品列表
		get_spu_list_action:function(context,params){
			get_spu_list(params).then(function(res){
				context.state.spu_list=res.data.data
			})
		},
		// 滚动获取商品列表
		get_spu_list_action2:function(context,params){
			get_spu_list(params).then(function(res){
				for(let spu of res.data.data){
					context.state.spu_list.push(spu)
				}
			})
		},
		//和筛选属性列表
		get_spu_attrlist:function(context,params){
			get_filter_attr_list(params).then(function(res){
				//将筛选属性也给到state中的spuAttrList
				context.state.spuAttrList=res.data.data
				context.state.sx_value_list=[]
				// 初始化筛选的数组，赋值为null
				for(let v of res.data.data){
					context.state.sx_value_list.push(null)
				}
			})
		}
	}
}
