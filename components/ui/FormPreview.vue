<script setup lang="ts">
import { ref, watch, type Component, h, render } from 'vue';

interface Props {
    component: Component;
    formStyle?: string;
}

const props = defineProps<Props>();
const html = ref('');

const generateComponentHTML = (component: Component) => {
    // Serialize the component's template/render function
    const serializedComponent = JSON.stringify(component);
    console.log(component);

    const html = [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<script src="https://cdn.tailwindcss.com"><\/script>',
        '<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>',
        `<style>${props.formStyle || ''}</style>`,
        '</head>',
        '<body class="p-4">',
        '<div id="app"></div>',
        '<script>',
        'const component = ' + serializedComponent + ';',
        'const { createApp } = Vue;',
        'const app = createApp(component);',
        'app.mount("#app");',
        '<\/script>',
        '</body>',
        '</html>',
    ].join('\n');

    return html;
};

watch(
    () => props.component,
    () => {
        html.value = generateComponentHTML(props.component);
    },
    { immediate: true, deep: true }
);
</script>

<template>
    <div class="relative">
        <iframe
            ref="previewFrame"
            class="w-full h-[500px] border border-gray-200 rounded-2xl z-50 bg-slate-50"
            :srcdoc="html"
            sandbox="allow-forms allow-scripts"
            title="Component Preview"
        ></iframe>
    </div>
</template>
