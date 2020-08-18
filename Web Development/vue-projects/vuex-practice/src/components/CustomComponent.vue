<template>
  <div class="container-custom">
    <div class="content-custom">

      <div class="header-custom">
        <h3>Add to Pokedex</h3>
        <button class="close-custom" @click="$emit('close-btn')">x</button>
      </div>

      <div class="mid-custom">

        <image-carousel :images="images" @change-img="setImg"></image-carousel>
        
        <div class="mid-inputs">
        <div class="mid-row">
          <label for="name">Name</label>
          <div class="name-input">
            <input type="text" name="name" id="name-input" placeholder="Pokemon Name"
            v-model="name">
          </div>
        </div>
        <div class="mid-row">
          <label for="description">Description</label>
          <div class="desc-input">
          <textarea name="pokemon-description" id="pokemon-desc" placeholder="Give your pokemon a unique description"
          v-model="description"></textarea>
          </div>
        </div>
        </div>
      </div>

      <div class="footer-custom">
        <button @click="catchPokemon" class="pokedex-btn">Catch Pokemon</button>
      </div>



    </div>
  </div>
</template>

<script>
import ImageCarousel from '@/components/ImageCarousel'
export default {
  props:['images'],
  components:{
    'image-carousel': ImageCarousel
  },
  data(){
    return{
        id: undefined,
        imgUrl: undefined,
        name: undefined,
        description: undefined
    }
  },
  methods:{
    catchPokemon(){
      if(!this.name || this.name == ''){
        window.alert('Enter a valid name!');
      }else if(!this.description || this.description == ''){
        window.alert('Enter a valid description!');
      }else{
        let pokedexItem = {
          id: this.setId(),
          imgUrl: this.imgUrl,
          name: this.name,
          description: this.description
        };
        this.$store.dispatch('catchPokemon', pokedexItem);
        this.$emit('close-btn');
      }
    },
    setId(){
      //ensure each id is a unique number
      return (Math.random()*100).toFixed(3);
    },
    setImg(img){
      this.imgUrl = img;
    }
  }
}
</script>

<style scoped>
.container-custom{
  border: 1px solid white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.637);
  color: white;
  margin:auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.content-custom{
  width: 700px;
  height: 400px;
  background-color: rgb(43, 43, 43);
  box-shadow: 0px 0px 50px black;
  border-radius: 10px;
  color: white;
  cursor: auto;
  position: absolute;
  top: calc(100%-50%);
  left: calc(100%-50%);
}
.header-custom{
  padding-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 50px;
  font-size: 15px;
}
.close-custom{
  font-size: 20px;
  font-weight: 100;
  background: none;
  position: relative;
  display: inline-block;
  padding: 0px 10px;
  bottom: 10px;
  left: 250px;
  border: none;
  color: rgba(255, 255, 255, 0.719);
  margin-left: -50px;
  text-align: center;
}
.close-custom:hover{
  font-weight: 200;
  cursor: pointer;
}

.mid-custom{
  display: flex;
  height: 200px;
  padding: 0px 20px;
}

#image-carousel{
  width: 250px;
  height: 200px;
}
.mid-row{
  width: 380px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.74);
  font-weight: 400;
  text-align: left;
  margin: 5px 0px;
  margin-left: 20px;
}
.mid-row textarea{
  height: 100px;
  width: 370px;
  border-radius: 5px;
  border: none;
  margin: 2px 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 5px;
}
.name-input{
  display: flex;
  flex-direction: column;
  justify-content:left;  
}
#name-input{
  height: 20px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid white;
  border-radius: 5px;
}
.footer-custom{
  margin-top: 25px;
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
</style>