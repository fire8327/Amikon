<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
        <p class="mainHeading">Просмотр оборудования</p>
        <button @click="goBack" type="button" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</button>
    </div>
    <div class="flex items-center gap-6">
      <button @click="isConsultationShow = true, isOverlayShow = true" class="py-1.5 px-4 rounded-xl text-white border border-yellow-500 bg-yellow-500 transition-all duration-500 hover:text-yellow-500 hover:bg-transparent">Запросить консультацию по устройству</button>
      <button v-if="authenticated && role === 'user'" @click="isCrashShow = true, isOverlayShow = true" class="py-1.5 px-4 rounded-xl text-white border border-red-500 bg-red-500 transition-all duration-500 hover:text-red-500 hover:bg-transparent">Сообщить о критическом сбое</button>
    </div>
  </div>

  <!-- консультации -->
  <div :class="isConsultationShow ? 'top-1/2 -translate-y-1/2' : 'top-0 -translate-y-[2000px]'" class="w-1/3 fixed z-[5] left-1/2 -translate-x-1/2 p-4 flex flex-col gap-8 bg-white rounded-xl transition-all duration-500">
    <button @click="closeAll" class="self-end cursor-pointer" type="button">
      <Icon class="text-3xl" name="material-symbols:close-small-outline-rounded"/>
    </button>
    <div class="flex flex-col items-center gap-2">
      <p>Если вы хотите получить простую консультацию по вашему оборудованию\ПО или задать вопрос связанный с другим оборудованием\ПО, напишите на почту :</p>
      <NuxtLink to="mailto:support@amicon.ru" target="_blank" class="text-violet-500 transition-all duration-500 hover:opacity-60">support@amicon.ru</NuxtLink>
      <p>или позвоните по номеру телефона :</p>
      <NuxtLink to="tel:7-495-797 64-13" target="_blank" class="text-violet-500 transition-all duration-500 hover:opacity-60">7-495-797 64-13</NuxtLink>
    </div>
    <p class="text-violet-500">С уважением, техническая поддержка компании Амикон</p>
  </div>

  <!-- сбои -->
  <div :class="isCrashShow ? 'top-1/2 -translate-y-1/2' : 'top-0 -translate-y-[2000px]'" class="w-1/3 fixed z-[5] left-1/2 -translate-x-1/2 p-4 flex flex-col gap-8 bg-white rounded-xl transition-all duration-500">
    <button @click="closeAll" class="self-end cursor-pointer" type="button">
      <Icon class="text-3xl" name="material-symbols:close-small-outline-rounded"/>
    </button>
    <p class="text-center text-2xl font-semibold">Заполните анкету</p>
    <FormKit @submit="addCrash" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
        <FormKit v-model="crashForm.desc" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Опишите вашу проблему" name="Описание проблемы" outer-class="w-full" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <div class="flex flex-wrap gap-1">
          <p>Вы также можете оставить заявку в ручную на почте</p>
          <NuxtLink to="mailto:support@amicon.ru" target="_blank" class="text-violet-500 transition-all duration-500 hover:opacity-60">support@amicon.ru</NuxtLink>
          <p>или по номеру телфона</p>
          <NuxtLink to="tel:7-495-797 64-13" target="_blank" class="text-violet-500 transition-all duration-500 hover:opacity-60">7 495-797 64-13</NuxtLink>
          <p>используя теже данные, что нужно указать в анкете</p>
        </div>
        <button type="submit" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Отправить</button>
    </FormKit>
  </div>

  <div @click="closeAll" :class="{'hidden' : !isOverlayShow}" class="fixed bg-black/40 inset-0 z-[4]"></div> <!-- оверлей -->

  <div class="relative">
    <img src="/images/technic/main.jpg" alt="" class="w-3/4 mx-auto rounded-xl border border-violet-300 shadow-[0px_0px_13px_-7px_black]">
    <div class="flex flex-col gap-6 p-4 rounded-xl bg-white shadow-[0px_0px_13px_-7px_black] w-1/2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-h-[40vh] overflow-y-auto">
      <p><span class="font-semibold font-mono">Id:</span> {{ technic?.id }}</p>
      <p><span class="font-semibold font-mono">Ответственный:</span> {{ technic?.users?.surname }} {{ technic?.users?.name }}</p>
      <p><span class="font-semibold font-mono">Наименование:</span> {{ technic?.name }}</p>
      <p><span class="font-semibold font-mono">Тип:</span> {{ technic?.type }}</p>
      <p><span class="font-semibold font-mono">Серийный номер:</span> {{ technic?.number }}</p>
      <p v-if="technic?.model"><span class="font-semibold font-mono">Модель:</span> {{ technic?.model }}</p>
      <p v-if="technic?.version"><span class="font-semibold font-mono">Версия:</span> {{ technic?.version }}</p>
      <p><span class="font-semibold font-mono">Сертификат КТО:</span> {{ technic?.certificate }}</p>
      <p><span class="font-semibold font-mono">Подразделение:</span> {{ technic?.address }}</p>
      <p><span class="font-semibold font-mono">Состояние:</span> <span class="px-4 py-1.5 rounded-xl text-white" :class="statusColor(technic?.status)">{{ technic?.status }}</span></p>
      <p><span class="font-semibold font-mono">Подтверждено:</span> <span :class="technic?.is_approved ? 'text-green-500' : 'text-red-500'">{{ technic?.is_approved ? 'Да' : 'Нет' }}</span></p>
      <div class="flex flex-col" v-if="authenticated && role === 'user'">
        <FormKit v-model="userNote" validation="required|length:3,250" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Введите заметку" label="Заметка" name="Заметка" outer-class="w-full" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <p class="text-sm text-gray-500">*Автоматически сохранится через 3 секунды после изменения</p>
      </div>
      <p v-else><span class="font-semibold font-mono">Заметка:</span> {{ technic?.note }}</p>
    </div>
  </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Просмотр оборудования',
    lang: 'ru'
})


/* подключение роута и сообщения*/
const route = useRoute()
const { showMessage } = useMessagesStore()


/* получение пользоватея */
const { id: userId, role, authenticated } = useUserStore()


/* сбои и консультации */
const isOverlayShow = ref(false) // оверлей
const isConsultationShow = ref(false) // консультация
const isCrashShow = ref(false) // cбой

const crashForm = ref({
  desc: "",
  user_id: userId,
  technic_id: route.params.id
})

const closeAll = () => {
  isOverlayShow.value = false
  isConsultationShow.value = false
  isCrashShow.value = false
}

// отправка сбоя
const addCrash = async() => {
  const { data, error } = await supabase
    .from('crashes')
    .insert(crashForm.value)
    .select()

  if (data) {
    console.log(data)
    showMessage('Успешная отправка!', true)
    crashForm.value.contacts = ""    
    crashForm.value.desc = ""    
    closeAll()
  } else {
    console.log(error)    
    showMessage('Произошла ошибка!', false)
  }  
}


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

    if (data) {
      technic.value = data 
      userNote.value = data.note
    }  
}


/* цвет состояния */
const statusColor = ((status) => {
    switch (status) {
        case 'Отключено':
            return 'bg-gray-500'    
        case 'В работе':
            return 'bg-green-500'    
        case 'Сбой':
            return 'bg-red-500'    
        case 'Обслуживание':
            return 'bg-yellow-500'    
        default:
            return 'bg-blue-500'
    }
})


/* заметка */
const userNote = ref("")
let saveTimeout = null


/* сохранение заметки */
const saveNote = async (noteContent) => {
  if(noteContent && noteContent.length >= 3 && noteContent.length <=250) {
    const { data, error } = await supabase
      .from('technic')
      .update({ note: noteContent })
      .eq('id', route.params.id)
      .select()
    
    if (data) {
      console.log(data)
      showMessage('Заметка обновлена!', true)
    } else {
      console.log(error)    
      showMessage('Произошла ошибка!', false)
    }  
  }
}

// отправка
watch(userNote, (newValue) => {
  clearTimeout(saveTimeout)

  saveTimeout = setTimeout(() => {
    saveNote(newValue)
  }, 3000)
})


/* первоначальная загрузка */
onMounted(() => {
  loadTechnic()
})


/* размонтирование компонента */
onUnmounted(() => {
  clearTimeout(saveTimeout)
})
</script>