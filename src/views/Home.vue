<template>
  <div class="home-container">
     <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
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

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -50px;
  animation-delay: 5s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: -50px;
  left: 30%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

</style>
