# IntegrationList.vue
<script setup lang="ts">
import { ArrowRight, ExternalLink, Info, Settings2 } from 'lucide-vue-next';
import { integrations } from '~/constants/question';
import type { ForwardResponse } from '~/types';

const { surveySettings, updateSurveySettings } = useGlobal();

const settings = ref<ForwardResponse>({
    enabled: true,
    integrations: {},
    globalSettings: {
        includeUserMetadata: false,
        includeBrowserInfo: false,
        includeTimestamp: true,
        includePageUrl: true,
    },
});

const showConfig = ref<string | null>(null);

const toggleIntegration = (id: string) => {
    const integration = integrations.value.find((i) => i.id === id);
    if (integration) {
        integration.enabled = !integration.enabled;

        // Initialize or remove config based on enabled state
        if (integration.enabled) {
            initializeConfig(id);
            showConfig.value = id;
        } else {
            removeConfig(id);
            showConfig.value = null;
        }

        updateSurveySettings('forwardResponse', toRaw(settings.value));
    }
};

const initializeConfig = (id: string) => {
    switch (id) {
        case 'slack':
            settings.value.integrations.slack = {
                channel: '',
                sendScreenshot: false,
                sendMetadata: false,
            };
            break;
        case 'teams':
            settings.value.integrations.teams = {
                channel: '',
                sendScreenshot: false,
                sendMetadata: false,
            };
            break;
        case 'webhooks':
            settings.value.integrations.webhooks = {
                url: '',
                method: 'POST',
                headers: {},
            };
            break;
        case 'email':
            settings.value.integrations.email = {
                recipients: '',
                subject: '',
                includeMetadata: false,
            };
            break;
        // Add other cases for remaining integrations
    }
};

const removeConfig = (id: string) => {
    const key = id as keyof ForwardResponse['integrations'];
    if (key in settings.value.integrations) {
        delete settings.value.integrations[key];
    }
};

// Watch for configuration changes
watch(
    settings,
    (newValue) => {
        updateSurveySettings('forwardResponse', toRaw(newValue));
    },
    { deep: true }
);
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <!-- Global Settings -->
            <section v-if="settings.globalSettings" class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Global Settings</h3>
                <div class="space-y-3">
                    <label class="flex items-center gap-3">
                        <UiBaseCheckbox v-model="settings.globalSettings.includeUserMetadata" name="metadata" />
                        <span class="text-sm text-gray-700">Include user metadata</span>
                    </label>
                    <label class="flex items-center gap-3">
                        <UiBaseCheckbox v-model="settings.globalSettings.includeBrowserInfo" name="browser" />
                        <span class="text-sm text-gray-700">Include browser information</span>
                    </label>
                    <label class="flex items-center gap-3">
                        <UiBaseCheckbox v-model="settings.globalSettings.includeTimestamp" name="timestamp" />
                        <span class="text-sm text-gray-700">Include timestamp</span>
                    </label>
                    <label class="flex items-center gap-3">
                        <UiBaseCheckbox v-model="settings.globalSettings.includePageUrl" name="pageurl" />
                        <span class="text-sm text-gray-700">Include page URL</span>
                    </label>
                </div>
            </section>

            <!-- Main integrations -->
            <div v-for="integration in integrations.filter((i) => !i.isNested)" :key="integration.id" class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-base font-medium text-gray-500 dark:text-gray-100">
                        <component
                            :is="integration.icon"
                            class="flex-shrink-0"
                            :size="18"
                            :color="integration.iconColor"
                        />
                        <div class="flex items-center gap-2">
                            {{ integration.name }}
                            <ExternalLink v-if="integration.external" class="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <UiBaseBadge v-if="integration.badge" variant="primary" size="sm">
                            {{ integration.badge }}
                        </UiBaseBadge>
                    </div>

                    <div class="flex items-center gap-3">
                        <UiBaseButton
                            v-if="integration.enabled"
                            variant="ghost"
                            size="sm"
                            @click="showConfig = showConfig === integration.id ? null : integration.id"
                        >
                            <Settings2 class="w-4 h-4" />
                        </UiBaseButton>
                        <UiBaseSwitch
                            :model-value="integration.enabled"
                            size="sm"
                            @update:model-value="toggleIntegration(integration.id)"
                        />
                    </div>
                </div>

                <!-- Integration specific config -->
                <div v-if="showConfig === integration.id" class="pl-8 space-y-4">
                    <!-- Slack Config -->
                    <template v-if="integration.id === 'slack' && settings.integrations.slack">
                        <div class="space-y-3">
                            <UiFormInput
                                v-model="settings.integrations.slack.channel"
                                label="Channel"
                                placeholder="Enter Slack channel"
                            />
                            <label v-if="settings.integrations.slack.sendScreenshot" class="flex items-center gap-3">
                                <UiBaseCheckbox v-model="settings.integrations.slack.sendScreenshot" />
                                <span class="text-sm text-gray-700">Send screenshot</span>
                            </label>
                            <label v-if="settings.integrations.slack.sendMetadata" class="flex items-center gap-3">
                                <UiBaseCheckbox v-model="settings.integrations.slack.sendMetadata" />
                                <span class="text-sm text-gray-700">Send metadata</span>
                            </label>
                        </div>
                    </template>

                    <!-- Teams Config -->
                    <template v-if="integration.id === 'teams' && settings.integrations.teams">
                        <div class="space-y-3">
                            <UiFormInput
                                v-model="settings.integrations.teams.channel"
                                label="Channel"
                                placeholder="Enter Teams channel"
                            />
                            <label v-if="settings.integrations.teams.sendScreenshot" class="flex items-center gap-3">
                                <UiBaseCheckbox v-model="settings.integrations.teams.sendScreenshot" />
                                <span class="text-sm text-gray-700">Send screenshot</span>
                            </label>
                            <label v-if="settings.integrations.teams.sendMetadata" class="flex items-center gap-3">
                                <UiBaseCheckbox v-model="settings.integrations.teams.sendMetadata" />
                                <span class="text-sm text-gray-700">Send metadata</span>
                            </label>
                        </div>
                    </template>

                    <!-- Webhook Config -->
                    <template v-if="integration.id === 'webhooks' && settings.integrations.webhooks">
                        <div class="space-y-3">
                            <UiFormInput
                                v-model="settings.integrations.webhooks.url"
                                label="Webhook URL"
                                placeholder="Enter webhook URL"
                            />
                            <UiFormSelect
                                v-model="settings.integrations.webhooks.method"
                                label="Method"
                                :options="[
                                    { label: 'POST', value: 'POST' },
                                    { label: 'PUT', value: 'PUT' },
                                ]"
                            />
                        </div>
                    </template>

                    <!-- Email Config -->
                    <template v-if="integration.id === 'email' && settings.integrations.email">
                        <div v-if="settings.integrations.email" class="space-y-3">
                            <UiFormTextarea
                                v-model="settings.integrations.email.recipients"
                                label="Recipients"
                                placeholder="Enter email addresses (comma separated)"
                                @update:model-value="
                                    (value) =>
                                        settings.integrations.email
                                            ? (settings.integrations.email.recipients = value)
                                            : undefined
                                "
                            />
                            <UiFormInput
                                v-model="settings.integrations.email.subject"
                                label="Subject"
                                placeholder="Enter email subject"
                            />
                            <label v-if="settings.integrations.email.includeMetadata" class="flex items-center gap-3">
                                <UiBaseCheckbox v-model="settings.integrations.email.includeMetadata" />
                                <span class="text-sm text-gray-700">Include metadata</span>
                            </label>
                        </div>
                    </template>
                </div>
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
