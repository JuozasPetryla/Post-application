import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authors: [],
    posts: [],
    postDetailId: 0,
    currentPostDetail: {},
    createModalIsOpen: false,
    formMode: "",
  },
  mutations: {
    setAuthors: (state, gotAuthors) => (state.authors = gotAuthors),
    setPosts: (state, gotPosts) => (state.posts = gotPosts),
    setPostDetailId: (state, postId) => (state.postDetailId = postId),
    setCurrentPostDetail: (state) => {
      const currentPost = state.posts.data.find(
        (post) => post.id === state.postDetailId
      );
      state.currentPostDetail = currentPost;
    },
    setModalOpen: (state) => (state.createModalIsOpen = true),
    setModalClosed: (state) => (state.createModalIsOpen = false),
    setFormMode: (state, mode) => (state.formMode = mode),
    setNewPost: (state, postObj) => [postObj, ...state.posts.data],
    editPost: (state, postEditedObj) => {
      const objectToEditIndex = state.posts.data.findIndex(
        (post) => post.id === postEditedObj.id
      );
      state.posts[objectToEditIndex] = postEditedObj;
    },
    deletePost: (state, postDeleteId) => {
      state.posts.data.filter((post) => post.id !== postDeleteId);
      console.log(state.posts.data);
    },
  },
  getters: {
    authors: (state) => state.authors,
    posts: (state) => state.posts,
    postDetailId: (state) => state.postDetailId,
    currentPostDetail: (state) => state.currentPostDetail,
    createModalIsOpen: (state) => state.createModalIsOpen,
    formMode: (state) => state.formMode,
  },
  actions: {
    async getAuthors({ commit }) {
      const response = await axios.get("http://localhost:3000/authors");
      commit("setAuthors", response);
    },
    async getPosts({ commit }) {
      const response = await axios.get("http://localhost:3000/posts");
      commit("setPosts", response);
    },
    getPostDetailId({ commit }, postId) {
      commit("setPostDetailId", postId);
    },
    updatePost({ commit }) {
      commit("setCurrentPostDetail");
    },
    openModal({ commit }) {
      commit("setModalOpen");
    },
    closeModal({ commit }) {
      commit("setModalClosed");
    },
    selectFormMode({ commit }, mode) {
      commit("setFormMode", mode);
    },
    async createNewPost({ commit }, postObj) {
      const response = await axios.post("http://localhost:3000/posts", postObj);
      commit("setNewPost", response.data);
    },
    async editPost({ commit }, postEditedObj) {
      const response = await axios.patch(
        "http://localhost:3000/posts",
        postEditedObj
      );
      commit("editPost", response.data);
    },
    async deletePost({ commit }, postDeleteId) {
      const response = await axios.delete(
        `http://localhost:3000/posts/${postDeleteId}`
      );
      commit("deletePost", response.data);
    },
  },
});

export default store;
