import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'

import pokeData from '@/api/pokeData'
import dataFilters from '../../filters'

Vue.use(Vuex)

export default new Vuex.Store({
  //save currentGen so it can be used on page reload to set the right pokemon
  /*plugins: [createPersistedState({
    key: 'pokemon',
    storage: sessionStorage
  })],*/

  state: {
    pokemon: [],
    pokedex: [],
    currentType: 'all',
    emptyPokedex: true,
    currentGen: 'gen1',
    currentFilters: {
      typeFilter: 'all',
      searchTerms: null,
      height: null,
      weight: null
    },
    typeColor: {
      bug: "#A8B820",
      dragon: "#7038F8",
      electric: "#F8D030",
      fairy: "#EE99AC",
      fighting: "#C03028",
      fire: "#F08030",
      flying: "#A890F0",
      ghost: "#705898",
      grass: "#78C850",
      ground: "#E0C068",
      ice: "#98D8D8",
      normal: "#A8A878",
      poison: "#A040A0",
      psychic: "#F85888",
      rock: "#B8A038",
      steel: "#B8B8D0", 
      water: "#6890F0",
      water1: "#6890F0",
      water2: "#6890F0",
      water3: "#5876BE",
      dark: 'rgb(44, 44, 44)'
              }
  },
  
  getters:{
    availablePokemon: (state) => {
      //type filter
      if(state.currentFilters.typeFilter != 'all' && !state.currentFilters.height && !state.currentFilters.weight){
          return dataFilters.type(state.pokemon, state.currentFilters.typeFilter);
      }
      //height filter
      else if(state.currentFilters.typeFilter === 'all' && state.currentFilters.height && !state.currentFilters.weight){
          return dataFilters.height(state.pokemon, state.currentFilters.height);
      }
      //weight filter
      else if(state.currentFilters.typeFilter === 'all' && !state.currentFilters.height && state.currentFilters.weight){
          return dataFilters.weight(state.pokemon, state.currentFilters.weight)
      }
      //type + height filter
      else if(state.currentFilters.typeFilter != 'all' && state.currentFilters.height && !state.currentFilters.weight){
          return dataFilters.type(state.pokemon, state.currentFilters.typeFilter)
          .filter(pokemon => { return pokemon.height <= state.currentFilters.height })
      }
      //type + weight filter
      else if(state.currentFilters.typeFilter != 'all' && !state.currentFilters.height && state.currentFilters.weight){
          return dataFilters.type(state.pokemon, state.currentFilters.typeFilter)
              .filter(pokemon => { return pokemon.weight <= state.currentFilters.weight })
      }
      //type + height + weight filter
      else if(state.currentFilters.typeFilter != 'all' && state.currentFilters.height && state.currentFilters.weight){
          return dataFilters.type(state.pokemon, state.currentFilters.typeFilter)
                .filter(pokemon => { return pokemon.height <= state.currentFilters.height })
                .filter(pokemon => { return pokemon.weight <= state.currentFilters.weight })
      }      
      //height + weight filter
      else if(state.currentFilters.typeFilter === 'all' && !state.currentFilters.searchTerms && state.currentFilters.height && state.currentFilters.weight){
          return dataFilters.height(state.pokemon, state.currentFilters.height)
                .filter(pokemon => { return pokemon.weight <= state.currentFilters.weight })
      }
      else{
        return state.pokemon;
      }
    },
    caughtPokemon(state){
      return state.pokedex;
    },
    emptyPokedex(state){
      return state.emptyPokedex;
    }
  },

  mutations: {
    SET_POKEMON(state, pokemon){
      console.log('MUTATED')
      state.pokemon = pokemon;
    },
    ADD_TO_POKEDEX(state, pokedexItem){
      //push new Object with custom ID 
      //so same pokemon can be added to pokedex multiple times
      state.pokedex.push(pokedexItem);
      if(state.pokedex.length === 0){
        state.emptyPokedex = true;
      }else{
        state.emptyPokedex = false;
      }
    },
    REMOVE_FROM_POKEDEX(state, id){
      //find pokemon position in array by matching it's object ref
      let index = state.pokedex.findIndex(pokemon => pokemon.id === id);
      //remove from array
      state.pokedex.splice(index, 1);
      //toggle empty message
      if(state.pokedex.length === 0){
        state.emptyPokedex = true;
      }else{
        state.emptyPokedex = false;
      }
    },
    CLEAR_ALL_FILTERS(state){
      state.currentFilters = { 
      typeFilter: 'all',
      searchTerms: '',
      height: null,
      weight: null }
    },
    CHANGE_TYPE(state, type){
      state.currentFilters.typeFilter = type;
    },
    CHANGE_HEIGHT(state, height){
      state.currentFilters.height = height;
    },
    CHANGE_WEIGHT(state, weight){
      state.currentFilters.weight = weight;
    },
    CHANGE_SEARCH_TERMS(state, newSearch){
      state.currentFilters.searchTerms = newSearch
    }
  },

  actions: {
    fetchPokemon(context, currentGen){
      this.currentGen = currentGen;
      context.commit('SET_POKEMON', pokeData.fetchPokemon(currentGen));
    },
    catchPokemon(context, pokedexItem){
      context.commit('ADD_TO_POKEDEX', pokedexItem)
    },
    clearFilters(context){
      context.commit('CLEAR_ALL_FILTERS')
    },
    releasePokemon(context, id){
      context.commit('REMOVE_FROM_POKEDEX', id)
    },
    updateType(context, type){
      context.commit('CHANGE_TYPE', type)
    },
    updateHeight(context, height){
      context.commit('CHANGE_HEIGHT', height)
    },
    updateWeight(context, weight){
      context.commit('CHANGE_WEIGHT', weight)
    },
    updateSearchTerms(context, newSearch){
      context.commit('CHANGE_SEARCH_TERMS', newSearch)
    }
  }
})
