<script setup>
import Scoreboard from './components/Scoreboard.vue';
</script>

<template>
<div class="app-background">
  <Scoreboard />
</div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

body {
  background-image: url('./assets/court-background.jpg');
  background-size: cover;
  background-attachment: fixed;
}
</style>
