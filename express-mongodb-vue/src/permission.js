import router from './router'

import { getToken } from "@/utils/user"

router.beforeEach((to, from, next) => {
    // 如果cookie中存在数据,直接进入对应页面
    if(getToken()){
            // console.log(to)
            // if(to.path == "/login"){
            //     next("/list")
            // }else{
            //     next()
            // }
            next()
    }else{
        //当cookie用户没有数据时，直接进入login页面
        if(to.path == "/login"){
            next()
        }else{
            next({ path : "/"})
        }
    }
  })