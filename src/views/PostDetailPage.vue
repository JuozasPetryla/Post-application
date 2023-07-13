<template>
    <div class="detail-container">
        <BaseCard>
            <h1>{{ currentPostDetail.title }}</h1>
            <h2>{{ currentPostDetail.author }}</h2>
            <p>{{ currentPostDetail.body }}</p>
            <p>{{ currentPostDetail.created_at }}</p>
        </BaseCard>
        <BaseButton v-on:click="goBackToPosts">Go back</BaseButton>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    computed: {
        ...mapGetters(['currentPostDetail']),
    },
    methods: {
        goBackToPosts() {
            this.$router.push('/')
        }
    }



}</script>

<style scoped>
.detail-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>