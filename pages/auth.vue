<template>
    <FormKit @submit="authUser" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
        <p class="mainHeading">Вход</p>
        <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
            <FormKit v-model="user.login" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Логин" name="Логин" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <FormKit v-model="user.password" validation="required|length:6" messages-class="text-[#E9556D] font-mono" type="password" placeholder="······" name="Пароль" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
        </div>
        <button type="submit" :disabled="isAuthDisabled" :class="{ 'opacity-50 cursor-not-allowed': isAuthDisabled }" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Вход</button>
        <div class="flex items-center justify-center gap-4 w-full md:w-2/3 lg:w-1/2 my-10">
            <div class="w-1/3 h-px bg-violet-500"></div>  
            <p class="font-semibold font-mono tracking-widest text-violet-500">или</p>
            <div class="w-1/3 h-px bg-violet-500"></div>  
        </div>
        <NuxtLink to="/reg" class="mx-auto px-4 py-2 border border-violet-500 text-violet-500 rounded-full w-[160px] text-center transition-all duration-500 hover:text-white hover:bg-violet-500">Регистрация</NuxtLink>
    </FormKit>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Вход',
    lang: 'ru'
})


/* создание пользователя */
const user = ref({
    login: "",
    password: ""
})


/* создание сообщений и подключение хранилищ */
const { showMessage } = useMessagesStore()
const { login, loadProfileData } = useUserStore()


/* подключение БД и роутера */
const supabase = useSupabaseClient()
const router = useRouter()


/* вход */
const isAuthDisabled = ref(false)
const authUser = async() => {  
    isAuthDisabled.value = true
    const { data: users, error } = await supabase
    .from('users')
    .select("*")
    .eq('login', user.value.login)
    .eq('is_approved', true)

    if (!users[0]) {
        user.value.login = ""
        isAuthDisabled.value = false
        return showMessage("Неверный логин или профиль не подтверждён!", false)              
    }

    if (user.value.password !== users[0].password) {
        user.value.password = ""
        isAuthDisabled.value = false
        return showMessage('Неверно введен пароль!', false)            
    }

    showMessage('Успешный вход!', true)
    login(users[0].id, users[0].role)
    isAuthDisabled.value = false
    loadProfileData()

    if(users[0].role === 'user') {
        router.push('/profile')
    }
    if(users[0].role === 'admin') {
        router.push('/admin')
    }
} 
</script>