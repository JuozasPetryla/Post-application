<template>
  <div id="app">
    <TheHeader />
    <BaseInfoDialog v-if="infoModalIsOpen">
      <template v-slot:title> {{ infoModalTitle }} </template>
      <template v-slot:information> {{ infoModalText }}</template>
      <template v-slot:actions>
        <BaseButton
          v-if="infoModalMode === 'delete'"
          @click="
            closeInfoModal();
            deletePost(deleteId);
            goBackToPosts();
          "
          >Delete</BaseButton
        >
        <BaseButton @click="closeInfoModal">Close</BaseButton>
      </template>
    </BaseInfoDialog>
    <RouterView></RouterView>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TheHeader,
  },
  computed: {
    ...mapGetters([
      "infoModalIsOpen",
      "infoModalText",
      "infoModalTitle",
      "infoModalMode",
      "deleteId",
    ]),
  },
  methods: {
    ...mapActions(["closeInfoModal", "deletePost", "getPosts", "getAuthors"]),
    goBackToPosts() {
      this.$store.commit("setInfoModalMode", "");
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push("/");
      }
    },
  },
  updated() {
    this.getPosts();
    this.getAuthors();
  },
};
</script>



