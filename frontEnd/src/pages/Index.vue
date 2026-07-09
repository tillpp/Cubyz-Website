<script setup lang="ts">
import { computed, ref } from 'vue';

    var images = [
        "assets/images/screenshots/shader_blueflowers.png",
        "assets/images/screenshots/water_cave.png",
        "assets/images/screenshots/shaded_bench.png",
        "assets/images/screenshots/icymountain.png",
        "assets/images/screenshots/rainbow-trees.png"
    ];
    const position = ref([0, 1, 2]);

    const handleAnimationLoop = (trackIndex:number) => {
        position.value[trackIndex] = ((position.value[trackIndex] ?? 0) + 3)%images.length;
        console.log(position.value[trackIndex]);
    };
</script>

<template>
     <div class="slideshow-container">
        <img class="slide" :src="images[position[0]??0]"  :style="{ animationDelay: '0s' }"  @animationiteration="handleAnimationLoop(0)" alt="">
        <img class="slide" :src="images[position[1]??0]"  :style="{ animationDelay: '4s' }"  @animationiteration="handleAnimationLoop(1)" alt="">
        <img class="slide" :src="images[position[2]??0]"  :style="{ animationDelay: '8s' }"  @animationiteration="handleAnimationLoop(2)" alt="">
    </div>
         <p style="text-align: center;"> <!--Change the "text-align: center" to "display none" if you want it gone.-->
            Embark on an thrilling journey across vast landscapes, <br>exploring the deepest of caves <br>unseen by
            daylight.
            Discover ancient minerals, untouched by time, <br>as you discover more in this forgotten
            <br>world.
        </p>
        <div class="flexbox">
            <div class="container">
                <p class="title">
                    Free and Open Source
                </p>
                <p>
                    You can also become a contributor and make miracles in Cubyz's development.<br>
                    <button onclick="window.location.href='https://github.com/PixelGuys/Cubyz'">Github</button><button
                        onclick="window.location.href='https://github.com/PixelGuys/Cubyz/issues'">Issues</button><button
                        onclick="window.location.href='https://github.com/PixelGuys/Cubyz/wiki/Addons'">Make
                        Addons</button>
                </p>
            </div>
            <div class="container">
                <p class="title">
                    Installation in Four Clicks
                </p>
                <p>
                    The guide can be found <a href="https://github.com/PixelGuys/Cubyz/blob/master/README.md">here</a>.
                </p>
            </div>
        </div>
        <div class="container">
            <p class="title">
                Features
            </p>
            <p>
                Cubyz is a limitless indie game which uses voxels as a base, but don't think that's all! We have a
                ton of our own features. If you want your own features, you can expand the game with addons. <br><br>
                TL;DR: Like a similar cube game, but with more possibilities. <br><br>
                - No height limit <br>
                - No depth limit <br>
                - Farther render distances <br>
                - Immersive fog of all colors <br>
                - Crystals of all colors <br>
                - Colored glass that filters light <br>
                - Mod and addon friendly
            </p>
        </div>
        <div class="container">
            <p class="title">
                Features:
            </p>
            TODO
           
        </div>
</template>

<style scoped>

.slideshow-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 450px;
    margin: auto;
    overflow: hidden;
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: translateX(-100%);
    animation: slideAnimation 12s cubic-bezier(0.25, 1, 0.5, 1) infinite;
    border-radius: 10px;
}

@keyframes slideAnimation {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  11% {
    transform: translateX(0);
    opacity: 1;
  }
  33% {
    transform: translateX(0);
    opacity: 1;
  }
  46% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

</style>