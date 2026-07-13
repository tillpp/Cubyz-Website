<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const urlSegments = route.params.pathMatch;

var list = ref([]);
var listName = ref('');

async function fetchFileContent(segments:string|string[]) {
    listName.value = Array.isArray(segments) ? segments.join('/') : segments;

    const items = await fetch(`/cubyzdata/${listName.value}.json`);
    console.log(items);
    if(!items.ok){
        return;
    }

    var json = JSON.parse(await items.text());
    list.value = json.sort();
}
onMounted(()=>{
    fetchFileContent(route.params.pathMatch??"")
})
watch(()=>route.params.pathMatch,(value)=>{
    fetchFileContent(route.params.pathMatch??"")
});
</script>
<template>
    <div class="content">
        <h1>{{listName}}:</h1>
        <input type="text" id="search" placeholder="search (TODO)" autocomplete="search">
    </div>
    <div>
     <router-link
      v-for="page in list" 
      :key="page" 
      :to="`/wiki/`+listName+`/`+page"
      class="button"
      >
      cubyz:{{page}}<br>
    </router-link>
    </div>
</template>

<style>

.content {
    text-transform: capitalize;
    padding: 1em;
    display: inline-block;
}
.button {
    background-image: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/textures/button.png);
    background-color: #000000ff;
    opacity: 0.8; 
    border-radius: 4px;
    
    display: block;
    box-sizing: border-box; 
    color: #ffffff;
    padding: 10px;
    margin: 1px;
}
.button {
    text-decoration: none;
    color: white;
}
</style>