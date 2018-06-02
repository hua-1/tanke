package util.json;

import com.google.gson.Gson;
public class JacksonUtils {

    public static String ObjectToStirng(Object t){
        String json=null;
        if(t!=null){
            Gson jsonObject= new Gson();
            json = jsonObject.toJson(t);
        }
       return json;
    }
}
