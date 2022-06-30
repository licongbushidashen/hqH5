import store from "@/store"
let baseUrl = "/Logistics"
import Cookie from 'vue-cookies'
export default function () {
  return {
    async get(
      url,
      data,
      header = {
        "content-type": "application/json;charset=UTF-8"
      }
    ) {
      if (!url) {
        return false
      }
      header.Authorization = "Bearer " + store.state.vuex_token
      return new Promise((resolve, reject) => {
        uni.request({
          url: url, //仅为示例，并非真实接口地址。
          data: data,
          method: "GET",
          header: header,
          success: e => {
            resolve(e)
          },
          fail: res => {
            reject(res)
            uni.showToast({
              title: "网络请求失败",
              icon: "none"
            })
          },
          complete: res => {
            // uni.hideLoading();
          }
        })
      })
    },
    async post(
      url,
      data,
      header = {
        "content-type": "application/json;charset=UTF-8"
      }
    ) {
      header.Authorization = "Bearer " + store.state.vuex_token
      var xsrf_token = Cookie.get("XSRF-TOKEN");
      if (xsrf_token) {
        header["X-XSRF-TOKEN"] = xsrf_token;
      }
      return new Promise((resolve, reject) => {
        uni.request({
          url: url,
          data: data,
          method: "POST",
          header: header,
          success: e => {
            resolve(e)
          },
          fail: res => {
            reject(res)
            uni.showToast({
              title: "网络请求失败",
              icon: "none"
            })
          },
          complete: res => {
            if(res.statusCode==403){
              uni.showToast({
                title: res.data.error.message,
                icon: "none"
              })
            }
            console.log(res)
            // uni.hideLoading();
          }
        })
      })
    },
    async put(
      url,
      data,
      header = {
        "content-type": "application/json;charset=UTF-8"
      }
    ) {
      header.Authorization = "Bearer " + store.state.vuex_token
      var xsrf_token = Cookie.get("XSRF-TOKEN");
      if (xsrf_token) {
        header["X-XSRF-TOKEN"] = xsrf_token;
      }
      return new Promise((resolve, reject) => {
        uni.request({
          url: url,
          data: data,
          method: "PUT",
          header: header,
          success: e => {
            resolve(e)
          },
          fail: res => {
            reject(res)
            uni.showToast({
              title: "网络请求失败",
              icon: "none"
            })
          },
          complete: res => {
            // uni.hideLoading();
          }
        })
      })
    }
  }
}
// export default {
//     install
// }