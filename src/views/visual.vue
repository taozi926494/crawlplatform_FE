<template>
 <div class="visual">{{ jump }}</div>
</template>
<script>
export default {
  computed: {
    jump() {
      const visualUrl = process.env.BACKEND_URL + '/visual'
      window.location = visualUrl
    }
  }
}
</script>