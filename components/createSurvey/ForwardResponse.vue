# IntegrationList.vue
<script setup lang="ts">
import {
    ArrowRight,
    ExternalLink,
    Info,
    Slack,
    Laptop,
    Webhook,
    Mail,
    MessageCircleReply,
    Zap,
    Sheet,
    Trello,
    Palette,
    DiamondPlus,
    type LucideIcon,
} from 'lucide-vue-next';

interface Integration {
    id: string;
    name: string;
    icon: LucideIcon;
    badge?: 'BUSINESS' | 'SCALE';
    enabled: boolean;
    external?: boolean;
    isNested?: boolean;
    iconColor: string;
}

const integrations = ref<Integration[]>([
    {
        id: 'slack',
        name: 'Slack',
        icon: Slack,
        badge: 'BUSINESS',
        enabled: false,
        iconColor: '#E01E5A',
    },
    {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: Laptop,
        badge: 'BUSINESS',
        enabled: false,
        iconColor: '#6264A7',
    },
    {
        id: 'webhooks',
        name: 'Webhooks',
        icon: Webhook,
        badge: 'SCALE',
        enabled: false,
        iconColor: '#2E2E2E',
    },
    {
        id: 'email',
        name: 'Email',
        icon: Mail,
        enabled: false,
        iconColor: '#4A5568',
    },
    {
        id: 'responses-api',
        name: 'Responses API',
        icon: MessageCircleReply,
        badge: 'SCALE',
        enabled: false,
        external: true,
        iconColor: '#4A5568',
    },
    {
        id: 'zapier',
        name: 'Zapier',
        icon: Zap,
        badge: 'BUSINESS',
        enabled: false,
        iconColor: '#FF4A00',
    },
    {
        id: 'excel',
        name: 'Excel',
        icon: Sheet,
        enabled: false,
        external: true,
        isNested: true,
        iconColor: '#217346',
    },
    {
        id: 'trello',
        name: 'Trello',
        icon: Trello,
        enabled: false,
        external: true,
        isNested: true,
        iconColor: '#0079BF',
    },
    {
        id: 'miro',
        name: 'Miro',
        icon: Palette,
        enabled: false,
        external: true,
        isNested: true,
        iconColor: '#FFD02F',
    },
    {
        id: 'create-zap',
        name: 'Create Zap',
        icon: DiamondPlus,
        enabled: false,
        external: true,
        isNested: true,
        iconColor: '#FF4A00',
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
                class="flex items-center justify-between"
            >
                <div class="flex items-center gap-3 text-base font-medium text-gray-500 dark:text-gray-100">
                    <component :is="integration.icon" class="flex-shrink-0" :size="18" :color="integration.iconColor" />
                    <div class="flex items-center gap-2">
                        {{ integration.name }}
                        <ExternalLink v-if="integration.external" class="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <UiBaseBadge v-if="integration.badge" variant="primary" size="sm">
                        {{ integration.badge }}
                    </UiBaseBadge>
                </div>

                <UiBaseSwitch
                    :model-value="integration.enabled"
                    size="sm"
                    @update:model-value="toggleIntegration(integration.id)"
                />
            </div>

            <!-- Nested Zapier integrations -->
            <div class="flex flex-col gap-6">
                <div
                    v-for="integration in integrations.filter((i) => i.isNested)"
                    :key="integration.id"
                    class="flex items-center gap-3 pl-8 text-base font-medium text-gray-500 dark:text-gray-100"
                >
                    <component :is="integration.icon" class="flex-shrink-0" :size="18" :color="integration.iconColor" />
                    <div class="flex items-center gap-2">
                        {{ integration.name }}
                        <ExternalLink v-if="integration.external" class="w-3.5 h-3.5 text-gray-400" />
                    </div>
                </div>

                <!-- Info message -->
                <div class="mt-4 flex gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg ml-8">
                    <Info class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        You'll be able to create a Zap after you save the widget.
                    </p>
                </div>
            </div>
        </div>
        <UiBaseButton size="md" class="w-max self-end mb-4"> Next <ArrowRight :size="16" /> </UiBaseButton>
    </div>
</template>
