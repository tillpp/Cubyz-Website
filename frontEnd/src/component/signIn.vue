<script setup lang="ts">

const isOpen = defineModel('isOpen')


</script>
<template>
    <div v-if="isOpen" class="popup">
        <div class="content">
            <h3>SignIn</h3>
            Page under construction <br>
            <button @click="isOpen = false">Close</button>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0006;
}
.content {

    padding: 1rem;
    background-image: linear-gradient(#000000a0 0%, #000000a0 100%), url(assets/textures/water.png);
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    background-size: 64px;
    backdrop-filter: blur(4px);
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 600px;
}

</style>