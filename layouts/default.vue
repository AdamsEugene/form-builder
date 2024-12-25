<template>
    <div class="scrollbar-thin scrollbar-thin-auto" :class="{ dark: isDarkMode }">
        <div class="min-h-screen bg-brand-primary">
            <div class="flex">
                <!-- Sidebar -->
                <div
                    :class="`fixed h-[calc(100vh-32px)] m-4 bg-sidebar-gradient border-r border-purple-100/20 shadow-lg rounded-2xl transition-all duration-300 ease-in-out overflow-hidden ${
                        isCollapsed ? 'w-20' : 'w-64'
                    }`"
                >
                    <!-- Logo Area -->
                    <NuxtLink to="/" class="flex items-center h-16 px-4 mb-6 cursor-pointer">
                        <div class="bg-black rounded-2xl p-2 shrink-0">
                            <svg class="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div
                            :class="`ml-3 font-semibold transition-opacity duration-300 truncate ${
                                isCollapsed ? 'opacity-0' : 'opacity-100'
                            }`"
                        >
                            HeatFormCraft
                        </div>
                    </NuxtLink>

                    <!-- Search -->
                    <div class="px-4 mb-6" v-show="!isCollapsed">
                        <div class="relative">
                            <input
                                type="text"
                                placeholder="Search surveys..."
                                class="w-full px-3 py-2 text-sm bg-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-100/20"
                            />
                            <svg
                                class="w-4 h-4 absolute right-3 top-2.5 text-gray-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>

                    <!-- Favorites Section -->
                    <div class="px-4 mb-6">
                        <h2
                            :class="`text-sm font-semibold text-gray-600 mb-3 transition-opacity duration-300 truncate ${
                                isCollapsed ? 'opacity-0' : 'opacity-100'
                            }`"
                        >
                            Favorites
                        </h2>
                        <div class="space-y-1">
                            <NuxtLink
                                v-for="item in favorites"
                                :key="item.name"
                                :to="`/${item.name.toLowerCase().replace(/\s+/g, '-')}`"
                                class="flex items-center px-3 py-2 text-sm hover:bg-white/50 rounded-2xl cursor-pointer"
                                :class="{
                                    'justify-center': isCollapsed,
                                    'bg-white text-gray-900':
                                        route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    'text-gray-700': route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                }"
                            >
                                <!-- Icon or letter placeholder -->
                                <div v-if="item.icon" class="shrink-0">
                                    <svg
                                        class="w-5 h-5"
                                        :class="{
                                            'text-gray-900':
                                                route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                            'text-gray-500':
                                                route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                        }"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        v-html="item.icon"
                                    ></svg>
                                </div>
                                <div
                                    v-else
                                    class="w-5 h-5 shrink-0 rounded-2xl flex items-center justify-center text-xs font-medium"
                                    :class="{
                                        'bg-purple-100 text-purple-700':
                                            route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                        'bg-gray-100 text-gray-600':
                                            route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    }"
                                >
                                    {{ getInitials(item.name) }}
                                </div>
                                <!-- Rest of the link content -->
                                <span
                                    :class="`ml-3 transition-opacity duration-300 truncate ${
                                        isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                                    }`"
                                >
                                    {{ item.name }}
                                </span>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Main Menu -->
                    <div class="px-4">
                        <h2
                            :class="`text-sm font-semibold text-gray-600 mb-3 transition-opacity duration-300 truncate ${
                                isCollapsed ? 'opacity-0' : 'opacity-100'
                            }`"
                        >
                            Create Survey
                        </h2>
                        <div class="space-y-1">
                            <NuxtLink
                                v-for="item in mainMenu"
                                :key="item.name"
                                :to="`/${item.name.toLowerCase().replace(/\s+/g, '-')}`"
                                class="flex items-center px-3 py-2 text-sm hover:bg-white/50 rounded-2xl cursor-pointer"
                                :class="{
                                    'justify-center': isCollapsed,
                                    'bg-white text-gray-900':
                                        route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    'text-gray-700': route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                }"
                            >
                                <svg
                                    class="w-5 h-5 shrink-0"
                                    :class="{
                                        'text-gray-900':
                                            route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                        'text-gray-500':
                                            route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    }"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    v-html="item.icon"
                                ></svg>
                                <span
                                    :class="`ml-3 transition-opacity duration-300 truncate ${
                                        isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                                    }`"
                                >
                                    {{ item.name }}
                                </span>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Bottom Settings Menu -->
                    <div class="absolute bottom-24 left-4 right-4">
                        <div class="space-y-1">
                            <NuxtLink
                                v-for="item in settingsMenu"
                                :key="item.name"
                                :to="`/${item.name.toLowerCase().replace(/\s+/g, '-')}`"
                                class="flex items-center px-3 py-2 text-sm hover:bg-white/50 rounded-2xl cursor-pointer"
                                :class="{
                                    'justify-center': isCollapsed,
                                    'bg-white text-gray-900':
                                        route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    'text-gray-700': route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                }"
                            >
                                <svg
                                    class="w-5 h-5 shrink-0"
                                    :class="{
                                        'text-gray-900':
                                            route.path === `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                        'text-gray-500':
                                            route.path !== `/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                                    }"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    v-html="item.icon"
                                ></svg>
                                <span
                                    :class="`ml-3 transition-opacity duration-300 truncate ${
                                        isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                                    }`"
                                >
                                    {{ item.name }}
                                </span>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Extension Button -->
                    <div class="absolute bottom-4 left-4 right-4">
                        <div
                            class="cursor-pointer bg-[#E7F9EF] rounded-2xl p-3 flex items-center transition-opacity duration-300"
                            :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
                            @click="handleExtensionClick"
                        >
                            <div class="bg-white rounded-2xl p-1.5 shrink-0">
                                <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-3 truncate">
                                <div class="text-sm font-medium text-gray-900">Get the extension</div>
                                <div class="text-xs text-gray-600 underline">Install Now</div>
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

                <!-- Main Content -->
                <div
                    :class="`transition-all duration-300 ease-in-out ${
                        isCollapsed ? 'ml-20' : 'ml-64'
                    } flex-1 px-6 py-4`"
                >
                    <TopBar />
                    <div class="mt-2 scrollbar-thin scrollbar-thin-auto h-[calc(100vh-104px)] overflow-auto">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute();
const { $global } = useNuxtApp();

const isDarkMode = ref(false);
const isCollapsed = $global.isCollapsed;

const favorites: {
    name: string;
    icon?: string;
}[] = [{ name: 'Customer Feedback' }, { name: 'NPS Survey' }, { name: 'User Research' }, { name: 'Exit Intent' }];

const handleExtensionClick = () => {
    // Handle extension installation or redirect
    console.log('Extension button clicked');
};

const getInitials = (name: string): string => {
    // Split the name into words and get first two words
    const words = name.split(' ');
    if (words.length === 1) {
        // If single word, take first two letters
        return name.slice(0, 2).toUpperCase();
    }
    // If multiple words, take first letter of first two words
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
};

const mainMenu = [
    {
        name: 'Collect feedback',
        icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    },
    {
        name: 'Create NPS',
        icon: '<path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="2"/>',
    },
    {
        name: 'Browse templates',
        icon: '<path d="M4 5a2 2 0 012-2h6.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 6h10M7 15h10m-10 4h10" strokeWidth="2" strokeLinecap="round"/>',
    },
    {
        name: 'Start from scratch',
        icon: '<path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    },
    {
        name: 'Generate from goal',
        icon: '<path d="M13 10V3L4 14h7v7l9-11h-7zm-2 4h4m-2-2v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    },
];

// New settings menu items
const settingsMenu = [
    {
        name: 'Respondents',
        icon: '<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />',
    },
    {
        name: 'Analytics',
        icon: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
    },
    {
        name: 'Settings',
        icon: '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />',
    },
];

const toggleSidebar = async () => {
    await $global.toggleSidebar();
    if (!isCollapsed.value) await $global.updateMiniSidebarState(true);
};
</script>
