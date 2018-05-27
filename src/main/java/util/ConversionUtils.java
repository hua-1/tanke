package util;

public class ConversionUtils {
    public ConversionUtils() {
    }

    public static Integer toInt(String code){
        return code==null||code==""?null:Integer.parseInt(code);
    }
    public static Long toLong(String code){
        return code==null||code==""?null:Long.parseLong(code);
    }

    public static String toString(Integer code){
        return code==null||code==0?null:code+"";

    }
}

