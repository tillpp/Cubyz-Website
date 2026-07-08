<script setup lang="ts">
</script>

<template>
      <nav>
      <div class="banner">
        <img class="logo" src="/assets/images/CubyzLogo.png" alt="">
        <div>
          <router-link to="."><div class="button">Home</div></router-link> 
          <router-link to="."><div class="button">Features (no page)</div></router-link> 
          <router-link to="information"><div class="button">Information</div></router-link> 
          <router-link to="addon"><div class="button">Addon</div></router-link> 
        </div>
      </div>
  </nav>
  <main>
        <RouterView></RouterView>
  </main>
     
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
