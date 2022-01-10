<template lang="pug">  
block content
  .container
    Navigation
    .scroll-bar
      .scroll-bar-mask(:style = "scrollBarState.scroll_bar_mask_style")
    ScrollView(:data = 'pageData.scrollData' @pageChanged = 'scroll_view_page_change_action' :cursorData = 'cursorState')
    .cursor(:class="cursorState.is_show_cursor ? 'cursor-active':'' " :style = 'cursorState.cursor_transform')
        .cursor-inner
            text Read More
            svg(viewBox="0 0 142 142" class="base")
                circle(cx="71" cy="71" r="69")
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import Navigation from '@/components/Navigation.vue'
import ScrollView from '@/components/ScrollView.vue'
import { request_manger_get } from '@/utils/httpManger.js'

export default {
  name: 'Home',
  components:{
    Navigation,
    ScrollView
  },
  setup (){
   const pageData = reactive({
     scrollData:[]
   })
   const pageState = reactive({
      cursorState:{
        is_show_cursor:false,
        cursor_transform:'transform:translate(0,0)',
      },
      scrollBarState:{
        scroll_bar_mask_style:'width:20%',
      }
    })
   const scroll_view_page_change_action = (page_index) => {
     set_scroll_bar_mask_with_view_change(page_index)
     pageData.scrollData.forEach((item,index) =>{
       item.is_active = false
       if(page_index + 2 == index){
         item.is_active = true
       }
     })
   }
   const set_scroll_bar_mask_with_view_change = (page_index) => {
     let _scroll_bar_mask_style = "width:" + 20*(page_index + 1) + "%"
     pageState.scrollBarState.scroll_bar_mask_style = _scroll_bar_mask_style
   }
   onMounted(() => {
     request_manger_get('/api/home',{})
     .then(res => pageData.scrollData = res)
     .catch(err => console.log(err))
   })
   return{
     ...toRefs(pageState),
     pageData,
     scroll_view_page_change_action,
     set_scroll_bar_mask_with_view_change
   } 
  }
}
</script>
<style scoped>
.container 
{
  width:100vw;
  height: 100vh;
}
.container .scroll-bar
{
  position: absolute;
  top: 50%;
  left: 0;
  width:100%;
  height:1px;
  background: rgba(110,110,110,0.18);
  z-index: 101;
}
.container .scroll-bar .scroll-bar-mask
{
  position: absolute;
  height:100%;
  width:20%;
  background:#979797;
  transition: width 1s cubic-bezier(0.6, 0.25, 0, 1);
}
.cursor 
{
    position: absolute;
    top: 0;
    left: 0;
    width:144px;
    height:144px;
    pointer-events: none;
    z-index: 102;
}
.cursor .cursor-inner 
{
    font-size: calc(.015 * var(--heightPixel,1vh) * 100);
    color: #ffffff;
    line-height: 1;
    pointer-events: none;
    z-index: 100;
    opacity: 0;
    transform: scale(0, 0);
    transition: opacity .3s ,transform .3s;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-shadow: #333 0 3px 10px;
}
.cursor .cursor-inner svg
{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    stroke: #ffffff;
    stroke-dashoffset: 1;
    transform: rotate(-90deg);
}
.cursor .cursor-inner circle
{
    fill: transparent;
    stroke-width: 1;
}
.cursor-active .cursor-inner
{
    opacity: 1;
    transform: scale(1, 1);
}
.cursor-active .cursor-inner svg
{
    transform: rotate(0deg);
}
</style>
