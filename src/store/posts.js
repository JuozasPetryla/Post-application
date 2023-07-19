import router from "../router/router";

const state = {
    authors: [],
    posts: [],
    postDetailId: 0,
    currentPostDetail: {},
}

const mutations = {
    setAuthors: (state, gotAuthors) => state.authors = gotAuthors,
    setPosts: (state, gotPosts) => state.posts = gotPosts,
    setPostDetailId: (state, postId) => state.postDetailId = postId,
    setCurrentPostDetail: (state, currentPost) => state.currentPostDetail = currentPost,
    setNewPost: (state, postObj) => state.posts.unshift(postObj),

}
const getters = {
    authors: (state) => state.authors,
    posts: (state) => state.posts,
    postDetailId: state => state.postDetailId,
    currentPostDetail: state => state.currentPostDetail,
}
const actions = {
    async getAuthors({ commit }) {
        try {
            const authors = await this.getAuthors()
            commit('setAuthors', authors)
        } catch (err) {
            commit('setErrorMessage', err.message, { root: true })
            router.push({ name: 'error' })
        }
    },
    async getPosts({ commit, _, rootState }) {
        try {
            const posts = await this.getPosts(rootState.pagination.currentPage)
            commit('setPosts', posts)
        } catch (err) {
            commit('setErrorMessage', err.message, { root: true })
            router.push({ name: 'error' })
        }
    },
    async getCurrentPost({ commit }, postId) {
        const postCurrentId = postId ? postId : router.currentRoute.params.id
        try {
            const currentPosts = await this.getCurrentPost(postCurrentId)
            commit('setCurrentPostDetail', currentPosts)
        } catch (err) {
            commit('setErrorMessage', err.message, { root: true })
            router.push({ name: 'error' })
        }
    },
    async createNewPost({ commit }, postObj) {
        try {
            const newPost = await this.createNewPost(postObj)
            commit('setNewPost', newPost)
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
    getPostDetailId({ commit }, postId) {
        commit('setPostDetailId', postId)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}

