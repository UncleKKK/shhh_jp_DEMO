import Mock from "mockjs"

Mock.mock('http://192.168.0.1:8000/api/home','get',(request) => {
    return{
        code: 0,
        message: 'success',
        data:[{
            index:4,
            image_src:require('../assets/sources/4.png'),
            jp_name:'はしびら いのすけ',
            name:'嘴平伊之助',
            dub:'松冈祯丞',
            is_active:false,
          }, {
            index:5,
            image_src:require('../assets/sources/5.png'),
            jp_name:'こちょう しのぶ',
            name:'蝴蝶忍',
            dub:'早见沙织',
            is_active:false,
          },{
            index:1,
            image_src:require('../assets/sources/1.png'),
            jp_name:'かまど たんじろう',
            name:'灶门炭治郎',
            dub:'花江夏树',
            is_active:true,
          },{
            index:2,
            image_src:require('../assets/sources/2.png'),
            jp_name:'かまど ねずこ',
            name:'灶门祢豆子',
            dub:'鬼头明里',
            is_active:false,
          },{
            index:3,
            image_src:require('../assets/sources/3.png'),
            jp_name:'あがつま ぜんいつ',
            name:'我妻善逸',
            dub:'下野纮',
            is_active:false,
          },{
            index:4,
            image_src:require('../assets/sources/4.png'),
            jp_name:'はしびら いのすけ',
            name:'嘴平伊之助',
            dub:'松冈祯丞',
            is_active:false,
          },{
            index:5,
            image_src:require('../assets/sources/5.png'),
            jp_name:'こちょう しのぶ',
            name:'蝴蝶忍',
            dub:'早见沙织',
            is_active:false,
          },{
            index:1,
            image_src:require('../assets/sources/1.png'),
            jp_name:'かまど たんじろう',
            name:'灶门炭治郎',
            dub:'花江夏树',
            is_active:false,
          },{
            index:2,
            image_src:require('../assets/sources/2.png'),
            jp_name:'かまど ねずこ',
            name:'灶门祢豆子',
            dub:'鬼头明里',
            is_active:false,
        }]
    }
})
Mock.mock('http://192.168.0.1:8000/api/detail','post',(request) => {
    let params = JSON.parse(request.body)
    let _data_list = [{
          index:1,
          image_src:require('../assets/sources/1.png'),
          jp_name:'かまど たんじろう',
          name:'灶门炭治郎',
          dub:'花江夏树',
          is_active:true,
        },{
          index:2,
          image_src:require('../assets/sources/2.png'),
          jp_name:'かまど ねずこ',
          name:'灶门祢豆子',
          dub:'鬼头明里',
          is_active:false,
        },{
          index:3,
          image_src:require('../assets/sources/3.png'),
          jp_name:'あがつま ぜんいつ',
          name:'我妻善逸',
          dub:'下野纮',
          is_active:false,
        },{
          index:4,
          image_src:require('../assets/sources/4.png'),
          jp_name:'はしびら いのすけ',
          name:'嘴平伊之助',
          dub:'松冈祯丞',
          is_active:false,
        },{
          index:5,
          image_src:require('../assets/sources/5.png'),
          jp_name:'こちょう しのぶ',
          name:'蝴蝶忍',
          dub:'早见沙织',
          is_active:false,
        }]
    return{
        code: 1,
        message:'success',
        data:_data_list[parseInt(params.detailId) - 1]
    }
})
