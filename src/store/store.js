import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        authors: [],
        posts: [],
        postDetailId: 0,
        currentPostDetail: {},
        createModalIsOpen: false,
        formMode: '',
    },
    mutations: {
        setAuthors: (state, gotAuthors) => state.authors = gotAuthors,
        setPosts: (state, gotPosts) => {
            state.posts = gotPosts
        },
        setPostDetailId: (state, postId) => state.postDetailId = postId,
        setCurrentPostDetail: (state) => {
            const currentPost = state.posts.data.find(post => post.id === state.postDetailId)
            state.currentPostDetail = currentPost
        },
        setModalOpen: (state) => state.createModalIsOpen = true,
        setModalClosed: (state) => state.createModalIsOpen = false,
        setFormMode: (state,mode) => state.formMode = mode
    },
    getters: {
        authors: (state) => state.authors,
        posts: (state) => state.posts,
        postDetailId: state => state.postDetailId,
        currentPostDetail: state => state.currentPostDetail,
        createModalIsOpen: state => state.createModalIsOpen,
        formMode: state => state.formMode,
    },
    actions: {
        async getAuthors({ commit }) {
            const response = await axios.get('http://localhost:3000/authors')
            commit('setAuthors', response)
        },
        async getPosts({ commit }) {
            const response = await axios.get('http://localhost:3000/posts')
            commit('setPosts', response)
        },
        getPostDetailId({ commit }, postId) {
            commit('setPostDetailId', postId)
        },
        updatePost({ commit }) {
            commit('setCurrentPostDetail')
        },
        openModal({ commit }) {
            commit('setModalOpen')
        },
        closeModal({ commit }) {
            commit('setModalClosed')
        },
        selectFormMode({commit},mode) {
            commit('setFormMode', mode)
        }
    }

})


export default store

