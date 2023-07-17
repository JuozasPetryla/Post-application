<template>
  <input
    @input="getSearchTerm(searchTerms)"
    type="text"
    placeholder="search"
    v-model="searchTerms"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchTerms: "",
    };
  },

  computed: {
    ...mapGetters(["searchTerm"]),
  },
  methods: {
    ...mapActions(["getSearchTerm"]),
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