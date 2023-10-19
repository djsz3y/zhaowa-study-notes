<template>
  <div class="cnt">
    <Header></Header>
    <div>
      <a href="/test/list/321">当前页跳转</a>
      <a href="/test/detail/321" target="_blank">新开页跳转</a>
      <button @click="onClickJump">当前页脚本跳转</button>
      <button @click="onClickOpen">新开页脚本跳转</button>
    </div>
    <!-- vue-improve-loader -->
    <div check-reduce>
      <p>这段话不会出现在小程序里</p>
    </div>
    <!-- reduce-loader -->
    <Web>
      <p>这段话不会出现在小程序里</p>
    </Web>
    <!-- 样式隐藏 -->
    <div class="for-web">
      <p>这段话不会出现在小程序里</p>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '../common/Header.vue'
import Footer from '../common/Footer.vue'
import Web from 'reduce-loader!../common/Web.vue'
import 'reduce-loader!./web'

export default Vue.extend({
  name: 'Home',
  components: {
    Header,
    Footer,
    Web,
  },
  created() {
    // web侧无感知
    window.addEventListener('wxload', (query) => {
      console.log('page1 wxload', query)
    })
    window.addEventListener('wxshow', () => {
      console.log('page1 wxshow')
    })
    window.addEventListener('wxready', () => {
      console.log('page1 wxready')
    })
    window.addEventListener('wxhide', () => {
      console.log('page1 wxhide')
    })
    window.addEventListener('wxunload', () => {
      console.log('page1 wxunload')
    })
    if (process.env.isMiniprogram) {
      console.log('i am in miniprogram')
    } else {
      console.log('i am in web')
    }
  },
  methods: {
    onClickJump() {
      window.location.href = '/test/list/123'
    },
    onClickOpen() {
      window.open('/test/detail/123')
    }
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

.miniprogram-root {
  .for-web {
    display: none;
  }
}
</style>
