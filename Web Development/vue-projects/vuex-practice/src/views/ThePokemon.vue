<template>
  <div id="pokemon-view">
      <div id="filters-container">

        <div class="filter">
          <label for="generation">Generation: </label>
          <select name="generation" id="generation" @change="updateGen($event.target.value)">
            <option value="gen1">Generation I</option>
            <option value="gen2">Generation II</option>
            <option value="gen3">Generation III</option>
            <option value="gen4">Generation IV</option>
          </select>
        </div>

        <div class="filter">
          <label for="type">Type: </label>
          <select name="type" id="type" @change="updateType($event.target.value)">
            <option v-for="(type, index) in types"
                    :key="index" 
                    :value="type">{{ type | capitalize }}</option>
          </select>
        </div>

        <input type="text" name="search" id="searchbar" placeholder="Search Pokemon..."
        @keyup="runSearch($event.target.value)"
        v-model="searchTerms">

        <div class="filter">
          <label for="weight">Weight:</label>
          <input type="range" name="weight-input" id="weight-input" v-model="weight" min="0.1" max="999.99" @change="updateWeight($event.target.value)">
          <p> &#60; {{ weight }} kg</p>
        </div>

        <div class="filter">
          <label for="height">Height:</label>
          <input type="range" name="height-input" id="height-input" v-model="height" min="0.1" max="20" @change="updateHeight($event.target.value)">
          <p> &#60; {{ height }} m</p>
        </div>
        
        <button @click="clearFilters()" class="filter" id="clearButton">Clear Filters</button>

      </div>

      <div class="poke-grid">

        <!--PokemonCard can't use same key in two components-->
        <pokemon-card 
        v-for="(pokemon, i) in allPokemon"
        :key="`${i} - ${pokemon.id}`"
        :pokemon="pokemon"></pokemon-card>

        <div v-show="emptyDisplay">No Pokemon match your search! :'(</div>

      </div>

  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard'

export default {
  components:{
    'pokemon-card': PokemonCard
  },
  data(){
    return{
      types: [  'all',
                'bug',
                'dragon',
                'electric',
                'fairy',
                'fighting',
                'fire',
                'flying',
                'ghost',
                'grass',
                'ground',
                'ice',
                'normal',
                'poison',
                'rock',
                'steel',
                'water',
                'psychic'],
      currentGen: 'gen1',
      emptyDisplay: false,
      weight: '',
      height: '',
      searchTerms: ''
    }
  },

  computed: {
    allPokemon(){
      //search by pokemon name filter
      if(this.searchTerms){
        return this.$store.getters.availablePokemon.filter(pokemon => { return pokemon.name.match(this.searchTerms.toLowerCase()) })
      }
      return this.$store.getters.availablePokemon
    }
  },

  methods:{
    updateGen(generation){
      //clear filters or they won't apply to the new state.pokemon
      this.clearFilters();
      this.currentGen = generation;
      this.$store.dispatch('fetchPokemon', generation);
    },
    updateType(type){
      this.$store.dispatch('updateType', type)
    },
    updateHeight(height){
      this.$store.dispatch('updateHeight', height)
    },
    updateWeight(weight){
      this.$store.dispatch('updateWeight', weight)
    },
    clearFilters(){
      this.$store.dispatch('clearFilters');
      this.weight = '';
      this.height = '';
      this.searchTerms = '';
    }
  },

  watch:{
    allPokemon(){
      if(this.allPokemon.length === 0){
        this.emptyDisplay = true;
      }else{
        this.emptyDisplay = false;
      }
    }
  }
}
</script>

<style>
#pokemon-view{
  width: 100%;
  color: white;
}
  /*GRID*/
  .poke-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-auto-rows: 200px;
    grid-gap: 20px;
    width: 100%;
    overflow: scroll;
  }

/*FILTERS*/
#filters-container{
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  display: flex;
  width: 250px;
  top: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  background-color: black;
  z-index: 20;
}
.filter{
  display: flex;
  margin: 5px;
  padding: 10px;
  border-radius: 2px;
  color: white;
  font-weight: 700;
}
.filter label{
  margin-right: 10px;
}
#clearButton{
  background-color:rgba(0, 0, 0, 0);
  display: block;
  color: rgba(255, 255, 255, 0.445);
  border: 1px solid rgba(255, 255, 255, 0.418);
}
#clearButton:hover{
  border: 1px solid white;
  color: white;
  display: block;
  cursor: pointer;
}
#weight-input{
  width: 100px;
}
#searchbar{
  padding:10px;
  color: black;
  width: 200px;
  background-color: white;
  border: 1px solid white;
  border-radius: 50px;
}
#searchbar:hover{
  cursor: pointer;
  box-shadow: 1px 1px 1px white, -1px -1px 1px white, 1px -1px 1px white, -1px 1px white;
}
</style>