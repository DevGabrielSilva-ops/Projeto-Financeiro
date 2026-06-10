<template>
  <div class="stat-card">
    <span>{{ label }}</span>
    <strong :class="tone">{{ value }}</strong>
  </div>
</template>
<script setup>
defineProps({ label: String, value: String, tone: String })
</script>
