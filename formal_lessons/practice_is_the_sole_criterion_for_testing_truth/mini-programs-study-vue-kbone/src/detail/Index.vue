<template>
  <div class="cnt">
    <Header></Header>
    <button @click="onClickBack">回到上一页</button>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '../common/Header.vue'
import Footer from '../common/Footer.vue'

export default Vue.extend({
  name: 'Detail',
  components: {
    Header,
    Footer
  },
  created() {
  },
  methods: {
    onClickBack() {
      if (process.env.isMiniprogram) {
        wx.navigateBack()
      }
    },
  },
})
</script>

<style lang="less">
.cnt {
  margin-top: 20px;
}

a, button {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
}
</style>
