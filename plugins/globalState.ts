// plugins/globalState.ts
export default defineNuxtPlugin(() => {
    const global = useGlobal();

    return {
        provide: {
            isCollapsed: global.isCollapsed,
            isMiniCollapsed: global.isMiniCollapsed,
            survey: global.survey,
            setSurvey: global.setSurvey,
            toggleSidebar: global.toggleSidebar,
            updateSidebarState: global.updateSidebarState,
            clearStorage: global.clearStorage,
            global: global, // Provide the full global object if needed
        },
    };
});
