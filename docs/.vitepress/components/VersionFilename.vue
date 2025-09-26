<template>
  <code class="version-filename" :class="{ loading: isLoading }">
    <template v-if="isLoading && !versionInfo">
      {{ template.replace(/\{version\}/g, "vx.x.x") }}
    </template>
    <template v-else>
      {{ renderedText }}
    </template>
  </code>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getFGateClientVersion, getFGateNexusVersion } from "../utils/github";

interface Props {
  repo: "nexus" | "client";
  template: string;
  fallbackVersion?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fallbackVersion: "vx.x.x"
});

const versionInfo = ref(null);
const isLoading = ref(true);

const renderedText = computed(() => {
  const version = versionInfo.value?.version || props.fallbackVersion;
  return props.template.replace(/\{version\}/g, version);
});

const fetchVersion = async () => {
  try {
    isLoading.value = true;

    const info = props.repo === "nexus" ? await getFGateNexusVersion() : await getFGateClientVersion();

    versionInfo.value = info;
  } catch (error) {
    console.error(`Failed to fetch ${props.repo} version:`, error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    fetchVersion();
  }
});
</script>

<style scoped>
.version-filename {
  background: var(--vp-code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: var(--vp-font-family-mono);
}

.version-filename.loading {
  opacity: 0.7;
}
</style>
