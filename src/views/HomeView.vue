<script setup>
import { ref, computed } from 'vue'

import CustomerLayout from '@/layouts/CustomerLayout.vue'
import WeeklySpecial from '@/components/WeeklySpecial.vue'
import FoodCard from '@/components/FoodCard.vue'

const categoryImages = [
    { name: 'Ikan Bakar', img: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop' },
    { name: 'Kerang & Udang', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=600&auto=format&fit=crop' },
    { name: 'Cumi Tunu', img: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=600&auto=format&fit=crop' },
    { name: 'Minuman Segar', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop' }
]

const categories = ['Semua', 'Ikan', 'Kerang', 'Cumi', 'Minuman']
const activeCategory = ref('Semua')

const menuItems = ref([
    {
        id: 1,
        title: 'Gurame Bakar Madu',
        price: 65000,
        category: 'Ikan',
        imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=600&auto=format&fit=crop',
        description: 'Gurame segar berukuran besar yang dibakar dengan olesan madu murni dan rempah pilihan.',
        tastes: ['manis', 'gurih']
    },
    {
        id: 2,
        title: 'Udang Saus Padang',
        price: 55000,
        category: 'Kerang',
        imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=600&auto=format&fit=crop',
        description: 'Udang laut pilihan yang dimasak dengan saus padang kental yang kaya akan rempah.',
        tastes: ['pedas', 'asam', 'gurih']
    },
    {
        id: 3,
        title: 'Cumi Tunu Hitam',
        price: 45000,
        category: 'Cumi',
        imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=600&auto=format&fit=crop',
        description: 'Cumi utuh yang dibakar sempurna dengan marinasi bumbu hitam manis khas pesisir.',
        tastes: ['manis', 'asin']
    },
    {
        id: 4,
        title: 'Es Jeruk Kelapa',
        price: 15000,
        category: 'Minuman',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
        description: 'Perpaduan air jeruk peras murni dengan serutan kelapa muda segar penawar dahaga.',
        tastes: ['manis', 'asam']
    },
])

const filteredMenu = computed(() => {
    if (activeCategory.value === 'Semua') return menuItems.value
    return menuItems.value.filter(item => item.category === activeCategory.value)
})

const testimonials = [
    { id: 1, name: 'Budi S.', message: 'Bumbu bakarnya meresap sampai ke tulang! Wajib coba udang saus padangnya.' },
    { id: 2, name: 'Siti M.', message: 'Tempatnya cozy, pelayanannya cepat, dan seafoodnya bener-bener fresh.' },
    { id: 3, name: 'Rangga P.', message: 'Harga pas di kantong untuk porsi seafood sebesar ini. Bakal jadi langganan.' }
]
</script>

<template>
    <CustomerLayout class="bg-[#FFFDF9] font-sans text-orange-900">

        <section
            class="min-h-[75vh] pt-32 flex flex-col justify-center items-center text-center p-4 relative overflow-hidden">
            <h1
                class="text-[5rem] sm:text-[8rem] md:text-[12rem] font-black text-orange-600 leading-[0.85] tracking-tighter uppercase select-none">
                Seafood<br />
                <span class="text-orange-500">Tunu</span>
            </h1>
            <p class="mt-8 text-lg sm:text-xl font-medium tracking-wide text-orange-800/70 max-w-2xl">
                Cita Rasa Lautan, Dibakar dengan Sempurna. Buka 10:00 - 22:00.
            </p>
        </section>

        <section id="special" class="border-y-2 border-orange-200 bg-white">
            <WeeklySpecial />
        </section>

        <section id="category" class="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold text-center text-orange-600 mb-12 uppercase tracking-widest">
                Kategori
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div v-for="(cat, index) in categoryImages" :key="index"
                    class="relative group cursor-pointer overflow-hidden rounded-xl border border-orange-100 shadow-sm">
                    <img :src="cat.img" :alt="cat.name"
                        class="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute bottom-0 inset-x-0 bg-orange-600 p-3 text-center">
                        <span class="text-white font-bold uppercase tracking-wider text-sm sm:text-base">{{ cat.name
                        }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="menu" class="py-20 px-4 md:px-8 bg-orange-50/50">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-bold text-center text-orange-600 mb-10 uppercase tracking-widest">
                    Populer
                </h2>

                <div class="flex flex-wrap justify-center gap-3 mb-12">
                    <button v-for="category in categories" :key="category" @click="activeCategory = category"
                        class="px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 border-2"
                        :class="activeCategory === category
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-transparent text-orange-600 border-orange-300 hover:border-orange-600'">
                        {{ category }}
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
                    <FoodCard v-for="item in filteredMenu" :key="item.id" :id="item.id" :title="item.title"
                        :imageUrl="item.imageUrl" :description="item.description" :tastes="item.tastes"
                        :price="item.price" />
                </div>
            </div>
        </section>

        <section id="about" class="py-24 px-4 text-center max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold text-orange-600 mb-8 uppercase tracking-widest">
                Tentang Kami
            </h2>
            <p class="text-lg md:text-xl text-orange-900/80 leading-relaxed font-medium">
                Berawal dari kecintaan terhadap hasil laut Nusantara, Seafood Tunu hadir untuk menyajikan hidangan laut
                segar dengan bumbu rempah pilihan. Setiap tangkapan diproses dan dibakar dengan suhu yang presisi untuk
                menjaga tekstur juicy dan rasa manis alaminya.
            </p>
        </section>

        <section id="testimonial" class="py-20 px-4 md:px-8 bg-orange-600 text-orange-50">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-bold text-center mb-12 uppercase tracking-widest text-white">
                    Ulasan
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="testi in testimonials" :key="testi.id"
                        class="bg-orange-700/50 p-6 rounded-2xl backdrop-blur-sm border border-orange-500/50">
                        <div class="text-yellow-400 mb-3 text-xl">★★★★★</div>
                        <p class="italic mb-4 text-orange-50/90">"{{ testi.message }}"</p>
                        <p class="font-bold tracking-wide uppercase text-sm">- {{ testi.name }}</p>
                    </div>
                </div>
            </div>
        </section>
    </CustomerLayout>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}
</style>