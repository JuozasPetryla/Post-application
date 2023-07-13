<template>
    <section class="articles-container">
        <ArticleCard v-for="post in posts" :author="post.author" :key="post.id" :title="post.title" :date="post.created_at" v-on:clickCard="getPostId(post.id)" />
    </section>
</template>

<script>
import ArticleCard from '../components/article/ArticleCard.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    components:{
        ArticleCard
    },
    computed: {
        ...mapGetters(['posts']),
        
    },
    methods: {
        ...mapActions(['getAuthorsAndPosts', 'getPostDetailId', 'updatePost']),
        getPostId(id) {
            this.getPostDetailId(id)
            this.updatePost()
            this.$router.push(`/postDetail/${id}`)
        }
    },
    created() {
        this.getAuthorsAndPosts()
    }
}
</script>

<style scoped>
.articles-container {
    display: flex;
    margin-top: 1.2rem;
    flex-direction: column;
    gap: 1.2rem;
}

</style>