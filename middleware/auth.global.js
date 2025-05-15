const appRoutes = {
  public: [
    '/auth',
    '/reg'
  ],
  protected: [
    '/profile'
  ],
  admin: [
    '/admin',
    '/admin/add-user'
  ]
}

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const { authenticated, role } = userStore
  const path = to.path

  // Главная страница
  if (path === '/') {
    return authenticated 
      ? navigateTo(role === 'admin' ? '/admin' : '/profile')
      : navigateTo('/auth')
  }

  // Публичные маршруты
  if (appRoutes.public.some(route => path.startsWith(route))) {
    return authenticated ? navigateToDefault(role) : undefined
  }

  // Защищенные маршруты (доступны всем авторизованным)
  if (appRoutes.protected.some(route => path.startsWith(route))) {
    return authenticated ? undefined : navigateTo('/auth')
  }

  // Админские маршруты
  if (appRoutes.admin.some(route => path.startsWith(route))) {
    if (!authenticated) return navigateTo('/auth')
    return role === 'admin' ? undefined : navigateTo('/profile')
  }

  // Для всех неопределенных маршрутов
  return authenticated 
    ? navigateToDefault(role)
    : navigateTo('/auth')
})

// Помощник для редиректа по умолчанию
function navigateToDefault(role) {
  return navigateTo(role === 'admin' ? '/admin' : '/profile')
}