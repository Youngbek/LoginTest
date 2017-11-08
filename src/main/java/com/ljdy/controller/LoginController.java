package com.ljdy.controller;

import com.jfinal.core.Controller;
import com.ljdy.model.User;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

/**
 * Created by Young on 2017/10/13.
 */

public class LoginController extends Controller {

    /**
     * 验证用户名和密码是否正确
     * @throws UnsupportedEncodingException
     */
    public void validate() throws UnsupportedEncodingException{
        String username=getPara("username");
        String password=getPara("password");
        JSONObject jsonObject =new JSONObject();
        User user= User.dao.validate(username,password);
        if(user==null){
            jsonObject.put("code",0).put("msg","用户名或密码错误，请重新输入");

        }else {
            setSessionAttr("user",user);
            jsonObject.put("code",1).put("msg","输入正确").put("obj",new JSONObject(user.toJson()));

        }
        renderJson(jsonObject.toString());

    }

    /**
     * 退出登录
     */
    public void logout(){
        String username = getPara("username");
        String password = getPara("password");
        User user = (User) getSessionAttr("user");
        if(user.getStr("name").equals(username) && user.getStr("password").equals(password)){
            setAttr("msg","退出成功！");
            setAttr("code",1);
            this.removeSessionAttr("user");
        }
        renderJson();
    }

}
