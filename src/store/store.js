import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        authors: [],
        posts: [],
        postDetailId: 0,
        currentPostDetail: {}
    },
    mutations: {
        setAuthorsAndPosts: (state, [gotAuthors, gotPosts]) => {
            const updatedPosts = gotPosts.data.map(post => {
                return {
                    ...post,
                    author: gotAuthors.data.find(author => author.id === post.authorId).name
                }
            })
            state.posts = updatedPosts
            state.authors = gotAuthors
        },
        setPostDetailId: (state, postId) => state.postDetailId = postId,
        setCurrentPostDetail: (state) => {
            const currentPost = state.posts.find(post => post.id === state.postDetailId)
            state.currentPostDetail = currentPost
        }
    },
    getters: {
        authors: (state) => state.authors,
        posts: (state) => state.posts,
        postDetailId: state => state.postDetailId,
        currentPostDetail: state => state.currentPostDetail
    },
    actions: {
        async getAuthorsAndPosts({ commit }) {
            const responseAuthors = await axios.get('http://localhost:3000/authors')
            const responsePosts = await axios.get('http://localhost:3000/posts')

            commit('setAuthorsAndPosts', [responseAuthors, responsePosts])
        },
        getPostDetailId({ commit }, postId) {
            commit('setPostDetailId', postId)
        },
        updatePost({ commit }) {
            commit('setCurrentPostDetail')
        }
    }

})


export default store

