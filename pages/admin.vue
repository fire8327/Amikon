<template>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Добавление нового пользователя</p>
        <FormKit v-model="userForm" @submit="addUser" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
        <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
            <FormKit v-model="user.surname" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Фамилия" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-model="user.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя" name="Имя" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-model="user.patronymic" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Отчество" name="Отчество" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        </div>
        <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
            <FormKit v-model="user.login" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Логин" name="Логин" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-model="user.password" validation="required|length:6" messages-class="text-[#E9556D] font-mono" type="password" placeholder="······" name="Пароль" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        </div>
        <FormKit v-model="user.phone" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Телефон" name="Телефон" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <FormKit v-model="user.email" validation="required|email" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Email" name="Email" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <FormKit v-model="user.company" :options="companies" validation="required" messages-class="text-[#E9556D] font-mono" type="select" placeholder="Компания заказчик" name="Компания заказчик" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <FormKit @change="(e) => { logoFile = e.target.files[0] }" accept="image/*" validation="required" messages-class="text-[#E9556D] font-mono" type="file" label="Фото профиля" name="Фото профиля" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        <button :disabled="isAddDisabled" :class="{ 'opacity-50 cursor-not-allowed': isAddDisabled }" type="submit" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Добавить</button>
    </FormKit>
    </div>
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


/* добавление нового пользователя */
// отдельно форма для очистки
const userForm = ref(null)

// данные о пользователе
const user = ref({
    surname: "",
    name: "",
    patronymic: "",
    login: "",
    password: "",
    phone: "",
    email: "",
    company: "",
    image: "",
    is_approved: true
})

//изборажение
const logoFile = ref(null)


/* получение компаний */
const companies = ref([])
const getCompanies = async() => {
    const { data } = await supabase
    .from('companies')
    .select('name')

    companies.value = data.map(item => item.name) || []
}


/* регистрация пользователя */
const isAddDisabled = ref(false)
const addUser = async () => {
    isAddDisabled.value = true
    const { data: users, error: usersError } = await supabase
    .from('users')
    .select("*")
    .eq('login', user.value.login)

    if (users[0]) {
        user.value.login = ""
        isAddDisabled.value = false
        return showMessage("Такой  логин уже используется!", false)
    } 
    
    // изображение
    if (logoFile.value) {
        const file = logoFile.value
        const extension = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${extension}`

        const { error: uploadError } = await supabase.storage
        .from('files/logos')
        .upload(`${fileName}`, file)

        if (uploadError) throw uploadError

        user.value.image = fileName
    }


    const { data, error } = await supabase
    .from('users')
    .insert(user.value)
    .select()

    if (data) {
        console.log(data)
        showMessage('Успешное добавление!', true)
        isAddDisabled.value = false
        fetchUsers()
        userForm.value = {}
    } else {
        console.log(user.value)            
        isAddDisabled.value = false
        showMessage('Произошла ошибка!', false)
    }
}


/* первоначальная загрузка */
onMounted(() => {
    fetchUsers()
    fetchTechnics()
    fetchCrashes()
    getCompanies()
})
</script>