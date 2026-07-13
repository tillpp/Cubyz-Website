<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BlockDisplay from '../component/blockDisplay.vue';
import { marked } from 'marked';

const route = useRoute()
const urlSegments = route.params.pathMatch;

const errorMessage = ref('')
const fileContent = ref('')



const blockName = ref('')
const absorbedLight = ref('')
const emittedLight = ref('')
const opaqueVariant = ref('')
const lodReplacement = ref('')
const rotation = ref('')
const tags = ref([])

// useful attributes for players
var mostUseful = reactive({});
var nerdInformation = reactive({});
var visualInformation = reactive({});



const model = ref('cube')

interface Item{
    item:string,
    amount: number
}
interface Drop {
    chance: number;
    items: Item[]
}
const drops = ref<Drop[]>()

var blockProfile = reactive({});
const router = useRouter()

async function fetchFileContent(segments:string|string[]) {
    const filePath = Array.isArray(segments) ? segments.join('/') : segments;

    const response = await fetch(`/cubyzdata/blocks/${filePath}.json`);
    const responseContent = await fetch(`https://raw.githubusercontent.com/PixelGuys/Cubyz-Wiki/main/docs/blocks/${filePath}.md`);

    console.log(response);
    console.log(responseContent);
    if(!response.ok){
        errorMessage.value = `There is no ${filePath} block`;
        return;
    }
    if(!responseContent.ok){
        fileContent.value = `There is no content for ${filePath}`;
    }
    fileContent.value = await marked.parse(await responseContent.text());
    var json = JSON.parse(await response.text());
    json = json["0.0.0"]
    // fileContent.value = json.obj 
    blockName.value = `${filePath}`;
    document.title = blockName.value;
    
    absorbedLight.value = '#' + json.obj.absorbedLight.toString(16).padStart(6, '0');
    delete json.obj.absorbedLight 
    emittedLight.value = '#' + json.obj.emittedLight.toString(16).padStart(6, '0');
    delete json.obj.emittedLight 
    opaqueVariant.value = json.obj.opaqueVariant;
    delete json.obj.opaqueVariant
    lodReplacement.value = json.obj.lodReplacement;
    delete json.obj.lodReplacement;
    tags.value = json.obj.tags;
    delete json.obj.tags;
    rotation.value = json.obj.rotation;
    delete json.obj.rotation;

    //useful attributes for players:
    (mostUseful as any).blockHealth = json.obj.blockHealth;
    delete json.obj.blockHealth;
    (mostUseful as any).blockResistance = json.obj.blockResistance;
    delete json.obj.blockResistance;
    const mostUsefulAttributes = ["friction","bounciness","density","terminalVelocity","mobility","collide"];
    for(let attr of mostUsefulAttributes){
        (mostUseful as any)[attr] = json.obj[attr];
        delete json.obj[attr];
        
    }
    
    const nerdAttributes = ["degradable","selectable","replacable"];
    for(let attr of nerdAttributes){
        (nerdInformation as any)[attr] = json.obj[attr];
        delete json.obj[attr];
        
    }
    
    const visualAttrib = ["transparent","alwaysViewThrough","viewThrough","hasBackFace"];
    for(let attr of visualAttrib){
        (visualInformation as any)[attr] = json.obj[attr];
        delete json.obj[attr];
    }
    
    
    
    //delete texture* attribute
    for(let key in json.obj){
        if(key.startsWith("texture"))
            delete json.obj[key];
        else console.log(key);
    }

    
    
    
    
    
    console.log(json.obj.drops);
    drops.value = json.obj.drops;
    delete json.obj.drops;
    
    blockProfile = json.obj;
    
}
onMounted(()=>{
    fetchFileContent(route.params.pathMatch??"")
})
</script>
<template>

    <div v-if="errorMessage" class="error">
      <p>Error: {{ errorMessage }}</p>
    </div>
    <h1 class="title" >{{ blockName }}</h1>
    
    <div class="page">
        <div class="content" >
            <div v-html="fileContent"></div>
            <div style="padding: 1em;">
                <h1>History:</h1>
                0.0.0 - Added to the game
            </div>
            <div class="drop">
                <h3>Drops:</h3>
                <table style="table-layout: auto"> 
                    <thead>
                        <tr>
                            <th>Chance</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="drop in drops">
                            <td>{{ drop.chance*100+"%" }}</td>
                            <td>
                                <div v-for="item in drop.items">
                                    {{item.amount}} x
                                    <RouterLink :to="`/wiki/items/${item.item.split(':')[1]}`">{{ item.item }}</RouterLink>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel">
            <h2 class="title" style="margin-top: 0;">{{ blockName }} [0.0.0]</h2>
             <BlockDisplay :block="blockName"/>
            <div class="tag" v-for="(value) in tags" :key="value">
                <RouterLink :to="`/wiki/tags/${value}`">{{ value }}</RouterLink>
            </div>
            <!-- most useful-->
            <table > 
                <thead>
                    <th>Attribute</th>
                    <th>Value</th>
                </thead>
                <tbody>
                    <tr v-for="(value, key, index) in mostUseful" :key="key">
                      <td>{{key}}</td>
                      <td>{{value}}</td>
                    </tr>
                </tbody>
            </table>
            <h2>for Nerds:</h2>
            <table > 
                <tbody>
                    <tr>
                      <td>rotation</td>
                      <td>
                        <RouterLink :to="`/wiki/rotation/${rotation.split(':')[1]}`">{{ rotation }}</RouterLink>
                      </td>
                    </tr>
                    <tr v-for="(value, key, index) in nerdInformation" :key="key">
                      <td>{{key}}</td>
                      <td>{{value}}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Visual:</h2>
            <table > 
                <tbody>
                    <tr>
                      <td>emittedLight</td>
                      <td>
                        <div style="width:1em;height:1em;display: inline-block;" :style="{backgroundColor:emittedLight}">
                        </div>
                        {{emittedLight}}
                      </td>
                    </tr>
                    <tr>
                      <td>absorbedLight</td>
                      <td>
                        <div style="width:1em;height:1em;display: inline-block;" :style="{backgroundColor:absorbedLight}">
                        </div>
                        {{absorbedLight}}
                      </td>
                    </tr>
                    <tr>
                      <td>opaqueVariant</td>
                      <td>
                        <RouterLink :to="`/wiki/block/${opaqueVariant.split(':')[1]}`">{{ opaqueVariant }}</RouterLink>
                      </td>
                    </tr>
                    <tr>
                      <td>lodReplacement</td>
                      <td>
                        <RouterLink :to="`/wiki/block/${lodReplacement.split(':')[1]}`">{{ lodReplacement }}</RouterLink>
                      </td>
                    </tr>
                     <tr v-for="(value, key, index) in visualInformation" :key="key">
                      <td>{{key}}</td>
                      <td>{{value}}</td>
                    </tr>
                </tbody>
            </table>
            
            <h2>other:</h2>
            <table > 
                <tbody>
                    <tr v-for="(value, key, index) in blockProfile" :key="key">
                      <td>{{key}}</td>
                      <td>{{value}}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>

    </div>
</template>

<style>
table {
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    width: 100%;
    table-layout: fixed;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
th {
    background-color: #555;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.page {
    display: grid;
    grid-template-columns: minmax(0, 800px) 400px;
    justify-content: center;
    gap: 20px;
    margin: 0;
    max-width: 800px;
}

.content{
    white-space: pre-wrap;
    tab-size: 4;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    overflow: hidden;
}
.panel {
    width: 100%;
    padding: 1rem;
    height: auto;
    background-color: #000;
    border: 1px solid #ddd;
    align-self: flex-start;
    border-radius: 10px;
    box-sizing: border-box;

}
@media (max-width: 800px) {
    .page{
        grid-template-columns: minmax(0, 800px);
        gap: 0px;
    }
    .panel{
        order: -1;
    }
}
.title {
    text-transform: capitalize;
    background: linear-gradient(rgba(64, 64, 64, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/textures/button.png) ;
    border-radius: 5px;
    padding: 0.5em;
}
.error {
    background-color: #770000;
    border-radius: 5px;
    padding: 1em;
}
.tag {
    background-color: #007700;
    border-radius: 10px;
    padding: 0.2em 0.5em;
    margin: 0.2em;
    width: fit-content;
    display: inline-block;
}
.tag a {
    text-decoration: none;
    color: white;
}

.drop {
    width: 100%;
    padding: 1rem;
    height: auto;
    background-color: #000;
    border: 1px solid #ddd;
    align-self: flex-start;
    border-radius: 10px;
    box-sizing: border-box;

}
</style>