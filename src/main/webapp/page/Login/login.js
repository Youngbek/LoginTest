/**
 * Created by 51492 on 2017/10/18.
 */
define(['vue','jquery','text!page/Login/login.html','css!/css/self'],function (Vue,$,loginHtml) {
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
            // ChangeCode:function () {
            //     this.url = '/login/identifyCode?r='+1000*Math.random();
            // },
            _login:function () {
                if(this.name==""){
                    this.$message({
                        message: "用户名不能为空！",
                        type: "warning",
                        duration: 2000
                    });
                    return;
                }
                if(this.password==""){
                    this.$message({
                        message: "密码不能为空！",
                        type: "warning",
                        duration: 2000
                    });
                    return;
                }
                this.$http.post(this.urlLogin,{
                    'username':this.name,
                    'password':this.password
                },{emulateJSON:true}).then(function (response) {
                    var data=response.data;
                    if(data.code==0){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            duration: 2000
                        })
                    }else{
                        this.$cookie.set("username",encodeURIComponent(data.obj.username),1/24); //60min
                        this.$cookie.set("password",encodeURIComponent(data.obj.password),1/24); //60min
                        // $("body").css("background-image","none");
                        this.$router.push({
                            name:'home'
                        });
                    }
                })
            }
        },
        mounted: function() {//dom加载完成  dom操作
            $("body").css("background","url('/img/bg.jpg') no-repeat");
            $("body").css("background-size","100% 100%");
        }
    })

})
    
