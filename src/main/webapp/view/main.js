/**
 * Created by 51492 on 2017/10/18.
 */
var requireConfig={
    baseUrl:'/',
    paths:{
        'jquery':'js/jquery.min',
        'text': 'js/text',
        'vue':'js/vue.min',
        'ELEMENT':'js/element-1.3.7.min',
        'vue-cookie':'js/vue-cookie',
        'vue-resource':'js/vue-resource.min',
        'vue-router':'js/vue-router.min'
    },
    shim: {
    },
    map:{
        '*':{
            'css':'js/css.min'
        }
    }

}
require.config(requireConfig);
// require(['vue', 'ELEMENT','vue-cookie','vue-router','vue-resource','css!/css/element-1.3.7.min'],function (Vue,ELEMENT,VueCookie,VueRouter,VueResource) {
require(['vue', 'vue-router', 'vue-resource', 'vue-cookie', 'ELEMENT', 'css!/css/element-1.3.7.min','css!/css/self'], function (Vue, VueRouter, VueResource, VueCookie, ELEMENT) {

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
            path: '/', component: function (component) {
            require(['page/home/home'], component)
        }
        },
        {
            path:'/admin',name:'admin',component:function (component) {
            require(['page/admin/admin'],component);
        },
            children:[
                {
                    path:'configure',name:'configure',component:function (component) {
                    require(['page/admin/configure'],component);
                }
                },
                {
                  path:'checkLicense',name:'checkLicense',component:function (component) {
                      require(['page/admin/configure'],component);

                }
                }
            ]
        },
        {
            path: '/home', name: 'home', component: function (component) {
            require(['page/home/home'], component);
            },
            children:[
                {
                    path:'trial',name:'trial',component:function (component) {
                    require(['page/apply/trial'],component);
                }
                },
                {
                    path:'permanent',name:'permanent',component:function (component) {
                    require(['page/apply/permanent'],component);
                }
                }
            ]
        }

    ]
    // //创建Router实例，然后传routes配置
    // var router=new VueRouter({
    //     routes:routes
    // })
    // //创建和挂载根实例
    // //记得要通过router参数注入路由
    // //从而让整个应用都有路由功能
    // var app=new Vue(
    //     {router:router}
    // ).$mount("main")
    // 创建 router 实例，然后传 `routes` 配置
    const router = new VueRouter({
        routes: routes // （缩写）相当于 routes: routes
    });

    // 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const home = new Vue({
        router: router
    }).$mount('#main')



})
