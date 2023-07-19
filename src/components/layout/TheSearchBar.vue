<template>
  <input
    v-debounce:1s="search"
    type="text"
    placeholder="search"
    v-model="searchTerms"
  />
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchTerms: "",
    };
  },
  methods: {
    ...mapActions(["getSearchTerm", "getPages", "getCurrentPage"]),
    search() {
      this.getSearchTerm(this.searchTerms);
    },
  },
  updated() {
    setTimeout(() => this.getCurrentPage(), 1000);
  },
};
</script>

<style scoped>
input {
  margin: 0 auto;
  font-size: 1.2rem;
  height: 2.4rem;
  width: 80%;
}
</style>