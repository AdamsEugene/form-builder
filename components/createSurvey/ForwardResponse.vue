<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

interface Integration {
    id: string;
    name: string;
    icon: string;
    badge?: 'BUSINESS' | 'SCALE';
    enabled: boolean;
    external?: boolean;
    isNested?: boolean;
}

const integrations = ref<Integration[]>([
    {
        id: 'slack',
        name: 'Slack',
        icon: '🔵',
        badge: 'BUSINESS',
        enabled: false,
    },
    {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: '💻',
        badge: 'BUSINESS',
        enabled: false,
    },
    {
        id: 'webhooks',
        name: 'Webhooks',
        icon: '🔗',
        badge: 'SCALE',
        enabled: false,
    },
    {
        id: 'email',
        name: 'Email',
        icon: '📧',
        enabled: false,
    },
    {
        id: 'responses-api',
        name: 'Responses API',
        icon: '🔄',
        badge: 'SCALE',
        enabled: false,
        external: true,
    },
    {
        id: 'zapier',
        name: 'Zapier',
        icon: '⚡',
        badge: 'BUSINESS',
        enabled: false,
    },
    {
        id: 'excel',
        name: 'Excel',
        icon: '📊',
        enabled: false,
        external: true,
        isNested: true,
    },
    {
        id: 'trello',
        name: 'Trello',
        icon: '📋',
        enabled: false,
        external: true,
        isNested: true,
    },
    {
        id: 'miro',
        name: 'Miro',
        icon: '🎨',
        enabled: false,
        external: true,
        isNested: true,
    },
    {
        id: 'create-zap',
        name: 'Create Zap',
        icon: '➕',
        enabled: false,
        external: true,
        isNested: true,
    },
]);

const toggleIntegration = (id: string) => {
    const integration = integrations.value.find((i) => i.id === id);
    if (integration) {
        integration.enabled = !integration.enabled;
    }
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <!-- Main integrations -->
            <div
                v-for="integration in integrations.filter((i) => !i.isNested)"
                :key="integration.id"
                class="flex items-center justify-between py-4 px-6"
            >
                <div class="flex items-center gap-3">
                    <span class="text-xl">{{ integration.icon }}</span>
                    <div class="flex items-center gap-2">
                        {{ integration.name }}
                        <ExternalLink v-if="integration.external" class="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <UiBaseBadge v-if="integration.badge" variant="secondary" size="sm">
                        {{ integration.badge }}
                    </UiBaseBadge>
                </div>

                <UiBaseSwitch
                    :model-value="integration.enabled"
                    @update:model-value="toggleIntegration(integration.id)"
                />
            </div>

            <!-- Nested Zapier integrations -->
            <div  class="space-y-2 py-4 px-6">
                <div
                    v-for="integration in integrations.filter((i) => i.isNested)"
                    :key="integration.id"
                    class="flex items-center gap-3 pl-8 py-2"
                >
                    <span class="text-xl">{{ integration.icon }}</span>
                    <div class="flex items-center gap-2">
                        {{ integration.name }}
                        <ExternalLink v-if="integration.external" class="w-3.5 h-3.5 text-gray-400" />
                    </div>
                </div>

                <!-- Info message -->
                <div class="mt-4 flex gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg ml-8">
                    <InfoCircle class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        You'll be able to create a Zap after you save the widget.
                    </p>
                </div>
            </div>
        </div>
        <UiBaseButton size="md" class="w-max self-end mb-4"> Next <ArrowRight /> </UiBaseButton>
        <!-- <Preview /> -->
    </div>
</template>
