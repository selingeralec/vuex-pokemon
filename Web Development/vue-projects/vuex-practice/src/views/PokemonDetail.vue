<template>
  <div id="pokemon-detail-cont">

    <!--v-if="" delays loading image-carousel computed dependencies unless the data is there-->
    <custom-component 
    v-if="catcherActive === true && pokemon.sprites"
    :images="pokemon.sprites"
    @close-btn="catcherActive = false">
    </custom-component>

    <div id="pokemon-detail" v-if="!isLoading">
      
      <div class="detail-header">

        <div class="header-img"
          :style="{backgroundColor: typeColor[currentPokemon.types[0].type.name]}">
        <img :src="pokemon.sprites.front_default" alt="pokemon image">
        </div>

        <div class="header-info">
          <h1>{{ pokemon.name | capitalize }}</h1>
          <div class="types-cont">
          <div class="type">Species: <p v-for="(item, index) in speciesArr[0].egg_groups" :key="index" :style="{backgroundColor: typeColor[item.name]}">{{ item.name | capitalize }}</p></div>
          <div class="type">Types: 
          <p
          v-for="type in pokemon.types" 
          :key="type.name"
          :style="{backgroundColor: typeColor[type.type.name]}">{{ type.type.name | capitalize }}</p></div>
          </div>
        <button @click="catcherActive = true" class="pokedex-btn">Add to Pokedex</button>
        </div>

      </div>
      
      <div class="detail-info"> 

        <div class="pokemon-detail-nav">
            <div class="detail-nav-item" 
            v-for="(link, i) in navItems" 
            :key="i"
            :id="link.id"
            :class="{selected:link.id == currentNav}"
            @click="currentNav = link.id">{{ link.title | capitalize }}</div>
        </div>
      
      
      
      <div class="about-cont" v-show="currentNav==='about'">
        <h5>About:</h5>
        <p>Height: {{ pokemon.height/10 }}m</p>
        <p>Weight: {{ pokemon.weight/10 }}kg</p>
        <p>{{ descriptions }}</p>
        <br>
        <p v-for="(ability, index) in pokemon.abilities" :key="index">{{ ability.ability.name | capitalize }} </p>
      </div>

      <div class="stat-container" v-show="currentNav==='stats'">
          <stat-bar v-for="(stat, index) in pokemon.stats" :key="index" :stat="stat"></stat-bar>
      </div>

      <div class="pokemon-moves" v-show="currentNav==='moves'">
        <div class="poke-move" v-for="(move, index) in pokemon.moves" :key="index" >{{ move.move.name | capitalize }}</div>
      </div>

      <div class="pokemon-types" v-show="currentNav==='types'">

      <div class="damage-relations">
        <div class="dmg-item-row">
            <div class="dmg-item">
              <div class="poke-cont">
                <img :src="pokemon.sprites.front_default" alt="">
              </div>
            
              <marker-left>x2</marker-left>
            
              <ul class="type-weaknesses"> x2 Damage From:
                <li v-for="(type, i) in typeArr.damage_relations.double_damage_from" 
                :key="i"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>
            <div class="dmg-item">
            <div class="poke-cont">
              <img :src="pokemon.sprites.front_default" alt="">
            </div>
            <marker-right>x2</marker-right>
              <ul class="type-strengths"> x2 Damage To:
                <li v-for="type in typeArr.damage_relations.double_damage_to" 
                :key="type.name"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>
        </div>

        <div class="dmg-item-row">
            <div class="dmg-item">
              <div class="poke-cont">
                <img :src="pokemon.sprites.front_default" alt="">
              </div>
            
              <marker-left>x.5</marker-left>
            
              <ul class="type-weaknesses"> x0.5 Damage From:
                <li v-for="(type, i) in typeArr.damage_relations.half_damage_from" 
                :key="i"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>

            <div class="dmg-item">
              <div class="poke-cont">
                <img :src="pokemon.sprites.front_default" alt="">
              </div>
            
              <marker-right>x.5</marker-right>
            
              <ul class="type-weaknesses"> x0.5 Damage To:
                <li v-for="(type, i) in typeArr.damage_relations.half_damage_to" 
                :key="i"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>
        </div>

        <div class="dmg-item-row">
            <div class="dmg-item" v-show="typeArr.damage_relations.no_damage_from.length">
              <div class="poke-cont">
                <img :src="pokemon.sprites.front_default" alt="">
              </div>
            
              <marker-left>x0</marker-left>
            
              <ul class="type-weaknesses"> x0 Damage From:
                <li v-for="(type, i) in typeArr.damage_relations.no_damage_from" 
                :key="i"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>

            <div class="dmg-item" v-show="typeArr.damage_relations.no_damage_to.length">
              <div class="poke-cont">
                <img :src="pokemon.sprites.front_default" alt="">
              </div>
            
              <marker-right>x0</marker-right>
            
              <ul class="type-weaknesses"> x0 Damage To:
                <li v-for="(type, i) in typeArr.damage_relations.no_damage_to" 
                :key="i"
                :style="{backgroundColor: typeColor[type.name]}">{{ type.name | capitalize }}</li>
              </ul>
            </div>
        </div>

          </div>

      </div><!--/pokemon-types-->

    </div><!--/detail-info-->

    </div><!---/pokemon-detail--->

  <loading-icon v-if="isLoading"></loading-icon>

  </div>
</template>

<script>
import pokeData from '@/api/pokeData'
import LoadingIcon from '@/components/LoadingIcon'
import MarkerLeft from '@/components/MarkerLeft'
import MarkerRight from '@/components/MarkerRight'
import StatBar from '@/components/StatBar'
import CustomComponent from '@/components/CustomComponent'

export default {
components:{
  'loading-icon': LoadingIcon,
  'marker-left': MarkerLeft,
  'marker-right': MarkerRight,
  'stat-bar': StatBar,
  'custom-component': CustomComponent
  },
data(){
  return{
    pokemonId:this.$route.params.id,
    //highest possible base stats for stat-value widths
    baseStats:{
        hp: 255,
        attack: 190,
        defense: 230,
        specialAttack: 194,
        specialDefense: 230,
        speed: 180
    },
    speciesArr:[],
    descriptionsArr:[],
    isLoading: true,
    catcherActive: false,
    currentPokemon: '',
    navItems:[
      {title: 'about', id: 'about'},
      {title: 'stats', id: 'stats'},
      {title: 'moves', id: 'moves'},
      {title: 'damage relations', id: 'types'},
    ],
    currentNav: 'about'
  }
},
computed:{
  pokemon(){
    return this.currentPokemon;
  },
  descriptions(){
    const desc = this.descriptionsArr[0][Math.floor(Math.random()*4)].flavor_text.replace(/\n/g,' ').replace(/\u000c/g, ' ');
    const descB = this.descriptionsArr[0][Math.floor(Math.random()*4)].flavor_text.replace(/\n/g,' ').replace(/\u000c/g, ' ');
    if(desc == descB){
      return desc
    }else{
      return desc + ' ' + descB;
    }
  },
  typeColor(){
    return this.$store.state.typeColor;
  }
},
methods:{
  init(){
    //set currentPokemon with route param info
    this.currentPokemon = this.$store.state.pokemon.find(poke => poke.name === this.pokemonId)
    //set data
    Promise.all([pokeData.fetchSpecies(this.pokemonId), pokeData.fetchType(this.currentPokemon.types[0].type.name)]) 
    .then((results) => { 
      this.speciesArr.push(results[0].data);
      //get only english descriptions
      this.descriptionsArr.push(results[0].data.flavor_text_entries
          .filter(entry => { return entry.language.name === 'en' }));
      this.typeArr = results[1].data;
      }) 
    //load view when data is populated
    .then(() => {
      this.isLoading = false;
    })
  }
},
mounted(){
  this.init();
}
}
</script>

<style scoped>
#pokemon-detail-cont{
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
}
#pokemon-detail{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}
.detail-header{
  display: flex;
  padding: 10px;
}
.header-img{
  height: 200px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 100%;
  transform: translateY(-100%);
}
.header-img img{
  width: 100%;
}
.detail-info{
  background: linear-gradient(rgb(39, 39, 39), black 20%);
  width: 1000px;
}

.header-info{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  text-align: left;
  padding-left: 20px;
  line-height: 1.5;
}
.header-info > h1{
  font-size: 50px;
}
.pokedex-btn{
  background-color: #1db954da;
  border-radius: 40px;
  border: none;
  color: white;
  width: 155px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}
.pokedex-btn:hover{
  background-color: #1db954;
  cursor: pointer;
  transform: scale(1.1)
}
/*NAV*/
.pokemon-detail-nav{
  height: 30px;
  display: flex;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.774);
  background-color: black;
  text-align: center;
  margin-bottom: 5px;
  padding-left: 5px;
}
.detail-nav-item{
  height: 100%;
  margin-right: 30px;
  display: flex;
  align-items: center;
}
.detail-nav-item.selected{
  color: #1DB954;
}
.detail-nav-item:hover{
  cursor: pointer;
  color: #1DB954;
}

li{
  list-style: none;
}

/*STATS*/
.stat-container{
  flex-direction: column;
  display: flex;
}

/*MOVES*/
.pokemon-moves{
  display: grid;
  grid-template-columns: repeat(6, 150px);
  margin: auto;
}
/*TYPES*/
.damage-relations{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
.dmg-item-row{
  display: flex;
  align-items: center;
}
.dmg-item{
  display: flex;
  justify-content: center;
  align-items: center;
}
.dmg-item img{
  width: 40px;
}
.types-cont{
  display: flex;
}
.type{
  width: 150px;
  text-align: left;
  margin: 1px;
  margin-right: 10px;
  border-radius: 2px;
}
.type p{
  margin: 1px;
  text-align: center;
}
</style>