<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
    imageUrl: {
        type: String,
        required: true,
        default: 'https://via.placeholder.com/300x200?text=No+Image'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    tastes: {
        type: Array,
        default: () => []
    },
    price: {
        type: Number,
        required: true
    },
});

const formattedPrice = computed(() => {
    return new Intl.NumberFormat('id-ID').format(props.price);
});

const getTasteColor = (taste) => {
    const map = {
        'pedas': 'bg-red-100 text-red-700 border-red-200',
        'manis': 'bg-amber-100 text-amber-800 border-amber-200',
        'asin': 'bg-blue-100 text-blue-700 border-blue-200',
        'gurih': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'asam': 'bg-lime-100 text-lime-800 border-lime-200',
    };
    return map[taste.toLowerCase()] || 'bg-gray-100 text-gray-600 border-gray-200';
};
</script>

<template>
    <div
        class="max-w-xs bg-[#FFFDF5] border border-orange-100 rounded-2xl shadow-sm overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

        <div class="relative aspect-4/3 overflow-hidden">
            <img :src="props.imageUrl" :alt="props.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>

        <div class="p-5 grow">
            <h3 class="text-xl font-bold text-orange-900 mb-2 group-hover:text-orange-700 transition-colors">
                {{ props.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {{ props.description }}
            </p>

            <div v-if="props.tastes.length > 0" class="flex flex-wrap gap-2">
                <span v-for="taste in props.tastes" :key="taste"
                    :class="[getTasteColor(taste), 'px-3 py-1 text-xs font-medium rounded-full border']">
                    {{ taste }}
                </span>
            </div>
        </div>

        <div class="p-5 pt-0 mt-auto border-t border-orange-50 bg-white/50">
            <div class="flex items-end justify-between gap-4 mb-4">
                <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-extrabold text-orange-800">Rp. {{ formattedPrice }}</span>
                </div>
            </div>

            <BaseButton :to="`/menu/${props.id}`" variant="primary" isFullWidth>
                Lihat Detail
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>