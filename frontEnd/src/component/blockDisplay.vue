<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const props = defineProps({
    block: String,
});

const containerRef = useTemplateRef<HTMLDivElement>('container');


interface quad{
}
interface ModelJson{
  texture:string;
  x:number,
  y:number,
  z:number,

  textureId:number,
  cornerUV:number[],
  corners:number[],
  normal:number[]
  isBackFace:boolean,
};

const vertexShader = `
in vec3 position;
in vec2 uv;
in float layerIndex;

out vec2 vUv;
out float vLayerIndex;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
    vUv = uv;
    vLayerIndex = layerIndex;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.y-0.5,-position.z+0.5,position.x-0.5, 1.0);
}
`;
const fragmentShader = `
precision highp float;
precision highp sampler2DArray;

in vec2 vUv;
in float vLayerIndex;

out vec4 fragColor;

uniform sampler2DArray utextureArray;

void main() {
  fragColor = texture(utextureArray, vec3(vUv, vLayerIndex));
}
`;

function getImageData(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap, width: number, height: number):Uint8Array{
  const canvas = document.createElement('canvas');
  canvas.height = height;
  canvas.width  = width;

  const ctx = canvas.getContext('2d');
  if(!ctx) throw new Error('Error');

  ctx.drawImage(image,0,0, width, height);
  const imgData = ctx.getImageData(0,0,width,height);
  return new Uint8Array(imgData.data.buffer);
}
async function init() {
  const container = containerRef.value;
  if(!container)
    return;

  const modelData = await fetch(`/blockModel/0.0.0/${props.block}.json`);
  if(!modelData.ok){
    return;
  }
  var modelJson:ModelJson[] = JSON.parse(await modelData.text());

  //load models texture
  var textureArray:THREE.DataArrayTexture|null = null;
  {
    var texturePath = new Array<string>();   
    var texturePathInverse:Record<string,number> = {};
    // remove duplicates and assign each texture an id
    {
      var texturePathSet = new Set<string>([]);
      for(var json of modelJson){
        const path = json.texture;
        json.texture = "/cubyz/0.0.0/"+path.slice(path.indexOf("blocks"));
        texturePathSet.add(json.texture);
      }
      texturePathSet.forEach((path:string)=>{
        console.log(path);
        texturePathInverse[path] = texturePath.length;
        texturePath.push(path);
      })
      for(var json of modelJson){
        const textureId = texturePathInverse[json.texture];
        if(textureId!=undefined){
          json.textureId = textureId;
        }else{
          console.log("errror"+json.texture);
        }
      }
      console.log(modelJson);
    }
    const loader = new THREE.TextureLoader();
    const loadPromises = texturePath.map((path,index)=>{
      return new Promise<THREE.Texture>((resolve, reject)=>{
        loader.load(path,resolve,undefined,reject);
      });
    });
    const loadedTexture = await Promise.all(loadPromises);

    const texWidth  = 16;
    const texHeight = 16;
    const numLayers = loadedTexture.length;

    const combinedData = new Uint8Array(texWidth * texHeight * 4 * numLayers);

    loadedTexture.forEach((texture,index)=>{
      const imgElement = texture.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap;
      const imgData = getImageData(imgElement, texWidth, texHeight);
      const offset = index * texWidth * texHeight * 4;
      combinedData.set(imgData, offset);
    });

    textureArray = new THREE.DataArrayTexture(combinedData, texWidth, texHeight,numLayers);
    textureArray.format = THREE.RGBAFormat;
    textureArray.type   = THREE.UnsignedByteType;
    textureArray.minFilter = THREE.NearestFilter;
    textureArray.magFilter = THREE.NearestFilter;
    textureArray.needsUpdate = true;

  }
  if(textureArray == null)
    return;

  const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,fragmentShader: fragmentShader,glslVersion: THREE.GLSL3, uniforms:{
      utextureArray: { value: textureArray}
    }
  });


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( container.clientWidth , container.clientHeight );
  container.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;

  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 1;
  {
    var vertices = new Float32Array(modelJson.length*6*6);
    {
      let index = 0;
      for(let face of modelJson){
        var indices = [0,2,1,1,2,3];
        for (let i of indices) {  
          const vert:number[] = [
          face.corners[i*3] as number, 
          face.corners[i*3+1]  as number,
          face.corners[i*3+2] as number, 
          face.cornerUV[i*2] as number,
          face.cornerUV[i*2+1] as number, 
          face.textureId];
          vertices.set(vert,index);
          index += vert.length;
        }
      }
    }
    console.log(vertices);
    // var vertices = new Float32Array(
    // [
    //     -1.5, -0.5,  0.0,  0.0, 0.0,  0.0,
    //     -0.5, -0.5,  0.0,  1.0, 0.0,  0.0,
    //     -1.0,  0.5,  0.0,  0.5, 1.0,  0.0,

    //      0.5, -0.5,  0.0,  0.0, 0.0,  1.0,
    //      1.5, -0.5,  0.0,  1.0, 0.0,  1.0,
    //      1.0,  0.5,  0.0,  0.5, 1.0,  1.0,
    // ]);

    const dummyGeometry = new THREE.BufferGeometry();
    const customMesh = new THREE.Mesh(dummyGeometry, material);
    customMesh.frustumCulled = false;
    dummyGeometry.setDrawRange(0, 6);

    const gl = renderer.getContext() as WebGL2RenderingContext;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;

    let isCompiled = false;
    customMesh.onBeforeRender = (rendererInstance, _scene, _camera) => {
      const webglRenderer = rendererInstance as THREE.WebGLRenderer;
      const state = webglRenderer.state;
      
      const materialProperties = webglRenderer.properties.get(material) as { currentProgram?: { program: WebGLProgram } };
      const gpuProgram = materialProperties.currentProgram;

      if (!gpuProgram) 
        return;
        
        const programInfo = gpuProgram.program;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(1,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(programInfo);

        const uModelViewMatrix = gl.getUniformLocation(programInfo, 'modelViewMatrix');
        const uProjectionMatrix = gl.getUniformLocation(programInfo, 'projectionMatrix');
        gl.uniformMatrix4fv(uModelViewMatrix, false, customMesh.modelViewMatrix.elements);
        gl.uniformMatrix4fv(uProjectionMatrix, false, _camera.projectionMatrix.elements);

        const uTextureArrayLoc = gl.getUniformLocation(programInfo, 'utextureArray');
        gl.activeTexture(gl.TEXTURE0);
        if(textureArray == null)
        return;
      
      webglRenderer.initTexture(textureArray);
      const textureProperties = webglRenderer.properties.get(textureArray) as any;
      const gpuTexture = textureProperties.__webglTexture3D || textureProperties.__webglTexture;
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, gpuTexture);
        gl.uniform1i(uTextureArrayLoc, 0);

        if (!vao) {
            vao = gl.createVertexArray();
            vbo = gl.createBuffer();
            gl.bindVertexArray(vao);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
            const locPosition = gl.getAttribLocation(programInfo, 'position');
            const locUv = gl.getAttribLocation(programInfo, 'uv');
            const locLayerIndex = gl.getAttribLocation(programInfo, 'layerIndex');

            if (locPosition !== -1) {
                gl.enableVertexAttribArray(locPosition);
                gl.vertexAttribPointer(locPosition, 3, gl.FLOAT, false, stride, 0);
            }
            if (locUv !== -1) {
                gl.enableVertexAttribArray(locUv);
                gl.vertexAttribPointer(locUv, 2, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
            }
            if (locLayerIndex !== -1) {
                gl.enableVertexAttribArray(locLayerIndex);
                gl.vertexAttribPointer(locLayerIndex, 1, gl.FLOAT, false, stride, 5 * Float32Array.BYTES_PER_ELEMENT);
            }
        }

        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, modelJson.length*6);
        gl.bindVertexArray(null);
        state.reset();
    };
    scene.add(customMesh);
  }  

  function animate( time:DOMHighResTimeStamp ) {
    controls.update();
    
    renderer.render( scene, camera );
  }
  renderer.setAnimationLoop( animate );
}

watch(()=> props.block, (value,oldValue)=>{
    init();
});


</script>
<template>
    
  <div draggable="false" ref="container" class="model"></div>
</template>


<style scoped>
.model {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
}
</style>
