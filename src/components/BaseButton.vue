<script setup>
import { computed } from 'vue';

const props = defineProps({
    to: {
        type: [String, Object],
        default: null
    },
    variant: {
        type: String,
        default: 'primary'
    },
    isFullWidth: {
        type: Boolean,
        default: false
    }
});

const componentTag = computed(() => props.to ? 'router-link' : 'button');

const baseClasses = "font-semibold py-3 px-6 rounded-xl transition-all duration-150 transform active:scale-95 flex items-center justify-center gap-2 shadow-sm";

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-orange-200';
        case 'outline':
            return 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50';
        default:
            return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
});
</script>

<template>
    <component :is="componentTag" :to="props.to"
        :class="[baseClasses, variantClasses, props.isFullWidth ? 'w-full' : 'w-fit']">
        <slot />
    </component>
</template>