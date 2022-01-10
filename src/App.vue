<template>
  <div class="main">
    <router-view/>
    <div :class="is_loging ? 'transition-image transition-image-active' :'transition-image' " :style="style">
      <img :src="image_src">
    </div>
  </div>
</template>
<script>
import { reactive, ref , computed } from 'vue'
import { store } from './store'

export default {
  setup (){

    return {
      style:computed(() => store.state.transition.style),
      image_src : computed(() => store.state.transition.image_src),
      is_loging: computed(() => store.state.transition.is_loging)
    }
  }
}
</script>
<style scoped>
@keyframes main-scene
{
  to{
    top: 0;
    left: 0;
    width:100vw;
    height:100vh;
  }
}
.main .transition-image
{
  display:none;
  position:absolute;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background-color:#080808;
  z-index: 200;
  opacity:0;
  transition: top 0.4s cubic-bezier(0.5, 0.5, 0.45, 1),
              left 0.4s cubic-bezier(0.5, 0.5, 0.45, 1),
              width 0.4s cubic-bezier(0.5, 0.5, 0.45, 1),
              height 0.4s cubic-bezier(0.5, 0.5, 0.45, 1);
}
.main .transition-image-active
{
  display:inline-block;
  opacity :1;
  animation:main-scene 1.0s both cubic-bezier(0.5, 0.5, 0.45, 1);
}
.main .transition-image img
{
  object-fit: cover;
  width:100%;
  height:100%;
  object-position:top;
}
</style>

