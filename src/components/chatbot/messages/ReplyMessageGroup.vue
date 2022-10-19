<script setup lang="ts">
import ChatbotReplyMessage from '~/models/chatbot/messages/reply-message'

defineProps<{ messages: ChatbotReplyMessage[] }>()
</script>

<template>
  <div class="chat-message">
    <div class="flex items-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
      >
        <template v-for="(message, index) in messages" :key="index">
          <ReplyMessage :message="message" />
        </template>
      </div>
      <img
        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        class="w-6 h-6 rounded-full order-1"
      />
    </div>
  </div>
</template>

<style scoped></style>
