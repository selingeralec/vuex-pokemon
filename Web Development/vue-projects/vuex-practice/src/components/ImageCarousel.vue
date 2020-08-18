<template>
  <div id="image-carousel">
      <div id="main-display">
          <i class="fas fa-angle-left" @click="decreaseIndx"></i>

          <img :src="imageArr[index]" alt="pokemon image">

          <i class="fas fa-angle-right" @click="increaseIndx"></i>
      </div>
  </div>
</template>

<script>
export default {
    props: ['images'],
    data(){
        return{
            index: 2
        }
    },
    computed:{
        imageArr(){
//filter null & Object slots from 'images' Object
            let imgArr = Array.from(Object.values(this.images))
            return imgArr.filter(img => { if(img !== null && typeof img != 'object'){return img} })
        }      
    },
    methods:{
        decreaseIndx(){
            if(this.index === 0){
                this.index = this.imageArr.length-1
            }else{
                this.index--
            }
            //set pokedexItem.imgUrl on change
            this.$emit('change-img', this.imageArr[this.index])
        },
        increaseIndx(){
            if(this.index === this.imageArr.length-1){
                this.index = 0;
            }else{
                this.index++
            }
            //set pokedexItem.imgUrl on change
            this.$emit('change-img', this.imageArr[this.index])
        },
        init(){
//if imgArr.length > 4 vue loads with back_default img;
//ensure vue loads with front_default
            if(this.imageArr.length > 4){
                this.index = 4
            }else{
                this.index = 2
            }
//ensure pokedexItem has default img if one isn't selected
            this.$emit('change-img', this.imageArr[this.index])
        }
    },
    mounted(){
        this.init();
    }
}
</script>

<style scoped>
#image-carousel{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#main-display{
    display: flex;
    align-items: center;
}

.fa-angle-left, .fa-angle-right{
    color: white;
    opacity: 0.5;
}

.fas:hover{
    cursor: pointer;
    opacity: 100;
}

#main-display img{
    width: 200px;
    height: 200px;
}
</style>