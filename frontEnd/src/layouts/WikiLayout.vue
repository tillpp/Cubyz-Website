<script setup lang="ts">
import { inject, ref } from 'vue';
import SignIn from '../component/signIn.vue';
const showSignIn = ref(false);
const headNavigationPages = inject<{path:string,name:string}[]>('headNavigationPages',[]);
</script>

<template>
  <nav>
    <div class="banner">
          <img class="logo" src="/logo.png" alt="">
          <router-link
          v-for="page in headNavigationPages" 
          :key="page.path" 
          :to="page.path"
          class="button"
          >
          {{page.name}}
        </router-link>
        <!-- <div class="button" style="float: right;" @click="showSignIn = true">Sign in</div> -->
    </div>
    
  </nav>
  <main>
    <RouterView></RouterView>
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
    image-rendering: pixelated;
    max-width: 1200px;
    height: 100px;
    object-fit: cover;
    display: block;
    margin: auto;
    width: 100%;
}

.banner .logo {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    align-self: left;
    height: 100px;
    width: auto;


    object-fit: cover;
    display: inline-block;
}
.banner a{
    text-decoration: none;
}
.button {
    background-image: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 1)), url(/assets/textures/button.png);
    background-color: #000000ff;
    opacity: 1; 
    border-radius: 4px;
    
    
    display: inline-block;
    box-sizing: border-box; 
    color: #ffffff;
    padding: 10px;
    margin: 1px;
}

</style>
