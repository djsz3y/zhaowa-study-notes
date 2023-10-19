<template>
  <div class="header">
    <p>{{headerTips}} {{input}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['headerTips', 'input']),
  },
  mounted() {
    this.Z_ACTION('zhaowa')
  },
  methods: {
    ...mapActions(['Z_ACTION']),
  },
}
</script>

<style lang="less">
.header {
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
}
</style>
