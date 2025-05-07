<template>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Подтверждение пользователей</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="users && users.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-lg" v-for="user in users" :key="user.id">
                <div class="flex items-center gap-2 self-end">
                    <button type="button" v-if="user.is_approved == false" @click="updateEntityStatus(user.id, 'users')" class="cursor-pointer">
                        <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                    </button>
                    <button type="button" @click="deleteEntity(user.id, 'users')" class="cursor-pointer">
                        <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                    </button>
                </div>
                <p><span class="font-semibold font-mono">Id:</span> {{ user.id }}</p>
                <p><span class="font-semibold font-mono">Имя:</span> {{ user.surname }} {{ user.name }}</p>
                <p><span class="font-semibold font-mono">Почта:</span> {{ user.email }}</p>
                <p><span class="font-semibold font-mono">Телефон:</span> {{ user.phone }}</p>
                <p><span class="font-semibold font-mono">Подтвержден:</span> {{ user.is_approved ? 'Да' : 'Нет' }}</p>
            </div>
        </div>
        <p v-else class="text-2xl font-semibold text-center">Пользователей пока нет</p>
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
const users = ref([])
const fetchUsers = async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .order('id', { ascending: true })
            .eq('role', 'user')
        if (error) throw error
        users.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки пользователей:', error.message)
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
        // добавить ещё загрузку
    } catch (error) {
        console.error('Ошибка обновления статуса вакансии:', error.message)
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
        // добавить ещё загрузку
    } catch (error) {
        console.error('Ошибка обновления статуса вакансии:', error.message)
    }   
}


/* первоначальная загрузка */
onMounted(() => {
    fetchUsers()
})
</script>