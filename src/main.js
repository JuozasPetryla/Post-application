import Vue from 'vue';
import App from './App.vue';

import router from './router/router';
import store from './store/store';

import './main.css'

import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseDialog from './components/UI/BaseDialog.vue'

Vue.component('BaseCard', BaseCard)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseDialog', BaseDialog)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
