<template>
  <div style="padding: 24px">
    <h1>Welcome to Vue with Ant Design Vue</h1>

    <div style="margin-bottom: 16px">
      <a-input
        v-model:value="name"
        placeholder="Name"
        style="margin-right: 8px; width: 200px"
      />
      <a-input
        v-model:value="email"
        placeholder="Email"
        style="margin-right: 8px; width: 200px"
      />
      <a-button type="primary" @click="handleSaveUser" :loading="loading">
        Save User
      </a-button>
    </div>

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
import { message } from 'ant-design-vue';
import { fetchUsers, createUser } from '@/api/user';

const users = ref([]);
const name = ref('');
const email = ref('');
const loading = ref(false);

onMounted(() => {
  fetchUsers()
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.error('Failed to fetch users:', error);
      message.error('Failed to load users');
    });
});

const handleSaveUser = () => {
  if (!name.value.trim() || !email.value.trim()) {
    message.warning('Please enter both name and email');
    return;
  }

  loading.value = true;
  createUser({ name: name.value, email: email.value })
    .then((response) => {
      users.value.push(response.data);
      name.value = '';
      email.value = '';
      message.success('User added successfully!');
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
      message.error('Failed to add user');
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
