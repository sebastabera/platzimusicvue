<template lang="pug">
  #app
    img(src='https://sebastabera.github.io/platzimusicvue/dist/logo.png')
    h1 PlatziMusic
    select(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.value") {{country.name}}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import Artist from "./components/Artist.vue";
import getArtists from "./api";
import Spinner from "./components/Spinner.vue";
export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        {name: "Argentina", value:"argentina"},
        {name: "Spain", value:"spain"},
        {name: "Colombia", value:"colombia"}
      ],
      selectedCountry: "argentina",
      loading: true
    }
  },
  methods: {
    refreshArtists() {
      const self = this;
      this.artists = [];
      this.loading = true;
      getArtists(this.selectedCountry)
      .then(function(artists){
        self.artists = artists;
        self.loading = false;
      });
    }
  },
  mounted() {
    this.refreshArtists()
  },
  components: {
    Artist,
    Spinner
  },
  watch: {
    selectedCountry: function(){
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color red !important
    margin-top 60px

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983
</style>
