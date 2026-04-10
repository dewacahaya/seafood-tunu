<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
        style="background-image: url('https://images.unsplash.com/photo-1659951226926-a75791782250?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
        <div
            class="border border-orange-300/30 bg-orange-900/60 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h1 class="text-2xl sm:text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
                Login Admin
            </h1>

            <p v-if="errorMessage"
                class="bg-red-500/20 border border-red-500 text-white text-sm mb-4 p-2 rounded-lg text-center backdrop-blur-sm">
                {{ errorMessage }}
            </p>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-orange-50 text-sm font-semibold mb-2 drop-shadow-sm" for="email">
                        Email
                    </label>
                    <input v-model="email" type="email" id="email"
                        class="w-full py-2.5 px-4 bg-black/30 border border-orange-300/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                        placeholder="Masukkan email" required>
                </div>

                <div class="mb-6">
                    <label class="block text-orange-50 text-sm font-semibold mb-2 drop-shadow-sm" for="password">
                        Password
                    </label>
                    <input v-model="password" type="password" id="password"
                        class="w-full py-2.5 px-4 bg-black/30 border border-orange-300/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                        placeholder="Masukkan password" required>
                </div>

                <div class="flex items-center justify-between mt-8">
                    <button type="submit"
                        class="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        :disabled="isLoading">
                        {{ isLoading ? 'Loading...' : 'Login' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()


// TUGAS FRONTEND: Menyiapkan wadah data (State UI)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// WADAH UNTUK BACKEND: Fungsi ini dipicu saat form disubmit
const handleLogin = async () => {
    await authStore.login(email.value, password.value)

    if (!authStore.error && authStore.user) {
        router.push('/admin/dashboard')
    } else {
        errorMessage.value = "Gagal Login: " + authStore.error
    }
}
</script>