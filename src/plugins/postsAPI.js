import axios from "axios";

const postsAPI = store => {
    store.http = axios.create({ baseURL: SERVER_ADDR })

    store.getAuthors = async function () {
        const response = await this.http.get('/authors')
        return response.data
    }
    store.getPosts = async function (page) {
        const response = await this.http.get(`/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`)
        return response.data
    }
    store.getCurrentPost = async function (postId) {
        const response = await this.http.get(`/posts/${postId}`)
        return response.data
    }
    store.createNewPost = async function (postObj) {
        const response = await this.http.post('/posts', postObj)
        return response.data
    }

    store.editPost = async function (postEditedObj) {
        const newObj = postEditedObj
        const newObjId = postEditedObj.id
        const response = await this.http.patch(`/posts/${newObjId}`, {
            ...newObj
        })
        return response.data
    }
    store.deletePost = async function (postDeleteId) {
        const response = await this.http.delete(`/posts/${postDeleteId}`)
        return response.data
    }
    store.getAllPosts = async function () {
        const response = await this.http.get(`/posts`)
        const postsArrayLength = response.data.length
        return postsArrayLength
    }
    store.getSearchedPosts = async function (searchTerm, page) {
        const responseLength = await this.http.get(`/posts?q=${searchTerm}&`)
        const responseData = await this.http.get(`/posts?q=${searchTerm}&_page=${page}&_limit=${POSTS_PER_PAGE}`)
        return [responseLength.data.length, responseData.data]
    }
}

export default postsAPI