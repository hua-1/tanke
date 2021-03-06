package util;

import java.math.BigDecimal;

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

    public static String toString(Long code){
        return code==null||code==0?null:code+"";
    }

    public static Integer toInt(Long code){
        return code==null||code==0?null: BigDecimal.valueOf(code).intValue();
    }
}

