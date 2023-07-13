<template>
  <header class="header">
    <p>
        Post application
    </p>
    <button>
        New article
    </button>
  </header>
</template>

<script>
export default {
    
}
</script >

<style scoped>

.header {
    background-color: #123d94;
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0 3.2rem;
}

p {
    margin: 0;
    font-size: 1.2rem;
    color: white;
    padding: 0.6rem;
}

button {
    font-size: 1.2rem;
    border: none;
    background-color: inherit;
    color: white;
    transition: all 0.3s ease;
}

button:hover,
button:active {
    cursor: pointer;
    color: rgb(180, 176, 176);
}



</style>