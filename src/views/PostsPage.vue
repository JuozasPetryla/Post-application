<template>
  <section class="articles-container">
    <ArticleCard
      v-for="post in posts.data"
      :author="post.authorId"
      :key="post.id"
      :title="post.title"
      :date="post.created_at"
      :id="post.id"
      @clickCard="getPostId(post.id)"
    />
  </section>
</template>

<script>
import ArticleCard from "../components/article/ArticleCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ArticleCard,
  },
  computed: {
    ...mapGetters(["posts", "authors"]),
  },
  methods: {
    ...mapActions(["getPosts", "getAuthors", "getPostDetailId", "updatePost"]),
    getPostId(id) {
      this.getPostDetailId(id);
      this.updatePost();
      this.$router.push(`/postDetail/${id}`);
    },
  },
  created() {
    this.getPosts();
    this.getAuthors();
  },
  updated() {
    this.getAuthors();
    this.getPosts();
  },
};
</script>

<style scoped>
.articles-container {
  display: flex;
  margin-top: 1.2rem;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
