import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    //2、axios的拦截器
    //全局拦截
    // axios.interceptors
    instance.interceptors.request.use(config => {
        return config
        //拦截记得返回，
    }, error => {
        console.log(error)
    });
    instance.interceptors.response.use(result => {
        // console.log(result)
        return result.data
    }, error => {
        console.log(error)
    });
    // 3.发送真正的网络请求
    return instance(config)
}