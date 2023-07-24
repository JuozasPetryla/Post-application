import Vue from 'vue';
import App from './App.vue';
import vueDebounce from 'vue-debounce'
import router from './router/router';
import store from './store/store';

import './main.css'

import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseDialog from './components/UI/BaseDialog.vue'
import BaseInfoDialog from './components/UI/BaseInfoDialog.vue'

Vue.component('BaseCard', BaseCard)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseDialog', BaseDialog)
Vue.component('BaseInfoDialog', BaseInfoDialog)

Vue.use(vueDebounce)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
