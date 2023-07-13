import Vue from "vue";
import VueRouter from "vue-router";

import PostsPage from '../views/PostsPage.vue'
import PostDetailPage from '../views/PostDetailPage.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: PostsPage },

    { path: '/postDetail/:id', component: PostDetailPage },
];

const router = new VueRouter({
    routes
});

export default router;