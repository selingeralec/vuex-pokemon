<template>
  <div class="poke-stat">
      <div class="stat-data">
      <p>{{ stat.stat.name | capitalize }}</p>
      <span class="stat-value">{{ stat.base_stat }}</span>
      </div>
      <div class="stat-bar">
          <div class="stat-bar-value" :style="{width: Math.round((stat.base_stat/255)*100)+'%'}"></div>
      </div>
  </div>
</template>

<script>
export default {
    props:['stat']
}
</script>

<style>
.poke-stat{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    margin: auto;
}
.poke-stat p{
    width: 120px;
    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
}
.poke-stat span{
    margin: 0px 5px;
    font-weight: 700;
}
.stat-data{
    display: flex;
}
.stat-bar{
    width: 100px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.432);
    border-radius: 10px;
    margin: 5px;
}
.stat-bar-value{
    height: 5px;
    background-color: white;
    border-radius: 5px 0px 0px 5px;
}
</style>