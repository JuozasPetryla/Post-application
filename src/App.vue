<template>
  <div id="app">
    <TheHeader/>
    <RouterView></RouterView>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader
  }
};
</script>



