<script setup>
const specialMenus = [
    '@/assets/images/seafood-tunu.png',
    '@/assets/images/seafood-tunu.png',
    '@/assets/images/seafood-tunu.png',
    '@/assets/images/seafood-tunu.png',
    '@/assets/images/seafood-tunu.png',
]
</script>

<template>
    <div class="relative flex overflow-hidden bg-orange-50 py-6 border-y border-orange-100/50 shadow-inner">
        <div class="animate-marquee flex whitespace-nowrap items-center">
            <template v-for="i in 2" :key="i">
                <div class="flex items-center gap-10 px-5">
                    <h1
                        class="text-4xl md:text-5xl font-extrabold uppercase tracking-wider bg-linear-to-r from-orange-700 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                        Weekly Special
                    </h1>
                    <div class="flex items-center gap-6">
                        <img v-for="(img, index) in specialMenus" :key="`menu-${i}-${index}`" :src="img"
                            alt="Special Menu"
                            class="w-64 aspect-video object-cover rounded-2xl shadow-md border-2 border-orange-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.animate-marquee {
    animation: scroll 25s linear infinite;
    width: max-content;
}

.animate-marquee:hover {
    animation-play-state: paused;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
</style>