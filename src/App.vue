<script setup>
import KanbanBoard from "./components/KanbanBoard.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header class="w-full backdrop-blur-sm text-lg sticky top-0 z-30">
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <main>
    <KanbanBoard />
  </main>
</template>

<style></style>
