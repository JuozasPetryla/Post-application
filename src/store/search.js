import router from "../router/router"
const state = {
    searchTerm: '',
}
const mutations = {
    setSearchTerm: (state, searchTerm) => state.searchTerm = searchTerm,
}
const getters = {
    searchTerm: state => state.searchTerm,

}
const actions = {
    async getSearchedPosts({ commit, state }) {
        try {
            const searchedPost = await this.getSearchedPosts(state.searchTerm)
            const searchPostsLength = searchedPost.length
            commit('setPosts', searchedPost, { root: true })
            commit('setPostsLength', searchPostsLength, { root: true })
        } catch (err) {
            commit('setErrorMessage', err.message, { root: true })
            router.push({ name: 'error' })
        }
    },
    getSearchTerm({ commit }, searchTerm) {
        commit('setSearchTerm', searchTerm)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}