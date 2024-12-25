// components/BaseDropdown.vue
<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';

interface Option {
    id: string | number;
    label: string;
    icon?: LucideIcon;
    disabled?: boolean;
    description?: string;
}

interface Props {
    modelValue: string | number | null;
    options: Option[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    name?: string;
    searchable?: boolean;
    loading?: boolean;
}

import { vClickOutside } from '~/directives/clickOutside';

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select an option',
    disabled: false,
    required: false,
    searchable: false,
    loading: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number | null];
    change: [option: Option | null];
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const activeIndex = ref(-1);

const selectedOption = computed(() => {
    return props.options?.find((option) => option.id === props.modelValue);
});

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options;
    return props.options?.filter((option) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const handleSelect = (option: Option) => {
    emit('update:modelValue', option.id);
    emit('change', option);
    isOpen.value = false;
    searchQuery.value = '';
};

const handleClickOutside = () => {
    isOpen.value = false;
    searchQuery.value = '';
};

// Keyboard event handlers
const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen.value) return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            activeIndex.value = Math.min(activeIndex.value + 1, filteredOptions.value.length - 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            activeIndex.value = Math.max(activeIndex.value - 1, 0);
            break;
        case 'Enter':
            e.preventDefault();
            if (activeIndex.value !== -1) {
                const option = filteredOptions.value[activeIndex.value];
                if (option) handleSelect(option);
            }
            break;
        case 'Escape':
            e.preventDefault();
            isOpen.value = false;
            searchQuery.value = '';
            break;
    }
};

watch(filteredOptions, () => {
    activeIndex.value = -1;
});

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div v-click-outside="handleClickOutside" class="relative w-full">
        <!-- Label -->
        <label v-if="label" :for="name" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            {{ label }}
            <span v-if="required" class="text-error-light dark:text-error-light">*</span>
        </label>

        <!-- Dropdown button -->
        <button
            type="button"
            :id="name"
            :disabled="disabled"
            @click="isOpen = !isOpen"
            class="relative w-full rounded-2xl py-2.5 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-primary-500"
            :class="[
                error ? 'border-error-light' : 'border-gray-300 dark:border-gray-600',
                disabled
                    ? 'cursor-not-allowed bg-light-surface dark:bg-dark-surface'
                    : 'cursor-pointer bg-light-background dark:bg-dark-background hover:bg-light-surface dark:hover:bg-dark-surface',
            ]"
        >
            <span class="block truncate text-gray-700 dark:text-gray-200">
                {{ selectedOption?.label || placeholder }}
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                    class="h-5 w-5 text-gray-400 dark:text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>

        <!-- Dropdown menu -->
        <div
            v-if="isOpen"
            class="absolute z-10 mt-1 w-full overflow-hidden rounded-2xl bg-light-background dark:bg-dark-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            <!-- Search input -->
            <div
                v-if="searchable"
                class="sticky top-0 z-10 bg-light-background dark:bg-dark-background px-3 py-2 border-b border-gray-200 dark:border-gray-700"
            >
                <input
                    v-model="searchQuery"
                    type="search"
                    class="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-light-background dark:bg-dark-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Search options..."
                    @click.stop
                />
            </div>

            <!-- Options container -->
            <div class="max-h-80 overflow-y-auto p-2 space-y-2">
                <!-- Loading state -->
                <div v-if="loading" class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Loading...</div>

                <!-- No results -->
                <div
                    v-else-if="filteredOptions.length === 0"
                    class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
                >
                    No options found
                </div>

                <!-- Options list -->
                <template v-else>
                    <button
                        v-for="(option, index) in filteredOptions"
                        :key="option.id"
                        @click="handleSelect(option)"
                        :disabled="option.disabled"
                        class="relative w-full select-none px-3 py-2 text-left focus:outline-none rounded-2xl"
                        :class="[
                            activeIndex === index ? 'bg-primary-100 dark:bg-primary-900/50' : '',
                            option.disabled
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer hover:bg-light-surface dark:hover:bg-dark-surface',
                            modelValue === option.id ? 'bg-primary-50 dark:bg-primary-900/30' : '',
                        ]"
                    >
                        <div class="flex items-center">
                            <!-- Option icon -->
                            <component
                                v-if="option.icon"
                                :is="option.icon"
                                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
                            />

                            <div>
                                <!-- Option label -->
                                <span
                                    class="block truncate text-gray-700 dark:text-gray-200"
                                    :class="{ 'font-medium': modelValue === option.id }"
                                >
                                    {{ option.label }}
                                </span>

                                <!-- Option description -->
                                <span
                                    v-if="option.description"
                                    class="block truncate text-xs text-gray-500 dark:text-gray-400"
                                >
                                    {{ option.description }}
                                </span>
                            </div>
                        </div>

                        <!-- Selected indicator -->
                        <span
                            v-if="modelValue === option.id"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600 dark:text-primary-400"
                        >
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                </template>
            </div>
        </div>

        <!-- Error message -->
        <p v-if="error" class="mt-1 text-sm text-error-light">{{ error }}</p>
    </div>
</template>
