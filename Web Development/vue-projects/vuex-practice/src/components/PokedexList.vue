<template>
<div class="pokedex-list">
    <div class="list-item"
        v-for="pokemon in pokedex" 
          :key="pokemon.ref"
          :class="{activeItem:pokemon.ref == activeItem}"
          @click="changeActive(pokemon.ref)">

        <div class="list-content">
            <selected-icon v-show="activeItem == pokemon.ref"></selected-icon>
            <img :src="pokemon.data.sprites.front_default" alt="pokemon-image">
            <span>{{ pokedex.indexOf(pokemon)+1 | poke_id_filter}}</span>
            <h2 v-if="pokemon.nickname">{{ pokemon.nickname | capitalize }}</h2>
            <h2 v-if="!pokemon.nickname">{{ pokemon.data.name | capitalize }}</h2>
            <button @click="releasePokemon(pokemon.ref)" title="Release Pokemon?">x</button>
        </div>
                    
    </div>
  </div>
</template>

<script>
import SelectedIcon from '@/components/SelectedIcon'

export default {
    data(){
        return{
            activeItem: undefined
        }
    },
    components:{
        'selected-icon': SelectedIcon
    },
    computed:{
        pokedex(){
            return this.$store.getters.caughtPokemon
        },
    },
    methods:{
        changeActive(ref){
            this.activeItem = ref;
            this.$emit('change-active', this.activeItem);
        },
        releasePokemon(id){
            this.$store.dispatch('releasePokemon', id);
            this.$emit('change-active', undefined);
        }
    }
}
</script>

<style scoped>
.list-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    color: white;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.295);
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
    width: 80%;
    height: 100%;
    margin: auto;
    border: 2px solid red;
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