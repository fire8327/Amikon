<template>
    <div class="flex items-center justify-between">
        <p class="mainHeading">Просмотр сбоя</p>
        <button @click="goBack" type="button" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</button>
    </div>
    <div class="relative">
      <img src="/images/crash/main.jpg" alt="" class="w-3/4 mx-auto rounded-xl border border-violet-300 shadow-[0px_0px_13px_-7px_black]">
      <div class="flex flex-col gap-6 p-4 rounded-xl bg-white shadow-[0px_0px_13px_-7px_black] w-1/2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-h-[40vh] overflow-y-auto">
        <p><span class="font-semibold font-mono">Id:</span> {{ crash?.id }}</p>
        <p><span class="font-semibold font-mono">Компания:</span> {{ crash?.users.company }}</p>
        <p><span class="font-semibold font-mono">Имя пользователя:</span> {{ crash?.users.surname }} {{ crash?.users.name }}</p>
        <p><span class="font-semibold font-mono">Сертификат:</span> {{ crash?.technic.certificate }}</p>
        <p><span class="font-semibold font-mono">Тип:</span> {{ crash?.technic.type }}</p>
        <p><span class="font-semibold font-mono">Email:</span> {{ crash?.users.email }}</p>
        <p><span class="font-semibold font-mono">Телефон:</span> {{ crash?.users.phone }}</p>
        <p><span class="font-semibold font-mono">Описание проблемы:</span> {{ crash?.desc }}</p>
      </div>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Просмотр сбоя',
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
const crash = ref()
const loadCrash = async() => {
  const { data, error } = await supabase
    .from('crashes')
    .select('*, users(*), technic(*)')
    .eq('id', route.params.id)
    .single()

    if (error) throw error

    if (data) crash.value = data 
}


/* первоначальная загрузка */
onMounted(() => {
  loadCrash()
})
</script>