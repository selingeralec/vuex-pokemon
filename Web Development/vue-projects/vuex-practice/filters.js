export default {
    name(pokemon, nameFilter){
        return pokemon.filter(poke => { 
            return poke.name.match(nameFilter.toLowerCase()); 
        });
    },
    type(pokemon, typeFilter){
        return pokemon.filter(poke => {
            if(poke.types.length === 2){
                if(poke.types[0].type.name === typeFilter|| poke.types[1].type.name === typeFilter)
                  return true;
                } else if(poke.types[0].type.name === typeFilter){ 
                  return true;
                }
        });
    },
    height(pokemon, heightFilter){
        return pokemon.filter(poke => {
            if(poke.height <= heightFilter){
                return true;
            }else{
                return false;
            }
        });
    },
    weight(pokemon, weightFilter){
        return pokemon.filter(poke => {
            if(poke.weight <= weightFilter){
                return true;
            }else{
                return false;
            }
        });
    }
};