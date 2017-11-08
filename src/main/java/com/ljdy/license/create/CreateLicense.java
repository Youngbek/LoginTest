package com.ljdy.license.create;

import zlicense.create.LicenseCreateInstance;

import java.io.File;

/**
 * Created by Young on 2017/11/6.
 */
public class CreateLicense {
    public static void main(String[] args) {
        File createParamFile=new File("D:\\work\\Gis\\LoginTest\\src\\main\\resources\\createparam.properties");
        File serialFile=new File("D:\\work\\Gis\\LoginTest\\src\\main\\webapp\\upload\\serial.txt");
        try {
            new LicenseCreateInstance(createParamFile,serialFile).doCreate();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("创建失败");
        }
    }

}
