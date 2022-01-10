<template lang="pug">  
block content
  .container-navigation
    .navigation
      .navigation-button(@click = 'menu_button_tap_action')
        span.navigation-text(data-text = 'Menu' v-if="!statusData.is_show_navigation_view") Menu
        span.navigation-text(data-text = 'Close' v-else) Close
  .navigation-view(:class='statusData.is_show_navigation_view ? "navigation-view-active":"" ')
    ul
        li(v-for = "(item,index) in data.menu_text_list")
            .text-container
                .text
                    span(:class = 'statusData.is_show_animation ? "show":"" ' v-for = "(char,i) in item.content" :style=' "transition-delay:" + (0.06*i) + "s;" ') {{ char }}
                span.num(:class = 'statusData.is_show_animation ? "num-show":""') (0{{ index + 1 }})
            .line(:class = 'statusData.is_show_animation ? "line-show":""')
            span.bottom-text(:class = 'statusData.is_show_animation ? "show":"" ') {{ item.bottom_text }}
    .contact-me(:class = 'statusData.is_show_animation ? "contact-me-show":""')
        p
            .contact-me-view
                template(v-for = '(_item,index) in data.contact_text')
                    span.talk.empty(:class = ' statusData.is_mail_type  == 1  ? "talk-show" : "talk-hide" ' v-if = '_item == " "' :style=' "transition-delay:" + (0.02*index) + "s;" ') {{ _item }}
                    span.talk(:class = 'statusData.is_mail_type  == 1 ? "talk-show" : "talk-hide" ' v-else :style=' "transition-delay:" + (0.02*index) + "s;" ') {{ _item }}
            .contact-me-view
                template(v-for = '(_item,index) in "copy mail to clipboard"')
                    span.talk.empty(:class = 'statusData.is_mail_type  == 2 ? "talk-show" : "talk-hide" ' v-if = '_item == " "' :style=' "transition-delay:" + (0.02*index) + "s;" ') {{ _item }}
                    span.talk(:class = 'statusData.is_mail_type  == 2 ? "talk-show" : "talk-hide" ' v-else :style=' "transition-delay:" + (0.02*index) + "s;" ') {{ _item }}
            .contact-me-view
                template(v-for = '(_item,index) in "mail is copied"')
                    span.talk.empty(:class = 'statusData.is_mail_type  == 3 ? "talk-show" : "talk-hide" ' v-if = '_item == " "' :style=' "animation-delay:" + (0.02*index) + "s;" ') {{ _item }}
                    span.talk(:class = 'statusData.is_mail_type  == 3 ? "talk-show" : "talk-hide" ' v-else :style=' "animation-delay:" + (0.02*index) + "s;" ') {{ _item }}
        span.mail(@mouseenter = 'mail_mouse_enter_action' @mouseleave = 'mail_mouse_leave_action' @click = 'mail_click_action') wxin24521@gmail.com
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'

export default {
  name: 'Navigation',
  setup (){
    const clipboard_input = ref(null)
    const statusData = reactive({
        is_show_navigation_view : false,
        is_show_animation:false,
        is_mail_type:1, // -- 1. normal 2.hover 3.copied
    })
    const data = reactive({
        menu_text_list:[{
            content: '人物介绍',
            bottom_text : 'Role Introduce'
        },{
            content: '配音介绍',
            bottom_text : 'Dub Introduce'
        },{
            content:'精彩视频',
            bottom_text : 'Amazing Video'
        },{
            content:'高清壁纸',
            bottom_text : 'HD Wallpaper'
        }],
        contact_text : "let's talk"
    })
    const menu_button_tap_action = () => {
        if(statusData.is_show_navigation_view){
            statusData.is_show_animation = false
            setTimeout(() => {
                statusData.is_show_navigation_view = false
            },1400)
        }else{
            statusData.is_show_navigation_view = true
            statusData.is_show_animation = true
        }
    }
    const mail_mouse_enter_action = () => {
        statusData.is_mail_type = 2
    }
    const mail_mouse_leave_action = () =>{
        statusData.is_mail_type = 1
    }
    const mail_click_action = () => {
        window.navigator.clipboard.writeText('wxin24521@gmail.com')
        .then(_ => statusData.is_mail_type = 3 )
        .catch((err) => console.log(err))
    }
    return {
        clipboard_input,
        statusData,
        data,
        menu_button_tap_action,
        mail_mouse_enter_action,
        mail_mouse_leave_action,
        mail_click_action
    }
  }
}
</script>
<style scoped>
.container-navigation 
{
    position: absolute;
    z-index: 301;
    mix-blend-mode: difference;
}
.container-navigation .navigation
{
  position: fixed;
  top: 2em;
  left: 4em;
  font-size: calc(var(--fontSize) * 0.8);
  overflow: hidden;
}
.container-navigation .navigation .navigation-button
{
    cursor: pointer;
}
.container-navigation .navigation .navigation-button span
{
  display:inline-block;
  margin-left:1.25em;
  transform:translateY(0);
  transition: transform 1s cubic-bezier(0.6, 0.25, 0, 1),opacity 1s cubic-bezier(0.6, 0.25, 0, 1);
  color: #F4F4F4;
}
.container-navigation .navigation .navigation-button::before
{
  content: "";
  position: absolute;
  top: calc(50% - 3px);
  left: 0;
  width:6px;
  height:6px;
  background-color:#F4F4F4;
  border-radius: 50%;
}
.container-navigation .navigation .navigation-button span::after
{
  content: attr(data-text);
  position: absolute;
  top: 100%;
  left: 0;
  display: inline-block;
  transition: transform 1s cubic-bezier(0.6, 0.25, 0, 1),opacity 1s cubic-bezier(0.6, 0.25, 0, 1);
}
.container-navigation .navigation .navigation-button:hover span
{
  transform:translate(0,-100%);
}
.navigation-view
{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color:#161616;
    z-index: 300;
    transition: transform 1s cubic-bezier(0.6, 0.25, 0, 1);
    transform:translateY(-100%);
    display: flex;
    justify-content:center;
    align-items:center;
}
.navigation-view-active
{
    transform:translateY(0);
}
.navigation-view ul
{
    width:100%;
    height:80%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
}
.navigation-view ul li 
{
    list-style: none;
    height:80%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    overflow:hidden;
}
.navigation-view ul li span 
{
    margin-left: 1em;
    color: #747474;
    writing-mode:vertical-rl;
    font-family: STSong;
    font-size: 12px;
}
.navigation-view ul li .bottom-text
{
    font-size: 14px;
    color: #F4F4F4;
    margin-right: -5px;
    transition: opacity .5s cubic-bezier(0.6, 0.25, 0, 1) 0s,transform .5s cubic-bezier(0.6, 0.25, 0, 1) 0s;
    opacity: 0;
    transform: translateY(50px);
    transition-delay: .8s;
}
.navigation-view ul li .show
{
    opacity: 1;
    transform: translateY(0);
}
.navigation-view ul li .text
{
    display: flex;
    flex-direction: column;
    color: #F4F4F4;
    font-family: STSong;
}
.navigation-view ul li .line
{
    position: relative;
    height:100px;
    width: 1px;
    flex: 1;
    background-color: #343434;
    margin-left: calc(0.5em + 10px);
    margin-bottom: 8px;
    transform: scale(1, 0);
    transform-origin: left top;
    transition: transform 1.0s cubic-bezier(0.6, 0.25, 0, 1) 0s;
    transition-delay: 0.8s;
}
.navigation-view ul li .line-show
{
    transform: scale(1, 1);
}
.navigation-view ul li .text span
{
    margin-bottom: 8px;
    color: #F4F4F4;
    font-size: 45px;
    transition:transform 1.5s cubic-bezier(0.5, 0.2, 0.01, 1);
    transform:translateX(-200%);
}
.navigation-view ul li .text .show
{
    transform:translateX(0);
}
.navigation-view ul li .text-container
{
    display: flex;
    flex-direction: row;
}
.navigation-view ul li .text-container .num
{
    transition: opacity 1s cubic-bezier(0.6, 0.25, 0, 1) 1s,transform 1s cubic-bezier(0.6, 0.25, 0, 1) 1s;
    opacity: 0;
    transform: translateY(50px);
}
.navigation-view ul li .text-container .num-show
{
    transform: translateY(0);
    opacity: 1;
}
.navigation-view .contact-me
{
    position: absolute;
    left: 3.3em;
    bottom: 15%;
    display:flex;
    flex-direction:column;
    transition: opacity 1s cubic-bezier(0.6, 0.25, 0, 1) 1s,transform 1s cubic-bezier(0.6, 0.25, 0, 1) 1s;
    opacity: 0;
    transform: translateY(50px);
}
.navigation-view .contact-me-show
{
    opacity: 1;
    transform: translateY(0);
}
.navigation-view .contact-me p
{
    overflow:hidden;
}
.navigation-view .contact-me .talk
{
    position:relative;
    display:inline-block;
    font-family: STSong;
    font-size:1em;
    color: #747474;
    transform: translateY(50px);
    opacity:0;
    transition: opacity .5s cubic-bezier(0.6, 0.25, 0, 1) 0s,transform .5s cubic-bezier(0.6, 0.25, 0, 1) 0s;
}
.navigation-view .contact-me .talk-show
{
    transform: translateY(0px);
    opacity:1;
}
.navigation-view .contact-me .talk-hide
{
    transform: translateY(50px);
    opacity:0;
}
.navigation-view .contact-me .empty
{
    width:0.3em;
}
.navigation-view .contact-me .mail
{
    position:relative;
    top: 20px;
    font-size:1.5em;
    color: #F4F4F4;
    cursor: pointer;
}
.navigation-view .contact-me .mail::after
{
    content:'';
    position: absolute;
    bottom:0;
    left: 0;
    width:100%;
    height:1px;
    background-color: #F4F4F4;
}
.navigation-view .contact-me .contact-me-view
{
    position: absolute;
    top: 0;left: 0;
    width:auto;
    display: flex;
    flex-direction: row;
    overflow:hidden;
}
</style>
