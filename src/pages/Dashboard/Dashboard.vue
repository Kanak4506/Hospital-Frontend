<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";


/**
 * # Patients By Race Start
 */
const patientsByRaceData = ref(null);
const patientsByRaceChartOptions = ref();

// fetching Patients data
async function getPatientsByRaceData() {
   try {
      const result = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/patients-by-race`,
      );
      patientsByRaceData.value = result.data;
      // console.log(patientsByRaceData._rawValue);
      await renderPatientsByRaceChart();
   } catch (error) {
      console.log(error);
   }
}

async function renderPatientsByRaceChart() {
   //initialize monthData structure
   const monthData = {
      months: [],
      races: {},
   };

   //filling monthData
   patientsByRaceData.value.forEach((row) => {
      if (row.month && row.patientRace) {
         const month = row.month;
         if (!monthData.months.includes(month)) {
            monthData.months.push(month);
            monthData.races[month] = {};
         }
         monthData.races[month][row.patientRace] = row.totalPatients;
      }
   });
   //sort months
   monthData.months.sort((a, b) => new Date(`${a}-01`) - new Date(`${b}-01`));

   // reorder races based on sorted months
   const sortedRaces = {};

   monthData.months.forEach((month) => {
      sortedRaces[month] = monthData.races[month];
   });

   monthData.races = sortedRaces;

   console.log(monthData);

   //initialize arrays for each race
   const whiteRacePatientsData = ref([]);
   const blackRacePatientsData = ref([]);
   const asianRacePatientsData = ref([]);
   const nativeRacePatientsData = ref([]);
   const hawaiianRacePatientsData = ref([]);
   const otherRacePatientsData = ref([]);

   //populate race data
   monthData.months.forEach((month) => {
      whiteRacePatientsData.value.push(monthData.races[month].white);
      blackRacePatientsData.value.push(monthData.races[month].black);
      asianRacePatientsData.value.push(monthData.races[month].asian);
      nativeRacePatientsData.value.push(monthData.races[month].native);
      hawaiianRacePatientsData.value.push(monthData.races[month].hawaiian);
      otherRacePatientsData.value.push(monthData.races[month].other);
   });

   // set chart options
   patientsByRaceChartOptions.value = {
      tooltip: {
         trigger: "axis",
      },
      legend: {
         data: ["White", "Black", "Asian", "Native", "Hawaiian", "Others"],
      },
      grid: {
         left: "3%",
         right: "4%",
         bottom: "3%",
         containLabel: true,
      },

      xAxis: {
         type: "category",
         boundaryGap: false,
         data: monthData.months,
      },
      yAxis: {
         type: "value",
      },
      series: [
         {
            name: "White",
            type: "line",
            data: whiteRacePatientsData.value,
            label: {
               show: true,
            },
         },
         {
            name: "Black",
            type: "line",
            data: blackRacePatientsData.value,
            label: {
               show: true,
            },
         },
         {
            name: "Asian",
            type: "line",
            data: asianRacePatientsData.value,
            label: {
               show: true,
            },
         },
         {
            name: "Native",
            type: "line",
            data: nativeRacePatientsData.value,
            label: {
               show: true,
            },
         },
         {
            name: "Hawaiian",
            type: "line",
            data: hawaiianRacePatientsData.value,
            label: {
               show: true,
            },
         },
         {
            name: "Others",
            type: "line",
            data: otherRacePatientsData.value,
            label: {
               show: true,
            },
         },
      ],
   };
}

onMounted(async () => {
   await getPatientsByRaceData();
});

/**
 * # Patients By Race End
 */
</script>

<template>
   <!-- # Patients By Race Bar Chart -->
   <div
      class="tw-iems-center tw-flex tw-flex-col tw-justify-center tw-gap-10 tw-bg-[#f5f4ec] tw-p-4">
      <span
         class="tw-text-xl tw-font-semibold tw-text-[#f5b047] lg:tw-text-3xl">
         Registered Patients By Race Month Wise
      </span>
      <div class="tw-mx-10 tw-h-[400px] lg:tw-h-[600px] lg:tw-w-[1000px]">
         <v-chart :option="patientsByRaceChartOptions"></v-chart>
      </div>
   </div>
</template>

<style scoped></style>
