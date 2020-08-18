<template>
  <div id="filter-view">

<div id="filter-cont">
    <label for="age">Age:</label>
        <input type="range" name="age-range" id="age-range" v-model="searchFilters.age">
    <label for="age">Location:</label>
        <select name="location" id="location" v-model="searchFilters.location">
            <option value="USA">USA</option>
            <option value="Spain">Spain</option>
            <option value="Belgium">Belgium</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
        </select>

    <div class="specialty-container">
        <div class="specialty-filter" v-for="(specialty, index) in specialties" :key="index">
            <input type="checkbox" :name="specialty" :id="specialty" v-model="specialty.checked">
            <label :for="specialty.value">{{ specialty.value |capitalize }}</label>
        </div>
    </div>
    
    <button @click="clearFilters" id="clear-btn">Clear All</button>

</div>


    <div class="search-filters">
        <h3>Current Filters:</h3>
        <div>Age: &lt;<p v-show="searchFilters.age">{{ searchFilters.age }}</p></div>
        <div>Location: <p v-show="searchFilters.location">{{ searchFilters.location }}</p></div>
        <div>Specialties: <p v-for="(specialty, index) in selectedFilters" :key="index" v-show="selectedFilters.length != 0">{{ specialty  | capitalize}}</p></div>
    </div>

        <div class="consultants-container">
        
        <h2 v-if="!filterConsultants.length">No consultants available :'(</h2>
        
          <li v-for="(consultant, index) in filterConsultants"
              :key="index"
              class="consultant">
                    <h3>{{ consultant.name }}</h3>
                    <div class="sub-heading">
                    <p>Age: {{ consultant.age }}</p>
                    <p>Location: {{ consultant.location }}</p>
                    </div>
                    <ul>
                        <li v-for="(item, index) in consultant.specialty" :key="index" class="specialty-li">
                            <img :src="getLogo(item)">
                            {{ item | capitalize }}
                        </li>
                    </ul>
          </li>

        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            consultants: [ 
                {name: 'John', age: 70, location: 'USA', specialty: ['javascript', 'python', 'sass']},
                {name: 'Joan', age: 60, location: 'USA', specialty: ['javascript', 'html']},
                {name: 'Alexis', age: 28, location: 'USA', specialty: ['javascript', 'python']},
                {name: 'Alec', age: 28, location: 'Spain', specialty: ['javascript', 'html', 'css']},
                {name: 'Jessica', age: 38, location: 'Spain', specialty: ['javascript', 'python', 'node']},
                {name: 'Karolien', age: 25, location: 'Spain', specialty: ['javascript', 'sass']},
                {name: 'Tom', age: 30, location: 'Belgium', specialty: ['javascript', 'python', 'node', 'sass']},
                {name: 'Rodrigo', age: 35, location: 'Belgium', specialty: ['javascript', 'python', 'html', 'sass', 'graphql', 'node']},
                {name: 'Laura', age: 18, location: 'Japan', specialty: ['javascript', 'python', 'html']},
                {name: 'Sonia', age: 49, location: 'Japan', specialty: ['javascript', 'python', 'node']},
                {name: 'Paul', age: 40, location: 'France', specialty: ['javascript', 'python', 'sass']},
                {name: 'Paula', age: 50, location: 'France', specialty: ['html', 'css', 'javascript']}
            ],
            specialties: [
                {checked: false, value: 'html', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501992/html-logo_oe7cb4.png'},
                {checked: false, value: 'css', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501991/css-logo_hsgsej.png'},
                {checked: false, value: 'sass', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501993/scss-logo_z71exc.png'},
                {checked: false, value: 'javascript', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501992/javascript-logo_kz7zja.png'},
                {checked: false, value: 'python', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501993/python-logo_mjaxc1.png'},
                {checked: false, value: 'node', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501992/nodejs-logo_w8vt1c.png'},
                {checked: false, value: 'graphql', logo: 'http://res.cloudinary.com/johnayeni/image/upload/v1524501992/graphql-logo_mdrics.png'},
                
            ],
            searchFilters:{
                age: null,
                location: null,
                specialty: []
            }
        }
    },
    methods:{
        clearFilters(){
            this.searchFilters = {
                age: null,
                location: null
            };
            this.specialties.forEach(item => item.checked = false);
        },
        getLogo(item){
            let specialty = this.specialties.find(obj => obj.value === item);
            return specialty.logo;
        },
        //FILTERS
        filterSpecialties(){
            return this.consultants.filter(obj => this.selectedFilters.every(val => obj.specialty.indexOf(val) >= 0));
        },
        filterAge(){
            return this.consultants.filter(obj => obj.age <= this.searchFilters.age);
        },
        filterLocation(){
            return this.consultants.filter(obj => obj.location === this.searchFilters.location);
        }
    },
    computed:{
        selectedFilters(){
            let filters = [];
            let checkedFilters = this.specialties.filter(item => item.checked);
            checkedFilters.forEach(item => {
                filters.push(item.value);
            });
            return filters;
        },
        filterConsultants(){
            //age
            if(this.searchFilters.age && !this.searchFilters.location && this.selectedFilters.length === 0){
                return this.filterAge();
            }
            //location
            else if(this.searchFilters.location && !this.searchFilters.age && this.selectedFilters.length === 0){
                return this.filterLocation();
            }
            //specialty
            else if(this.selectedFilters.length != 0 && !this.searchFilters.location && !this.searchFilters.age){
                return this.filterSpecialties();
            }
            //age + location
            else if(this.searchFilters.age && this.searchFilters.location && this.selectedFilters.length === 0){
                return this.consultants.filter(obj => obj.age < this.searchFilters.age && obj.location === this.searchFilters.location);
            }
            //age + specialty
            else if(this.searchFilters.age && !this.searchFilters.location && this.selectedFilters != 0){
                return this.filterSpecialties().filter(obj => obj.age < this.searchFilters.age);
            }
            //location + specialty
            else if(!this.searchFilters.age && this.searchFilters.location && this.selectedFilters != 0){
                return this.filterSpecialties().filter(obj => obj.location === this.searchFilters.location);
            }
            //age + location + specialty
            else if(this.searchFilters.age && this.searchFilters.location && this.selectedFilters != 0){
                return this.filterSpecialties().filter(obj => obj.location === this.searchFilters.location).filter(obj => obj.age < this.searchFilters.age);
            }
            return this.consultants;
        }
    }
}
</script>

<style scoped>
#filter-view{
    color: white;
}
#filter-cont{
width: 250px;
position: absolute;
height: 350px;
left: 0px;
top: 200px;
display: flex;
flex-direction: column;
border-top: 1px solid rgba(255, 255, 255, 0.233);
padding-top: 20px;
z-index: 100;
overflow-y: scroll;
background-color: rgb(53, 53, 53);
}
.specialty-container{
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 30px;
}
.specialty-filter > input{
    margin-right: 10px;
}
.sub-heading{
    font-size: 12px;
    font-weight: 700;
    justify-content: space-around;
    margin: auto;
}
.specialty-li{
    list-style: none;
}
#age-range{
    width: 150px;
}
.search-filters{
    height: 100px;
}
.search-filters > *{
    display: flex;
}
.search-filters p{
    margin: 0px 5px;
}
.consultants-container{
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 10px;
    list-style: none;
    justify-content: center;
}
.consultants-container h2{
    position: relative;
    top: 50%;
    left: 50%;

}

.consultant{
    border-radius: 2px;
    padding-top: 10px;
    background-color: rgba(71, 71, 71, 0.397);
}
.consultant img{
    width: 30px;
}
#clear-btn{
  background-color: #1db954da;
  border-radius: 40px;
  border: none;
  color: white;
  width: 155px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  margin-left: 45px;
}
#clear-btn:hover{
  background-color: #1db954;
  cursor: pointer;
  transform: scale(1.1)
}
</style>