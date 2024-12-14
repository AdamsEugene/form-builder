// composables/useBreadcrumbs.ts
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export interface Breadcrumb {
  name: string;
  path: string;
  icon?: string;
}

export const useBreadcrumbs = () => {
  const breadcrumbs = ref<Breadcrumb[]>([]);
  const route = useRoute();

  // Map of route names to icons
  const iconMap = {
    home: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
    "collect-feedback":
      '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
    // Add more icons for other routes as needed
  };

  const generateBreadcrumbs = () => {
    const pathArray = route.path.split("/").filter(Boolean);
    const newBreadcrumbs: Breadcrumb[] = [];

    // Always add home
    newBreadcrumbs.push({
      name: "Home",
      path: "/",
      icon: iconMap.home,
    });

    // Build up the breadcrumbs based on the current path
    let currentPath = "";
    pathArray.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      newBreadcrumbs.push({
        name,
        path: currentPath,
        icon: iconMap[segment as keyof typeof iconMap],
      });
    });

    breadcrumbs.value = newBreadcrumbs;
  };

  // Watch for route changes
  watchEffect(() => {
    generateBreadcrumbs();
  });

  return {
    breadcrumbs,
  };
};
