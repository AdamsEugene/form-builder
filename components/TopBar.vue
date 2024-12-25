<!-- components/TopBar.vue -->
<template>
    <div class="sticky top-0 z-10 bg-sidebar-gradient border-r border-purple-100/20 shadow-lg rounded-2xl">
        <div class="flex items-center justify-between h-16 px-6">
            <!-- Breadcrumbs -->
            <div class="flex items-center space-x-2">
                <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
                    <NuxtLink :to="crumb.path" class="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <span v-if="crumb.icon" class="mr-1.5">
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                v-html="crumb.icon"
                            ></svg>
                        </span>
                        {{ crumb.name }}
                    </NuxtLink>
                    <svg
                        v-if="index < breadcrumbs.length - 1"
                        class="w-4 h-4 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </template>
            </div>

            <!-- Right Section -->
            <div class="flex items-center space-x-4">
                <!-- Search Bar -->
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        class="w-64 px-3 py-2 text-sm bg-white/50 rounded-2xl border border-purple-100/20 focus:outline-none focus:ring-2 focus:ring-purple-100/20"
                    />
                    <svg
                        class="w-4 h-4 absolute right-3 top-2.5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <!-- Action Icons -->
                <div class="flex items-center space-x-3">
                    <!-- Notifications -->
                    <button class="p-2 text-gray-600 hover:bg-white/50 rounded-2xl">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <!-- Help -->
                    <button class="p-2 text-gray-600 hover:bg-white/50 rounded-2xl">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <!-- Profile -->
                    <button class="flex items-center space-x-2 p-1.5 text-gray-600 hover:bg-white/50 rounded-2xl">
                        <div class="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-sm font-medium text-purple-600">JD</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>
