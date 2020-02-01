import Vue from 'vue'
import { mapMutations } from 'vuex'
Vue.mixin({
  methods: {
    ...mapMutations({
      setNotifyMessage: 'setNotifyMessage'
    })
  }
})
