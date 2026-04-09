import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase' 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      user.value = res.user
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          error.value = 'Email atau password yang Anda masukkan salah.'
          break
        case 'auth/invalid-email':
          error.value = 'Format email tidak valid.'
          break
        case 'auth/too-many-requests':
          error.value = 'Terlalu banyak percobaan gagal. Tunggu sebentar lalu coba lagi.'
          break
        case 'auth/network-request-failed':
          error.value = 'Koneksi terputus. Pastikan internet Anda stabil.'
          break
        default:
          error.value = 'Terjadi kesalahan pada sistem. Silakan coba lagi.'
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  const initUser = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        resolve(currentUser)
      })
    })
  }

  return { user, loading, error, login, logout, initUser }
})