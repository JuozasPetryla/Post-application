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
    ]),
  },
  methods: {
    ...mapActions(["closeInfoModal"]),
  },
};
</script>



