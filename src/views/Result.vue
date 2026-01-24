<template>
  <div style="padding: 24px">
    <h1>Welcome to Vue with Ant Design Vue</h1>

    <div>
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} ({{ user.email }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);


onMounted(async () => {
  const data = sessionStorage.getItem('tripPlan')
  if (data) {
    users.value = JSON.parse(data)
  }
})

</script>