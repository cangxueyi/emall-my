import { get,post,put,del } from '../utils/request.js'
import {CATEGORY_URL,SPU_URL} from './ResourceURL.js'

// 调用get方法访问分类接口
export const get_all_category=()=>get(CATEGORY_URL)
// 调用get方法，访问spu列表需要传参，参数就是推荐分类的列表
export const get_tuijain_spu_list_api=(tuijian_cate)=>get(SPU_URL,tuijian_cate)