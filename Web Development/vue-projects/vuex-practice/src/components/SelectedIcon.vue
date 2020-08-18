<template>
  <div>
      <div class="selected-icon">
            <i class="fas fa-angle-right" id="outer-shell"></i>
            <i class="fas fa-angle-right" id="inner-shell"></i>
      </div>
  </div>
</template>

<style>
.selected-icon{
    width: 30px;
    animation: bounce-right 1s infinite;
    position: relative;
    top: 0px;
    left: 30%;
}
@keyframes bounce-right{
    0%{transform: translate(14px)}
    90%{transform: translate(23px)}
    100%{transform: translate(13px)}
}
#outer-shell{
    position: relative;
    top: 0px;
    font-size: 40px;
    color: black;
}
#inner-shell{
    position: relative;
    top: -8px;
    left: -13px;
    font-size: 20px;
    color: white;
    z-index: 100;
}
</style>