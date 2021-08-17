<template>
  <div>
    <div v-if="detailed" class="places">
      <b-card
        v-for="(result, index) in detailed" :key="`list-element-${index}`"
        :title="result.name"
        style="max-width: 20rem;"
        class="mb-2"
        :style="`background: ${reformModeColor(result.mode)}`"
      >
        <b-card-text style="min-height: 50px;">
          {{ result.formatted_address }}
        </b-card-text>
        <b-card-text style="min-height: 25px;">
          {{ reformMode(result.mode) }}
        </b-card-text>


        <modal :texts="{ trigger: 'Opinie'}">
          <div slot="content">
            <div class="reviews" v-if="result.details && result.details.result.reviews">
              <div class="review" v-for="(review, index) in result.details.result.reviews" :key="`list-review-${index}`">
                {{ review.text }} - {{ review['author_name'] }}
                <div v-if="review.sentiment">
                  {{ review.sentiment.feeling }}
                </div>
              </div>
            </div>
          </div>
        </modal>
      </b-card>
    </div>
  </div>
</template>

<script>
import latinize from 'latinize';
import Modal from './Modal.vue';

export default {
  name: 'Places',
  components: {
    Modal
  },
  props: {
    phrase: { type: String, default: "" }
  },
  data() {
    return {
      endpoints: {
        host: 'http://localhost:8080/',
        places: {
          details: 'api/v1/places/details/',
          list: 'api/v1/places/list/',
          all: 'api/v1/places/all/',
        },
        sentiments: {
          reveal: 'api/v1/sentiments/reveal/'
        }
      },
      list: {},
      listDetailed: {},
      sentiments: []
    }
  },
  computed: {
    detailed() {
      if (Object.keys(this.listDetailed).length > 0 && this.listDetailed.results) {
        return this.listDetailed.results
      } else {
        return [];
      }
    }
  },
  watch: {
    phrase: {
      immediate: true,
      handler() {
        this.sentiments = [];
        this.$forceUpdate();
        this.fetchPlacesList(this.phrase);
      }
    },
    list() {
      this.listDetailed = this.list;
      if (this.listDetailed && this.listDetailed.results) {
        this.listDetailed.results.forEach(this.fetchPlacesDetails)
      }
    },
    sentiments: {
      deep: true,
      handler() {
        for (const index in this.sentiments) {
          const sentiment = this.sentiments[index];
          if (sentiment && sentiment.mode) {
            this.listDetailed.results
              .find(this.findPlaceById.bind(this, sentiment.id)).mode = sentiment.mode;
            this.$forceUpdate();
          }
        }
      }
    }
  },
  methods: {
    reformMode(mode) {
      switch (mode) {
        case 'Clearly Positive':
          return "Pozytywna";
        case 'Clearly Negative':
          return "Negatywna";
        case 'Neutral':
          return "Neutralna";
        case 'Mixed':
          return "Mieszana";
        default:
          return '';
      }
    },
    reformModeColor(mode) {
      switch (mode) {
        case 'Clearly Positive':
          return "#dbf5db";
        case 'Clearly Negative':
          return "#ffc4c4";
        case 'Neutral':
          return "#c4ceff";
        case 'Mixed':
          return "#f9ffc4";
        default:
          return '';
      }
    },
    fetchPlacesList(query) {
      const endpoint = `${this.endpoints.host}` +
        `${this.endpoints.places.list}${latinize(query)}` 
      fetch(encodeURI(endpoint))
        .then(response => response.json())
        .then(data => { this.list = data; });
    },
    fetchPlacesDetails(element) {
      if (element['place_id']) {
        this.fetchPlaceDetails(element['place_id']);
      }
    },
    fetchPlaceDetails(id) {
      const endpoint = `${this.endpoints.host}` +
        `${this.endpoints.places.details}${id}` 
      fetch(encodeURI(endpoint))
        .then(response => response.json())
        .then(data => { 
          this.listDetailed.results
          .find(this.findPlaceById.bind(this, id))
            .details = data; 
          this.listDetailed.results
          .find(this.findPlaceById.bind(this, id))
            .mode = ""; 

          if(data && data.result && data.result.reviews) {
            data.result.reviews.forEach(this.fetchSentimentReveals.bind(this, id))
          }
        });
    },
    fetchSentimentReveals(id, element, index) {
      if (element['text']) {
        this.fetchSentimentReveal(element['text'], index, id);
      }
    },
    fetchSentimentReveal(text, index, id) {
      const endpoint = `${this.endpoints.host}` +
        `${this.endpoints.sentiments.reveal}${this.formatReview(text)}` 
      fetch(encodeURI(endpoint))
        .then(response => response.json())
        .then(data => { 
          this.listDetailed.results
            .find(this.findPlaceById.bind(this, id))
              .details.result.reviews[index].sentiment = data;

          const sentiment = this.sentiments.find(x => x.id === id);
          if (!sentiment) {
            this.sentiments.push({
              id: id, feelings: [], mode: ""
            });
          }
          if (sentiment && sentiment.feelings) {
            sentiment.feelings.push(data.feeling)
            sentiment.mode = this.mode(sentiment.feelings);
          }
        });
    },
    findPlaceById(id, place) {
      return place['place_id'] === id;
    },
    findSentimentsMode(id) {
      return this.sentiments.find(s => s.id === id).mode
    },
    formatReview(text) {
      return text.replace('\\', '').replaceAll('/', '');
    },
    mode(arr){
        return [...arr].sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }
  }
}
</script>

<style>
.places {
  padding: 20px;
}
.card-title {
  min-height: 65px;
}
.reviews {
  scroll: auto;
}
.review {
  padding: 25px;
}
</style>
