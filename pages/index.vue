<template>
  <loading-message v-if="loading" />
  <map-component
    v-else
    :pageInfo="pageInfo"
    :originalMarkers="originalMarkers"
    :filtersGeneralInfo="filtersGeneralInfo"
    :filterProperties="filterProperties"
    iconBehaviour="changing"
  />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useIcons } from '@/composables/useIcons';
import { SPARQLQueryDispatcher } from '~/assets/js/SPARQLQueryDispatcher';
import APIDataHandler from '~/assets/js/APIDataHandler';
import FilteringMethods from '~/assets/js/FilteringMethods';
import json from '../big-query-output.json';
import MapComponent from '../components/MapComponent.vue';
import LoadingMessage from '../components/LoadingMessage.vue';

export default {
  components: {
    MapComponent,
    LoadingMessage
  },
  data() {
    return {
      pageInfo: {
        title: 'Witchcraft Prosecutions In Time and Place',
        html: '<div>This map shows the geographical residence location for each accused witch in Scotland taken from the Survey of Scottish Witchcraft Database. Out of the <b class="font-bold">3212</b> accused witches whose names are known, the residence for <b class="font-bold">3142</b> witches has been located. The majority of the residences are accurately located down to the precise settlement, while others range from parish to county depending on the records surviving for each accused witch. There is a total of 821 different locations recorded in the database; all but 25 of these have been identified. The remaining unidentified place-names are currently recorded as \‘County of’\ on the map.</div>',
        footer: 'witches.is.ed.ac.uk',
        confirmButtonText: 'Close',
        type: 'info',
        showCloseButton: true
      },
      queryOutput: json,
      sparqlUrl: 'https://query.wikidata.org/sparql',
      wikiPages: [],
      loading: true,
      originalMarkers: [],
      filtersToFind: [
        ['socialClass', 'changing'],
        ['occupation', 'changing']
      ],
      filtersGeneralInfo: {
        title: 'Accused witch filters',
        filtersShowing: true
      },
      filterProperties: {
        sex: {
          label: 'Gender',
          filters: {
            male: {
              label: 'Male',
              active: true,
              iconUrl: '/images/witch-single-blue.png'
            },
            female: {
              label: 'Female',
              active: true,
              iconUrl: '/images/witch-single-orange.png'
            },
            unknown: {
              label: 'Unknown',
              active: true,
              iconUrl: '/images/witch-single-BW.png'
            }
          },
          showing: true
        },
        socialClass: {
          label: 'Social Classification',
          filters: {},
          showing: false
        },
        occupation: {
          label: 'Occupations',
          filters: {},
          showing: false
        },
        hasWikiPage: {
          label: 'Wikipedia Page',
          filters: {
            hasWiki: {
              label: 'Has wiki',
              active: true,
              iconUrl: '/images/witch-single-blue.png'
            },
            noWiki: {
              label: 'No wiki',
              active: true,
              iconUrl: '/images/witch-single-orange.png'
            }
          },
          showing: false
        }
      }
    };
  },
  computed: {
    icons() {
      const { icons } = useIcons();
      return icons.value;
    }
  },
  methods: {
    async loadWikiEntries() {
      console.log('Loading wiki entries...');
      const sparqlQuery = `SELECT DISTINCT ?item ?LabelEN ?page_title
          WHERE {
            ?item wdt:P4478 ?witch .
            ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> ;  schema:name ?page_title .
            ?item rdfs:label ?LabelEN filter (lang(?LabelEN) = "en") .
          }`;

      const queryDispatcher = new SPARQLQueryDispatcher(this.sparqlUrl);
      try {
        const result = await queryDispatcher.query(sparqlQuery);
        console.log('Wiki entries result:', result);

        this.wikiPages = result.results.bindings.map(item => ({
          id: item.item.value,
          pageTitle: item.page_title.value
        }));

        console.log('Loaded wikiPages:', this.wikiPages);
      } catch (e) {
        console.error('Error loading wiki entries:', e);
      }
    },

    hasLocalStorageExpired() {
      const hours = 24;
      const now = new Date().getTime();
      const setupTime = localStorage.getItem('setupTime');
      const expired = setupTime === null || (now - setupTime > hours * 60 * 60 * 1000);

      console.log('Has local storage expired?', expired);
      return expired;
    },

    loadDataFromLocalStorage() {
      console.log('Loading data from localStorage...');
      this.originalMarkers = JSON.parse(localStorage.getItem('residenceMarkers')) || [];
      const allFilters = JSON.parse(localStorage.getItem('allFilters')) || {};

      this.filterProperties.socialClass.filters = allFilters.socialClass || {};
      this.filterProperties.occupation.filters = allFilters.occupation || {};

      console.log('Loaded originalMarkers:', this.originalMarkers);
      console.log('Loaded filters from localStorage:', this.filterProperties);
    },

    saveDataToLocalStorage(foundFilters) {
      const now = new Date().getTime();
      localStorage.setItem('setupTime', now);
      localStorage.setItem('residenceMarkers', JSON.stringify(this.originalMarkers));
      localStorage.setItem('allFilters', JSON.stringify(foundFilters));

      console.log('Data saved to localStorage:', {
        residenceMarkers: this.originalMarkers,
        allFilters: foundFilters
      });
    },

    setMarkersIcons() {
      console.log('Setting marker icons...');
      const Filtering = new FilteringMethods(this.filterProperties, 'sex');

      this.originalMarkers.forEach(marker => {
        [marker.markerIcon, marker.active] = Filtering.getMarkerStateIconDependant(marker);
      });

      console.log('Markers after setting icons:', this.originalMarkers);
    },

    async loadData() {
      console.log('Loading data...');
      await this.loadWikiEntries();
      const icons = this.icons;

      console.log('Fetched icons:', icons);

      try {
        const { data, error } = await useFetch('/main.php?type=accused');
        if (error.value) {
          console.error('Error fetching data:', error.value);
          return;
        }
        console.log('Fetched data from API:', data.value);
        this.queryOutput = data.value;
      } catch (e) {
        console.error('Error fetching data:', e);
        return;
      }

      const getData = new APIDataHandler(
        this.queryOutput, this.wikiPages,
        icons, null
      );
      const filtersFound = null;

      [this.originalMarkers, filtersFound] = getData.loadAccussed('residence', this.filtersToFind);

      console.log('Loaded originalMarkers and filtersFound:', {
        originalMarkers: this.originalMarkers,
        filtersFound
      });

      this.filterProperties.socialClass.filters = filtersFound.socialClass;
      this.filterProperties.occupation.filters = filtersFound.occupation;
      this.setMarkersIcons();
      this.loading = false;
    }
  },
  mounted() {
    console.log('Component mounted, starting data load...');
    this.loadData();
  }
};
</script>

<style>
/* Add your styles here */
</style>
