<template>
  <u-empty mode="page" style="    margin-top: 78%;" text="暂无消息" icon="http://cdn.uviewui.com/uview/empty/page.png" />
</template>
<script>
export default {
  data() {
    return {
      title: '555'
    }
  },
  onShow: function() {
    console.log(this.$u.vuex)
    uni.removeTabBarBadge({
      //隐藏数字标
      index: 2
    })
  }
}
</script>

