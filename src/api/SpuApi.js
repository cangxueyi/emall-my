import { get,post,put,del } from "@/utils/request.js"
import {SPU_URL,ATTR_URL} from "./ResourceURL.js"
// 根据参数获取商品列表params就是形参
export const get_spu_list=(params)=>get(SPU_URL,params)
// 根据参数，获取筛选属性列表
export const get_filter_attr_list=(params)=>get(ATTR_URL,params)
export const get_one_spu=(url)=>get(url)