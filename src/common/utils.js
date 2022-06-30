// 通用utils方法
export const jsBridge = {
    invokeWithoutback: function(method, params) {
      const message = {
        module: 'JSCall',
        method: method,
        params: params
      }
      // eslint-disable-next-line no-undef
      ZjClientBridge.postMessage(JSON.stringify(message))
    },
    // 调用native
    invoke: function(method, params, callback) {
      const callID = Date.now()
      window[callID] = data => {
        callback(data)
      }
      const message = {
        module: 'JSCallNative',
        method: method,
        params: params,
        callId: callID
      }
      // eslint-disable-next-line no-undef
      ZjClientBridge.postMessage(JSON.stringify(message))
    }
  }