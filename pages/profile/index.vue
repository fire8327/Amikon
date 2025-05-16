<template>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Личные данные</p>
        <FormKit type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.surname" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Фамилия" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-model="userForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя" name="Имя" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-model="userForm.patronymic" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Отчество" name="Отчество" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            </div>
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.login" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Логин" name="Логин" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-model="userForm.password" validation="required|length:6" messages-class="text-[#E9556D] font-mono" type="password" placeholder="······" name="Пароль" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            </div>
            <FormKit v-model="userForm.phone" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Телефон" name="Телефон" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-model="userForm.email" validation="required|email" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Email" name="Email" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-if="userStore.role !== 'admin'" v-model="userForm.company" :options="companies" validation="required" messages-class="text-[#E9556D] font-mono" type="select" placeholder="Компания заказчик" name="Компания заказчик" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <div class="flex flex-col gap-4 w-full md:w-2/3 lg:w-1/2" v-if="userForm.image">
                <p class="text-xl font-semibold text-[#131313]">Фото профиля</p>
                <div class="relative w-full group rounded-xl overflow-hidden">
                    <img :src="getLogoUrl(userForm.image)" alt="" class="object-cover object-center aspect-square w-full">
                    <button type="button" @click="removeLogoFile" class="absolute inset-0 bg-black/70 flex items-center justify-center transition-all duration-500 [@media(pointer:coarse)]:opacity-100 [@media(pointer:fine)]:opacity-0 group-hover:opacity-100">
                        <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                    </button>
                </div>
            </div>
            <FormKit v-else @change="(e) => { logoFile = e.target.files[0] }" accept="image/*" validation="required" messages-class="text-[#E9556D] font-mono" type="file" label="Фото профиля" name="Фото профиля" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <button @click="handleSave" :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="button" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Сохранить</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6" v-if="role === 'user'">
        <p class="mainHeading">Подразделения</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="divisions && divisions.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="division in divisions" :key="division.id">
                <div class="flex items-center gap-2 self-end">
                    <button type="button" @click="deleteEntity(division.id, 'divisions')" class="cursor-pointer">
                        <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                    </button>
                </div>
                <p><span class="font-semibold font-mono">Id:</span> {{ division.id }}</p>
                <p><span class="font-semibold font-mono">Адрес:</span> {{ division.address }}</p>
            </div>
            <NuxtLink to="/profile/add-division" class="flex items-center justify-center gap-4 w-full py-6 bg-white rounded-xl shadow-lg transition-all duration-500 hover:opacity-60">
                <Icon class="text-3xl" name="material-symbols:add-diamond-rounded"/>
                <span>Добавить</span>
            </NuxtLink>
        </div>
        <div class="flex flex-col w-full items-center gap-4 text-center" v-else>
            <p class="text-2xl font-semibold font-mono">Вы пока ничего не добавили</p>
            <NuxtLink to="/profile/add-division" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Добавить подразделение</NuxtLink>
        </div>
    </div>
    <div class="flex flex-col gap-6" v-if="role === 'user'">
        <p class="mainHeading">Оборудование</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="entities && entities.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="entity in entities" :key="entity.id">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/detail/technic-${entity.id}`">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:eye-tracking"/>
                    </NuxtLink>
                    <div class="flex items-center gap-2 self-end">
                        <NuxtLink :to="`/edit/technic-${entity.id}`">
                            <Icon class="text-3xl text-yellow-500" name="material-symbols:edit-rounded"/>
                        </NuxtLink>
                        <button type="button" @click="deleteEntity(entity.id, 'technic')" class="cursor-pointer">
                            <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                        </button>
                    </div>
                </div>
                <p><span class="font-semibold font-mono">Id:</span> {{ entity.id }}</p>
                <p><span class="font-semibold font-mono">Наименование:</span> {{ entity.name }}</p>
                <p><span class="font-semibold font-mono">Тип:</span> {{ entity.type }}</p>
                <p><span class="font-semibold font-mono">Состояние:</span> <span class="px-4 py-1.5 rounded-xl text-white" :class="statusColor(entity.status)">{{ entity.status }}</span></p>
                <p><span class="font-semibold font-mono">Подтверждено:</span> <span :class="entity.is_approved ? 'text-green-500' : 'text-red-500'">{{ entity.is_approved ? 'Да' : 'Нет' }}</span></p>
            </div>
            <NuxtLink to="/profile/add-entity" class="flex items-center justify-center gap-4 w-full py-6 bg-white rounded-xl shadow-lg transition-all duration-500 hover:opacity-60">
                <Icon class="text-3xl" name="material-symbols:add-diamond-rounded"/>
                <span>Добавить</span>
            </NuxtLink>
        </div>
        <div class="flex flex-col w-full items-center gap-4 text-center" v-else>
            <p class="text-2xl font-semibold font-mono">Вы пока ничего не опубликовали</p>
            <NuxtLink to="/profile/add-entity" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Добавить оборудование</NuxtLink>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Выход из аккаунта</p>
        <button @click="logout" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Выйти</button>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Профиль',
    lang: 'ru'
})


/* проверка роли и создание сообщений */
const userStore = useUserStore()
const { id:userId, role, logout } = useUserStore()
const { showMessage } = useMessagesStore()


/* подключение БД и роутера */
const supabase = useSupabaseClient()
const router = useRouter()


/* загрузка и логотип */
const isLoading = ref(false)
const logoFile = ref(null)


/* форма пользователя в зависимости от роли */
const userForm = ref({
    name: '',
    surname: '',
    patronymic: '',
    login: '',
    password: '',
    phone: '',
    email: '',
    company: '',
    image: ''
})


/* данные профиля и их загрузка */
const loadProfileData = async () => {
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()

    if (error) throw error

    if (data) userForm.value = data 
}


/* получение компаний */
const companies = ref([])
const loadCompanies = async() => {
    const { data } = await supabase
    .from('companies')
    .select('name')

    companies.value = data.map(item => item.name) || []
    companies.value.push('Амикон')
}


/* получение логотипа */
const getLogoUrl = (fileName) => {
    const { data } = supabase.storage.from('files/logos').getPublicUrl(fileName)
    return data.publicUrl
}


/* сохранение профиля */
const saveProfile = async () => {
    isLoading.value = true

    try {
        if (logoFile.value) {
            const file = logoFile.value
            const extension = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${extension}`

            const { error: uploadError } = await supabase.storage
            .from('files/logos')
            .upload(`${fileName}`, file)

            if (uploadError) throw uploadError

            userForm.value.image = fileName
        }

        userForm.value.is_approved = false

        const { error } = await supabase
        .from('users')
        .update(userForm.value)
        .eq('id', userId)

        if (error) throw error

        await loadProfileData()
        await userStore.loadProfileData()
        showMessage('Профиль обновлён!', true)
    } catch (error) {
        showMessage('Ошибка при сохранении: ' + error.message, false)
    } finally {
        isLoading.value = false
    }
}


/* подтверждение сохранения */
const saveClickCount = ref(0)

const handleSave = () => {
  saveClickCount.value++
  
  if (saveClickCount.value === 1) {
    showMessage('Нажмите еще раз для подтверждения', true)
    setTimeout(() => saveClickCount.value = 0, 5000)
  } else if (saveClickCount.value >= 2) {
    saveClickCount.value = 0
    saveProfile()
  }
}


/* удаление логотипа */
const removeLogoFile = async () => {
    if (!userForm.value.image) return

    const { error: removeError } = await supabase.storage
    .from('files')
    .remove([`logos/${userForm.value.image}`])

    // обновляем запись в базе данных
    const { error: updateError } = await supabase
    .from('users') 
    .update({ image: null })
    .eq('id', userId)

    if(!updateError && !removeError) {
        userForm.value.image = ''
        await userStore.loadProfileData()
        showMessage('Фото профиля удалено!', true)
    } else {
        showMessage('Произошла ошибка!', false)
    }
}


/* получение оборудования */
const entities = ref([])
const loadEntities = async() => {
    const { data, error } = await supabase
    .from('technic')
    .select()
    .eq('user_id', userId)

    if (data) {
        entities.value = data
    }
}


/* получение подразделений */
const divisions = ref([])
const loadDivisions = async() => {
    const { data, error } = await supabase
    .from('divisions')
    .select()
    .eq('user_id', userId)

    if (data) {
        divisions.value = data
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
        await loadEntities()
        await loadDivisions()
    } catch (error) {
        console.error('Ошибка обновления статуса вакансии:', error.message)
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
onMounted(async () => {
    loadProfileData()
    loadCompanies()
    loadEntities()
    loadDivisions()
})
</script>