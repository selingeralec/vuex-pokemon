<template>
<div class="arrow-right">
    <div class="dmg-marker">
        <slot></slot>
    </div>
  <i class="fas fa-arrow-alt-circle-right"></i>
</div>
</template>

<script>
export default {
    props: ['image']
}
</script>

<style>
.arrow-right{
    animation: bounce-right 1s infinite;
}
@keyframes bounce-right{
    50%{transform: translate(-2px)}
    100%{transform: translate(5px)}
}

.dmg-marker{
    border-radius: 50px;
    font-size: 10px;
    border: 2px solid rgb(196, 31, 31);
    background-color: rgb(196, 31, 31);
    color: white;
    width: 15px;
    height: 15px;
    padding: 2px;
    line-height: 13px;
    position: relative;
    top: 8px;
    right: 8px;
}

.fa-arrow-alt-circle-right{
    font-size: 40px;
    color: rgb(196, 31, 31);
    opacity: 100;
}
</style>