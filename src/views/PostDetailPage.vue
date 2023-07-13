<template>
  <div class="detail-container">
    <BaseCard>
      <h1>{{ currentPostDetail.title }}</h1>
      <h2>{{ currentPostDetail.authorId }}</h2>
      <p>{{ currentPostDetail.body }}</p>
      <p>{{ currentPostDetail.created_at }}</p>
      <div>
        <BaseButton
          @click="
            openModal();
            selectFormMode('edit');
          "
          >Edit article</BaseButton
        >
        <BaseButton @click="deletePost(currentPostDetail.id)"
          >Delete Post</BaseButton
        >
      </div>
    </BaseCard>
    <BaseButton v-on:click="goBackToPosts">Go back</BaseButton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentPostDetail"]),
  },
  methods: {
    ...mapActions(["openModal", "selectFormMode", "deletePost"]),
    goBackToPosts() {
      this.$router.push("/");
    },
  },
  created() {},
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
