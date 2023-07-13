<template>
  <div id="app">
    <TheHeader />
    <ArticleCreateModal
      v-if="createModalIsOpen && formMode === 'create'"
    ></ArticleCreateModal>
    <ArticleEditModal
      v-if="createModalIsOpen && formMode === 'edit'"
    ></ArticleEditModal>
    <RouterView></RouterView>
  </div>
</template>

<script>
import ArticleCreateModal from "./components/article/ArticleCreateModal.vue";
import ArticleEditModal from "./components/article/ArticleEditModal.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    TheHeader,
    ArticleCreateModal,
    ArticleEditModal,
  },
  computed: {
    ...mapGetters(["createModalIsOpen", "formMode"]),
  },
};
</script>



