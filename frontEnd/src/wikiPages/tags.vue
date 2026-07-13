
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const blocks = reactive<string[]>([]);

async function fetchFileContent(segments:string|string[]){
    const filePath = Array.isArray(segments) ? segments.join('/') : segments;
    const response = await fetch(`/cubyzdata/tags/${filePath}.json`);
    if(!response.ok)
    {
        return;
    }
    var json = JSON.parse(await response.text())["0.0.0"];
    var _blocks:string[] = json.blocks.tags;
    blocks.push(..._blocks);
}

onMounted(()=>{
    fetchFileContent(route.params.pathMatch??"")
})
</script>
<template>
    <div class="content">
        <h1>BLOCKS:</h1>
        <router-link class="button" v-for="value in blocks" :key="value" :to="`/wiki/blocks/`+value.split(':')[1]">
            {{value}} <br>
        </router-link>
    </div>
</template>

<style>
.content{
    padding: 1em;
}
</style>