const state = {
    postsLength: 0,
    pages: 1,
    currentPage: 1,
}

const mutations = {
    setPages: (state) => state.pages = Math.ceil(state.postsLength / 4),
    setCurrentPage: (state, curPage) => state.currentPage = curPage,
    setPostsLength: (state, length) => state.postsLength = length
}
const getters = {
    pages: state => state.pages,
    curPage: state => state.currentPage,
    postsLength: state => state.postsLength

}
const actions = {
    async getAllPosts({ commit }) {
        try {
            const postsArrayLength = await this.getAllPosts()
            commit('setPostsLength', postsArrayLength)
        } catch (err) {
            commit('setErrorMessage', err.message, { root: true })
            router.push({ name: 'error' })
        }
    },
    getCurrentPage({ commit }, curPage) {
        commit('setCurrentPage', curPage)
    },
    getPages({ commit }) {
        commit('setPages')
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}