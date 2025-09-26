<template>
  <span class="version-display" :class="{ loading: isLoading, error: hasError }">
    <template v-if="isLoading">
      <span class="loading-spinner"></span>
      加载中...
    </template>
    <template v-else-if="hasError">
      {{ fallbackVersion }}
      <span class="error-indicator" :title="errorMessage">⚠️</span>
    </template>
    <template v-else>
      <a v-if="showLink && versionInfo?.url" :href="versionInfo.url" target="_blank" class="version-link">
        {{ versionInfo?.version || fallbackVersion }}
      </a>
      <span v-else>
        {{ versionInfo?.version || fallbackVersion }}
      </span>
      <span v-if="showDate && versionInfo?.publishedAt" class="version-date">({{ versionInfo.publishedAt }})</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { getFGateClientVersion, getFGateNexusVersion } from "../utils/github";

interface Props {
  repo: "nexus" | "client";
  showLink?: boolean;
  showDate?: boolean;
  fallbackVersion?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showLink: true,
  showDate: false,
  fallbackVersion: "v*.*.*"
});

const versionInfo = ref(null);
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref("");
let refreshTimer: number | null = null;

const fetchVersion = async () => {
  try {
    isLoading.value = true;
    hasError.value = false;

    const info = props.repo === "nexus" ? await getFGateNexusVersion() : await getFGateClientVersion();

    versionInfo.value = info;
  } catch (error) {
    console.error(`Failed to fetch ${props.repo} version:`, error);
    hasError.value = true;
    errorMessage.value = error instanceof Error ? error.message : "获取版本信息失败";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    fetchVersion();

    refreshTimer = setInterval(() => {
      fetchVersion();
    }, 5 * 60 * 1000);
  }
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>

<style scoped>
.version-display {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
}

.version-display.loading {
  color: var(--vp-c-text-2);
}

.version-display.error {
  color: var(--vp-c-warning);
}

.loading-spinner {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--vp-c-divider);
  border-top: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.version-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.2s;
}

.version-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

.version-date {
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.error-indicator {
  font-size: 0.8em;
  cursor: help;
}
</style>
