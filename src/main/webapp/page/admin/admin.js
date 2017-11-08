/**
 * Created by 51492 on 2017/11/7.
 */
define(['vue','jquery','text!page/admin/admin.html', 'css!/css/element-1.3.7.min','css!/css/self'], function (Vue, $, adminHtml) {
    return Vue.extend({
        template: adminHtml,  //html
        //组件中data必须是个函数
        data: function () {
            return {
                activeIndex:'1'
            }
        },
        methods: {
            _logout:function () {

            },
            handleSelect:function (key,keyPath) {
                console.log(key,keyPath);
            }

        },
        mounted:function () {

        }
    })
})
