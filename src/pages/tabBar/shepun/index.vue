<template>
  <web-view webview-styles="webviewStyles" :src="src"></web-view>

</template>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  beforeCreate() {},
  mounted() {
    window.location.href = `https://zhhq.zhejianglab.com/feedback/#/?accessToken=${this.$store.state.query_token ||
      localStorage.getItem('query_token')}`
  }
}
</script>

