import '@babel/polyfill'
import Vue from 'vue'

import './plugins/vuetify'

//import Vuetify from 'vuetify'
//Vue.use(Vuetify);
//import 'vuetify/src/stylus/app.styl'

import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: '',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

});
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App)

}).$mount('#app')
