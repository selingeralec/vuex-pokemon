<template>
  <div id="app">
    <nav id="navbar">
          <router-link to="/"><i class="fas fa-search"></i>Home</router-link> 
          <router-link to="/pokedex"><i class="fas fa-save"></i>PokeDex ({{ this.$store.state.pokedex.length }})</router-link> 
          <router-link to="/filters"><i class="fas fa-filter"></i>Developers</router-link>
    </nav>

    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    if(!this.$store.state.pokemon){
      this.$store.dispatch('fetchPokemon', 'gen1');
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
}
#navbar{
  width: 100%;
  display: flex;
  flex-direction: column;
  background: black;
  position: sticky;
  top: 0;
  padding-top: 20px;
  z-index: 10;
}
#content{
  background: linear-gradient(rgb(34, 34, 34) 10%, black) 10%;
  overflow: scroll;
  padding: 30px 0px 0px 30px;
}
#navbar .fas{
  font-size: 22px;
  padding-right: 15px;
  color: rgba(255, 255, 255, 0.438);
}
#navbar a{
  text-decoration: none;
  display: flex;
  font-size: 18px;
  height: 30px;
  align-items: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.815);
  padding-left: 30px;
  margin: 2px 0px;
  outline: 0;
}
#navbar > *:hover{
  text-shadow: 0 0 0.01px white;
  color: white;
}
#navbar a.router-link-exact-active {
  color: white;
  text-shadow: 0 0 0.02px white;
  border-left: 4px solid #1DB954;
  padding-left: 26px;
}


</style>
