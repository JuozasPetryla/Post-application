<template>
  <div class="overlay">
    <dialog open>
      <header>
        <slot name="header"></slot>
      </header>

      <form
        @submit.prevent="
          formSubmit();
          validateForm();
        "
      >
        <div class="form-control">
          <label for="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            v-model="title"
            :class="{ invalid: !titleIsValid }"
            @blur="validateTitle"
            @input="validateTitle"
          />
          <p v-if="!titleIsValid">Please enter a title</p>
        </div>
        <div class="form-control" v-if="formMode === 'create'">
          <label for="author">Author:</label>
          <select
            name="author"
            id="author"
            v-model="authorObj"
            :class="{ invalid: !authorIsValid }"
            @blur="validateAuthor"
          >
            <option value="">Select author</option>
            <option
              v-for="author in authors.data"
              :key="author.id"
              :value="{ name: author.name, id: author.id }"
            >
              {{ author.name }}
            </option>
          </select>
          <p v-if="!authorIsValid">Please select an author</p>
        </div>
        <div class="form-control">
          <label for="content">Content:</label>
          <textarea
            name="content"
            id="content"
            rows="5"
            v-model="content"
            :class="{ invalid: !contentIsValid }"
            @blur="validateContent"
            @input="validateContent"
          ></textarea>
          <p v-if="!contentIsValid">Content must be atleast 10 characters</p>
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
      authorObj: {},
      titleIsValid: true,
      authorIsValid: true,
      contentIsValid: true,
      formIsValid: false,
    };
  },
  methods: {
    ...mapActions(["closeModal", "createNewPost", "editPost"]),
    formSubmit() {
      if (!this.formIsValid) return;
      if (this.formMode === "create") {
        this.createNewPost({
          title: this.title,
          body: this.content,
          authorId: this.authorObj.id,
          created_at: new Date().toISOString().slice(0, 10),
          updated_at: new Date().toISOString().slice(0, 10),
        });
      }
      if (this.formMode === "edit") {
        this.editPost({
          title: this.title,
          body: this.content,
          id: this.editId,
          updated_at: new Date().toISOString().slice(0, 10),
        });
      }
      this.closeModal();
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push("/");
      }
    },
    validateForm() {
      this.validateTitle();
      this.validateAuthor();
      this.validateContent();
      if (this.titleIsValid && this.authorIsValid && this.contentIsValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validateTitle() {
      if (this.title) {
        this.titleIsValid = true;
      } else {
        this.titleIsValid = false;
      }
    },
    validateAuthor() {
      if (this.authorObj) {
        this.authorIsValid = true;
      } else {
        this.authorIsValid = false;
      }
    },
    validateContent() {
      if (this.content.length > 10) {
        this.contentIsValid = true;
      } else {
        this.contentIsValid = false;
      }
    },
  },
  computed: {
    ...mapGetters(["authors", "formMode", "postDetailId", "editId"]),
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

.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #000000da;
}

dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 25%;
  width: 27.5rem;
  height: 20rem;
  z-index: 1;
  padding: 0;
  border: none;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 18rem;
  justify-content: center;
  gap: 1.2rem;
}

.form-control {
  display: flex;
  justify-content: space-between;
  text-align: start;
  width: 100%;
  position: relative;
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

.invalid {
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.062);
}
p {
  position: absolute;
  color: red;
  top: 100%;
  right: 0;
}
</style>
