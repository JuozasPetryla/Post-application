<template>
  <div class="detail-container">
    <ArticleCreateModal
      v-if="createModalIsOpen && formMode === 'create'"
    ></ArticleCreateModal>
    <ArticleEditModal
      v-if="createModalIsOpen && formMode === 'edit'"
    ></ArticleEditModal>
    <BaseCard>
      <h1>{{ currentPostDetail.data.title }}</h1>
      <h2>{{ currentPostDetail.data.authorId }}</h2>
      <p>{{ currentPostDetail.data.body }}</p>
      <p>{{ currentPostDetail.data.created_at }}</p>
      <div>
        <BaseButton
          @click="
            openModal();
            selectFormMode('edit');
          "
          >Edit article</BaseButton
        >
        <BaseButton @click="openInfoModal">Delete Post</BaseButton>
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
    ]),
  },
  methods: {
    ...mapActions([
      "openModal",
      "selectFormMode",
      "openInfoModal",
      "getCurrentPost",
      "getAuthors",
    ]),
    goBackToPosts() {
      this.$router.push("/");
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
