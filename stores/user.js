// вспомогательные функции для работы с cookies
function useSynchronizedCookie(key, defaultValue) {
    const cookie = useCookie(key)
    const state = ref(cookie.value || defaultValue)

    watch(state, (newValue) => {
        cookie.value = newValue
    })

    return state
}

// хранилище состояния пользователя
export const useUserStore = defineStore("user", () => {
    const authenticated = useSynchronizedCookie('authenticated', false)
    const id = useSynchronizedCookie('id', null)
    const role = useSynchronizedCookie('role', null)

    /* сообщения и роутер */
    const { showMessage } = useMessagesStore()
    const router = useRouter()
    const supabase = useSupabaseClient()

    // функции для входа и выхода из аккаунта
    function login(userId, userRole, isProfileCompleted) {
      authenticated.value = true
      id.value = userId
      role.value = userRole
    }

    function logout() {
      authenticated.value = false
      id.value = null
      role.value = null
      showMessage("Успешный выход", true)
      router.push("/")
    }

    // загрузка данных профиля
    const userData = ref(null)
    const loadProfileData = async () => {
      if (!id.value) return
      
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id.value)
        .single()
  
      if (error) throw error
  
      userData.value = data || null
    }

    return { authenticated, id, role, login, logout, userData, loadProfileData }
})