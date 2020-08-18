<template>
  <div class="poke-grid-item" :style="{backgroundColor: typeColor[pokemon.types[0].type.name]}">

       <router-link :to="{ name: 'PokemonDetail', params: { id: pokemon.name } }">

        <div class="top-bar">
          <h3>{{ pokemon.name | capitalize }}</h3>
          <div class="poke-id">{{ pokemon.id | poke_id_filter }}</div>
        </div>

        <div class="bottom-bar">
          <ul class="grid-item-types">
            <li v-for="(type, index) in pokemon.types" :key="index">{{ type.type.name | capitalize }}</li>
          </ul>

          <i class="fab fa-centos"></i>

          <img :src="pokemon.sprites.front_default">
        </div>

        </router-link>

        <slot></slot>

  </div>
</template>

<script>
export default {
    props: ['pokemon'],
    computed:{
      typeColor(){
        return this.$store.state.typeColor
      }
    }
}
</script>

<style>
.poke-grid-item{
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  opacity: 75%;
  border-radius: 1px;
}
.poke-grid-item:hover{
  opacity: 100%;
}

.poke-grid-item a{
  list-style: none;
  text-decoration: none;
}

/*GRID-ITEM TOP-ITEMS*/
.top-bar{
  height: 50px;
  display: flex; 
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
}
.poke-id{
  color: rgba(0, 0, 0, 0.411);
  font-weight: 800;
}
.poke-grid-item h3{
  color: white;
  font-size: 1.2em;
  font-weight: 700;
}
/*GRID-ITEM BOTTOM-ITEMS*/
.bottom-bar{
  height: 100%;
  display: flex; 
}
.poke-grid-item img{
  position: relative;
  right: 120px;
  top: 10px;
  width: 120px;
  height: 120px;
}
.fa-centos{
  font-size: 200px;
  color: rgba(255, 255, 255, 0.295);
  position: relative;
  left: 30px;
  top: 0px;
  transform: rotate(25deg);
}
.grid-item-types{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: -25px;
}
.grid-item-types li{
  background-color: rgba(253, 253, 253, 0.301);
  color: white;
  padding: 3px 5px;
  border-radius: 10px;
  list-style: none;
  margin: 3px;
  width: 80px;
}
</style>