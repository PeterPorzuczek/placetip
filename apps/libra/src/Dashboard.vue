<template>
  <div>
    <div v-show="false">
      <div>
        <delayed-input-delegate @delayedInput="search">
          <input v-model="phrase">
        </delayed-input-delegate>
      </div>
      <places :phrase="phraseToSearch" />
    </div>
    <select v-model="city" class="custom-select" v-show="true">
      <option v-for="(option, index) in cities" :value="option" :key="`city-${index}`">
        {{ option.value }}
      </option>
    </select>
    
    <b-form-select v-show="false" v-model="city" :options="cities"></b-form-select>
    <div class="bank-columns">
      <div class="bank-column">
        <div class="img-holder">
          <img :src="banks[0].image" class="bank-logo" >
        </div>
        <places :phrase="`${banks[0].name} ${city.value}`" />
      </div>
      <div class="bank-column">
        <div class="img-holder">
          <img :src="banks[1].image" class="bank-logo" >
        </div>
        <places :phrase="`${banks[1].name} ${city.value}`" />
      </div>
      <div class="bank-column">
        <div class="img-holder">
          <img :src="banks[2].image" class="bank-logo" >
        </div>
        <places :phrase="`${banks[2].name} ${city.value}`" />
      </div>
      <div class="bank-column">
        <div class="img-holder">
          <img :src="banks[3].image" class="bank-logo" >
        </div>
        <places :phrase="`${banks[3].name} ${city.value}`" />
      </div>
      <div class="bank-column">
        <div class="img-holder">
          <img :src="banks[4].image" class="bank-logo" >
        </div>
        <places :phrase="`${banks[4].name} ${city.value}`" />
      </div>
    </div>
  </div>
</template>

<script>
import DelayedInputDelegate from "vue-delayed-input-delegate";
import Places from "./components/Places.vue";

export default {
  name: 'Dashboard',
  components: {
    DelayedInputDelegate,
    Places
  },
  data() {
    return {
      phrase: 'mbank gdańsk',
      phraseToSearch: '',
      city: { value: 'gdańsk', text: 'gdańsk' },
      banks: [
        { name: 'mbank', image: 'https://i.imgur.com/dqindoi.jpg' },
        { name: 'pkobp', image: 'https://i.imgur.com/5F72Zz3.png' },
        { name: 'alior', image: 'https://i.imgur.com/Bxo3nr0.png' },
        { name: 'santander', image: 'https://i.imgur.com/54pcrKC.png' },
        { name: 'getin noble', image: 'https://i.imgur.com/fdV54kt.png' },
      ],
      cities: [
        { value: 'gdańsk', text: 'gdańsk' },
        { value: 'warszawa', text: 'warszawa' },
        { value: 'elbląg', text: 'elbląg' },
      ]
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.phraseToSearch = this.phrase;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img-holder {
  width: 100%;
  justify-content: center;
  display: flex;
}
.bank-columns {
  display: flex;
  justify-self: center;
  width: 100%;
  justify-content: center;
}
.bank-column {
      padding-top: 50px;
  max-width: 400px;
  text-align: left;
}
.bank-logo {
     min-height: 100px;
    width: auto;
    height: 100px;
}
.custom-control-label:before, .custom-file-label, .custom-select {
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.custom-select {
  max-width: 50%;
    display: inline-block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url(data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center/8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
select {
    word-wrap: normal;
}
button, select {
    text-transform: none;
}
button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
*, :after, :before {
    box-sizing: border-box;
}
select:not(:-internal-list-box) {
    overflow: visible !important;
}
select {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
}
</style>
