<template>
  <div>
    <dialog open>
      <header>
        <slot name="header"></slot>
      </header>
      <BaseCard class="dialog-card">
        <form @submit.prevent="formSubmit">
          <div class="form-control">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" v-model="title" />
          </div>
          <div class="form-control" v-if="formMode === 'create'">
            <label for="author">Author:</label>
            <select name="author" id="author" v-model="author">
              <option value="">Select author</option>
              <option
                v-for="author in authors.data"
                :key="author.id"
                :value="{ name: author.name, id: author.id }"
              >
                {{ author.name }}
              </option>
            </select>
          </div>
          <div class="form-control">
            <label for="content">Content:</label>
            <textarea
              name="content"
              id="content"
              rows="5"
              v-model="content"
            ></textarea>
          </div>
          <div class="form-buttons">
            <BaseButton type="submit">
              <slot name="button"> Submit </slot>
            </BaseButton>
            <BaseButton @click="closeModal" class="close-btn"
              >Close Modal</BaseButton
            >
          </div>
        </form>
      </BaseCard>
    </dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      author: {},
    };
  },
  methods: {
    ...mapActions(["closeModal", "createNewPost", "editPost"]),
    formSubmit() {
      if (this.formMode === "create") {
        this.createNewPost({
          title: this.title,
          body: this.content,
          authorId: this.author.id,
          created_at: new Date().toISOString().slice(0, 10),
          updated_at: new Date().toISOString().slice(0, 10),
        });
      }
      if (this.formMode === "edit") {
        this.editPost({
          title: this.title,
          body: this.content,
          id: this.postDetailId,
          authorId: this.author.id,
          updated_at: new Date().toISOString(),
        });
      }
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters(["authors", "formMode", "postDetailId"]),
  },
};
</script>

<style scoped>
header {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.2rem 0;
  width: 100%;
  background: #123d94;
}

dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
  width: 30rem;
  height: 35%;
  z-index: 1;
  border: none;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.dialog-card {
  margin-top: 1rem;
  height: 70%;
  width: 95%;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 0.4rem;
}

.form-control {
  display: flex;
  justify-content: space-between;
  text-align: start;
  width: 100%;
}
.form-control label {
  font-size: 1.2rem;
}

.form-control input,
.form-control select,
.form-control textarea {
  width: 10rem;
}

.form-control select {
  font-size: 1rem;
  padding: 2px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
