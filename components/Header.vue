<template>
    <header class="py-4 w-full grid-container shadow-[0px_0px_13px_-7px_black] bg-white">
        <div class="flex items-center justify-between gap-8">
            <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                <img src="/images/header/logo.png" alt="" class="w-40">
            </NuxtLink>
            <div class="flex items-center gap-6 uppercase text-base font-normal">
                <NuxtLink to="/" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>продукция</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
                <NuxtLink to="/" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>каталог</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
                <NuxtLink to="/" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>услуги</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
                <NuxtLink to="/" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>поддержка</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
                <NuxtLink to="/" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>о компании</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
                <NuxtLink v-if="userStore.authenticated && userStore.role === 'admin'" to="/admin" class="flex items-center gap-2 relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">
                    <span>Админ-панель</span>
                    <Icon class="text-[8px] text-violet-500" name="carbon:triangle-down-solid"/>
                </NuxtLink>
            </div>
            <div class="flex items-center gap-2">
                <NuxtLink :to="userStore.authenticated ? '/profile' : '/auth'" class="flex items-center gap-2 transition-all duration-500 hover:opacity-70">
                    <Icon v-if="!userStore.authenticated" class="text-3xl text-violet-500" name="material-symbols:account-circle-outline"/>
                    <span v-if="!userStore.authenticated">Войти</span>
                    <img v-if="userStore.authenticated" :src="getLogoUrl(userStore?.userData?.image)" alt="" class="object-cover object-center aspect-square w-8 rounded-full">
                    <span v-if="userStore.authenticated">{{ userStore?.userData?.surname }} {{ userStore?.userData?.name }}</span>
                </NuxtLink>
            </div>
        </div>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-2 px-6 py-2 text-lg rounded-xl w-fit font-medium font-mono bg-white border border-[#131313]/10 shadow-[0px_0px_13px_-7px_#131313]" :class="messageType ? ' text-[#131313]/80' : 'text-red-500'" v-if="messageTitle">
            <Icon class="text-3xl" name="material-symbols:close-small-rounded"/>
            <span>{{messageTitle}}</span>
        </button>
    </header>
</template>

<script setup>
/* создание сообщений */
const { messageTitle, messageType } = storeToRefs(useMessagesStore())


/* проверка роли и бд */
const supabase = useSupabaseClient()
const userStore = useUserStore()
const { id:userId, role, authenticated } = useUserStore()


/* получение логотипа */
const getLogoUrl = (fileName) => {
    const { data } = supabase.storage.from('files/logos').getPublicUrl(fileName)
    return data.publicUrl
}


/* первоначальная загрузка */
onMounted(() => {
    userStore.loadProfileData()
})
</script>