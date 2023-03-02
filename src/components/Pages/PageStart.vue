<script setup>

const props = defineProps({
  service: {},
  machine: {}
})

</script>

<template>
<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
    <div class="row">
        <h3 class="text-xl font-semibold">Please connect your LinkTouch with your smartphone or computer.</h3>
        <button class="bg-durablue text-white py-2 px-24 rounded-md my-10 text-xl transition delay-100 hover:bg-duraaccent" @click="machine.send({ type: 'CONTINUE' })">Continue</button>
    </div>
  </div>
</template>