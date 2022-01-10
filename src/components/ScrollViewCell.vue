<template lang="pug">  
block content
    .item-container(:class = 'data.is_active ? "item-active" : "" ')
        .svg-container(:class = 'pageState.is_clicked ? "svg-container-active" : "" '  @click = "read_more_tap_action" @mouseenter = "svg_container_mouseenter_action" @mouseleave = "svg_container_mouseleave_action" @mousemove = "svg_container_mousemove_action")
            svg(ref = 'image_svg' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%")
                defs
                    mask(:id="'projectdetail-path' + index")
                        rect.item(v-for = "item in [0,1,2,3]" width="80" height="400" fill="#ffffff")
                image(:xlink:href="data.image_src" width="100%" height="100%" class="js-pathtarget" :mask="'url(#projectdetail-path' + index + ')'")
        span(:class = 'pageState.is_clicked ? "hide":"" ') (0{{ data.index }})
        h3.name(:class = 'pageState.is_clicked ? "hide":"" ') {{ data.name }}
        p(:class = 'pageState.is_clicked ? "hide":"" ') 声优:<br>{{ data.dub }}
</template>

<script>
import { reactive, ref ,toRefs ,onMounted} from 'vue'
import { store } from '../store'
import { useRouter } from 'vue-router'

export default {
  name: 'ScrollViewItem',
  props:{
      data:{},
      index:0,
      cursorData:{}
  },
  setup (props,context){
    // -- router
    const router = useRouter()
    const router_to_detail = (params) => {
        setTimeout(() => {
            router.push({
                name:'Detail',
                params
            })
        },1000)
    }
    // -- vuex
    const set_store_with_transition_image = () =>
    {
        let style = `top:${image_svg.value.getBoundingClientRect().top}px;left:${image_svg.value.getBoundingClientRect().left}px;width:${image_svg.value.getBoundingClientRect().width}px;height:${image_svg.value.getBoundingClientRect().height}px`
        let data = {
            image_src:props.data.image_src,
            style,
            is_loging:true,
        }
        setTimeout(() => {
            store.commit({
                type:'set_transition',
                data,
            })
            router_to_detail({
                detailId:props.data.index
            })
        },400)
    }
    // -- 页面状态 & 动态样式
    const image_svg = ref(null)
    const pageState = reactive({
        is_clicked:false,
    })
    const svg_container_mouseenter_action = (e) => {
        if(!props.data.is_active) return
        props.cursorData.is_show_cursor = true
    }
    const svg_container_mouseleave_action = (e) => {
        if(!props.data.is_active) return
        props.cursorData.is_show_cursor = false
    }
    const svg_container_mousemove_action = (e) => {
        if(!props.data.is_active) return
        let _cursor_transform = 'transform:translate(' + e.clientX + 'px,' + e.clientY + 'px)';
        props.cursorData.cursor_transform = _cursor_transform
    }
    const read_more_tap_action = () =>{
        if(!props.data.is_active) return
        pageState.is_clicked = true
        set_store_with_transition_image()
    }
    return {
        image_svg,
        pageState,
        svg_container_mouseenter_action,
        svg_container_mouseleave_action,
        svg_container_mousemove_action,
        read_more_tap_action,
        set_store_with_transition_image,
        router_to_detail
    }
  }
}
</script>
<style scoped>
@keyframes rect1-reverse
{
    0% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes rect2-reverse
{
    0% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes rect3-reverse
{
    0% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes rect4-reverse
{
    0% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes rect1
{
    0% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
    30% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 0;
        stroke-width: 0;
    }
    30.1% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(6.25 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: 0;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
}
@keyframes rect2
{
    0% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
    30% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 0;
        stroke-width: 0;
    }
    30.1% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(7.8125 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: 0;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
}
@keyframes rect3
{
    0% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
    30% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 0;
        stroke-width: 0;
    }
    30.1% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(1.5625 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: 0;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
}
@keyframes rect4
{
    0% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: .5;
        stroke-width: 0;
    }
    30% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 0;
        stroke-width: 0;
    }
    30.1% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(3.125 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: 0;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
}
@keyframes click-rect-1
{
    0% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(0 * var(--widthPixel,1vw)), calc(9.375 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes click-rect-2
{
    0% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(7.34375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: .5;
        stroke-width: 0;
    }
}
@keyframes click-rect-3
{
    0% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) scale(1);
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(19.84375 * var(--widthPixel,1vw)), calc(4.6875 * var(--widthPixel,1vw))) scale(6);
        stroke-width: 0;
    }
}
@keyframes click-rect-4
{
    0% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(0);
        opacity: 1;
        stroke-width: 0;
    }
    100% {
        transform: translate(calc(27.1875 * var(--widthPixel,1vw)), calc(0 * var(--widthPixel,1vw))) rotateY(90deg);
        opacity: .5;
        stroke-width: 0;
    }
}
.item-container
{
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
    width:100%;
    height:100%;
}
.item-container .svg-container
{
    width: calc(33.4375 * var(--widthPixel,1vw));
    position: absolute;
    height:80%;
    cursor: pointer;
    filter:grayscale(100%);
    transition: filter 1s,opacity .6s;
    opacity:0.2;
}
.item-active .hide
{
    opacity:0 !important;
    transition: opacity .2s cubic-bezier(0.6, 0.25, 0, 1) !important;
}
.item-active .svg-container-active .item:nth-child(1)
{
    opacity: .5;
    animation: 0.4s click-rect-1 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
}
.item-active .svg-container-active .item:nth-child(2)
{
    opacity: .5;
    animation: 0.4s click-rect-2 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
}
.item-active .svg-container-active .item:nth-child(3)
{
    position:absolute;
    opacity: 1.0;
    animation: 1.0s click-rect-3 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
}
.item-active .svg-container-active .item:nth-child(4)
{
    opacity: .5;
    animation: 0.4s click-rect-4 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
}
.item-active .svg-container:hover
{
    filter:grayscale(0%);
    opacity:1.0;
}
.item-active .svg-container
{
    opacity:0.7;
}
.item-container rect
{
    width: calc(6.25 * var(--widthPixel,1vw));
    height: calc(31.25 * var(--widthPixel,1vw));
    transition: transform 1s,opacity 1s;
}
.item-container .item:nth-child(1)
{
    opacity: .5;
    animation: 1s rect1-reverse 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
}
.item-container .item:nth-child(2)
{
    opacity: .5;
    animation: 1s rect2-reverse 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
}
.item-container .item:nth-child(3)
{
    opacity: .5;
    animation: 1s rect3-reverse 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.125 * var(--widthPixel,1vw)) center;
}
.item-container .item:nth-child(4)
{
    opacity: .5;
    animation: 1s rect4-reverse 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
    -webkit-transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
    transform-origin: calc(3.671875 * var(--widthPixel,1vw)) center;
}
.item-container span 
{
    font-family: STSong;
    position: absolute;
    color: #F4F4F4;
    top: 20%;
    font-size:1.25em;
    opacity:0;
    transform:translateY(40px);
    transition: opacity 1.8s cubic-bezier(0.6, 0.25, 0, 1),transform 1.6s cubic-bezier(0.6, 0.25, 0, 1);
    pointer-events: none;
    letter-spacing: 0.025em;
}
.item-container .name
{
    font-family: STSong;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 55%;
    font-size: 7.5vw;
    font-weight: 400;
    line-height: .5833333333;
    letter-spacing: 0.025em;
    z-index: 1;
    transform: translateY(40px);
    opacity: 0;
    transition: opacity 1.8s cubic-bezier(0.6, 0.25, 0, 1),transform 1.6s cubic-bezier(0.6, 0.25, 0, 1);
    pointer-events: none;
    text-shadow: #333 0 3px 10px;
}
.item-container p 
{
    position: absolute;
    bottom: calc(10.25 * var(--widthPixel,1vw));
    left: 0;
    width: 100%;
    text-align: center;
    font-size: clamp(10px, calc(1.015625 * var(--widthPixel,1vw)), 42px);
    line-height: 1.5;
    transform: translateY(40px);
    opacity: 0;
    transition: opacity 1.8s cubic-bezier(0.6, 0.25, 0, 1),transform 1.6s cubic-bezier(0.6, 0.25, 0, 1);
    color:#F4F4F4;
    letter-spacing: 0.1em;
}
.item-active span
{
    transform:translateY(0);
    opacity:1;
}
.item-active .name
{
    transform: translateY(0);
    opacity: 1;
}
.item-active p 
{
    transform: translateY(0);
    opacity: 1;
}
.item-active .item:nth-child(1)
{
    animation: 1s rect1 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
}
.item-active .item:nth-child(2)
{
    animation: 1s rect2 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
}
.item-active .item:nth-child(3)
{
    animation: 1s rect3 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
}
.item-active .item:nth-child(4)
{
    animation: 1s rect4 0s 1 both cubic-bezier(0.6, 0.25, 0, 1);
}
</style>
