<script setup>
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4">
        <div
            class="max-w-7xl mx-auto h-24 px-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-between shadow-lg">
            <img src="@/assets/images/seafood-tunu.png" alt="logo"
                class="w-28 hover:scale-105 transition-transform cursor-pointer">

            <div class="hidden md:flex gap-1">
                <template v-for="item in [
                    { name: 'Weekly Special', to: '#special' },
                    { name: 'Category', to: '#category' },
                    { name: 'Menu', to: '#menu' },
                    { name: 'About', to: '#about' },
                    { name: 'Testimonial', to: '#testimonial' },
                ]" :key="item.name">
                    <router-link :to="item.to"
                        class="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-orange-50 group"
                        active-class="text-orange-700 bg-orange-50/50">
                        {{ item.name }}
                        <span
                            class="absolute bottom-1.5 left-4 right-4 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </router-link>
                </template>
            </div>

            <div class="flex items-center gap-4">
                <router-link to="/login"
                    class="bg-orange-700 hover:bg-orange-800 text-white py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-orange-200">
                    Login
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.router-link-active {
    color: #c2410c;
    font-weight: 600;
}
</style>