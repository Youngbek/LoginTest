/**
 * Created by Young on 2017/10/20.
 */

define(['vue','jquery','text!page/home/home.html', 'css!/css/element-1.3.7.min','css!/css/self'], function (Vue, $, homeHtml) {
    return Vue.extend({
        template: homeHtml,  //html
            //组件中data必须是个函数
        data: function () {
            return {
                dialogFormVisible: false,
                form:{
                    username:'',
                    password:''
                },
                formLabelWidth: '100px',
                URLlogin:'/login/validate'


            }
        },
        methods:{
            go:function () {
                var that=this;
                that.$router.push(
                    {name:'trial'}

                )

            },
            handleOpen:function (key,keyPath) {
                console.log(key, keyPath);
            },
            handleClose:function (key,keyPath) {
                console.log(key, keyPath);
            },
            adminLogin:function () {
                if(this.form.username==""){
                    this.$message({
                        message: "用户名不能为空！",
                        type: "warning",
                        duration: 2000
                    });
                    return;
                }
                if(this.form.password==""){
                    this.$message({
                        message: "密码不能为空！",
                        type: "warning",
                        duration: 2000
                    });
                    return;
                }
                this.$http.post(this.urlLogin,{
                    'username':this.form.username,
                    'password':this.form.password
                },{emulateJSON:true}).then(function (response) {
                    var data=response.data;
                    if(data.code==0){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            duration: 2000
                        })
                    }else{
                        // this.$cookie.set("username",encodeURIComponent(data.obj.username),1/24); //60min
                        // this.$cookie.set("password",encodeURIComponent(data.obj.password),1/24); //60min
                        $("body").css("background-image","none");
                        this.$router.push({
                            name:'admin'
                        });
                    }
                });
                }
            },
        mounted:function () {
            // this.username = this.$cookie.get("username");
        }
        

    })
})
