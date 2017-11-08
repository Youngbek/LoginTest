/**
 * Created by 51492 on 2017/11/7.
 */
define(['vue','jquery','text!page/admin/configure.html', 'css!/css/element-1.3.7.min','css!/css/self'], function (Vue, $, configureHtml) {
    return Vue.extend({
        template: configureHtml,  //html
        //组件中data必须是个函数
        data: function () {
            return {
                form:{
                    time:'',
                }
            }
        },
        methods: {
            onSubmit:function () {
                
            }
        }
    });
})
