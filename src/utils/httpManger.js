import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://192.168.0.1:8000'

export const reqeust_manger_post = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, params,{
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                res = res.data
                if(1 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.message)
                }
            })
            .catch(err => reject(err))
    })
}

export const reqeust_manger_post_login = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, qs.stringify(params))
            .then(res => {
                res = res.data
                if(1 === res.status){
                    resolve(res)
                }else{
                    reject(res.msg)
                }
            })
            .catch(err => reject(err))
    })
}

export const request_manger_get = (path, params) =>{
    return new  Promise((resolve ,reject) =>{
        axios.get(path,{ params })
            .then(res =>{
                res = res.data
                if (0 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.message)
                }
            })
            .catch(error => reject(error))
    })
}
