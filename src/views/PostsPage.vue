<template>
  <div>
    <ArticleCreateModal
      v-if="createModalIsOpen && formMode === 'create'"
    ></ArticleCreateModal>
    <ArticleEditModal
      v-if="createModalIsOpen && formMode === 'edit'"
    ></ArticleEditModal>
    <section class="articles-container">
      <TheSearchBar></TheSearchBar>
      <ThePagination></ThePagination>
      <ArticleCard
        v-for="post in posts.data"
        :author="authorName(post.authorId)"
        :key="post.id"
        :title="post.title"
        :date="
          post.created_at !== post.updated_at
            ? post.updated_at
            : post.created_at
        "
        :id="post.id"
        @clickCard="getPostId(post.id)"
      />
      <h2 v-if="postsLength === 0">There are no posts here</h2>
    </section>
  </div>
</template>

<script>
import ArticleCreateModal from "../components/article/ArticleCreateModal.vue";
import ArticleEditModal from "../components/article/ArticleEditModal.vue";
import ArticleCard from "../components/article/ArticleCard.vue";
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ArticleCard,
    ThePagination,
    ArticleCreateModal,
    ArticleEditModal,
    TheSearchBar,
  },
  computed: {
    ...mapGetters([
      "posts",
      "authors",
      "infoModalIsOpen",
      "pages",
      "formMode",
      "createModalIsOpen",
      "postsLength",
    ]),
  },
  watch: {
    "$store.state.currentPage": {
      deep: true,
      handler() {
        this.getPosts();
      },
    },
    "$store.state.searchTerm": {
      deep: true,
      handler() {
        this.getSearchedPosts();
      },
    },
  },
  methods: {
    ...mapActions([
      "getPosts",
      "getAuthors",
      "getPostDetailId",
      "closeInfoModal",
      "getCurrentPost",
      "getSearchedPosts",
      "getAllPosts",
      "getPages",
    ]),
    getPostId(id) {
      this.getPostDetailId(id);
      this.getCurrentPost(id);
      this.$router.push(`/postDetail/${id}`);
    },
    authorName(id) {
      if (!this.authors.data) return;
      const authorN = this.authors.data.find((author) => id === author.id).name;
      return authorN;
    },
  },
  created() {
    this.getPosts();
    this.getAuthors();
    this.getAllPosts();
  },
  updated() {
    this.getAllPosts();
    this.getPages();
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

h2 {
  text-align: center;
  font-size: 3.2rem;
}
</style>
