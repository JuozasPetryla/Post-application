<template>
  <div id="app">
    <TheHeader />
    <BaseInfoDialog v-if="infoModalIsOpen">
      <template v-slot:title> {{ infoModalTitle }} </template>
      <template v-slot:information> {{ infoModalText }}</template>
      <template v-slot:actions>
        <BaseButton v-if="infoModalMode === 'delete'" @click="closeInfoModal"
          >Delete</BaseButton
        >
        <BaseButton @click="closeInfoModal">Close</BaseButton>
      </template>
    </BaseInfoDialog>
  </div>
</template>

<script>
import ArticleCreateModal from "./components/article/ArticleCreateModal.vue";
import ArticleEditModal from "./components/article/ArticleEditModal.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  
  computed: {
    ...mapGetters([
      "createModalIsOpen",
      "formMode",
      "infoModalIsOpen",
      "infoModalText",
      "infoModalTitle",
      "infoModalMode",
    ]),
  },
  methods: {
    ...mapActions(["closeInfoModal"]),
  },
};
</script>



