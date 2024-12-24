<template>
    <!-- Loading Spinner -->
    <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10 rounded-lg"
    >
        <div
            class="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 rounded-full animate-spin"
        />
    </div>
    <!-- Iframe -->
    <iframe ref="frameRef" class="w-full border border-gray-200 rounded-lg" :style="{ height: '560px' }" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Component } from 'vue';
import { createApp, h } from 'vue';

const props = defineProps<{
    component: Component;
    refresh?: boolean;
}>();

const frameRef = ref<HTMLIFrameElement | null>(null);
const frameHeight = ref(578);
const isLoading = ref(false);

// Function to setup and mount the iframe content
const setupIframe = () => {
    if (!frameRef.value) return;
    const iframe = frameRef.value;
    isLoading.value = true;

    // Create the initial HTML content with Vue script and custom Tailwind configuration
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.4/vue.global.min.js"><\/script>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <script>
          tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  brand: {
                    primary: "#f2e6ff",
                    accent: "#FFB800",
                  },
                  primary: {
                    50: "#f9f5ff",
                    100: "#f2e6ff",
                    200: "#e9d5ff",
                    300: "#d8b4fe",
                    400: "#c084fc",
                    500: "#a855f7",
                    600: "#9333ea",
                    700: "#7e22ce",
                    800: "#6b21a8",
                    900: "#581c87",
                  },
                  light: {
                    background: "#ffffff",
                    surface: "#f8fafc",
                    primary: "#9333ea",
                    secondary: "#64748b",
                    accent: "#FFB800",
                  },
                  dark: {
                    background: "#1e1e2d",
                    surface: "#2a2a3c",
                    primary: "#9333ea",
                    secondary: "#94a3b8",
                    accent: "#FFB800",
                  },
                  revenue: {
                    start: "#9333ea",
                    end: "#FFB800",
                  },
                  success: {
                    light: "#22c55e",
                    dark: "#15803d",
                  },
                  warning: {
                    light: "#f59e0b",
                    dark: "#b45309",
                  },
                  error: {
                    light: "#ef4444",
                    dark: "#b91c1c",
                  }
                },
                spacing: {
                  form: {
                    input: "0.75rem",
                    gap: "1rem",
                    section: "2rem",
                  }
                },
                borderRadius: {
                  form: "0.5rem",
                  button: "0.375rem",
                },
                fontSize: {
                  "form-label": ["0.875rem", "1.25rem"],
                  "form-input": ["1rem", "1.5rem"],
                  "form-helper": ["0.75rem", "1rem"],
                },
                boxShadow: {
                  form: "0 2px 4px 0 rgb(0 0 0 / 0.05)",
                  "form-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  "form-focus": "0 0 0 2px rgb(14 165 233 / 0.2)",
                },
                animation: {
                  "form-enter": "formEnter 0.2s ease-out",
                  "form-exit": "formExit 0.15s ease-out",
                },
                keyframes: {
                  formEnter: {
                    "0%": { opacity: "0", transform: "translateY(-0.25rem)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                  },
                  formExit: {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "100%": { opacity: "0", transform: "translateY(0.25rem)" },
                  }
                },
                backgroundImage: {
                  "sidebar-gradient": "linear-gradient(180deg, #F6EFFF 0%, #F0E5FF 100%)",
                }
              }
            }
          }
        <\/script>
        <style type="text/tailwindcss">
          /* Add custom utilities that would normally be in plugins */
          .form-input-base {
            @apply w-full rounded-form px-3 py-2 border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-dark-surface dark:text-white;
          }
          .form-label-base {
            @apply block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1;
          }
          .form-helper-base {
            @apply mt-1 text-sm text-gray-500 dark:text-gray-400;
          }
            body {overflow:hidden}
        </style>
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
  `;

    // Set up iframe content
    iframe.contentWindow?.document.open();
    iframe.contentWindow?.document.write(htmlContent);
    iframe.contentWindow?.document.close();

    // Wait for iframe to load
    iframe.onload = () => {
        const iframeDocument = iframe.contentWindow?.document;
        if (!iframeDocument) return;

        // Mount component after iframe loads
        const app = createApp({
            setup() {
                return () => h(props.component);
            },
        });

        const mountPoint = iframeDocument.getElementById('app');
        if (mountPoint) {
            app.mount(mountPoint);
        }

        // Adjust height based on content
        const resizeObserver = new ResizeObserver(() => {
            if (iframeDocument.body) {
                frameHeight.value = iframeDocument.body.scrollHeight;
            }
        });

        if (iframeDocument.body) {
            resizeObserver.observe(iframeDocument.body);
        }

        setTimeout(() => {
            isLoading.value = false;
        }, 300);
    };
};

onMounted(setupIframe);

// Watch for refresh prop changes
watch(
    () => props.refresh,
    (newValue, oldValue) => {
        if (newValue !== oldValue && newValue === true) {
            setupIframe();
        }
    }
);
</script>
