<template lang="pug">  
block content
    .scroll-container
      .scroll-main-view(:class = 'statusData._is_scroll_active ? "scroll-main-view-active" : ""' ref = 'scroll_container' :style = 'styleData.scroll_style')
        .scroll-view(v-for = '(item,index) in data')
            ScrollViewItem(:data = 'item' :index = 'index' :cursorData = "cursorData")
      .scroll-background-view
        img.show(:class = 'statusData.is_scrolling ? "hide":"" ' :src = 'pageData.background_img_scr')
        .img-cover(:style = 'styleData.background_style')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted} from 'vue'
import ScrollViewItem from '@/components/ScrollViewCell.vue'

export default {
  name: 'ScrollView',
  components:{
    ScrollViewItem,
  },
  props:{
      data:Array,
      cursorData:{}
  },
  emits:{
      "pageChanged":null,
  },
  setup (props,context){    
    // -- 页面状态 & 动态样式
    const scroll_container = ref(null)
    const styleData = reactive({
      scroll_style:'transform: translateX(-' + window.screen.width *1 + 'px)',
      scroll_x : -(window.screen.width *1),
      background_style:'background:#2A2005'
    })
    const pageData = reactive({
        background_img_scr:require('@/assets/sources/1.png')
    })
    const statusData = reactive({
      _scroll_timeout:null,
      _is_scroll_active:true,
      _is_scrolling:false, // -- 控制滚动只触发一次
      is_scrolling:false, // -- 控制是否处于滚动中
    })
    // -- background相关fun
    const set_background_color = (pageIndex) => {
        let _background_style = ''
        switch(pageIndex) {
            case 0:
                _background_style = 'background:#2A2005'
                break
            case 1:
                _background_style = 'background:#2A1605'
                break
            case 2:
                _background_style = 'background:#2A1705'
                break
            case 3:
                _background_style = 'background:#01171E'
                break
            default:
                _background_style = 'background:#2A1705'
                break
        }
        styleData.background_style = _background_style
    }
    // -- 滚动相关fun
    const scroll_down_with_right_one_page = () => {
      let _x =  styleData.scroll_x
      _x -= window.screen.width * 0.6
      if(-4896 > _x){
        scroll_to_first_page(_x) 
        return 
      }
      styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
      styleData.scroll_x = _x
    }
    const scroll_up_with_left_one_page = () => {
      let _x =  styleData.scroll_x
      _x += window.screen.width * 0.6
      if(-1440 < _x ){
        scroll_to_last_page()
        return
      }
      styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
      styleData.scroll_x = _x
    }
    const scroll_to_first_page = (offset_X) => {
      let _x = -(window.screen.width * 0.4)
      statusData._is_scroll_active = false
      styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
      setTimeout(() => {
        statusData._is_scroll_active = true
        _x = -(window.screen.width)
        styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
        styleData.scroll_x = _x
      },10)
    }
    const scroll_to_last_page = () => {
      let _x = -(window.screen.width *(1 + 0.6*5))
      statusData._is_scroll_active = false
      styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
      setTimeout(() => {
        statusData._is_scroll_active = true
        _x = -(window.screen.width *(1 + 0.6*4))
        styleData.scroll_style = 'transform: translateX(' + _x + 'px);'
        styleData.scroll_x = _x
      },10)
    }
    // -- item call back
    const page_changed = (pageIndex) => {
        context.emit("pageChanged",pageIndex)
    }
    const get_page_index_for_emit_fun = () => {
        let offset_X = styleData.scroll_x
        let page_index = (Math.abs(offset_X) - window.screen.width) / (window.screen.width * 0.6)
        page_changed(page_index)
        // -- change page_index to background config
        pageData.background_img_scr = props.data[page_index + 2].image_src
        set_background_color(page_index)
    }
    // -- on mounted
    onMounted(() => {
      scroll_container.value.addEventListener('mousewheel',(e) => {
        if(statusData._is_scrolling) return
        if(statusData._scroll_timeout){ clearTimeout(statusData._scroll_timeout) }
        statusData._is_scrolling = true
        statusData.is_scrolling = true
        if(0 < e.deltaY){
            scroll_up_with_left_one_page()
            statusData._scroll_timeout = setTimeout(() => {
                statusData._is_scrolling = false
            },1200)
          }else{
            scroll_down_with_right_one_page()
            statusData._scroll_timeout = setTimeout(() => {
                statusData._is_scrolling = false
            },1200)
          }
        setTimeout(() => {
            get_page_index_for_emit_fun()
        },10)
        setTimeout(() => {
            // -- 配合切换背景的动画时间
            statusData.is_scrolling = false
        }, 300);
      })      
    })
    return {
      pageData,
      styleData,
      statusData,
      scroll_container,
      scroll_down_with_right_one_page,
      scroll_to_first_page,
      page_changed,
      get_page_index_for_emit_fun,
      set_background_color
    }
  }
}
</script>
<style scoped>
.scroll-container
{
  position:absolute;
  top: 0;
  left:0;
  width:100vw;
  height:100vh;
  overflow-x: hidden;
}
.scroll-container .scroll-main-view 
{
  height:100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.scroll-container .scroll-main-view-active
{
  transition:transform 0.3s cubic-bezier(0.6, 0.25, 0, 1);
}
.scroll-container .scroll-main-view .scroll-view
{
  width:60vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  /* background-color: #080808; */
  z-index: 10;
}
.scroll-container .scroll-background-view
{
    position: absolute;
    top: 0;
    left: 0;
    width:100vw;
    height:100vh;
    z-index: -1;
}
.scroll-container .scroll-background-view img
{
    width:100%;
    height:100%;
    object-fit: cover;
    transition:opacity 0.3s cubic-bezier(0.6, 0.25, 0, 1);
    opacity:0;
}
.scroll-container .scroll-background-view .show
{
    opacity:1;
}
.scroll-container .scroll-background-view .hide
{
    opacity:0;
}
.scroll-container .scroll-background-view .img-cover
{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100vh;
    opacity:0.8;
    transition:all 0.3s cubic-bezier(0.6, 0.25, 0, 1);
}
</style>
