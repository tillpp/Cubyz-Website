<script setup lang="ts">

const isOpen = defineModel('isOpen')


</script>
<template>
            <!-- <button  style="display: inline-block;float:right">X</button> -->

    <div v-if="isOpen" class="popup">
        <div @click="isOpen = false" class="close"></div>
        <div class="content">
            <h3 style="display: inline-block;font-size: 2em;">SignIn</h3>
            <form action="" method="post">
                <input type="text"  name="name"        id="name"     placeholder="Username" required autocomplete="username" /> <br>
                <input type="password" name="password" id="password" placeholder="Password" required autocomplete="current-password"/><br>
                <input type="submit" value="Sign in!" />
            </form>
            <button style="">New? Sign up!</button><br>

        </div>
    </div>
</template>

<style scoped>
.close {
    position: fixed;
    inset: 0;
    display: flex;
}
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
input{
    padding: 0.5em;
    margin: 0.8em;
    min-width: 200px;
}
</style>