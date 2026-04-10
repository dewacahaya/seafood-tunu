<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
</script>

<template>
    <AdminLayout pageTitle="Kelola Daftar Menu">

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Daftar Menu Makanan</h3>
                <button
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    + Tambah Menu Baru
                </button>
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
                        <tr class="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                            <td class="px-6 py-4">
                                <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-800">Udang Bakar Madu</td>
                            <td class="px-6 py-4 text-gray-600">Rp 65.000</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Makanan
                                    Berat</span>
                            </td>
                            <td class="px-6 py-4 text-right space-x-2">
                                <button class="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
                                <button class="text-red-500 hover:text-red-700 text-sm font-medium">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </AdminLayout>
</template>