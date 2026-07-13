<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import SignIn from '../component/signIn.vue';
const headNavigationPages = inject<{path:string,name:string}[]>('headNavigationPages',[]);

var sideBarNavigation = reactive({
    Overview:"/wiki",
    Blocks:"/wiki/list/blocks",
    Items:"/wiki/list/items",
    BlockEntities:"/wiki/list/blockEntities",
    Rotations:"/wiki/list/rotations",
    Modifiers:"/wiki/list/modifiers",
    Tags:"/wiki/list/tags",
    callback:"/wiki/list/callback",
    Window:"/wiki/list/window",
});

var showMenu = ref(false);

</script>

<template>
    <nav class="mainNav">
        <div class="banner">
              <img class="logo" src="/logo.png" alt="">
            <button id="more" class="button" @click="showMenu =! showMenu" style="aspect-ratio: 1;">≡</button>
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
    <div class="sidebarCommon sidebarMenu" v-if="showMenu">
        <router-link v-for="(value,key) in sideBarNavigation" :to="value" @click="showMenu = false" class="sidebarButton">
            {{ key }}
        </router-link>
    </div>
    <div class="middle">
        <aside class="sidebarCommon sidebar">
            <router-link v-for="(value,key) in sideBarNavigation" :to="value" @click="showMenu = false" class="sidebarButton">
            {{ key }}
            </router-link>
        </aside>
        <main>
            <RouterView></RouterView>
        </main>
    </div>
</template>



<style scoped>
.middle {
    display: grid;
    grid-template-columns: 200px minmax(0, 800px) 200px;
    gap: 20px;
    justify-content: center;
    margin: 0;
}

#more {
    display: none;
}
.sidebar {
    grid-column: 1;
}
.sidebarMenu{
    position: absolute;
    display: none;
    max-width: 200px;
    z-index: 9999;

}
.sidebarCommon {
    background: #333;
    color: white;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
    margin-top: 20px;
    box-sizing: border-box;
    height: fit-content;

    background-image: url(assets/textures/cobblestone_1.png);
    background-size: 50px;
    border-radius: 5px;
    box-shadow: inset 0 10px 50px #000000, 10px 10px #000000;
}

@media (max-width: 1220px) {
    .middle{
        grid-template-columns: 0 minmax(0, 800px) 0;
        gap: 0px;
    }
    .sidebar{
        display: none;
    }
    .sidebarMenu{
        display: block;
    }
    #more {
        display: inline;
    }
}
main {
    grid-column: 2;

    width: 100%;
    max-width: 800px;
    min-height: 100vh;
    margin: auto;
    margin-bottom: 20px;
    padding: 8px;
    box-sizing: border-box;

    background-image: url(/assets/textures/soil.png);
    background-size: 50px;
    border-radius: 5px;
    box-shadow: inset 0 10px 50px #000000, 10px 10px #000000;
}
.mainNav {
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
    max-width: 800px;
    min-height: 100px;
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
    background-image: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/textures/button.png);
    background-color: #000000ff;
    opacity: 0.8; 
    border-radius: 4px;
    
    display: inline-block;
    box-sizing: border-box; 
    color: #ffffff;
    padding: 10px;
    margin: 1px;
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

}

</style>
