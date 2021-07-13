import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index';
import axios from 'axios';
import * as VueGoogleMaps from "vue2-google-maps";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api/v1/gateway/";
axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push({name: "Login"});
    }
  }
});

 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCumEqypUHb-bP2iwBgRVYbFo5ma6ksj4k',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
