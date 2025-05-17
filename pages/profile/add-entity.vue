<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <p class="mainHeading">Добавление оборудования</p>
            <NuxtLink to="/profile" class="px-4 py-2 w-40 border border-violet-500 hover:bg-violet-500 hover:text-white rounded-full text-center transition-all duration-500 text-violet-500 bg-transparent">Назад</NuxtLink>
        </div>
        <FormKit @submit="addEntity" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center grow">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="entityForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Наименование" name="Наименование" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-model="entityForm.type" validation="required" messages-class="text-[#E9556D] font-mono" type="select" :options="['ПО', 'Оборудование']" placeholder="Тип" name="Тип" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            </div>
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="entityForm.number" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Серийный номер" name="Серийный номер" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-if="entityForm.type == 'Оборудование'" v-model="entityForm.model" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Модель" name="Модель" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-if="entityForm.type == 'ПО'" v-model="entityForm.version" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Версия" name="Версия" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
                <FormKit v-model="entityForm.certificate" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Сертификат КТО" name="Сертификат КТО" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            </div>
            <FormKit v-if="divisions && divisions.length > 0" v-model="entityForm.address" validation="required" messages-class="text-[#E9556D] font-mono" type="select" :options="divisions" placeholder="Место использования" name="Место использования" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-violet-500 shadow-md"/>
            <p class="font-semibold text-xl max-w-xl text-center" v-else><span class="text-red-500">Ошибка:</span> нет подразделений. Добавьте подразделение в личном кабинете.</p>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-violet-500 bg-violet-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-violet-500 hover:bg-transparent">Добавить</button>
        </FormKit>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Добавление оборудования',
    lang: 'ru'
})


/* проверка роли и создание сообщений */
const { id:userId, role } = useUserStore()
const { showMessage } = useMessagesStore()


/* создание формы и загрузка */
const isLoading = ref(false)
const entityForm = ref({
    name : "",
    type : "ПО",
    number : "",
    model : "",
    certificate : "",
    version: "",
    address : "",
    user_id: userId
})


/* подключение БД и роутера */
const supabase = useSupabaseClient()
const router = useRouter()


/* добавление сущности */
const addEntity = async() => {
    isLoading.value = true
    try {
        const { error } = await supabase
        .from('technic')
        .insert(entityForm.value)

        if (error) throw error

        showMessage('Оборудование добавлено!', true)

        router.push('/profile')
    } catch (error) {
        showMessage('Ошибка при добавлении: ' + error.message, false)
    } finally {
        isLoading.value = false
    }
}


/* получение подразделений */
const divisions = ref([])
const loadDivisions = async() => {
    const { data, error } = await supabase
    .from('divisions')
    .select('address')
    .eq('user_id', userId)

    if (data) {
        divisions.value = data.map(item => item.address)
    }
}


/* первоначальная загрузка */
onMounted(() => {
    loadDivisions()
})
</script>