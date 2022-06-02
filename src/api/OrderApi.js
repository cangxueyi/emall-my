// 封装访问接口的方法
import {get,post,put,del} from "@/utils/request.js"
import {CUSTOMER_CART_URL,CUSTOMER_ORDER_URL} from "./ResourceURL.js"
// 加入购物车的功能
export const addCart=(params)=>post(CUSTOMER_CART_URL,params)
// 获取购物车列表
export const getCartList=()=>get(CUSTOMER_CART_URL)
//修改购物车
export const updateCart=(params)=>put(CUSTOMER_CART_URL,params)
//删除购物车
export const delCart=(cid)=>del(CUSTOMER_CART_URL+"/"+cid)
//清空购物车
export const clearCart=()=>del(CUSTOMER_CART_URL)
//提交订单
export const tijiaoOrder=(params)=>post(CUSTOMER_ORDER_URL,params)
//获取订单列表
export const getorderlist=()=>get(CUSTOMER_ORDER_URL)
//获取某个订单信息
export const getorderdetail=(oid)=>get(CUSTOMER_ORDER_URL+"/"+oid)