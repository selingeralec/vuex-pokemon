import axios from 'axios'

const genOne = [];
const genTwo = [];
const genThree = [];
const genFour = [];

export default {
    apiCall(targetArr, first, last){
        if(targetArr.length === 0){
            for(let i = first; i <= last; i++){
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response =>{ targetArr.push(response.data) });
                //sort pokemon by id
                targetArr.sort((a, b) =>  a.id - b.id)
            }
        }
            return targetArr
    },
    fetchPokemon(generation){
        switch(generation){
            case "gen1":
                return this.apiCall(genOne, 1, 151)
            case "gen2":
                return this.apiCall(genTwo, 152, 249)
            case "gen3":
                return this.apiCall(genThree, 250, 387)
            case "gen4":
                return this.apiCall(genFour, 388, 400)
        }
    },
    fetchSpecies(id){
        const speciesCall = 'https://pokeapi.co/api/v2/pokemon-species';
        return axios.get(`${speciesCall}/${id}`);
    },
    fetchType(type){
        const typeCall = 'https://pokeapi.co/api/v2/type';
        return axios.get(`${typeCall}/${type}`);
    }
}
