<template>
  <div class="relative min-h-screen bg-green-50 pb-4">
    <nav>
      <div class="bg-green-50 p-4">
        <div class="container mx-auto flex items-center">
          <div class="flex space-x-4">
            <router-link
              class="text-green-700 font-semibold hover:text-green-800 hover:underline p-2"
              to="/"
            >
              <i-tabler:home class="icon" />Makers Tech
            </router-link>
            <router-link
              class="text-green-700 font-semibold hover:text-green-800 hover:underline p-2"
              to="/feed"
            >
              <i-tabler:list-search class="icon" />
              Feed
            </router-link>
          </div>

          <div class="ml-auto flex space-x-4">
            <!-- Login -->
            <router-link
              v-if="!isLoggedIn"
              class="srounded mx-4 my-2 text-green-700 font-semibold hover:text-green-800 hover:underline p-2"
              to="/sign-in"
            >
              <i-tabler:login-2 class="icon" />
              Login
            </router-link>

            <button
              v-if="isLoggedIn"
              @click="handleSignOut"
              class="text-green-700 font-semibold hover:text-green-800 hover:underline p-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
    <section class="max-w-7xl h-full mx-auto bg-green-50">
      <div class="container mx-auto">
        <router-view />
      </div>
    </section>
    <Footer />
    <Chat />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { auth } from './auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};
</script>
