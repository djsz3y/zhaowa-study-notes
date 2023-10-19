export default {
  Z_ACTION({ commit }, input) {
    setTimeout(() => {
      commit('ZMUTATION', input)
    }, 500)
  }
}
