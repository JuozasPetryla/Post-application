import Vuex from "vuex";
import Vue from "vue";

import posts from "./posts";
import pagination from "./pagination";
import search from "./search";
import postActions from "./postActions";
import infoModal from "./infoModal";
import form from "./form";
import postsAPI from "../plugins/postsAPI";


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        errorMessage: ''
    },
    mutations: {
        setErrorMessage: (state, errorMessage) => state.errorMessage = errorMessage
    },
    getters: {
        errorMessage: state => state.errorMessage
    },
    modules: {
        posts,
        pagination,
        search,
        postActions,
        infoModal,
        form
    }
})
postsAPI(store)

export default store;
