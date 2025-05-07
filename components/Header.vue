<template>
    <header class="py-4 w-full grid-container">
        <div class="flex items-center justify-between gap-6 p-4 rounded-xl shadow-[0px_0px_13px_-7px_black] bg-white">
            <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                <img src="/images/header/logo.png" alt="" class="w-40">
            </NuxtLink>
            <div class="flex items-center gap-6">
                <NuxtLink to="/" class="relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">Тест</NuxtLink>
                <div class="flex items-center gap-2">
                    <NuxtLink to="/auth" class="flex">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:account-circle-outline"/>
                    </NuxtLink>
                </div>
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


/* проверка роли */
const userStore = useUserStore()


/* бд и получение данных */
</script>