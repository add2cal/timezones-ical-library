<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { tzlib_get_timezones } from 'timezones-ical-library';
import { computed, ref, watch } from 'vue';

type NullableString = string | null | undefined;

const props = defineProps<{
  modelValue?: NullableString;
}>();

const emit = defineEmits(['update:modelValue']);

// timezones are just strings
const internalOptions = computed<string[]>(() => {
    const tz = tzlib_get_timezones();
    return Array.isArray(tz) ? (tz as string[]) : [];
});

// search query
const query = ref('');
const comboBtn = ref<any>(null);
const inputRef = ref<any>(null);

// filtering
const filteredOptions = computed(() => {
  if (!query.value) return internalOptions.value;
  const q = query.value.toLowerCase().replace(/\s+/g, '');
  return internalOptions.value.filter((opt) => {
    return opt.toLowerCase().replace(/\s+/g, '').includes(q);
  });
});

const onUpdate = (val: string | null) => {
  emit('update:modelValue', val);
  query.value = '';
};

const clear = () => {
  emit('update:modelValue', null);
  query.value = '';
};

// Sync displayed text when external modelValue changes
watch(
  () => props.modelValue,
  () => {
    query.value = '';
  }
);

const hasEmptyValue = computed(() => !props.modelValue);

const displayValue = (val: unknown) => (typeof val === 'string' ? val : '');

const handleInputClick = () => {
  const btn = comboBtn.value?.el || comboBtn.value?.$el || comboBtn.value;
  const input = inputRef.value?.el || inputRef.value?.$el || inputRef.value;
  input?.focus?.();
  if (btn && btn.getAttribute?.('aria-expanded') !== 'true' && typeof btn.click === 'function') {
    btn.click();
  }
};
</script>

<template>
  <div>
    <Combobox class="relative w-full text-left" :modelValue="props.modelValue" nullable immediate @update:model-value="onUpdate">
        <div class="relative group">
          <div
            class="
              flex w-full items-center gap-2 rounded-md p-3 text-left
              bg-zinc-50 dark:bg-zinc-700
              shadow hover:bg-white dark:hover:bg-zinc-600 hover:shadow-md
              focus-within:ring-2 focus-within:ring-secondary/75
              cursor-text
            "
            @click="handleInputClick"
          >
            <div class="shrink-0" :class="{ 'text-zinc-400': hasEmptyValue }">
              <MagnifyingGlassIcon class="h-6 w-6" />
            </div>

            <div class="relative flex w-full items-center gap-2">
              <ComboboxInput
                ref="inputRef"
                class="w-full truncate bg-transparent text-left caret-secondary focus:outline-none"
                placeholder="Search for a time zone..."
                :display-value="displayValue"
                @input="query = $event.target.value"
                @click="handleInputClick"
              />

              <ComboboxButton ref="comboBtn" class="flex shrink-0 cursor-pointer items-center" v-slot="{open}">
                <span v-if="!hasEmptyValue" role="button" tabindex="0" class="focus:outline-none focus-visible:ring focus-visible:ring-secondary/75" @click.stop.prevent="clear" @keydown.space.stop.prevent="clear" @keydown.enter.stop.prevent="clear">
                  <XMarkIcon class="h-5 w-5 cursor-pointer text-zinc-400 hover:text-secondary" role="button" />
                </span>
                <ChevronDownIcon :class="['h-5 w-5 text-zinc-400 transition-transform', open ? 'rotate-180' : '']" aria-hidden="true" />
              </ComboboxButton>
            </div>
          </div>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ComboboxOptions class="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-sm shadow-lg ring-2 ring-secondary/75 focus:outline-none">
              <template v-if="filteredOptions.length === 0 && query !== ''">
                <div class="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300 italic">
                  No results found.
                </div>
              </template>

              <ComboboxOption
                v-for="tz in filteredOptions"
                :key="tz"
                :value="tz"
                as="template"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-secondary-light text-zinc-900': active,
                    'text-zinc-900 dark:text-zinc-100': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                  >
                    {{ tz }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </transition>
        </div>
    </Combobox>
  </div>
</template>
