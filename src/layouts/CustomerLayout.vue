<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar />
    <div class="min-h-screen m-8">
        <slot></slot>
    </div>
    <Footer />
</template>

<style scoped>

</style>