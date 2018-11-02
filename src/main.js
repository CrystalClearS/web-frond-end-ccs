// import '@babel/polyfill'
import Vue from 'vue'

import './plugins/vuetify'
window.axios = require('axios');

require('./notifications');
require('./net');



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

Vue.config.productionTip = false;
axios.interceptors.response.use((response) => {
    if(response.data.status === 'error')
        return Promise.reject('undefined error');

    return response;

}, (error) => {
    debugger;
    let code = response.status;
    if(code === 401) {
        router.push('auth');
        return;
    }
    else if(code === 403) {
        if(!net.authRequest()){
            store.dispatch('setShowAuth', true);
            store.dispatch('setUser', undefined);
        }
    }
    else if(code === 404){

    }
    else if(code >= 500) {
        showError(`Server Error ${code}`, error.message)
    }
    return Promise.reject(error);

});



new Vue({
    router,
    store,
  render: h => h(App)

}).$mount('#app');
