import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "../router/router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authors: [],
        posts: [],
        postDetailId: 0,
        currentPostDetail: {},
        createModalIsOpen: false,
        formMode: '',
        infoModalIsOpen: false,
        infoModalText: '',
        infoModalTitle: '',
        infoModalMode: '',
        pages: 1,
    },
    mutations: {
        setAuthors: (state, gotAuthors) => state.authors = gotAuthors,
        setPosts: (state, gotPosts) => state.posts = gotPosts,
        setPostDetailId: (state, postId) => state.postDetailId = postId,
        setCurrentPostDetail: (state, currentPost) => state.currentPostDetail = currentPost,
        setModalOpen: (state) => state.createModalIsOpen = true,
        setModalClosed: (state) => state.createModalIsOpen = false,
        setInfoModalOpen: (state) => state.infoModalIsOpen = true,
        setInfoModalClosed: (state) => state.infoModalIsOpen = false,
        setFormMode: (state, mode) => state.formMode = mode,
        setNewPost: (state, postObj) => state.posts.data.unshift(postObj),
        editPost: (state, postEditedObj) => {
            const postsArray = state.posts.data
            console.log(postsArray)
            const objectToEdit = postsArray.find(post => post.title === postEditedObj.title)
            const editedObject = { ...objectToEdit, ...postEditedObj }
            console.log(objectToEdit)
            console.log(editedObject)
        },
        deletePost: (state, postDeleteId) => {
            state.posts.data.filter(post => post.id !== postDeleteId)
        },
        setInfoModalText: (state, infoModalText) => state.infoModalText = infoModalText,
        setInfoModalTitle: (state, infoModalTitle) => state.infoModalTitle = infoModalTitle,
        setInfoModalMode: (state, infoModalMode) => state.infoModalMode = infoModalMode,
        setPages: (state, pagesNum) => state.pages = pagesNum

    },
    getters: {
        authors: (state) => state.authors,
        posts: (state) => state.posts,
        postDetailId: state => state.postDetailId,
        currentPostDetail: state => state.currentPostDetail,
        createModalIsOpen: state => state.createModalIsOpen,
        formMode: state => state.formMode,
        infoModalIsOpen: state => state.infoModalIsOpen,
        infoModalText: state => state.infoModalText,
        infoModalTitle: state => state.infoModalTitle,
        infoModalMode: state => state.infoModalMode,
        pages: state => state.pages
    },
    actions: {
        async getAuthors({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/authors')
                commit('setAuthors', response)
            } catch (err) {
                console.log(router)
                router.push({ name: 'error' })
            }
        },
        async getPosts({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/posts?_page=1&_limit=20')
                commit('setPosts', response)
            } catch (err) {
                router.push({ name: 'error' })
            }
        },
        async getCurrentPost({ commit }, postId) {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId ? postId : router.currentRoute.params.id}`)
                commit('setCurrentPostDetail', response)
            } catch (err) {
                router.push({ name: 'error' })
            }
        },
        async createNewPost({ commit }, postObj) {
            try {
                const response = await axios.post('http://localhost:3000/posts', postObj)
                commit('setNewPost', response.data)
                commit('setInfoModalText', 'Post created succesfully!')
                commit('setInfoModalTitle', 'Success')
                commit('setInfoModalOpen')
            } catch (err) {
                commit('setInfoModalText', err.message)
                commit('setInfoModalTitle', 'An error has occured')
                commit('setInfoModalMode', 'error')
                commit('setInfoModalOpen')
            }
        },
        async editPost({ commit }, postEditedObj) {
            try {
                const response = await axios.post("http://localhost:3000/posts", postEditedObj)
                commit('editPost', response.data)
                commit('setInfoModalText', 'Post edited succesfully!')
                commit('setInfoModalTitle', 'Success')
                commit('setInfoModalOpen')
            } catch (err) {
                commit('setInfoModalText', err.message)
                commit('setInfoModalTitle', 'An error has occured')
                commit('setInfoModalMode', 'error')
                commit('setInfoModalOpen')
            }
        },
        async deletePost({ commit }, postDeleteId) {
            try {
                const response = await axios.delete(`http://localhost:3000/posts/${postDeleteId}`)
                commit('deletePost', response.data)
            } catch (err) {
                commit('setInfoModalText', err.message)
                commit('setInfoModalTitle', 'An error has occured')
                commit('setInfoModalMode', 'error')
                commit('setInfoModalOpen')
            }
        },
        getPostDetailId({ commit }, postId) {
            commit('setPostDetailId', postId)
        },
        openModal({ commit }) {
            commit('setModalOpen')
        },
        closeModal({ commit }) {
            commit('setModalClosed')
        },
        openInfoModal({ commit }) {
            commit('setInfoModalText', 'Are you sure you want to delete this post?')
            commit('setInfoModalTitle', 'Delete post')
            commit('setInfoModalMode', 'delete')
            commit('setInfoModalOpen')
        },
        closeInfoModal({ commit }) {
            commit('setInfoModalClosed')
        },
        selectFormMode({ commit }, mode) {
            commit('setFormMode', mode)
        },
        getPageCount({ commit }, pageNum) {
            commit('setPages', pageNum)
        }
    }
})
export default store;
