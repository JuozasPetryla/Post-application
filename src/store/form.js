const state = {
    createModalIsOpen: false,
    formMode: '',
}

const mutations = {
    setModalOpen: (state) => state.createModalIsOpen = true,
    setModalClosed: (state) => state.createModalIsOpen = false,
    setFormMode: (state, mode) => state.formMode = mode,
}
const getters = {
    createModalIsOpen: state => state.createModalIsOpen,
    formMode: state => state.formMode,
}
const actions = {
    openModal({ commit }) {
        commit('setModalOpen')
    },
    closeModal({ commit }) {
        commit('setModalClosed')
    },
    selectFormMode({ commit }, mode) {
        commit('setFormMode', mode)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}