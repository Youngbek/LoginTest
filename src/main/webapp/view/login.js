/**
 * Created by 51492 on 2017/10/18.
 */
define(['vue','jquery','text!page/Login/login.html'],function (Vue,$,loginHtml) {
    return Vue.extend({
        template:loginHtml,
        data:function () {
            return{
                user: '',
                url: '',
                urlLogin: '/login/validate',
                name: '',
                password: '',
                code: '',
                status: 'none',
                message: ''
            }
        },
        methods:{
            ChangeCode:function () {
                this.url = '/login/identifyCode?r='+1000*Math.random();
            },
            _login:function () {
                if(this.name==""){
                    this.status='block';
                    this.message='用户名不能为空';
                    return;
                }
                if(this.password==""){
                    this.status='block';
                    this.message='密码不能为空';
                    return;
                }

            }
        },
        mounted: function() {//dom加载完成  dom操作
            $("body").css("background","url('/img/bg.jpg') no-repeat");
            $("body").css("background-size","100% 100%");
        }
    })

})
    
