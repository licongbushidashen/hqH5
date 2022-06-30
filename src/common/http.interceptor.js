import Cookie from 'vue-cookies'

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const https = {
    baseUrl: 'https://zhhq.zhejianglab.com/Logistics',
    //baseUrl: 'https://localhost:44312',
    //baseUrl: '/',
    method: 'GET',
    // 设置为json，返回后会对数据进行一次JSON.parse()
    dataType: 'json',
    showLoading: false, // 是否显示请求中的loading
    loadingText: '努力加载中...', // 请求loading中的文字提示
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    originalData: true, // 是否在拦截器中返回服务端的原始数据
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // 配置请求头信息
    header: {
        'content-type': 'application/json;charset=UTF-8'
    }
}
const install = (Vue, vm) => {
    uni.$u.http.setConfig((config) => {
        // return {
        //     ...config,
        //     ...https
        // }


        return {
            ...config,
            ...https
        }
    });
    uni.$u.http.interceptors.request = (config) => {
        var xsrf_token = Cookie.get("XSRF-TOKEN");
        if (xsrf_token) {
            config.header["X-XSRF-TOKEN"] = xsrf_token;
        }

        if (config.url.lastIndexOf('/connect/token') > -1) {
            config.header['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            return config;
        }
        config.header.Authorization = 'Bearer ' + vm.vuex_token;
        return config;
    }

    // 响应拦截，判断状态码是否通过
    uni.$u.http.interceptors.response = (res) => {
        //console.log(res);
        if (res.statusCode == 200) {
            return res.data;
        } else if (res.statusCode == 204) {
            return true;
        } else if (res.statusCode == 400) {
            return res.data;
        } else if (res.statusCode == 401) {
            vm.$u.toast('验证失败，请重新登录');
            setTimeout(() => {
                vm.$u.route('/pages/login/index')
            }, 1000)
            return false;
        } else {
            // 如果返回false，则会调用Promise的reject回调，
            // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
            return false;
        }
    }
}

export default {
    install
}