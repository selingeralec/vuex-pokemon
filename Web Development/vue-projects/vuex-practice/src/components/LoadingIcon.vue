<template>
  <div id="loading-icon">
      <i class="fas fa-spinner"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#loading-icon{
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: auto;
    align-items: center;
    z-index: 10;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.685);
}
i{
    font-size: 50px;
}
.fa-spinner{
animation: spin 1.5s infinite;
color: #1DB954;
font-size: 70px;
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
</style>