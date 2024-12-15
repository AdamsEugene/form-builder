<script setup lang="ts">
// Device type enum
type DeviceType = "desktop" | "mobile";
import { Monitor, Smartphone } from "lucide-vue-next";

const deviceType = ref<DeviceType>("desktop");

// Toggle device type
const toggleDevice = (type: DeviceType) => {
  deviceType.value = type;
};

// Determine if device type is active
const isActiveDevice = (type: DeviceType) => deviceType.value === type;
</script>

<template>
  <div class="space-y-4">
    <!-- Preview Controls -->
    <div class="flex items-center gap-2 justify-between">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Preview
      </h2>
      <!-- Refresh Button -->
      <button
        type="button"
        class="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
      </button>

      <!-- Device Toggle -->
      <div class="bg-gray-100 rounded-lg p-1 flex gap-1 dark:bg-gray-800">
        <button
          type="button"
          @click="toggleDevice('desktop')"
          :class="[
            'p-1.5 rounded',
            isActiveDevice('desktop')
              ? 'bg-white text-gray-700 shadow dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
        >
          <Monitor class="h-5 w-5" />
        </button>

        <button
          type="button"
          @click="toggleDevice('mobile')"
          :class="[
            'p-1.5 rounded',
            isActiveDevice('mobile')
              ? 'bg-white text-gray-700 shadow dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
        >
          <Smartphone class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Preview Window -->
    <div
      class="bg-gray-50 border border-gray-200 h-[calc(100vh-220px)] rounded-lg p-8 dark:bg-gray-900/50 dark:border-gray-700"
    >
      <div
        :class="[
          'mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700',
          deviceType === 'desktop'
            ? 'max-w-4xl h-[480px]'
            : 'w-[320px] h-[640px]',
        ]"
      >
        <div class="p-1 bg-gray-100 dark:bg-gray-900 flex gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <!-- Preview Content -->
        <div class="h-full w-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
