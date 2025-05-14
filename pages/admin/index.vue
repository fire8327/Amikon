<template>
    <NuxtLink to="/admin/add-user" class="px-6 py-1.5 border border-violet-500 bg-violet-500 text-white rounded-full w-fit text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent ml-auto">Добавить пользователя</NuxtLink>
    <FormKit v-model="searchTerm" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Поиск" name="Поиск" outer-class="w-full" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
    <div v-if="isLoading" class="h-[60vh] flex items-center justify-center gap-4 loading-indicator">
        <p class="text-2xl font-semibold">Загрузка...</p>
        <Icon class="text-3xl text-violet-500" name="line-md:loading-twotone-loop"/>
    </div>
    <div v-if="!isLoading" class="flex flex-col gap-6">
        <p class="mainHeading">Подтверждение пользователей</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="unapprovedUsers && unapprovedUsers.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="user in unapprovedUsers">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/user-${user.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2">
                        <button type="button" v-if="user.is_approved == false" @click="updateEntityStatus(user.id, 'users')" class="cursor-pointer">
                            <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                        </button>
                        <button type="button" @click="deleteEntity(user.id, 'users')" class="cursor-pointer">
                            <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                        </button>
                    </div>
                </div>
                <p class="mt-auto"><span class="font-semibold font-mono">Id:</span> {{ user.id }}</p>
                <p><span class="font-semibold font-mono">Имя:</span> {{ user.surname }} {{ user.name }}</p>
                <p><span class="font-semibold font-mono">Почта:</span> {{ user.email }}</p>
                <p><span class="font-semibold font-mono">Телефон:</span> {{ user.phone }}</p>
                <p><span class="font-semibold font-mono">Подтверждён:</span> <span :class="user.is_approved ? 'text-green-500' : 'text-red-500'">{{ user.is_approved ? 'Да' : 'Нет' }}</span></p>
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Пользователи для подтверждения не найдены</p>
    </div>
    <div v-if="!isLoading" class="flex flex-col gap-6">
        <p class="mainHeading">Управление подтверждёнными пользователями</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="approvedUsers && approvedUsers.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="user in approvedUsers">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/user-${user.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2">
                        <button type="button" @click="deleteEntity(user.id, 'users')" class="cursor-pointer">
                            <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                        </button>
                    </div>
                </div>
                <p class="mt-auto"><span class="font-semibold font-mono">Id:</span> {{ user.id }}</p>
                <p><span class="font-semibold font-mono">Имя:</span> {{ user.surname }} {{ user.name }}</p>
                <p><span class="font-semibold font-mono">Почта:</span> {{ user.email }}</p>
                <p><span class="font-semibold font-mono">Телефон:</span> {{ user.phone }}</p>
                <p><span class="font-semibold font-mono">Подтверждён:</span> <span :class="user.is_approved ? 'text-green-500' : 'text-red-500'">{{ user.is_approved ? 'Да' : 'Нет' }}</span></p>
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Пользователи не найдены</p>
    </div>
    <div v-if="!isLoading" class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <p class="mainHeading">Подтверждение оборудования</p>
            <FormKit v-model="filterTerm" messages-class="text-[#E9556D] font-mono" type="select" :options="['Все', 'Подтверждено', 'Не подтверждено']" placeholder="Статус" name="Статус" outer-class="w-fit" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="technics && technics.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="technic in technics" :key="technic.id">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/technic-${technic.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2">
                        <button type="button" v-if="technic.is_approved == false" @click="updateEntityStatus(technic.id, 'technic')" class="cursor-pointer">
                            <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                        </button>
                        <button type="button" @click="deleteEntity(technic.id, 'technic')" class="cursor-pointer">
                            <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                        </button>
                    </div>
                </div>
                <p class="mt-auto"><span class="font-semibold font-mono">Id:</span> {{ technic.id }}</p>
                <p><span class="font-semibold font-mono">Имя пользователя:</span> {{ technic.users.surname }} {{ technic.users.name }}</p>
                <p><span class="font-semibold font-mono">Наименование:</span> {{ technic.name }}</p>
                <p><span class="font-semibold font-mono">Тип:</span> {{ technic.type }}</p>
                <p><span class="font-semibold font-mono">Состояние:</span> <span class="px-4 py-1.5 rounded-xl text-white" :class="statusColor(technic.status)">{{ technic.status }}</span></p>
                <p><span class="font-semibold font-mono">Подтверждено:</span> <span :class="technic.is_approved ? 'text-green-500' : 'text-red-500'">{{ technic.is_approved ? 'Да' : 'Нет' }}</span></p>
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Оборудование не найдено</p>
    </div>
    <div v-if="!isLoading" class="flex flex-col gap-6">
        <p class="mainHeading">Сбои</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="crashes && crashes.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="crash in crashes" :key="crash.id">
                <FormKit @submit="changeCrashStatus(crash.id, $event.status)" type="form" :actions="false" messages-class="hidden" form-class="flex gap-4 items-center">
                    <FormKit :value="crash.status" :options="['Новый','В работе','Закрыт']" validation="required" messages-class="text-[#E9556D] font-mono" type="select" placeholder="Статус" name="status" outer-class="grow" input-class="focus:outline-none px-4 py-1.5 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                    <button type="sumbit" class="px-4 py-1.5 border border-violet-500 bg-violet-500 text-white rounded-full w-fit text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Сохранить</button>
                </FormKit>
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/crash-${crash.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2">
                        <button type="button" @click="deleteEntity(crash.id, 'crashes')" class="cursor-pointer">
                            <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                        </button>
                    </div>
                </div>
                <p class="mt-auto"><span class="font-semibold font-mono">Id:</span> {{ crash.id }}</p>
                <p><span class="font-semibold font-mono">Компания:</span> {{ crash.users.company }}</p>
                <p><span class="font-semibold font-mono">Имя пользователя:</span> {{ crash.users.surname }} {{ crash.users.name }}</p>
                <p><span class="font-semibold font-mono">Email:</span> {{ crash.users.email }}</p>
                <p><span class="font-semibold font-mono">Сертификат:</span> {{ crash.technic.certificate }}</p>
                <p class="line-clamp-2"><span class="font-semibold font-mono">Описание проблемы:</span> {{ crash.desc }}</p>
                <p><span class="font-semibold font-mono">Состояние:</span> <span class="px-4 py-1.5 rounded-xl text-white" :class="crashStatusColor(crash.status)">{{ crash.status }}</span></p>
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Сбои не найдены</p>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Админ-панель',
    lang: 'ru'
})


/* подключение сообщений */
const { showMessage } = useMessagesStore()


/* подключение бд и хранилищ */
const supabase = useSupabaseClient()
const userStore = useUserStore()
const { id: userId, role } = userStore


/* получение пользователей */
const approvedUsers = ref([])
const unapprovedUsers = ref([])
const fetchUsers = async (searchTerm = '') => {
    try {
        let query = supabase
            .from('users')
            .select()
            .order('id', { ascending: true })
            .eq('role', 'user')

        if (searchTerm) {
            query = query.or(
                `name.ilike.%${searchTerm}%,surname.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`
            )
        }    

        const { data, error } = await query

        if (error) throw error
       
        if (data) {
            approvedUsers.value = data.filter(u => u.is_approved)
            unapprovedUsers.value = data.filter(u => !u.is_approved)
        }
    } catch (error) {
        console.error('Ошибка загрузки пользователей:', error.message)
    }
}


/* получение оборудования */
const technics = ref([])
const fetchTechnics = async (searchTerm = '') => {
    try {
        let query = supabase
            .from('technic')
            .select('*,  users(*)')
            .order('id', { ascending: true })

        // добавляем фильтрацию по статусу подтверждения
        if (filterTerm.value !== "Все") {
            const isApproved = filterTerm.value === "Подтверждено"
            query = query.eq('is_approved', isApproved)
        }

        if (searchTerm) {
            // сначала ищем пользователей
            const { data: users } = await supabase
                .from('users')
                .select('id')
                .or(`name.ilike.%${searchTerm}%,surname.ilike.%${searchTerm}%`)

            const userIds = users?.map(u => u.id) || []

            query = query.or(
                `name.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%,status.ilike.%${searchTerm}%,user_id.in.(${userIds.join(',')})`
            )
        }
        
        const { data, error } = await query

        if (error) throw error
        technics.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки оборудования:', error.message)
    }
}


/* получение сбоев */
const crashes = ref([])
const fetchCrashes = async (searchTerm = '') => {
    try {
        let query = supabase
            .from('crashes')
            .select('*, users(*), technic(*)')
            .order('id', { ascending: true })

        if (searchTerm) {
            // сначала ищем пользователей
            const { data: users } = await supabase
                .from('users')
                .select('id')
                .or(`name.ilike.%${searchTerm}%,surname.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)

            const userIds = users?.map(u => u.id) || []

            // сначала ищем оборудование
            const { data: technic } = await supabase
                .from('technic')
                .select('id')
                .or(`certificate.ilike.%${searchTerm}%`)

            const technicIds = technic?.map(t => t.id) || []

            console.log(technicIds)            

            // объединение запросов
            query = query.or(
                `desc.ilike.%${searchTerm}%,status.ilike.%${searchTerm}%,user_id.in.(${userIds.join(',')}),technic_id.in.(${technicIds.join(',')})`
            )
        }    

        const { data, error } = await query

        if (error) throw error
        crashes.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки сбоев:', error.message)
    }
}


/* обновление сущности */
const updateEntityStatus = async(entityId, table) => {
    try {
        const { error } = await supabase
        .from(table)
        .update({ is_approved: true })
        .eq('id', entityId)
        if (error) throw error
        showMessage('Статус обновлён!', true)
        await fetchUsers()
        await fetchTechnics()
    } catch (error) {
        console.error('Ошибка обновления статуса:', error.message)
    }    
}


/* удаление сущности */
const deleteEntity = async(entityId, table) => {
    try {
        const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', entityId)
        if (error) throw error
        showMessage('Запись удалена!', true)
        await fetchUsers()
        await fetchTechnics()
        await fetchCrashes()
    } catch (error) {
        console.error('Ошибка обновления статуса:', error.message)
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

// для сбоев
const crashStatusColor = ((status) => {
    switch (status) {
        case 'Новый':
            return 'bg-gray-500'    
        case 'Закрыт':
            return 'bg-green-500'        
        case 'В работе':
            return 'bg-yellow-500'    
        default:
            return 'bg-blue-500'
    }
})


/* изменение статуса сбоя */
const changeCrashStatus = async(crashId, status) => {
    const { data, error } = await supabase
    .from('crashes')
    .update({ status: status })
    .eq('id', crashId)
    .select()

    if(data) {
        showMessage('Статус обновлён!', true)
        fetchCrashes()
    } else {
        showMessage('Ошибка при изменении статуса!', false)
    }
}


/* поиск */
const searchTerm = ref("")
let timeoutId = null
const isLoading = ref(false)


/* фильтрация */
const filterTerm = ref("Все")

// отслеживание изменений
watch([searchTerm, filterTerm], async ([newSearchVal, newFilterVal]) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(async () => {
    isLoading.value = true
    try {
      await Promise.all([
        fetchUsers(newSearchVal),
        fetchTechnics(newSearchVal),
        fetchCrashes(newSearchVal)
      ])
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, 300)
}, { deep: true })


/* первоначальная загрузка */
onMounted(() => {
    fetchUsers()
    fetchTechnics()
    fetchCrashes()
})

/* размонтирование компонента */
onUnmounted(() => {
    clearTimeout(timeoutId)
})
</script>