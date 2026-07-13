<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
</script>
<template>
    Check out:
    <router-link to="/wiki/blocks/soil" class="sidebarButton" style="margin-top: 2em;">
      Soil Block
    </router-link> <br>
</template>

<style>
.content {
    padding: 1em;
    display: inline-block;
}

.sidebarButton {
    background-image: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 1)), url(/assets/textures/button.png);
    background-color: #000000ff;
    opacity: 1; 
    border-radius: 4px;
    
    
    display: inline-block;
    box-sizing: border-box; 
    color: #ffffff;
    padding: 10px;
    margin: 1px;

    width: 100%;
    text-align: center;
    text-decoration: none;

    max-width: 200px;

}
</style>