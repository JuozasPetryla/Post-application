<template>
  <div>
    <ArticleCreateModal
      v-if="createModalIsOpen && formMode === 'create'"
    ></ArticleCreateModal>
    <ArticleEditModal
      v-if="createModalIsOpen && formMode === 'edit'"
    ></ArticleEditModal>
    <section class="articles-container">
      <ThePagination></ThePagination>
      <ArticleCard
        v-for="post in posts.data"
        :author="post.authorId"
        :key="post.id"
        :title="post.title"
        :date="post.created_at"
        :id="post.id"
        @clickCard="getPostId(post.id)"
        @clickDelete="getDeleteId(post.id)"
      />
    </section>
  </div>
</template>

<script>
import ArticleCreateModal from "../components/article/ArticleCreateModal.vue";
import ArticleEditModal from "../components/article/ArticleEditModal.vue";
import ArticleCard from "../components/article/ArticleCard.vue";
import { mapActions, mapGetters } from "vuex";
import ThePagination from "../components/layout/ThePagination.vue";
export default {
  components: {
    ArticleCard,
    ThePagination,
    ArticleCreateModal,
    ArticleEditModal,
  },
  computed: {
    ...mapGetters([
      "posts",
      "authors",
      "infoModalIsOpen",
      "pages",
      "formMode",
      "createModalIsOpen",
    ]),
  },
  methods: {
    ...mapActions([
      "getPosts",
      "getAuthors",
      "getPostDetailId",
      "closeInfoModal",
      "getCurrentPost",
    ]),
    getPostId(id) {
      this.getPostDetailId(id);
      this.$router.push(`/postDetail/${id}`);
      this.getCurrentPost(this.postDetailId);
    },
    getDeleteId(id) {
      this.$emit("clickDelete", id);
    },
  },
  created() {
    this.getPosts();
    this.getAuthors();
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
