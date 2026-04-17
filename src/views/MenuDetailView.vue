<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

const route = useRoute()
const router = useRouter()

const menu = ref(null)

const fetchMenuDetail = (id) => {
    const allMenus = [
        {
            id: 1, title: 'Gurame Bakar Madu', price: 65000, category: 'Ikan',
            imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=1200&auto=format&fit=crop',
            description: 'Gurame segar berukuran besar yang dibakar dengan olesan madu murni dan rempah pilihan. Disajikan dengan sambal kecap dan lalapan segar.',
            tastes: ['manis', 'gurih']
        },
        {
            id: 2, title: 'Udang Saus Padang', price: 55000, category: 'Kerang',
            imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop',
            description: 'Udang laut pilihan yang dimasak dengan saus padang kental yang kaya akan rempah. Tingkat kepedasan pas untuk menggugah selera.',
            tastes: ['pedas', 'asam', 'gurih']
        },
    ]

    const found = allMenus.find(m => m.id.toString() === id.toString())
    menu.value = found || null
}

onMounted(() => {
    fetchMenuDetail(route.params.id)
})

const formattedPrice = computed(() => {
    if (!menu.value) return 0
    return new Intl.NumberFormat('id-ID').format(menu.value.price)
})

const getTasteColor = (taste) => {
    const map = {
        'pedas': 'bg-red-100 text-red-700 border border-red-200',
        'manis': 'bg-amber-100 text-amber-800 border border-amber-200',
        'asin': 'bg-blue-100 text-blue-700 border border-blue-200',
        'gurih': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        'asam': 'bg-lime-100 text-lime-800 border border-lime-200',
    }
    return map[taste.toLowerCase()] || 'bg-gray-100 text-gray-600 border border-gray-200'
}
</script>

<template>
    <CustomerLayout class="bg-[#FFFDF9] font-sans text-orange-900 min-h-screen">
        <div class="max-w-6xl mx-auto px-4 py-12 md:py-28">

            <button @click="router.back()"
                class="flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium mb-8 transition-colors group">
                <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                Kembali ke Menu
            </button>

            <div v-if="menu"
                class="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 flex flex-col md:flex-row">

                <div class="w-full md:w-1/2 md:max-w-125 bg-orange-50">
                    <img :src="menu.imageUrl" :alt="menu.title"
                        class="w-full h-full object-cover aspect-square md:aspect-auto" />
                </div>

                <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <span class="uppercase tracking-widest text-sm font-bold text-orange-500 mb-2 block">
                        {{ menu.category }}
                    </span>
                    <h1 class="text-4xl md:text-5xl font-black text-orange-900 mb-4 leading-tight">
                        {{ menu.title }}
                    </h1>
                    <div class="text-3xl font-extrabold text-orange-600 mb-6">
                        Rp. {{ formattedPrice }}
                    </div>
                    <div v-if="menu.tastes && menu.tastes.length > 0" class="flex flex-wrap gap-2 mb-8">
                        <span v-for="taste in menu.tastes" :key="taste"
                            :class="[getTasteColor(taste), 'px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-wider']">
                            {{ taste }}
                        </span>
                    </div>
                    <div class="prose prose-orange">
                        <p class="text-lg text-gray-600 leading-relaxed mb-10">
                            {{ menu.description }}
                        </p>
                    </div>
                    <div class="mt-auto">
                        <button
                            class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            Pesan Sekarang
                        </button>
                        <p class="text-center text-sm text-gray-400 mt-4">
                            *Harga belum termasuk PPN 10%
                        </p>
                    </div>
                </div>
            </div>
            <div v-else class="text-center py-20">
                <h2 class="text-3xl font-bold text-gray-400 mb-4">Menu tidak ditemukan</h2>
                <p class="text-gray-500">Mungkin menu ini sudah dihapus atau linknya salah.</p>
            </div>
        </div>
    </CustomerLayout>
</template>