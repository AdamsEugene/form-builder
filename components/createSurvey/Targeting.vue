# Targeting.vue
<script setup lang="ts">
import { ArrowRight, InfoIcon, Monitor, Smartphone, Dice1 } from 'lucide-vue-next';
import type { DeviceType, Targeting } from '~/types';

interface Props {
    modelValue: {
        devices: DeviceType[];
        pageType: 'all' | 'specific';
        userType: 'all' | 'specific';
        trafficCoverage: number;
    };
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({
        devices: ['desktop', 'tablet', 'mobile'],
        pageType: 'all',
        userType: 'all',
        trafficCoverage: 100,
    }),
});

const { updateSurveySettings, surveySettings, updateCurrentIndex } = useGlobal();

// Create a fresh reactive copy to avoid circular references
const settings = ref<Targeting>({
    devices: surveySettings.value?.targeting?.devices
        ? surveySettings.value?.targeting?.devices
        : [...props.modelValue.devices],
    pageType: surveySettings.value?.targeting?.pageType
        ? surveySettings.value?.targeting?.pageType
        : props.modelValue.pageType,
    userType: surveySettings.value?.targeting?.userType
        ? surveySettings.value?.targeting?.userType
        : props.modelValue.userType,
    trafficCoverage: surveySettings.value?.targeting?.trafficCoverage
        ? surveySettings.value?.targeting?.trafficCoverage
        : props.modelValue.trafficCoverage,
});

const deviceOptions = [
    { id: 'desktop', label: 'Desktop', icon: Monitor } as const,
    { id: 'tablet', label: 'Tablet', icon: Dice1 } as const,
    { id: 'mobile', label: 'Mobile', icon: Smartphone } as const,
];

const handleDeviceChange = (device: DeviceType) => {
    const devices = [...settings.value.devices];
    const index = devices.indexOf(device);
    if (index === -1) {
        devices.push(device);
    } else {
        devices.splice(index, 1);
    }
    settings.value = {
        ...settings.value,
        devices,
    };
};

// Watch for changes and update parent
watch(
    settings,
    (newSettings) => {
        // Create a plain object copy without reactive wrappers
        const plainSettings: Targeting = {
            devices: [...newSettings.devices],
            pageType: newSettings.pageType,
            userType: newSettings.userType,
            trafficCoverage: newSettings.trafficCoverage,
        };

        updateSurveySettings('targeting', plainSettings);
    },
    { deep: true }
);
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <!-- Devices Section -->
            <section class="space-y-4">
                <div class="flex items-start gap-2">
                    <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
                        Devices
                        <span class="text-red-500">*</span>
                    </h3>
                    <UiBaseTooltip content="Select which devices to show this survey on">
                        <InfoIcon class="w-4 h-4 text-gray-500" />
                    </UiBaseTooltip>
                </div>
                <p class="text-sm text-gray-500">Select which devices to show this survey on</p>

                <div class="space-y-3 w-max">
                    <label
                        v-for="device in deviceOptions"
                        :key="device.id"
                        class="flex items-center gap-3 cursor-pointer"
                    >
                        <UiBaseCheckbox
                            :model-value="settings.devices.includes(device.id)"
                            @update:model-value="() => handleDeviceChange(device.id)"
                        />
                        <component :is="device.icon" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">{{ device.label }}</span>
                    </label>
                </div>
            </section>

            <!-- Pages Section -->
            <section class="space-y-4 w-max">
                <div class="flex items-start gap-2">
                    <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
                        Pages or events
                        <span class="text-red-500">*</span>
                    </h3>
                    <UiBaseTooltip content="Select which pages or events to show this survey on">
                        <InfoIcon class="w-4 h-4 text-gray-500" />
                    </UiBaseTooltip>
                </div>
                <p class="text-sm text-gray-500">Select which pages or events to show this survey on</p>

                <div class="space-y-3 w-max">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <UiBaseRadio v-model="settings.pageType" name="pages" value="all" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">All pages</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                        <UiBaseRadio v-model="settings.pageType" name="pages" value="specific" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">Specific pages or events</span>
                        <UiBaseBadge variant="primary" size="sm">BUSINESS</UiBaseBadge>
                    </label>
                </div>
            </section>

            <!-- Users Section -->
            <section class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Users</h3>
                <p class="text-sm text-gray-500">Select which users to show this survey to</p>

                <div class="space-y-3">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <UiBaseRadio v-model="settings.userType" name="users" value="all" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">All users</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                        <UiBaseRadio v-model="settings.userType" name="users" value="specific" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">Specific users</span>
                        <UiBaseBadge variant="primary" size="sm">BUSINESS</UiBaseBadge>
                    </label>
                </div>
            </section>

            <!-- Traffic Coverage Section -->
            <section class="space-y-4">
                <div class="flex items-start gap-2">
                    <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
                        Traffic coverage
                        <span class="text-red-500">*</span>
                    </h3>
                    <UiBaseTooltip content="Further reduce the percentage of users who see your survey">
                        <InfoIcon class="w-4 h-4 text-gray-500" />
                    </UiBaseTooltip>
                </div>
                <p class="text-sm text-gray-500">
                    Further reduce the percentage of users who see your survey based on the parameters set above.
                </p>

                <div class="flex items-center gap-2">
                    <UiFormInput v-model="settings.trafficCoverage" type="number" :min="0" :max="100" class="w-24" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">%</span>
                    <UiBaseBadge variant="primary" size="sm">PLUS</UiBaseBadge>
                </div>
            </section>

            <!-- Info Box -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                <div class="flex items-start gap-2">
                    <InfoIcon class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <p class="text-sm text-blue-900 dark:text-blue-100 font-medium">
                        When there are multiple active surveys and widgets, users see:
                    </p>
                </div>
                <ul class="ml-7 space-y-1 list-disc text-sm text-blue-800 dark:text-blue-200">
                    <li>The most recent one first</li>
                    <li>Popover or full-screen surveys before buttons or widgets</li>
                    <li>Embedded surveys alongside popover, full-screen, button, and widgets</li>
                </ul>
                <div class="flex justify-end">
                    <a href="#" class="text-sm text-blue-600 dark:text-blue-400 hover:underline"> More about this </a>
                </div>
            </div>
        </div>
        <UiBaseButton size="md" class="w-max self-end mb-4" @click="updateCurrentIndex(5)">
            Next <ArrowRight />
        </UiBaseButton>
    </div>
</template>
