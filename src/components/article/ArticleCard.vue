<template>
  <BaseCard class="article-card" v-on:click="triggerEvent">
    <h2>{{ author }}</h2>
    <h3>{{ title }}</h3>
    <p>{{ date }}</p>
  </BaseCard>
</template>

<script>
export default {
  props: ['author','title','date'],
  name: 'ArticleCard',
  methods: {
    triggerEvent() {
      this.$emit('clickCard')
    }
  }
  
};
</script>

<style scoped>
.article-card:hover,
.article-card:active {
    cursor: pointer;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
    transform: translateY(-3%);
}

.article-card:active {
  transform: translateY(0%);
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0,0,0,0.3);
}
</style>