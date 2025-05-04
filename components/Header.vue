<template>
    <header class="py-4 w-full grid-container">
        <div class="flex items-center justify-between gap-6 p-4 rounded-xl shadow-[0px_0px_13px_-7px_black]">
            <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                <img src="/images/header/logo.png" alt="" class="w-40">
            </NuxtLink>
            <div class="flex items-center gap-6">
                <NuxtLink to="/" class="relative after:w-0 after:h-[2px] after:bg-violet-500 after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full">Тест</NuxtLink>
                <div class="flex items-center gap-2">
                    <NuxtLink to="/" class="flex">
                        <Icon class="text-3xl text-violet-500" name="material-symbols:account-circle-outline"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>

</script>