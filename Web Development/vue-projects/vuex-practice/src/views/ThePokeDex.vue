<template>
<div class="pokedex">
      
  <div id="pokedex-header">
        <div class="header-img">
          <div id="placeholder-img" v-show="activeItem===undefined"><i class="far fa-question-circle"></i></div>
          <img class="header-img" v-if="activeItem && currentPoke"
              :src="currentPoke.imgUrl" alt="pokemon image">
        </div>
        <div class="header-title">
          <h1 v-if="activeItem===undefined">Select a Pokemon </h1>
          <p v-if="activeItem===undefined">Select an item from your pokedex to learn more about <br> the pokemon you've caught or release them.</p>
        
          <h1 v-if="activeItem && currentPoke">{{ currentPoke.name | capitalize }}</h1>
          <p v-if="activeItem && currentPoke">{{ currentPoke.description }}</p>

          <button id="pokedex-btn" @click="releasePokemon(currentPoke.id)" :title="`Release ${currentPoke.name}?`" v-if="activeItem && currentPoke">Release {{ currentPoke.name |capitalize }}?</button>
        </div>        
  </div>


  <div id="list-container">
    
    <div id="list-header">
      <p>#</p>
      <p><i class="far fa-user-circle"></i></p>
      <p style="width: 200px">name</p>
    </div>

    <h3 v-show="emptyPokedex">Nothing here. Go catch some <router-link to="/">Pokemon</router-link>!</h3>
    <div class="list-item"
        v-for="pokemon in pokedex" 
        :key="pokemon.id"
        :class="{activeItem:pokemon.id == activeItem}"
        @click="activeItem = pokemon.id">
            <div class="list-content">
            <span>{{ pokedex.indexOf(pokemon)+1 | poke_id_filter}}</span>
            <img :src="pokemon.imgUrl" alt="pokemon-image">
            <h2>{{ pokemon.name | capitalize }}</h2>
        </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Pokedex',
  data(){
    return{
      activeItem: undefined,
    }
  },
  computed: {
    pokedex(){
      return this.$store.getters.caughtPokemon;
    },
    currentPoke(){
      return this.pokedex.find(poke => poke.id == this.activeItem)
    },
    emptyPokedex(){
      return this.$store.getters.emptyPokedex;
    }
  },
  methods:{
    releasePokemon(id){
      this.$store.dispatch('releasePokemon', id);
      if(id === this.activeItem){
        this.activeItem = undefined;
      }
    }
  }
}
</script>

<style scoped>
a{
  outline: 0;
  color: #1db954da;
}
.pokedex{
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%; 
  padding-left: 30px;
  padding-top: 30px;
}
#pokedex-header{
  height: 200px;
  display: flex;
  width: 900px;
  margin-bottom: 10px;
}
.header-img{
  width: 200px;
  height: 200px;
}
.header-title{
  text-align: left;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 20px;
}
#placeholder-header{
  display: inherit;
  width: 900px;
  margin: 30px;
}
#placeholder-img{
  background-color: rgba(255, 255, 255, 0.897);
  height: 100%;
  width: 100%;
  color: rgba(0, 0, 0, 0.582);
  font-size: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#pokedex-btn{
  background-color: #1db954da;
  border-radius: 40px;
  border: none;
  color: white;
  width: 155px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 5px;
}
#pokedex-btn:hover{
  background-color: #1db954;
  cursor: pointer;
  transform: scale(1.1)
}

#list-header{
  position: sticky;
  color: rgba(255, 255, 255, 0.521);
  width: 100%;
  text-transform: uppercase;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
}
#list-header .far{
  font-size: 20px;
}
#list-container{
  width: 1000px;
  overflow: scroll;
  height: 500px;
  margin-top: 20px;
  width: 800px;
}
.list-item{
  line-height: 40px;
  width: 100%;
  height: 40px;
  color: white;
  border-top: 1px solid rgba(255, 255, 255, 0.295);
}
#list-container h3{
  margin-top: 30px;
}

.list-item h2{
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item:last-child{
  border-bottom: 1px solid rgba(255, 255, 255, 0.295);
}
.list-item:hover{
  background-color: rgb(53, 53, 53);
  cursor: pointer;
}
.list-content{
  display: flex;
  justify-content: space-around;
  height: 100%;
  margin: auto;
}
/* ACTIVE class */
.activeItem{
  background-color: #535353;;
}
.list-item img{
  width: 50px;
  margin-right: 5px;
  opacity: 50%;
}
</style>
