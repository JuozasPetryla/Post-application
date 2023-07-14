<template>
  <dialog open>
    <header>
      <slot name="title"></slot>
    </header>
    <p>
      <slot name="information"></slot>
    </p>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </dialog>
</template>

<script>
export default {};
</script>

<style scoped>
dialog {
  position: absolute;
  border: none;
  z-index: 1;
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.3);
  top: 35%;
  padding: 0;
  padding: 0.6rem;
  width: 60%;
}
header {
  background-color: #123d94;
  color: white;
  font-size: 2rem;
  text-align: center;
}

p {
  margin-top: 1.2rem;
  font-size: 1.2rem;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}
</style>