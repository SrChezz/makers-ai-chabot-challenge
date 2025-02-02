<template>
  <!-- Side Menu -->
  <div
    v-if="recommendedProducts.length > 0"
    class="sticky top-6 mx-auto w-full md:w-64 p-4"
  >
    <h2 class="text-xl font-semibold mb-4 text-green-900">
      <i-tabler:flame-filled class="icon" />Recommendations
    </h2>
    <div class="space-y-4">
      <div
        v-for="product in recommendedProducts"
        :key="product.id"
        class="bg-white p-4 rounded-lg shadow-sm"
      >
        <h3 class="font-semibold">{{ product.product }}</h3>
        <p class="text-sm font-semibold text-green-900">${{ product.price }}</p>
        <span
          class="inline-block bg-purple-500 p-1 rounded-lg text-white font-semibold text-xs mt-2"
          >Highly Recommended</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

// Definir la interfaz para los productos recomendados
interface ProductType {
  id: number;
  product: string;
  price: number;
  brand?: string;
  model?: string;
  description?: string;
  quantity?: number;
}

// Definir los props que recibe el componente
interface Props {
  recommendedProducts: ProductType[];
}

// Asignar los props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  recommendedProducts: () => [],
});
</script>
