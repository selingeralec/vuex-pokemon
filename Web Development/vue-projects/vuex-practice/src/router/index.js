import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */  '../views/ThePokemon')
  },
  {
    path: '/pokedex',
    name: 'ThePokedex',
    component: () => import(/* webpackChunkName: "pokedex" */ '../views/ThePokeDex.vue')
  },
  {
    path: '/pokemonDetail/:id',
      name: 'PokemonDetail',
      component: () => import(/* webpackChunkName: "pokemonDetail" */ "@/views/PokemonDetail")
  },
  {
    path: '/filters',
    name: 'Filters',
    component: () => import(/* webpackChunkName: "pokedex" */ '../views/FilterPractice.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  //make sure pokemon are always loaded
  if(store.state.pokemon.length === 0){
    await store.dispatch('fetchPokemon', 'gen1')
    .then(next())
  }else{
    next();
  }
})

export default router
