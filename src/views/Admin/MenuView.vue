<script setup>
import { ref, reactive } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const menuList = ref([
    {
        id: 1,
        name: 'Udang Bakar Madu',
        price: 65000,
        category: 'Makanan Berat',
        image: ''
    }
]);

const isModalOpen = ref(false);
const isEditMode = ref(false);

const form = reactive({
    id: null,
    name: '',
    price: '',
    category: 'Makanan Berat',
    image: ''
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
    form.price = menu.price;
    form.category = menu.category;
    form.image = menu.image;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(resetForm, 200);
};

const resetForm = () => {
    form.id = null;
    form.name = '';
    form.price = '';
    form.category = 'Makanan Berat';
    form.image = '';
};

const handleDelete = (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (!confirmed) return;
    const idx = menuList.value.findIndex((m) => m.id === id);
    if (idx !== -1) {
        menuList.value.splice(idx, 1);
        console.log('Hapus data id:', id);
        alert('Data berhasil dihapus!');
    }
};

const handleSubmit = () => {
    if (isEditMode.value) {
        console.log('Update data id:', form.id, form);
        alert('Data berhasil diupdate!');
    } else {
        console.log('Simpan data baru:', form);
        alert('Data baru berhasil disimpan!');
    }
    closeModal();
};
</script>

<template>
    <AdminLayout pageTitle="Kelola Daftar Menu">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Daftar Menu Makanan</h3>
                <BaseButton @click="openAddModal"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    + Tambah Menu Baru
                </BaseButton>
            </div>
            <div class="p-0 overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                            <th class="px-6 py-4 font-medium">Gambar</th>
                            <th class="px-6 py-4 font-medium">Nama Menu</th>
                            <th class="px-6 py-4 font-medium">Harga</th>
                            <th class="px-6 py-4 font-medium">Kategori</th>
                            <th class="px-6 py-4 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="menu in menuList" :key="menu.id"
                            class="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                            <td class="px-6 py-4">
                                <div class="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                    <img v-if="menu.image" :src="menu.image" class="w-full h-full object-cover" />
                                </div>
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-800">{{ menu.name }}</td>
                            <td class="px-6 py-4 text-gray-600">Rp {{ new Intl.NumberFormat('id-ID').format(menu.price)
                                }}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                    {{ menu.category }}
                                </span>
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
                    class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-in-up">

                    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 class="text-xl font-bold text-gray-800">
                            {{ isEditMode ? 'Edit Data Menu' : 'Tambah Menu Baru' }}
                        </h3>
                        <button @click="closeModal" class="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                            <input v-model="form.name" type="text" required placeholder="Cth: Nasi Goreng Seafood"
                                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
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
                                    <option value="Makanan Berat">Makanan Berat</option>
                                    <option value="Snack">Snack</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                            <input v-model="form.image" type="url" placeholder="https://..."
                                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                        </div>
                        <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                            <button type="button" @click="closeModal"
                                class="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Batal
                            </button>
                            <button type="submit"
                                class="px-5 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-sm">
                                {{ isEditMode ? 'Simpan Perubahan' : 'Tambah Menu' }}
                            </button>
                        </div>
                    </form>
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