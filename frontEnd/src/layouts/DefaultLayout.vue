<script setup lang="ts">
import { ref } from 'vue';
import SignIn from '../component/signIn.vue';
const showSignIn = ref(false);

</script>

<template>
  <nav>
    <div>
      <div class="button" style="float:right;z-index: 1000;" @click="showSignIn = true">Sign in</div>
    </div>
    <div class="banner">
      <img class="logo" src="/assets/images/CubyzLogo.png" alt="">
      <div>
        <router-link to="."><div class="button">Home</div></router-link> 
        <router-link to="forum"><div class="button">Forum</div></router-link> 
        <router-link to="information"><div class="button">Information</div></router-link> 
        <router-link to="addons"><div class="button">Addons</div></router-link> 
        <router-link to="servers"><div class="button">Servers</div></router-link> 
        <router-link to="blog"><div class="button">Blog</div></router-link> 
        <router-link to="wiki"><div class="button">Wiki</div></router-link> 
      </div>
    </div>
    
  </nav>
  <main>
    <RouterView></RouterView>
    <SignIn v-model:is-open="showSignIn"/>
  </main>
     
</template>


<style scoped>
nav {
    background-image: url(/assets/images/banner_compressed.png);
    background-position: center, center;
    background-size: cover;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    width: 100%;

    display: flex;
    flex-direction: column;
}


.banner {
    position: relative;
    text-align: center;
    image-rendering: pixelated;
    max-width: 1200px;
    height: 200px;
    object-fit: cover;
    display: block;
    margin: auto;
}

.banner .logo {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    align-self: center;
    height: 50%;
    width: auto;


    object-fit: cover;
    display: block;
    margin: auto;
}
.banner a{
    text-decoration: none;
}
.button {
    background-image: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/textures/button.png);
    background-color: #000000ff;
    opacity: 0.8; 
    border-radius: 4px;
    
    
    display: inline-block;
    color: #ffffff;
    padding: 10px;
    margin: 1px;
}

</style>
