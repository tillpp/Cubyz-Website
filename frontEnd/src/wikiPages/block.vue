<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const urlSegments = route.params.pathMatch;

const errorMessage = ref('')
const fileContent = ref('')

async function fetchFileContent(segments:string|string[]) {

    const filePath = Array.isArray(segments) ? segments.join('/') : segments;

    const response = await fetch(`/cubyz/0.0.0/blocks/${filePath}.zig.zon`);
    console.log(response);
    if(!response.ok){
        errorMessage.value = `File not found (${response.status})`;
        return;
    }
    fileContent.value = await response.text()
}
onMounted(()=>{
    fetchFileContent(route.params.pathMatch??"")
})
</script>
<template>
    <div v-if="errorMessage" class="error">
      <p>Error: {{ errorMessage }}</p>
    </div>
    <div class="content">
        <pre>{{ fileContent }}</pre>
    </div>
</template>

<style>
.content {
    padding: 1em;
}
.error {
    background-color: #770000;
    border-radius: 5px;
    padding: 1em;
}
</style>