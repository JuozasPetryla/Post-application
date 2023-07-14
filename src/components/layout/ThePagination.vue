<template>
  <div class="pagination">
    <button disabled class="active">{{ pages }}</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["posts", "pages"]),
  },
  methods: {
    ...mapActions(["getPosts", "getPageCount"]),
  },
  created() {
    this.getPosts();
    this.getPageCount();
  },
};
</script>

<style scoped>
.pagination {
  list-style: none;
  display: flex;
  gap: 1.2rem;
  padding: 0;
  margin: 0 auto;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6rem;
  width: 1.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  border: 4px solid #123d94;
}
.active {
  background: #123d94;
  color: white;
}

.active:hover,
.active:active {
  cursor: default;
}

button:hover,
button:active {
  cursor: pointer;
  background: #123d94;
  color: white;
}
</style>