<template>
  <div>
    <component
      v-if="createModalIsOpen"
      :is="dialog"
      class="modal-dynamic-component"
    ></component>
    <section class="articles-container">
      <TheSearchBar></TheSearchBar>
      <ThePagination v-if="postsLength !== 0"></ThePagination>
      <ArticleCard
        v-for="post in searchTerm ? searchedPosts : posts"
        :author="authors.find((author) => author.id === post.authorId)?.name"
        :key="post.id"
        :title="post.title"
        :date="
          post.created_at !== post.updated_at
            ? post.updated_at
            : post.created_at
        "
        :id="post.id"
        @clickCard="getPostId(post.id)"
        class="article-card"
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
      "formMode",
      "createModalIsOpen",
      "postsLength",
      "searchTerm",
      "searchedPosts",
    ]),
    dialog() {
      if (this.formMode === "create") {
        return ArticleCreateModal;
      }
      if (this.formMode === "edit") {
        return ArticleEditModal;
      }
    },
  },
  watch: {
    "$store.state.pagination.currentPage": {
      deep: true,
      handler() {
        if (!this.searchTerm) {
          this.getPosts();
        } else {
          this.getSearchedPosts();
        }
      },
    },
    "$store.state.search.searchTerm": {
      deep: true,
      handler() {
        this.getSearchedPosts();
        this.getPages();
      },
    },
    "$store.state.pagination.postsLength": {
      deep: true,
      handler() {
        this.getPages();
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
  },
  created() {
    this.getPosts();
    this.getAuthors();
  },
  updated() {
    if (!this.searchTerm) {
      this.getAllPosts();
    }
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
