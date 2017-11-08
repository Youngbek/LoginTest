package com.ljdy.license.verify;

import zlicense.verify.LicenseVerifyInstance;

/**
 * Created by Young on 2017/11/6.
 */
public class VerifyLicense implements Runnable {

    public void run() {
        LicenseVerifyInstance licenseVerifyInstance= new LicenseVerifyInstance("D:\\work\\Gis\\LoginTest\\src\\main\\resources\\verifyparam.properties");
        licenseVerifyInstance.doVerify();
    }

    public static void main(String[] args) {
        new VerifyLicense().run();
    }
}
