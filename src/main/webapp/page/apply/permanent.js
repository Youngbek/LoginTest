/**
 * Created by 51492 on 2017/11/1.
 */
/**
 * Created by Young on 2017/10/20.
 */

define(['vue','jquery','text!page/apply/permanent.html', 'css!/css/element-1.3.7.min','css!/css/self'], function (Vue, $, permanentHtml) {
    return Vue.extend({
        template: permanentHtml,  //html
        //组件中data必须是个函数
        data: function () {
            return {
                fileList:[],
                form:{
                    name:'',
                    organization:'',
                    email:'',
                    phoneNumber:'',
                    textarea:''

                },
                urlLogin:'/file/applyInfoSave'

            }
        },
        methods:{
            _next:function () {
                var elemIF = document.createElement("iframe");
                elemIF.src = '/file/download';
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
                this.$http.post(this.urlLogin,{
                    'name':this.form.name,
                    'organization':this.form.organization,
                    'email':this.form.email,
                    'phoneNumber':this.form.phoneNumber,
                    'textarea':this.form.textarea
                },{emulateJSON:true}).then(function (response) {
                    var data = response.data;
                })
            },
            handleRemove:function (file, fileList) {

            },
            handlePreview:function (file) {

            },
            uploadSuccess:function (response, file, fileList) {

            },
            submitUpload:function () {
                this.$refs.upload.submit();
            }

        },
        mounted:function () {

        }


    })
})
