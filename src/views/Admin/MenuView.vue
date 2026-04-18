<script setup>
import { ref, reactive, computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const menuList = ref([
    {
        id: 1,
        name: 'Udang Bakar Madu',
        description: 'Udang laut pilihan yang dibakar dengan madu asli.',
        price: 65000,
        category: 'Pendamping',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvnpIaExd2ekpiy5999hsO4GSaOeExXoiKOQ&s',
        is_special: true
    }
]);

const isModalOpen = ref(false);
const isEditMode = ref(false);

const form = reactive({
    id: null,
    name: '',
    description: '',
    price: '',
    category: 'Menu Utama',
    image: '',
    is_special: false
});

const specialMenuCount = computed(() => {
    return menuList.value.filter(m => m.is_special).length;
});

const isSpecialDisabled = computed(() => {
    if (form.is_special) return false;
    return specialMenuCount.value >= 5;
});

const openAddModal = () => {
    isEditMode.value = false;
    resetForm();
    isModalOpen.value = true;
};

const openEditModal = (menu) => {
    isEditMode.value = true;
    form.id = menu.id;
    form.name = menu.name;
    form.description = menu.description || '';
    form.price = menu.price;
    form.category = menu.category;
    form.image = menu.image;
    form.is_special = menu.is_special || false;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(resetForm, 200);
};

const resetForm = () => {
    form.id = null;
    form.name = '';
    form.description = '';
    form.price = '';
    form.category = 'Menu Utama';
    form.image = '';
    form.is_special = false;
};

const handleDelete = (id) => {
    // Tugas BE
};

const handleSubmit = () => {
    // Tugas BE
};
</script>

<template>
    <AdminLayout pageTitle="Kelola Daftar Menu">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Daftar Menu Makanan</h3>
                <BaseButton @click="openAddModal"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
                    + Tambah Menu Baru
                </BaseButton>
            </div>
            <div class="p-0 overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                            <th class="px-6 py-4 font-medium">Gambar</th>
                            <th class="px-6 py-4 font-medium">Informasi Menu</th>
                            <th class="px-6 py-4 font-medium">Harga</th>
                            <th class="px-6 py-4 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="menu in menuList" :key="menu.id"
                            class="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                            <td class="px-6 py-4">
                                <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                                    <img v-if="menu.image" :src="menu.image" class="w-full h-full object-cover" />
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="font-bold text-gray-800 text-base flex items-center gap-2">
                                    {{ menu.name }}
                                    <span v-if="menu.is_special"
                                        class="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] uppercase font-bold rounded">Mingguan</span>
                                </div>
                                <div class="text-sm text-gray-500 mt-1 line-clamp-1 max-w-xs">{{ menu.description }}
                                </div>
                                <span
                                    class="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-700 text-[11px] rounded font-medium">
                                    {{ menu.category }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-800 font-medium">
                                Rp {{ new Intl.NumberFormat('id-ID').format(menu.price) }}
                            </td>
                            <td class="px-6 py-4 text-right space-x-3">
                                <button @click="openEditModal(menu)"
                                    class="cursor-pointer text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">Edit</button>
                                <button @click="handleDelete(menu.id)"
                                    class="cursor-pointer text-red-500 hover:text-red-700 text-sm font-medium transition-colors">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Teleport to="body">
            <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div @click="closeModal" class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
                <div
                    class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-in-up flex flex-col max-h-[90vh]">

                    <div
                        class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                        <h3 class="text-xl font-bold text-gray-800">
                            {{ isEditMode ? 'Edit Data Menu' : 'Tambah Menu Baru' }}
                        </h3>
                        <button @click="closeModal"
                            class="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="overflow-y-auto p-6">
                        <form id="menuForm" @submit.prevent="handleSubmit" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                                <input v-model="form.name" type="text" required placeholder="Cth: Udang Bakar Madu"
                                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                <textarea v-model="form.description" required rows="3"
                                    placeholder="Masukkan detail dan komposisi menu..."
                                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"></textarea>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                                    <input v-model="form.price" type="number" required placeholder="Cth: 25000" min="0"
                                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                    <select v-model="form.category" required
                                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white">
                                        <option value="Menu Utama">Menu Utama</option>
                                        <option value="Pendamping">Pendamping</option>
                                        <option value="Camilan">Camilan</option>
                                        <option value="Minuman">Minuman</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                                <input v-model="form.image" type="url" placeholder="https://..."
                                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                            </div>

                            <div
                                class="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100 flex items-start gap-3">
                                <div class="flex items-center h-5">
                                    <input id="is_special" v-model="form.is_special" type="checkbox"
                                        :disabled="isSpecialDisabled"
                                        class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                </div>
                                <div class="flex flex-col">
                                    <label for="is_special" class="text-sm font-medium text-orange-900"
                                        :class="{ 'cursor-pointer': !isSpecialDisabled, 'opacity-50': isSpecialDisabled }">
                                        Tampilkan di Weekly Special
                                    </label>
                                    <p class="text-xs text-orange-700 mt-0.5">
                                        Maksimal 5 menu spesial. (Terpilih: {{ specialMenuCount }}/5)
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                        <button type="button" @click="closeModal"
                            class="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            Batal
                        </button>
                        <button type="submit" form="menuForm"
                            class="px-5 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-sm cursor-pointer">
                            {{ isEditMode ? 'Simpan Perubahan' : 'Tambah Menu' }}
                        </button>
                    </div>

                </div>
            </div>
        </Teleport>
    </AdminLayout>
</template>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>