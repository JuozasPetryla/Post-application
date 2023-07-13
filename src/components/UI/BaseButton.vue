<template>
  <button class="base-button" v-on:click="triggerEvent">
    <slot></slot>
  </button>
</template>

<script>
export default {
    methods: {
        triggerEvent() {
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
.base-button {
    margin: 1rem;
    background: #123d94;
    height: 2.4rem;
    width: 6.4rem;
    border: none;
    color: white;
    font-size: 1.2rem;
    box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
}

.base-button:hover {
    cursor: pointer;
    transform: translateY(-3%);
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
}




</style>