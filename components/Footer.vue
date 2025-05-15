<template>
    <footer class="w-full grid-container py-4 bg-[#1F192E] text-white mt-auto">
        <div class="w-full flex items-center gap-6 justify-between">
            <div class="flex flex-col gap-2">
                <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                    <img src="/images/footer/logo.png" alt="" class="w-40">
                </NuxtLink>
                <p class="font-light text-sm"> с 2025 г. Все права защищены <br> Дизайн и разработка сайта: ООО “АМИКОН”</p>
            </div>
            <div class="flex flex-col items-center text-center gap-4 text-sm font-light p-4">
                <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70 underline">Условия использования материалов сайта</NuxtLink>
                <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70 underline">Политика обработки персональных данных</NuxtLink>
            </div>
            <div class="flex flex-col gap-4 items-center p-4">
                <div class="flex items-center justify-center gap-4">
                    <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                        <img src="/public/images/footer/telegram.png" alt="">
                    </NuxtLink>
                    <NuxtLink to="/" class="transition-all duration-500 hover:opacity-70">
                        <img src="/public/images/footer/mail.png" alt="">
                    </NuxtLink>
                </div>
                <NuxtLink to="mailto:info@amicon.ru" class="transition-all duration-500 hover:opacity-70 text-sm font-light" target="_blank">E-mail: info@amicon.ru</NuxtLink>
            </div>
            <div class="flex flex-col gap-2 p-4 items-center text-sm font-light">
                <div class="flex flex-col">
                    <NuxtLink to="tel:+7 495 797 6412" class="transition-all duration-500 hover:opacity-70 underline" target="_blank">+7 495 797 6412</NuxtLink>
                    <NuxtLink to="tel:+7 495 781 8922" class="transition-all duration-500 hover:opacity-70 underline" target="_blank">+7 495 781 8922</NuxtLink>
                    <NuxtLink to="tel:+7 495 781 8923" class="transition-all duration-500 hover:opacity-70 underline" target="_blank">+7 495 781 8923</NuxtLink>
                </div>
                <div class="flex flex-col items-center">
                    <p>Техподдержка</p>
                    <NuxtLink to="tel:+7 495 797-6413" class="transition-all duration-500 hover:opacity-70 underline" target="_blank">+7 495 797-6413</NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>

</script>