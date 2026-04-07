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
      error.value = err.message
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