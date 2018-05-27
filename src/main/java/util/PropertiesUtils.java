package util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class PropertiesUtils {

    @Autowired
    private MessageSource messageSource;
    public void setMessages(MessageSource messages) {
        this.messageSource = messages;
    }

    public  String getMessages(String value){
     return    messageSource.getMessage(value,new Object[0],Locale.getDefault());
    }

}
