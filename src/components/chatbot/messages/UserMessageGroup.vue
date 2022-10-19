<script setup lang="ts">
import ChatbotUserMessage from '~/models/chatbot/messages/user-message'

defineProps<{ messages: ChatbotUserMessage[] }>()
</script>

<template>
  <div class="chat-user-message-group">
    <div class="flex items-end justify-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
      >
        <template v-for="(message, index) in messages" :key="index">
          <UserMessage :message="message" />
        </template>
      </div>
      <img
        src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        class="w-6 h-6 rounded-full order-2"
      />
    </div>
  </div>
</template>

<style scoped></style>
