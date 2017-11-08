package com.ljdy.util;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OperatingSystem;
import java.io.*;


/**
 * Created by Young on 2017/11/2.
 */
public class ComputerIdentifier {
    /**
     * 取得电脑的CPU序列化号
     * @return CPU 序列号
     * @throws Exception
     */
    public static String generateProcessId() throws Exception {
        SystemInfo systemInfo = new SystemInfo();
        OperatingSystem operatingSystem = systemInfo.getOperatingSystem();
        HardwareAbstractionLayer hardwareAbstractionLayer = systemInfo.getHardware();
        CentralProcessor centralProcessor = hardwareAbstractionLayer.getProcessor();
        String processorID = centralProcessor.getProcessorID();
        return processorID;
    }



    /**
     * 将一串字符串写进文件中
     * @throws IOException
     */
    public static void writeInFile(String in)throws IOException{
        String classPath=new Object().getClass().getResource("/").getPath().substring(1);//获取当前类的路径
        File file=new File(classPath+"/serial.txt");
        if(!file.exists()){
            file.createNewFile();
        }
        System.out.println(file);
        PrintStream printStream=new PrintStream(new FileOutputStream(file));
        printStream.print(in);

    }

    /**
     * 加密cpu序列号
     * @param processId
     * @return
     */
    public static String encryptProcessId(String processId){
        StringBuffer sb=new StringBuffer(processId);
        sb.append("_").append("qwer").append("@").append("12");
        String encrypedProcessId="";
        try {
            DesUtils desUtils=new DesUtils();
            encrypedProcessId=desUtils.encrypt(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encrypedProcessId;
    }
    public static void main(String[] arguments) throws Exception {
        String processId = generateProcessId();
        System.out.println(processId);
        writeInFile(encryptProcessId(processId));

    }

}
