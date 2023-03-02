<script setup>
    const props = defineProps({
        /* Text below icon */
        name: {},
        /*
            Location of this item in the menu bar
        */
        index: {},
        /*
            Current state
        */
        step: {},
        /* Error state */
        error: {},
    })
</script>

<template>
<div v-if="index != 0" class="flex-auto border-t-2 transition duration-500 ease-in-out" :class="[error ? 'border-red-500' : step >= index ? 'border-duraaccent' : '']"></div>
<div class="flex items-center relative" :class="[error ? 'text-red-500' : step > index ? 'text-duraaccent' : step == index ? 'text-darkcyan' : 'text-white']">
    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2" :class="[error ? 'border-red-500' : step >= index ? 'border-duraaccent' : '', error ? '' : step == index ? 'bg-duraaccent' : '']">
        <slot></slot>
    </div>
    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase hidden md:block" :class="[error ? 'text-red-500' : step >= index ? 'text-duraaccent' : 'text-white']">{{ error? '' : name }}</div>
</div>
</template>