<template>
  <div class="w-full flex flex-wrap pl-0 pr-4 mt-2">
    <div v-for="(filterItem, filterType) in sortedFiltersList" :key="filterType">
      <div class="flex mb-3 mx-2 w-full items-center">
        <input
                  @change="filterEmit(filterType)"
                  :checked="filterItem.active"
                  type="checkbox"
                  class="w-4 h-4 appearance-none bg-gray-100 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-600
                        checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center checked:before:text-xs checked:before:font-bold checked:before:leading-none"
                  />
        <p class="text-xs text-center ml-1">
          {{ filterItem.label }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: String,
      required: true,
    },
    filterTypes: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filtersList: this.filterTypes,
    };
  },
  computed: {
    sortedFiltersList() {
      const filtersEntries = Object.entries(this.filtersList);

      // Separating unknown so that it can appear first
      const unknownFilterEntry = filtersEntries.find((entry) => entry[1].label === "Unknown");
      const restFiltersEntries = filtersEntries.filter((entry) => entry[1].label !== "Unknown");

      // Sorting rest of filters into alphabetical order
      restFiltersEntries.sort((a, b) => a[1].label.localeCompare(b[1].label));

      // Recombining
      const sortedFiltersEntries = unknownFilterEntry
        ? [unknownFilterEntry, ...restFiltersEntries]
        : restFiltersEntries;
      return Object.fromEntries(sortedFiltersEntries);
    },
  },
  methods: {
    setFilterInactive: function (filterType) {
      this.filtersList[filterType].active = false;
    },
    setFilterActive: function (filterType) {
      this.filtersList[filterType].active = true;
    },
    filterEmit: function (filterType) {
      let isActive = this.filtersList[filterType].active;

      if (isActive) {
        this.setFilterInactive(filterType);
        this.$emit("filterOff", [this.property, filterType]);
      } else {
        this.setFilterActive(filterType);
        this.$emit("filterOn", [this.property, filterType]);
      }
    },
  },
};
</script>

<style>
</style>
