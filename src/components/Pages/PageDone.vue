<script setup>
    const refresh = () => {
        window.location.reload();
    }
</script>

<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div class="container py-10 ">
            <h3 class="text-xl font-semibold">Update Successful!</h3>
            <button class="bg-durablue text-white py-2 px-24 rounded-md my-10 text-xl transition delay-100 hover:bg-duraaccent"
        @click="refresh">Update another device</button>
        </div>
    </div>
</template>