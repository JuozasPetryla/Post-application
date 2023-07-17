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
        postsLength: 0,
        pages: 1,
        currentPage: 1,
        editId: 0,
        deleteId: 0,
        searchTerm: '',
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
        setInfoModalText: (state, infoModalText) => state.infoModalText = infoModalText,
        setInfoModalTitle: (state, infoModalTitle) => state.infoModalTitle = infoModalTitle,
        setInfoModalMode: (state, infoModalMode) => state.infoModalMode = infoModalMode,
        setPages: (state) => state.pages = Math.ceil(state.postsLength / 4),
        setCurrentPage: (state, curPage) => state.currentPage = curPage,
        setEditId: (state, editId) => state.editId = editId,
        setDeleteId: (state, deleteId) => state.deleteId = deleteId,
        setSearchTerm: (state, searchTerm) => state.searchTerm = searchTerm,
        setPostsLength: (state, length) => state.postsLength = length
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
        pages: state => state.pages,
        editId: state => state.editId,
        deleteId: state => state.deleteId,
        curPage: state => state.currentPage,
        searchTerm: state => state.searchTerm,
        postsLength: state => state.postsLength
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
        async getPosts({ commit, state }) {
            try {
                const response = await axios.get(`http://localhost:3000/posts?_page=${state.currentPage}&_limit=4`)
                commit('setPosts', response)
            } catch (err) {
                router.push({ name: 'error' })
            }
        },
        async getSearchedPosts({ commit, state }) {
            try {
                const response = await axios.get(`http://localhost:3000/posts?q=${state.searchTerm}`)
                commit('setPosts', response)
            } catch (err) {
                router.push({ name: 'error' })
            }
        },
        async getAllPosts({ commit }) {
            try {
                const response = await axios.get(`http://localhost:3000/posts`)
                const postsArrayLength = response.data.length
                commit('setPostsLength', postsArrayLength)
            } catch (err) {
                router.push({ name: 'error' })
            }
        },
        async getCurrentPost({ commit }, postId) {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId ? postId : router.currentRoute.params.id}`)
                commit('setCurrentPostDetail', response.data)
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
            const newObj = postEditedObj
            const newObjId = postEditedObj.id
            try {
                const response = await axios.patch(`http://localhost:3000/posts/${newObjId}`, {
                    ...newObj
                })
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
        getEditId({ commit }, editId) {
            commit('setEditId', editId)
        },
        getDeleteId({ commit }, deleteId) {
            commit('setDeleteId', deleteId)
        },
        getCurrentPage({ commit }, curPage) {
            commit('setCurrentPage', curPage)
        },
        getSearchTerm({ commit }, searchTerm) {
            commit('setSearchTerm', searchTerm)
        },
        getPages({ commit }) {
            commit('setPages')
        }
    }
})
export default store;
