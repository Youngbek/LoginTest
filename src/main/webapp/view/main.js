/**
 * Created by 51492 on 2017/10/18.
 */
var requireConfig={
    baseUrl:'/',
    paths:{
        'jquery':'js/jquery.min',
        'vue':'js/vue.min',
        'ELEMENT':'js/element-1.3.7.min',
        'vue-cookie':'js/vue-cookie',
        'vue-resource':'vue-resource.min',
        'vue-router':'vue-router.min'
    },
    map:{
        '*':{
            'css':'/js/css.min'
        }
    }

}
requireConfig.config(requireConfig);
require(['vue', 'ELEMENT','vue-cookie','vue-router','vue-resource','css!/css/element-1.3.7.min'],function (Vue,ELEMENT,VueCookie,VueRouter,VueResource) {
    //注册Element
    Vue.use(ELEMENT);
    //配置调试模式
    Vue.config.debug=true;
    Vue.config.devtools=true;

    //配置Cookie
    Vue.use(VueCookie);
    //配置Resource 访问，处理Http请求
    Vue.use(VueResource);
    //配置路由
    Vue.use(VueRouter);

    var routes=[{
        path:'/',component:function (component) {
            require('view/login',component)
        }
    },
        {
        path:'/home',component:function(component) {
            require('view/home',component)
    }

    }
    ]
    //创建Router实例，然后传routes配置
    var router=new VueRouter({
        routes:routes
    })
    //创建和挂载根实例
    //记得要通过router参数注入路由
    //从而让整个应用都有路由功能
    var app=new Vue(
        {router:router}
    ).$mount("main")



})
