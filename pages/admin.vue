<template>
    <div class="flex flex-col gap-6">
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
        <p v-else class="text-2xl font-semibold text-center">Пользователей для подтверждения пока нет</p>
    </div>
    <div class="flex flex-col gap-6">
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
        <p v-else class="text-2xl font-semibold text-center">Пользователей пока нет</p>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Подтверждение оборудования</p>
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
        <p v-else class="text-2xl font-semibold text-center">Оборудования пока нет</p>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Сбои</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="crashes && crashes.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="crash in crashes" :key="crash.id">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/crash-${crash.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2">
                        <!-- <button type="button" v-if="technic.is_approved == false" @click="updateEntityStatus(technic.id, 'technic')" class="cursor-pointer">
                            <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                        </button> -->
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
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Сбоев пока нет</p>
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
const fetchUsers = async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .order('id', { ascending: true })
            .eq('role', 'user')
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
const fetchTechnics = async () => {
    try {
        const { data, error } = await supabase
            .from('technic')
            .select('*, users(*)')
            .order('id', { ascending: true })

        if (error) throw error
        technics.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки оборудования:', error.message)
    }
}


/* получение сбоев */
const crashes = ref([])
const fetchCrashes = async () => {
    try {
        const { data, error } = await supabase
            .from('crashes')
            .select('*, users(*), technic(*)')
            .order('id', { ascending: true })

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


/* первоначальная загрузка */
onMounted(() => {
    fetchUsers()
    fetchTechnics()
    fetchCrashes()
})
</script>