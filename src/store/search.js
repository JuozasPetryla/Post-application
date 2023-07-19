import router from "../router/router"
const state = {
    searchTerm: '',
    searchedPosts: [],
}
const mutations = {
    setSearchTerm: (state, searchTerm) => state.searchTerm = searchTerm,
    setSearchedPosts: (state, searchedPosts) => state.searchedPosts = searchedPosts
}
const getters = {
    searchTerm: state => state.searchTerm,
    searchedPosts: (state) => state.searchedPosts

}
const actions = {
    async getSearchedPosts({ commit, state, rootState }) {
        try {
            const [searchedPostsLength, searchedPosts] = await this.getSearchedPosts(state.searchTerm, rootState.pagination.currentPage)
            commit('setPostsLength', searchedPostsLength, { root: true })
            commit('setPages', { root: true })
            commit('setSearchedPosts', searchedPosts)
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