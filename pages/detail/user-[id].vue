<template>
    <div class="flex items-center justify-between">
        <p class="mainHeading">Просмотр пользователя</p>
        <button @click="goBack" type="button" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</button>
    </div>
    <div class="relative">
      <img src="/images/user/main.jpg" alt="" class="w-3/4 mx-auto rounded-xl border border-violet-300 shadow-[0px_0px_13px_-7px_black]">
      <div class="flex flex-col gap-6 p-4 rounded-xl bg-white shadow-[0px_0px_13px_-7px_black] w-1/2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-h-[40vh] overflow-y-auto">
        <p><span class="font-semibold font-mono">Id:</span> {{ user?.id }}</p>
        <div class="flex items-center gap-2">
          <img :src="getLogoUrl(user?.image)" alt="" class="object-cover object-center aspect-square w-8 rounded-full">
          <p><span class="font-semibold font-mono">ФИО:</span> {{ user?.surname }} {{ user?.name }} {{ user?.patronymic }}</p>
        </div>
        <p><span class="font-semibold font-mono">Телефон:</span> {{ user?.phone }}</p>
        <p><span class="font-semibold font-mono">Email:</span> {{ user?.email }}</p>
        <p><span class="font-semibold font-mono">Компания:</span> {{ user?.company }}</p>
        <p><span class="font-semibold font-mono">Подтверждён:</span> <span :class="user?.is_approved ? 'text-green-500' : 'text-red-500'">{{ user?.is_approved ? 'Да' : 'Нет' }}</span></p>
      </div>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Просмотр пользователя',
    lang: 'ru'
})


/* подключение роута */
const route = useRoute()


/* подключение роутера и бд */
const router = useRouter()
const supabase = useSupabaseClient()


/* функция возвращения назад */
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}


/* получение данных */
const user = ref()
const loadUser = async() => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', route.params.id)
    .single()

    if (error) throw error

    if (data) user.value = data 
}


/* получение логотипа */
const getLogoUrl = (fileName) => {
    const { data } = supabase.storage.from('files/logos').getPublicUrl(fileName)
    return data.publicUrl
}


/* первоначальная загрузка */
onMounted(() => {
  loadUser()
})
</script>