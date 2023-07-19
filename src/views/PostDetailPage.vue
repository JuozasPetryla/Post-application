<template>
  <div class="detail-container">
    <component v-if="createModalIsOpen" :is="dialog"></component>
    <BaseCard>
      <h1>{{ currentPostDetail.title }}</h1>
      <h2>
        {{
          authors.find((author) => author.id === currentPostDetail.authorId)
            ?.name
        }}
      </h2>
      <p>{{ currentPostDetail.body }}</p>
      <p>
        {{
          currentPostDetail.updated_at !== currentPostDetail.created_at
            ? currentPostDetail.updated_at
            : currentPostDetail.created_at
        }}
      </p>
      <div>
        <BaseButton
          @click="
            openModal();
            selectFormMode('edit');
            getEditId(currentPostDetail.id);
          "
          >Edit article</BaseButton
        >
        <BaseButton
          @click="
            openInfoModal();
            getDeleteId(currentPostDetail.id);
          "
          >Delete Post</BaseButton
        >
      </div>
    </BaseCard>
    <BaseButton v-on:click="goBackToPosts">Go back</BaseButton>
  </div>
</template>

<script>
import ArticleCreateModal from "../components/article/ArticleCreateModal.vue";
import ArticleEditModal from "../components/article/ArticleEditModal.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ArticleCreateModal,
    ArticleEditModal,
  },
  computed: {
    ...mapGetters([
      "currentPostDetail",
      "postDetailId",
      "formMode",
      "createModalIsOpen",
      "deleteId",
      "authors",
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
  methods: {
    ...mapActions([
      "openModal",
      "selectFormMode",
      "openInfoModal",
      "getCurrentPost",
      "getAuthors",
      "getDeleteId",
      "getEditId",
    ]),
    goBackToPosts() {
      this.$router.push("/");
    },
  },
  watch: {
    "$store.state.posts.posts": {
      deep: true,
      handler() {
        this.getCurrentPost(this.postDetailId);
      },
    },
  },
  created() {
    this.getCurrentPost(this.postDetailId);
    this.getAuthors();
  },
};
</script>

<style scoped>
.detail-container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
