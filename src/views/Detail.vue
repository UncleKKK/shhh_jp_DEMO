<template lang="pug">  
block content
    Navigation
    .container-detail
        .home-container
            header
                .name
                    span {{ pageData.data.name }}
                    span.jp-name {{ pageData.data.jp_name }}
                p {{ pageData.data.dub }}
            figure
                img.left-detail-image(:src = "pageData.data.image_src")
        .content-container
</template>

<script>
import { reactive, ref ,toRefs ,onMounted , computed } from 'vue'
import Navigation from '@/components/Navigation.vue'
import { store } from '../store'
import { reqeust_manger_post } from '@/utils/httpManger.js'
import { useRoute } from 'vue-router'

export default {
  name: 'Detail',
  components:{
    Navigation,
  },
  setup (){
    const route = useRoute()
    const pageData = reactive({
        data:{}
    })
    const reset_store_transition = () => {
        let data = {
            image_src:store.state.transition.image_src,
            style:store.state.transition.style,
            is_loging:false,
        }
        store.commit({
            type:'set_transition',
            data,
        })
    }
    onMounted(() => {
        if(route.params.detailId){
            localStorage.setItem('last_detail_id',route.params.detailId)
        }
        let _params = route.params.detailId ? route.params : { detailId:localStorage.getItem('last_detail_id') }
        reqeust_manger_post('/api/detail',_params)
            .then(res => { 
                pageData.data = res 
                reset_store_transition()
            })
            .catch(err => console.log(err))
    })
    return {
        image_src : computed(() => store.state.transition.image_src),
        pageData,
        reset_store_transition
    }
  }
}
</script>
<style scoped>
@keyframes full-to-right
{
    to{
        width:70%;
    }
}
@keyframes show-text{
    to{
        opacity:1;
    }
}
.container-detail::-webkit-scrollbar {
  display: none;
}
.container-detail 
{
    position: absolute;
    background-color:#F4F4F4;
    width:100vw;
    height:auto;
    overflow:auto;
}
.container-detail .home-container
{
    position: relative;
    top: 0;
    left: 0;
    width:100%;
    height:100vh;
}
.container-detail .left-detail-image
{
    position:absolute;
    top: 0;
    right:0;
    width:100%;
    height:100%;
    object-fit: cover;
    object-position:top;
    transition: top 0.4s cubic-bezier(0.5, 0.5, 0.45, 1),
                right 0.4s cubic-bezier(0.5, 0.5, 0.45, 1),
                width 0.4s cubic-bezier(0.5, 0.5, 0.45, 1);
    animation: full-to-right 1.0s both cubic-bezier(0.5, 0.5, 0.45, 1);
    image-rendering: -webkit-optimize-contrast;
}
.container-detail header
{
    position: relative;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    z-index: 1;
    mix-blend-mode:exclusion;
}
.container-detail header .name
{
    position: absolute;
    left: 10%;
    top: 60%;
    width:90%;
    height:20%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-end;
}
.container-detail header .name span
{
    font-family: STSong;
    font-weight: 500;
    font-size: 100px;
    color: #fff;
    transition: opacity 1s cubic-bezier(0.6, 0.25, 0, 1) 0.3s;
    opacity:0;
    animation:show-text 1s both cubic-bezier(0.6, 0.25, 0, 1) 0.3s;
}
.container-detail header .name .jp-name
{
    margin-left: 20px;
    font-size: 50px;
}
.container-detail header p
{   
    position:relative;
    left: calc(10% + 5px);
    top: calc(80% + 40px);
    list-style: none;
    font-family: STSong;
    color: #f4f4f4;
    font-weight: 500;
    margin-bottom: 20px;
    font-size: 18px;
    transition: opacity 1s cubic-bezier(0.6, 0.25, 0, 1) 0.3s;
    opacity:0;
    animation:show-text 1s both cubic-bezier(0.6, 0.25, 0, 1) 0.3s;
    letter-spacing: 0.1em;
    width: calc(100% - (10% + 5px));
}
.container-detail .content-container
{
    position: absolute;
    padding: 10%;
    /* margin-top:10%; */
    background:#333;
    width:100%;
    height:100%;
}
</style>
