<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <p class="mainHeading">Добавление подразделения</p>
            <NuxtLink to="/profile" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</NuxtLink>
        </div>
        <FormKit @submit="addDivision" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
            <FormKit v-model="divisionForm.address" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Адрес подразделения" name="Адрес подразделения" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Добавить</button>
        </FormKit>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Добавление подразделения',
    lang: 'ru'
})


/* проверка роли и создание сообщений */
const { id:userId, role } = useUserStore()
const { showMessage } = useMessagesStore()


/* создание формы и загрузка */
const isLoading = ref(false)
const divisionForm = ref({
    address : "",
    user_id: userId
})


/* подключение БД и роутера */
const supabase = useSupabaseClient()
const router = useRouter()


/* добавление сущности */
const addDivision = async() => {
    isLoading.value = true
    try {
        const { error } = await supabase
        .from('divisions')
        .insert(divisionForm.value)

        if (error) throw error

        showMessage('Подразделене добавлено!', true)

        router.push('/profile')
    } catch (error) {
        showMessage('Ошибка при добавлении: ' + error.message, false)
    } finally {
        isLoading.value = false
    }
}
</script>