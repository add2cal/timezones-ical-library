<script setup lang="ts">
import { ref, watch } from "vue";
import { tzlib_get_ical_block, tzlib_get_offset } from "timezones-ical-library";
import Autocomplete from "@components/autocomplete.vue";

const selectedTimezone = ref<string | null>(null);
const outputValue = ref<string>("");
const offsetValue = ref<string>("");
const showOutput = ref(false);

const currentDate = new Date()
  .toISOString()
  .replace(/:\d{2}.\d{3}Z$/, "")
  .split("T");

watch(selectedTimezone, (newVal) => {
  if (!newVal) {
    showOutput.value = false;
    outputValue.value = "Please select a time zone above...";
    offsetValue.value = "Please select a time zone above...";
    return;
  }

  const result = newVal;
  let tzBlock = tzlib_get_ical_block(result);
  let tzOffsetBlock = tzlib_get_offset(result, currentDate[0], currentDate[1]);

  let blockStr = Array.isArray(tzBlock) ? tzBlock[0] : tzBlock;

  if (!blockStr) {
    blockStr = "Given timezone not valid.";
    tzOffsetBlock = blockStr;
  }

  outputValue.value = blockStr;
  offsetValue.value =
    typeof tzOffsetBlock === "object"
      ? JSON.stringify(tzOffsetBlock, null, 2)
      : (tzOffsetBlock as string);
  showOutput.value = true;
});
</script>

<template>
  <div
    class="to-primary-dark/40 from-primary-light/50 bg-radial py-20 shadow-inner"
  >
    <div class="mx-auto flex w-fit flex-col gap-6 md:flex-row md:gap-0">
      <div class="flex flex-col">
        <h3 class="mb-1 text-center italic">Give it a try!</h3>
        <div class="hidden md:block">
          <svg
            class="stroke-secondary-dark dark:stroke-secondary ml-24"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="45"
          >
            <g
              fill="none"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-miterlimit="10"
            >
              <path
                d="M108.519 35.397c-9.013 8.839-24.133 9.449-34.974 3.485-4.474-2.461-10.037-7.56-8.195-13.4.818-2.596 4.623-7.007 7.465-3.78 3.573 4.061-3.756 11.358-6.245 13.396-6.997 5.731-16.648 7.996-25.507 6.503-20.278-3.415-29.921-23.09-37.544-39.87"
              />
              <path
                stroke-linejoin="round"
                d="M109.988 43.269c-.98-4.277 1.606-7.742 1.49-11.938-2.883 1.396-8.855 3.965-12.196 3.507"
              />
            </g>
          </svg>
        </div>
      </div>

      <div class="relative z-50 min-w-xs grow">
        <Autocomplete v-model="selectedTimezone" />
      </div>
      <div class="w-52 shrink"></div>
    </div>

    <div :class="['mx-auto mt-8 w-md', showOutput ? 'block' : 'hidden']">
      <div
        class="rounded border border-gray-400 bg-gray-100 p-4 shadow-lg dark:border-gray-500 dark:bg-gray-800"
      >
        <pre
          class="overflow-x-auto"
        ><code class="text-sm">{{ outputValue }}</code></pre>
      </div>

      <div
        class="relative mt-8 flex rounded border border-gray-400 bg-gray-100 shadow-lg dark:border-gray-500 dark:bg-gray-800"
      >
        <span
          class="flex items-center justify-center border-r border-gray-400 bg-black/10 p-2 text-xs font-bold dark:border-gray-500 dark:bg-white/10"
          >Current Offset:</span
        >
        <pre
          class="overflow-x-auto p-2"
        ><code class="text-sm">{{ offsetValue }}</code></pre>
      </div>
    </div>
  </div>
</template>
