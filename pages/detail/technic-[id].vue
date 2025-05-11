<template>
    <div class="flex items-center justify-between">
        <p class="mainHeading">Просмотр оборудования</p>
        <button @click="goBack" type="button" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</button>
    </div>
    <div class="relative">
      <img src="/images/technic/main.jpg" alt="" class="w-3/4 mx-auto rounded-xl border border-violet-300 shadow-[0px_0px_13px_-7px_black]">
      <div class="flex flex-col gap-6 p-4 rounded-xl bg-white shadow-[0px_0px_13px_-7px_black] h-fit w-1/2 absolute left-1/2 -translate-x-1/2 bottom-0">
        <p><span class="font-semibold font-mono">Id:</span> {{ technic?.id }}</p>
        <p><span class="font-semibold font-mono">Ответственный:</span> {{ technic?.users?.surname }} {{ technic?.users?.name }}</p>
        <p><span class="font-semibold font-mono">Наименование:</span> {{ technic?.name }}</p>
        <p><span class="font-semibold font-mono">Тип:</span> {{ technic?.type }}</p>
        <p><span class="font-semibold font-mono">Серийный номер:</span> {{ technic?.number }}</p>
        <p v-if="technic?.model"><span class="font-semibold font-mono">Модель:</span> {{ technic?.model }}</p>
        <p v-if="technic?.version"><span class="font-semibold font-mono">Версия:</span> {{ technic?.version }}</p>
        <p><span class="font-semibold font-mono">Сертификат КТО:</span> {{ technic?.certificate }}</p>
        <p><span class="font-semibold font-mono">Подразделение:</span> {{ technic?.address }}</p>
        <p><span class="font-semibold font-mono">Подтверждено:</span> {{ technic?.approved ? 'Да' : 'Нет' }}</p>
      </div>
    </div>
</template>

<script setup>
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
const technic = ref()
const loadTechnic = async() => {
  const { data, error } = await supabase
    .from('technic')
    .select('*, users(*)')
    .eq('id', route.params.id)
    .single()

    if (error) throw error

    if (data) technic.value = data 
}


/* первоначальная загрузка */
onMounted(() => {
  loadTechnic()
})
</script>