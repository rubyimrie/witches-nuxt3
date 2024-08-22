<template>
  <div class="ml-4 mt-2 flex flex-col">
    <div class="flex items-center">
      <div class="title-point"></div>
      <p>Choose slider date range: </p>
    </div>

    <div class="flex pl-2 py-1 flex-wrap items-center mt-2
                cursor-pointer ml-1" 
        @click="toggleRecommended()"
        ref="PresetRanges">
      <p style="font-weight: 500;" class="mr-1">-</p>
      <p style="font-weight: 500;"> Pre-set ranges showing panics </p>
      <img src="/images/arrow-down.svg" v-if="!recommendedOn"
            class="w-6 h-6" />
      <img src="/images/arrow-up.svg" v-if="recommendedOn"
            class="w-6 h-6" />
    </div>

    <div class="ml-2 lg:ml-8 mt-2 flex mb-2"
         v-if="recommendedOn">
         <Vueform>
         <SelectElement 
                  v-model="recommendedRange"
                  :items="recommendedOptions"
                  :native="true"
                  @change="handleRecommendedRange"
                  @click="scrollRecommendedIntoView"
                  placeholder="(recommended ranges)"
                   />
          </Vueform>
    </div>

    <div class="flex pl-2 py-1 flex-wrap items-center mt-2
              cursor-pointer ml-1" style="width: 225px;" 
        @click="toggleCustomSelector()">
      <p style="font-weight: 500;" class="mr-1">-</p>
      <p style="font-weight: 500;"> Custom range </p>
      <img src="/images/arrow-down.svg" v-if="!customSelectorOn"
            class="w-6 h-6" />
      <img src="/images/arrow-up.svg" v-if="customSelectorOn"
            class="w-6 h-6" />
    </div>

    <div v-if="customSelectorOn" 
         class="ml-2 lg:ml-8 mt-2 flex flex-col">
         <Vueform>
          <DatesElement name="dates"
          display-format="DD MMMM YYYY"
          v-model="customInputRange"
          mode="range"
          :disables="getEnabledDateRange"
          :default="defaultRangeCustom"
          :placeholder="defaultMessage"
          value-format="DD-MM-YYYY"
          load-format="DD-MM-YYYY"
          @change="handleCustomInputRange"
           />
        </Vueform>
    </div>
  </div>
</template>

<script>
//import vSelect from 'vue-select' //not compatable nuxt 3
//import 'vue-select/dist/vue-select.css';
import TimelineMethods from '../../assets/js/TimelineMethods';
/* <DatesElement v-model="customInputRange" 
          name="dates" 
          load-format="DD/MM/YYYY"  
          mode="range" 
          :placeholder="defaultMessage"
          :disabled="getEnabledDateRange"/> */



export default {
  components: {},
  data() {
    return {
      panicsRanges: [
        [new Date("01/01/1563"), new Date("12/31/1589")],
        [new Date("01/01/1590"), new Date("12/31/1591")],
        [new Date("01/01/1592"), new Date("12/31/1596")],
        [new Date("01/01/1597"), new Date("12/31/1597")],
        [new Date("01/01/1598"), new Date("12/31/1627")],
        [new Date("01/01/1628"), new Date("12/31/1631")],
        [new Date("01/01/1632"), new Date("12/31/1642")],
        [new Date("01/01/1643"), new Date("12/31/1644")],
        [new Date("01/01/1645"), new Date("12/31/1648")],
        [new Date("01/01/1649"), new Date("12/31/1650")],
        [new Date("01/01/1651"), new Date("12/31/1657")],
        [new Date("01/01/1658"), new Date("12/31/1659")],
        [new Date("01/01/1660"), new Date("12/31/1660")],
        [new Date("01/01/1661"), new Date("12/31/1662")],
        [new Date("01/01/1663"), new Date("12/31/1736")]
      ],
      fullRange: [
        new Date("1562-02-21T00:00:00.000Z"),
        new Date("1727-06-12T00:00:00.000Z")
      ],
      recommendedOptions: [
      { value: 0, label: "1563-89 (non-panic period)" }, 
      { value: 1, label: "1590-91 (panic period)" },
      { value: 2, label: "1592-96 (non-panic period)" },
      { value: 3, label: "1597 (panic period)" },
      { value: 4, label: "1598-1627 (non-panic period)" },
      { value: 5, label: "1628-31 (panic period)" },
      { value: 6, label: "1632-42 (non-panic period)" },
      { value: 7, label: "1643-44 (panic period)" },
      { value: 8, label: "1645-48 (non-panic period)" },
      { value: 9, label: "1649-50 (panic period)" },
      { value: 10, label: "1651-57 (non-panic period)" },
      { value: 11, label: "1658-59 (panic period)" },
      { value: 12, label: "1660 (non-panic period)" },
      { value: 13, label: "1661-62 (panic period)" },
      { value: 14, label: "1663-1736 (non-panic period)" }
      ],
      recommendedOn: true,
      recommendedRange: null,
      customSelectorOn: false,
      customInputRange: null,
      defaultRangeCustom: [new Date("01/01/1650"), new Date("01/01/1670")],
      defaultRangeCustomSrt: ["01/01/1650", "01/01/1670"],
      lang: {
        formatLocale: {
          firstDayOfWeek: true,
        },
        monthBeforeYear: true,
      }
    }
  },
  watch: {
    customInputRange(newCustomInputRange) {
      console.log('New custom input range:', newCustomInputRange);
      if (newCustomInputRange && newCustomInputRange.length === 2) {
        const parsedDates = newCustomInputRange.map(dateStr => {
          const [day, month, year] = dateStr.split('-').map(Number);
          return new Date(year, month - 1, day); 
        });
        this.$emit("selectedDateRange", [parsedDates,parsedDates]);
      }
    }
  },
  methods: {
    getEnabledDateRange: function (date) {
      return date < this.fullRange[0] || date > this.fullRange[1]
    },
    handleRecommendedRange(newRecommendedRange) {
      if (newRecommendedRange !== null) {
        console.log("Recommended Range changed 1:", newRecommendedRange); 
        let value = newRecommendedRange;
        let dateRange = this.panicsRanges[value];
        let startRange = [dateRange[0], dateRange[1]];
        this.$emit("scrollHeaderIntoView")
        this.$emit("selectedDateRange", [dateRange, startRange]);
        console.log("Recommended Range changed:", [dateRange, startRange]); 
      }
    },
    handleCustomInputRange(newCustomInputRange) {
      console.log('New custom input range:', newCustomInputRange);
      this.customInputRange = newCustomInputRange;
    },
    toggleCustomSelector: function () {
      this.customSelectorOn = !this.customSelectorOn;
    },
    toggleRecommended: function () {
      this.recommendedOn = !this.recommendedOn;
    },
    scrollRecommendedIntoView: function () {
      const el = this.$refs.PresetRanges;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  computed: {
    defaultMessage() {
      return "Default Date Range: ";
    }
  }
}
</script>

<style>
.v-select {
  width: 270px;
}

.vs__open-indicator {
  cursor: pointer;
}

.vs__selected-options {
  color: #565656;
}

.mx-input-wrapper {
  position: relative;
  width: 311px;
}

.mx-icon-calendar,
.mx-icon-clear {
  position: absolute;
  top: 50%;
  left: 226px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  vertical-align: middle;
}

.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 80%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}
</style>

<style scoped>
>>> {
  --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3;

  --vs-dropdown-bg: #E2E8F0;
  --vs-dropdown-color: #555;
  --vs-dropdown-option-color: #555;

  --vs-selected-bg: #664cc3;

  --vs-controls-cursor: pointer; 

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>