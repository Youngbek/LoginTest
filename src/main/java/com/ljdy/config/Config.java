package com.ljdy.config;

import com.jfinal.kit.PathKit;
import com.jfinal.plugin.cron4j.Cron4jPlugin;
import com.ljdy.controller.FileDealController;
import com.ljdy.controller.IndexController;
import com.ljdy.controller.LoginController;
import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;
import com.ljdy.license.verify.VerifyLicense;
import com.ljdy.model._MappingKit;

import java.io.File;


/**
 * Created by Young on 2017/10/12.
 */
public class Config extends JFinalConfig {
    /**
     *
     * @param args
     */
    public static void main(String[] args){//IDEA 中的启动方式，比eclipse少最后一个参数
        new VerifyLicense().run();
        JFinal.start("src/main/webapp", 80, "/");


    }

    /**
     * 配置常量
     * @param me
     */
    public void configConstant(Constants me) {
        //加载配置后可以通过PropKit.get(...) 获取值
        PropKit.use("db.properties");
        me.setDevMode(PropKit.getBoolean("devMode",false));
        me.setBaseUploadPath(PathKit.getWebRootPath()+ File.separator+"upload");
        me.setBaseDownloadPath(PathKit.getWebRootPath()+ File.separator+"upload");
    }

    public void configRoute(Routes me) {
        me.add("/", IndexController.class);  // 第三个参数为该Controller的视图存放路径
        me.add("/login", LoginController.class);
        me.add("/file", FileDealController.class);
    }

    public void configEngine(Engine me) {

    }

    public void configPlugin(Plugins me) {
        //配置C3P0数据库连接池插件
        // ehcache缓存插件
        //me.add(new EhCachePlugin());

        // 配置C3p0数据库连接池插件
        DruidPlugin druidPlugin = new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
        me.add(druidPlugin);

        // 配置ActiveRecord插件
        ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
        // 所有映射在 MappingKit 中自动化搞定
       _MappingKit.mapping(arp);
        me.add(arp);

        //配置任务调度插件
        Cron4jPlugin cp=new Cron4jPlugin();
        cp.addTask("*/5 * * * *",new VerifyLicense());
        me.add(cp);


    }

    public static DruidPlugin createDruidPlugin() {
        return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
    }


    public void configInterceptor(Interceptors me) {

    }

    public void configHandler(Handlers me) {

    }
}
