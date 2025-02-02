<script setup lang="ts">
// types.ts
interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sanitizedText?: string; // Add this field to store sanitized text
}

interface ChatState {
  messages: Message[];
  isChatOpen: boolean;
  userInput: string;
  isLoading: boolean;
}

import { ref, onMounted } from 'vue';
import { Client } from '@gradio/client';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const state = ref<ChatState>({
  messages: [],
  isChatOpen: false,
  userInput: '',
  isLoading: false,
});

let gradioClient: any = null;

onMounted(async () => {
  try {
    gradioClient = await Client.connect(
      'https://6f489fa5eccdc539c8.gradio.live'
    );
  } catch (error) {
    console.error('Failed to connect to Gradio:', error);
  }
});

const toggleChat = () => {
  state.value.isChatOpen = !state.value.isChatOpen;
};

const closeChat = () => {
  state.value.isChatOpen = false;
};

const sanitizeMarkdown = (text: string): string => {
  const htmlContent = marked(text);
  // @ts-ignore
  return DOMPurify.sanitize(htmlContent);
};

const scrollToBottom = () => {
  const chatContainer = document.querySelector('.messages-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

const sendMessage = async () => {
  const userInput = state.value.userInput.trim();
  if (!userInput || state.value.isLoading) return;

  try {
    state.value.isLoading = true;

    // Add user message
    state.value.messages.push({
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    });

    state.value.userInput = ''; // Clear input
    scrollToBottom();

    // Get bot response
    const result = await gradioClient.predict('/chat', {
      message: { text: userInput, files: [] },
    });

    const botResponse = Array.isArray(result.data[0])
      ? result.data[0].join('\n')
      : String(result.data[0]);

    // Add bot message with sanitized text
    const sanitizedText = sanitizeMarkdown(botResponse);
    state.value.messages.push({
      text: botResponse,
      sanitizedText,
      sender: 'bot',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMessage = 'Sorry, there was an error processing your request.';
    state.value.messages.push({
      text: errorMessage,
      sanitizedText: errorMessage,
      sender: 'bot',
      timestamp: new Date(),
    });
  } finally {
    state.value.isLoading = false;
    scrollToBottom();
  }
};
</script>

<template>
  <div id="chat-widget" class="fixed bottom-5 right-5 z-50">
    <!-- Chat Toggle Button -->
    <button
      class="w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
      @click="toggleChat"
      aria-label="Toggle chat"
    >
      <i-tabler:brand-hipchat class="text-2xl" />
    </button>

    <!-- Chat Window -->
    <div
      v-show="state.isChatOpen"
      class="fixed bottom-24 right-5 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col max-h-[600px] transition-all duration-200"
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 bg-green-50 rounded-t-lg">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-green-800">
            Makers Tech Assistant
          </h3>
          <button
            @click="closeChat"
            class="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <i-ix:close-small class="text-xl" />
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div class="min-h-80 flex-1 overflow-y-auto p-4 messages-container">
        <div
          v-for="(message, index) in state.messages"
          :key="index"
          class="mb-4"
        >
          <div
            :class="[
              'max-w-[85%] rounded-lg p-3',
              message.sender === 'user' ? 'bg-green-50 ml-auto' : 'bg-gray-100',
            ]"
          >
            <div
              v-if="message.sender === 'bot'"
              v-html="message.sanitizedText"
            />
            <div v-else>
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex gap-2">
          <input
            v-model="state.userInput"
            type="text"
            placeholder="Type your message..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-200"
            @keyup.enter="sendMessage"
          />
          <button
            @click="sendMessage"
            :disabled="state.isLoading"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i-tabler:send v-if="!state.isLoading" />
            <i-tabler:loader-2 v-else class="animate-spin" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
