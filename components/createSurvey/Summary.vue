# components/Survey.vue
<script setup lang="ts">
import { Monitor, FileText, Users, Globe, ArrowRight } from 'lucide-vue-next';

interface Targeting {
    devices: string[];
    pages: string;
    users: string;
    traffic: string;
}

const { survey, setActiveQuestion } = useGlobal();
const { getIconForType } = useQuestionIcons();

const status = ref<'inactive' | 'active'>('inactive');
const targeting = ref<Targeting>({
    devices: ['Desktop', 'Tablet', 'Mobile'],
    pages: 'All pages',
    users: 'All users',
    traffic: '100% of all traffic',
});

const handleCreateSurvey = () => {
    // Handle survey creation
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <h1 class="text-xl font-semibold text-gray-900">New survey</h1>

            <!-- Questions Section -->
            <div class="space-y-4">
                <div class="text-sm text-gray-600">{{ survey?.questions.length || 0 }} questions</div>

                <div v-for="question in survey?.questions" :key="question.id" class="space-y-3">
                    <div
                        class="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200"
                        @mouseenter="setActiveQuestion(question)"
                        @click="setActiveQuestion(question)"
                    >
                        <component :is="getIconForType(question.type)" class="w-5 h-5 text-gray-500" />
                        <div class="text-gray-900">{{ question.title }}</div>
                    </div>
                </div>
            </div>

            <!-- Targeting Section -->
            <div class="space-y-4">
                <h2 class="font-medium text-gray-900">Targeting</h2>

                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-gray-700">
                        <Monitor class="w-4 h-4" />
                        <span>Shows on {{ targeting.devices.join(', ') }}</span>
                    </div>

                    <div class="flex items-center gap-2 text-gray-700">
                        <FileText class="w-4 h-4" />
                        <span>Shows on {{ targeting.pages }}</span>
                    </div>

                    <div class="flex items-center gap-2 text-gray-700">
                        <Users class="w-4 h-4" />
                        <span>Shows to {{ targeting.users }}</span>
                    </div>

                    <div class="flex items-center gap-2 text-gray-700">
                        <Globe class="w-4 h-4" />
                        <span>Shows to {{ targeting.traffic }}</span>
                    </div>

                    <UiBaseButton variant="outline"> Edit targeting settings </UiBaseButton>
                </div>
            </div>

            <!-- Status Section -->
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Survey status:</span>
                    <div class="flex items-center gap-3">
                        <UiBaseRadio
                            v-model="status"
                            name="placements"
                            value="right"
                            label="Inactive"
                            labelPlacement="right"
                        />
                        <UiBaseRadio
                            v-model="status"
                            name="placements"
                            value="right"
                            label="Active"
                            labelPlacement="right"
                        />
                    </div>
                </div>
            </div>

            <!-- Create Button -->
            <UiBaseButton class="w-max" @click="handleCreateSurvey"> Create survey </UiBaseButton>
        </div>
        <UiBaseButton size="md" class="w-max self-end mb-4"> Next <ArrowRight /> </UiBaseButton>
    </div>
</template>
