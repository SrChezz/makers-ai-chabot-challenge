<template>
  <div class="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
    <!-- Contenido Principal -->
    <div class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-4 text-green-900">
        <i-tabler:box class="icon" /> Products
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow relative pb-10"
        >
          <img
            class="w-3/5 m-auto"
            src="https://i.pinimg.com/736x/9b/92/8b/9b928becdf366e963f98d48d70c019b7.jpg"
            :alt="product.product"
          />
          <h2 class="text-green-900 text-lg font-semibold mb-2">
            {{ product.product }}
          </h2>
          <p class="text-gray-600 mb-4 text-sm opacity-70">
            {{ product.description }}
          </p>
          <p class="text-gray-600 mb-4 text-sm opacity-70">
            {{ product.brand }} | {{ product.model }}
          </p>
          <p
            class="text-green-900 text-lg font-semibold absolute left-4 bottom-2"
          >
            ${{ product.price }}
          </p>
          <p
            class="text-green-900 text-lg font-semibold absolute right-4 bottom-2"
          >
            {{ product.quantity }} units
          </p>
        </div>
      </div>
    </div>

    <!-- Sidebar de Recomendaciones -->
    <Recommendations :recommendedProducts="recommendedProducts" />
  </div>

  <!-- Modal de Cuestionario -->
  <Modal
    v-if="showModal"
    @submit="handleQuestionnaireSubmit"
    @close="showModal = false"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { turso } from '../db';
import Recommendations from '../components/Recommendations.vue';
import Modal from '../components/Modal.vue';

interface ProductType {
  brand: string;
  description: string;
  id: number;
  model: string;
  price: number;
  product: string;
  quantity: number;
}

// Estado del componente
const products = ref<ProductType[]>([]);
const recommendedProducts = ref<ProductType[]>([
  {
    id: 1,
    product: 'Laptop Gaming',
    brand: 'Asus',
    model: 'ROG Zephyrus',
    price: 1500,
    quantity: 10,
    description: 'Laptop para gaming de alto rendimiento.',
  },
  {
    id: 2,
    product: 'Monitor 4K',
    brand: 'LG',
    model: 'UltraFine 27UL500',
    price: 400,
    quantity: 5,
    description: 'Monitor 4K para productividad y creatividad.',
  },
]);
const showModal = ref(false); // Mostrar modal al inicio

// Cargar productos al montar el componente
onMounted(async () => {
  const response = await turso.execute('SELECT * FROM products');
  // @ts-ignore
  products.value = response.rows! as ProductType[];
});

// Manejar el envío del cuestionario
const handleQuestionnaireSubmit = async (responses: any) => {
  try {
    if (responses) {
      console.log('test');
    }
    const mockRecommendations = [
      {
        id: 1,
        product: 'Laptop Gaming',
        brand: 'Asus',
        model: 'ROG Zephyrus',
        price: 1500,
        quantity: 10,
        description: 'Laptop para gaming de alto rendimiento.',
      },
      {
        id: 2,
        product: 'Monitor 4K',
        brand: 'LG',
        model: 'UltraFine 27UL500',
        price: 400,
        quantity: 5,
        description: 'Monitor 4K para productividad y creatividad.',
      },
    ];
    recommendedProducts.value = mockRecommendations;
    showModal.value = false; // Ocultar el modal después de enviar
  } catch (error) {
    console.error('Error al enviar el cuestionario:', error);
  }
};
</script>
