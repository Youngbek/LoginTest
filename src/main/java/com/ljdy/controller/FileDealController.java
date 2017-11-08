package com.ljdy.controller;

import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.sun.prism.impl.Disposer;
import org.json.JSONObject;
import zlicense.create.LicenseCreateInstance;
import zlicense.util.SerialFileParse;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;


/**
 * Created by Young on 2017/11/3.
 */
public class FileDealController extends Controller {

    public void upload() {
        UploadFile file=getFile();
        File source=file.getFile();
        JSONObject json=new JSONObject();
        String sourceName=file.getFileName();
        try {
            FileInputStream fileIn = new FileInputStream(source);
            File targetDir = new File(PathKit.getWebRootPath() + File.separator+"upload");
            if(!targetDir.exists()){
                targetDir.mkdirs();
            }
            File target = new File(targetDir, sourceName);
            if(!target.exists()){
                target.createNewFile();
            }
            FileOutputStream fileOut = new FileOutputStream(target);
            byte[] bts = new byte[300];
            while (fileIn.read(bts, 0, 300) != -1) {
                fileOut.write(bts, 0, 300);
            }
            fileOut.close();
            fileIn.close();
            json.put("error", 0);
            json.put("message","上传成功");
            source.delete();
        }catch (Exception e){
            e.printStackTrace();
            json.put("error", 1);
            json.put("message", "上传出现错误，请稍后再上传");
        }
        renderJson(json.toString());
    }
    public void download(){
        File serialFile=new File("D:\\work\\Gis\\LoginTest\\src\\main\\webapp\\upload\\serial.txt");
        System.out.println(serialFile);
        File createParamFile=new File("D:\\work\\Gis\\LoginTest\\src\\main\\resources\\createparam.properties");
        try {
            new LicenseCreateInstance(createParamFile,serialFile).doCreate();
        } catch (Exception e) {
            e.printStackTrace();

        }
        renderFile("license.lic");


    }
    public void applyInfoSave()throws Exception{
        String name=getPara("name");
        String organization=getPara("organization");
        String email=getPara("email");
        String phoneNumber=getPara("phoneNumber");
        String textarea=getPara("textarea");
        String hostid=new SerialFileParse(new File(PathKit.getWebRootPath()+ File.separator+"upload"+File.separator+"serial.txt"))
                .serialParse();
        Record applyinfo=new Record().set("name",name).set("organization",organization)
                .set("email",email).set("phoneNumber",phoneNumber).set("textarea",textarea)
                .set("hostid",hostid);
        Db.save("applyinfo",applyinfo);
        JSONObject json=new JSONObject();
        json.put("code",1).put("msg","申请信息保存成功");
        renderJson(json.toString());


    }
}
