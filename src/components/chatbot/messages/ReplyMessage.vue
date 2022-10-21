<script setup lang="ts">
import ChatbotReplyMessage from '~/models/chatbot/messages/reply-message'

defineProps<{ message: ChatbotReplyMessage }>()
</script>

<template>
  <div class="chat-message">
    <span
      class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 md:text-sm text-left"
    >
      <template v-if="message.mapImageSrc">
        <img :src="message.mapImageSrc" alt="ruta" />
      </template>

      <br v-if="message.mapImageSrc && message.text" />

      {{ message.text }}
    </span>
  </div>
</template>

<style scoped></style>
