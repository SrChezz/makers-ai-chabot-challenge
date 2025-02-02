<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-green-900">
        ¡Ayúdanos a recomendarte!
      </h2>
      <form @submit.prevent="submitForm">
        <!-- Pregunta 1: Tipo de dispositivo -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            ¿Qué tipo de dispositivo buscas?
          </label>
          <select
            v-model="questionnaire.deviceType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="smartphone">Smartphone</option>
          </select>
        </div>

        <!-- Pregunta 2: Uso principal -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            ¿Cuál será el uso principal del dispositivo?
          </label>
          <select
            v-model="questionnaire.primaryUse"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="gaming">Gaming</option>
            <option value="work">Trabajo</option>
            <option value="design">Diseño</option>
            <option value="study">Estudio</option>
          </select>
        </div>

        <!-- Pregunta 3: Presupuesto -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            ¿Cuál es tu presupuesto aproximado?
          </label>
          <input
            v-model="questionnaire.budget"
            type="number"
            placeholder="Ej: 1000"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- Pregunta 4: Preferencias de marca -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            ¿Tienes alguna preferencia de marca?
          </label>
          <input
            v-model="questionnaire.brandPreference"
            type="text"
            placeholder="Ej: Apple, Dell, etc."
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definir el estado del cuestionario
const questionnaire = ref({
  deviceType: '',
  primaryUse: '',
  budget: 0,
  brandPreference: '',
});

// Emitir eventos al componente padre
const emit = defineEmits(['submit', 'close']);

// Enviar el formulario
const submitForm = () => {
  emit('submit', questionnaire.value);
};

// Cerrar el modal
const closeModal = () => {
  emit('close');
};
</script>
