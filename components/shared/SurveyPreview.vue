<script setup lang="ts">
// Device type enum
type DeviceType = 'desktop' | 'mobile';
import { Monitor, Smartphone, RefreshCcwDot } from 'lucide-vue-next';

const deviceType = ref<DeviceType>('desktop');

// Define emits
const emit = defineEmits<{
    'update:deviceType': [type: DeviceType];
    refresh: [];
}>();

// Toggle device type
const toggleDevice = (type: DeviceType) => {
    deviceType.value = type;
    emit('update:deviceType', type);
};

// Handle refresh click
const handleRefresh = () => {
    emit('refresh');
};

// Determine if device type is active
const isActiveDevice = (type: DeviceType) => deviceType.value === type;
</script>

<template>
    <div class="space-y-4">
        <!-- Preview Controls -->
        <div class="flex items-center gap-2 justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Preview</h2>

            <!-- Device Toggle -->
            <div class="bg-gray-100 rounded-2xl p-1 flex gap-1 dark:bg-gray-800 overflow-hidden">
                <!-- Refresh Button -->
                <button
                    type="button"
                    @click="handleRefresh"
                    :class="[
                        'p-1.5 rounded',
                        'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                >
                    <RefreshCcwDot class="h-5 w-5" />
                </button>
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
            class="bg-gray-50 border border-gray-200 h-[calc(100vh-220px)] rounded-2xl p-8 dark:bg-gray-900/50 dark:border-gray-700"
        >
            <div
                :class="[
                    'mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden dark:bg-gray-800 dark:border-gray-700',
                    deviceType === 'desktop' ? 'max-w-4xl h-[580px]' : 'w-[320px] h-[640px]',
                ]"
            >
                <div class="p-1 bg-gray-100 dark:bg-gray-900 flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>

                <!-- Preview Content -->
                <div class="h-full w-full relative">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
