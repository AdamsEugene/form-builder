<!-- components/SurveyStepsSidebar.vue -->
<template>
    <div
        :class="`h-[calc(100vh-104px)] bg-sidebar-gradient border-l border-purple-100/20 shadow-lg rounded-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? 'w-20' : 'w-64'
        }`"
    >
        <div class="flex flex-col h-full relative">
            <!-- Header -->
            <div class="px-4 py-6">
                <h1
                    :class="`text-xl font-semibold text-gray-900 transition-opacity duration-300 truncate ${
                        isCollapsed ? 'opacity-0' : 'opacity-100'
                    }`"
                >
                    Create a new survey
                </h1>
            </div>

            <!-- Steps -->
            <div class="flex-1 px-4">
                <div class="space-y-1">
                    <!-- Completed Steps -->
                    <div
                        v-for="(item, index) in completedSteps"
                        :key="item.name"
                        @click="setActiveStep(index)"
                        class="flex items-center px-3 py-2 text-sm hover:bg-white/50 rounded-lg cursor-pointer"
                        :class="{
                            'justify-center': isCollapsed,
                            'bg-white': activeStepIndex === index,
                            'text-gray-900': activeStepIndex === index,
                            'text-gray-700': activeStepIndex !== index,
                        }"
                    >
                        <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span
                            :class="`ml-3 font-medium transition-opacity duration-300 truncate ${
                                isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                            }`"
                        >
                            {{ item.name }}
                        </span>
                    </div>

                    <!-- Current and Upcoming Steps -->
                    <div
                        v-for="(item, index) in upcomingSteps"
                        :key="item.name"
                        @click="setActiveStep(index + completedSteps.length)"
                        class="flex items-center px-3 py-2 text-sm hover:bg-white/50 rounded-lg cursor-pointer"
                        :class="{
                            'justify-center': isCollapsed,
                            'bg-white': activeStepIndex === index + completedSteps.length,
                            'text-gray-900': activeStepIndex === index + completedSteps.length,
                            'text-gray-700': activeStepIndex !== index + completedSteps.length,
                        }"
                    >
                        <div
                            class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium shrink-0"
                            :class="{
                                'text-gray-900': activeStepIndex === index + completedSteps.length,
                                'text-gray-600': activeStepIndex !== index + completedSteps.length,
                            }"
                        >
                            {{ index + 4 }}
                        </div>
                        <span
                            :class="`ml-3 transition-opacity duration-300 truncate ${
                                isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                            }`"
                        >
                            {{ item.name }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Toggle Button -->
            <button
                @click="toggleSidebar"
                class="absolute top-4 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                        :d="isCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { survey, isMiniCollapsed, toggleMiniSidebar, updateSidebarState } = useGlobal();

const selectedType = ref(survey.value?.type);

interface EmitEvents {
    (e: 'stepChange', index: number): void;
}

const emit = defineEmits<EmitEvents>();

const isCollapsed = isMiniCollapsed;
const activeStepIndex = ref(0);

// Convert to computed property to react to selectedType changes
const completedSteps = computed(() => [
    { name: 'Details: New survey' },
    { name: `Type: ${selectedType.value}` },
    { name: 'Questions: 2 questions' },
]);

const upcomingSteps = [
    { name: 'Appearance' },
    { name: 'Targeting' },
    { name: 'Behavior' },
    { name: 'Forward Response' },
    { name: 'Summary' },
];

const setActiveStep = (index: number) => {
    activeStepIndex.value = index;
    emit('stepChange', index);
};

const toggleSidebar = async () => {
    await toggleMiniSidebar();
    if (!isCollapsed.value) await updateSidebarState(true);
};

watch(
    () => survey.value?.type,
    (newType) => {
        selectedType.value = newType;
    }
);
</script>
