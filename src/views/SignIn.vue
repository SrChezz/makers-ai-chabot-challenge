<template>
  <div class="flex flex-col justify-center w-full h-full">
    <div
      class="w-content m-auto text-center border-gr rounded-xl bg-white py-8 px-12 mt-16"
    >
      <h1 class="text-xl font-sans font-bold text-green-900">Sign in</h1>
      <p class="text-green-800 my-2 w-">
        Enter your details to get sign in to you account
      </p>

      <p class="text-green-800 my-2 w-">Demo email: test@gmail.com</p>
      <p class="text-green-800 my-2 w-">Demo password: 123456</p>

      <div class="my-4">
        <input
          class="w-10/12 outline rounded-lg py-2 px-4 outline-gray-200"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="my-4">
        <input
          class="w-10/12 outline rounded-lg py-2 px-4 outline-gray-200"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>

      <p class="my-2 text-sm font-semibold text-red-500" v-if="errMsg">
        <i-tabler:alert-triangle-filled class="icon" />{{ errMsg }}
      </p>

      <button
        class="my-2 w-10/12 bg-green-600 p-2 text-white font-bold rounded-xl cursor-pointer hover:bg-green-800"
        @click="signIn"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref();

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => {
      console.log('Successfully logged in!');
      console.log(data);

      router.push('/feed');
    })
    .catch(error => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email';
          break;
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found';
          break;
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect Password';
          break;
      }
    });
};
</script>
