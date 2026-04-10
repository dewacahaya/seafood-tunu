<template>
    <div class="min-h-screen flex bg-gray-100 font-sans">

        <aside class="w-64 bg-orange-900 text-white flex flex-col md:flex shadow-xl">
            <div class="h-16 flex items-center justify-center border-b border-orange-800">
                <h2 class="text-xl font-bold tracking-wider">Admin<span class="text-orange-400">Panel</span></h2>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-2">
                <RouterLink to="/admin/dashboard"
                    class="block py-2.5 px-4 rounded-lg transition-colors hover:bg-orange-800"
                    active-class="bg-orange-800 border-l-4 border-orange-400">
                    Dashboard
                </RouterLink>
                <RouterLink to="/admin/menu" class="block py-2.5 px-4 rounded-lg transition-colors hover:bg-orange-800"
                    active-class="bg-orange-800 border-l-4 border-orange-400">
                    Daftar Menu
                </RouterLink>
            </nav>

            <div class="p-4 border-t border-orange-800">
                <button @click="handleLogout"
                    class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
                    Logout
                </button>
            </div>
        </aside>

        <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header class="h-16 bg-white shadow-sm flex items-center px-6 md:px-8 justify-between">
                <h1 class="text-xl font-semibold text-gray-800">
                    {{ pageTitle }}
                </h1>
                <div class="text-sm font-medium text-gray-500">
                    Halo, Admin
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-6 md:p-8">
                <slot />
            </div>
        </main>

    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// Menerima props untuk judul halaman (opsional, agar header dinamis)
defineProps({
    pageTitle: {
        type: String,
        default: 'Admin Panel'
    }
})

// TUGAS BACKEND: Fungsi logout Firebase nantinya dipanggil di sini
const handleLogout = async () => {
    try {
        await authStore.logout()
        router.push('/')
    } catch (error) {
        console.error('Logout error:', error)
    }
}
</script>