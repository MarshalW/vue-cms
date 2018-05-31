import Vue from 'vue'
import App from './App.vue'
import mock from './mock'

Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})

new Vue({
    render: h => h(App)
}).$mount('#app')


