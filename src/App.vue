<template>
  <div id="app">
    <TheHeader />
    <ArticleCreateModal v-if="createModalIsOpen"></ArticleCreateModal>
    <RouterView></RouterView>
  </div>
</template>

<script>
import ArticleCreateModal from "./components/article/ArticleCreateModal.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    TheHeader,
    ArticleCreateModal,
  },
  computed: {
    ...mapGetters(["createModalIsOpen"]),
  },
};
</script>



