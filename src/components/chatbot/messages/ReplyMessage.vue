<script setup lang="ts">
import ChatbotReplyMessage from '~/models/chatbot/messages/reply-message'

defineProps<{ message: ChatbotReplyMessage }>()
</script>

<template>
  <div>
    <span
      class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 md:text-sm"
    >
      <template v-if="message.mapImageSrc">
        <img :src="message.mapImageSrc" alt="ruta" />
        <br />
      </template>

      {{ message.text }}
    </span>
  </div>
</template>

<style scoped></style>
